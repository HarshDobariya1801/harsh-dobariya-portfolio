import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const poemSlugs = [
  "the-illusion-of-two",
  "just-you",
  "tumko-dekhun-to",
  "nazdikiyon-ki-doori",
  "us-pate-par-koi-nahin-tha",
  "main-thama-tha-sadiyon-se",
  "tum-ek-sampoorna-sansar-ho",
  "rang-bhi-rangviheen-hain",
  "aankhen-jo-swayam-ko-nahin-dekhtin",
  "prem-jahan-ant-hi-aarambh-hai",
] as const;

test("poetry index keeps the collection ordered and uses responsive cover assets", async ({ page }, testInfo) => {
  await page.goto("/poems", { waitUntil: "networkidle" });
  const rows = page.locator(".poems-contents li");

  await expect(rows).toHaveCount(10);
  await expect(rows.nth(0).getByText("The Illusion of Two", { exact: true })).toBeVisible();
  await expect(rows.nth(4).getByText("उस पते पर कोई नहीं था", { exact: true })).toBeVisible();
  await expect(rows.nth(9).getByText("प्रेम - जहाँ अंत ही आरंभ है।", { exact: true })).toBeVisible();
  await expect(page.getByText("उस पते पर कोई नहीं था", { exact: true })).toHaveCount(1);

  const cover = page.locator(".poems-cover img");
  const desktopSource = await cover.evaluate((image: HTMLImageElement) => image.currentSrc);
  if (testInfo.project.name === "mobile") {
    expect(desktopSource).toContain("poems-cover-720.webp");
  } else {
    expect(desktopSource).toContain("poems-cover-1600.webp");
  }
});

test("poetry layout remains composed at 375px", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One exact-width review is sufficient.");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/poems", { waitUntil: "networkidle" });

  const positions = await page.evaluate(() => {
    const copy = document.querySelector(".poems-cover-copy")?.getBoundingClientRect();
    const image = document.querySelector(".poems-cover picture")?.getBoundingClientRect();
    return {
      copyBottom: copy?.bottom ?? 0,
      imageTop: image?.top ?? 0,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

  expect(positions.copyBottom).toBeLessThanOrEqual(positions.imageTop + 1);
  expect(positions.overflow).toBeLessThanOrEqual(1);
  const currentSource = await page.locator(".poems-cover img").evaluate((image: HTMLImageElement) => image.currentSrc);
  expect(currentSource).toContain("poems-cover-720.webp");
});

test("homepage exposes Poems in desktop and mobile navigation", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "networkidle" });

  if (testInfo.project.name !== "desktop") {
    await page.locator("[data-mobile-nav] summary").click();
    await expect(page.locator("[data-mobile-nav]").getByRole("link", { name: "Poems" })).toHaveAttribute("href", "/poems");
  } else {
    await expect(page.locator(".desktop-nav").getByRole("link", { name: "Poems" })).toHaveAttribute("href", "/poems");
  }
});

test("all poem URLs load directly", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One route sweep is sufficient.");

  for (const slug of poemSlugs) {
    const response = await request.get(`/poems/${slug}`);
    expect(response.status(), `${slug} should resolve`).toBe(200);
    expect(await response.text()).toContain("poem-reading");
  }
});

test("Hindi typography preserves lines and spacing on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/poems/tumko-dekhun-to", { waitUntil: "networkidle" });

  const poem = page.locator(".poem-text");
  await expect(poem).toHaveAttribute("lang", "hi");
  await expect(poem.locator(".poem-stanza").first().locator(".poem-line")).toHaveCount(4);
  await expect(poem.getByText("—हर्ष", { exact: true })).toBeVisible();
  const typography = await poem.evaluate((element) => {
    const style = getComputedStyle(element);
    return { fontFamily: style.fontFamily, lineHeight: Number.parseFloat(style.lineHeight) };
  });
  expect(typography.fontFamily).toMatch(/Devanagari|Nirmala|Mangal/i);
  expect(typography.lineHeight).toBeGreaterThanOrEqual(36);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

test("long final piece wraps and retains bold emphasis", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/poems/prem-jahan-ant-hi-aarambh-hai", { waitUntil: "networkidle" });

  await expect(page.locator(".poem-subtitle strong")).toHaveText("प्रेम - जहाँ 'मैं' समाप्त होता है।");
  await expect(page.locator(".poem-text strong")).toHaveCount(6);
  await expect(page.getByText("अगर तुम प्रेम को समझ रहे हो, तो वह प्रेम नहीं है।", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to all poems." })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

test("poetry pages have no detectable WCAG A or AA violations", async ({ page }) => {
  await page.goto("/poems", { waitUntil: "networkidle" });
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
