import { expect, test } from "@playwright/test";
import { fileURLToPath } from "node:url";

const stabilityStyles = fileURLToPath(new URL("./visual-stability.css", import.meta.url));

test("portfolio matches the reviewed full-page baseline", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.dispatchEvent(new Event("scroll")));
  await page.waitForFunction(() => document.documentElement.dataset.deferredStylesReady === "true");
  await page.evaluate(() => window.scrollTo(0, 0));

  await expect(page).toHaveScreenshot("portfolio-home.png", {
    fullPage: true,
    stylePath: stabilityStyles,
  });
});

test("collaborative editor hint matches the reviewed component baseline", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => window.dispatchEvent(new Event("scroll")));
  await page.waitForFunction(() => document.documentElement.dataset.deferredStylesReady === "true");
  await page.locator("#collab-work summary").click();
  await page.locator("#collab-work .project-demo-frame").scrollIntoViewIfNeeded();
  await expect(page.locator('[data-demo-kind="collaborative"]')).toHaveAttribute("data-demo-ready", "true");
  await expect(page.locator(".collaborative-demo")).toBeAttached();
  await page.locator(".site-header").evaluate((header) => { (header as HTMLElement).style.display = "none"; });
  const demo = page.locator(".collaborative-demo");
  await demo.scrollIntoViewIfNeeded();
  await expect(page.locator("[data-editor-hint]")).toContainText("Try editing this code...");

  await expect(demo).toHaveScreenshot("collaborative-editor-hint.png", {
    stylePath: stabilityStyles,
  });
});

test("poetry index matches the reviewed book layout", async ({ page }) => {
  await page.goto("/poems", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot("poems-index.png", {
    fullPage: true,
    stylePath: stabilityStyles,
  });
});

test("Hindi reading page matches the reviewed mobile typography", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "The dedicated reading review is mobile-specific.");
  await page.goto("/poems/tumko-dekhun-to", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot("poem-tumko-dekhun-to.png", {
    fullPage: true,
    stylePath: stabilityStyles,
  });
});

test("long final poem matches the reviewed wrapping and emphasis", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "The dedicated reading review is mobile-specific.");
  await page.goto("/poems/prem-jahan-ant-hi-aarambh-hai", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot("poem-prem-jahan-ant-hi-aarambh-hai.png", {
    fullPage: true,
    stylePath: stabilityStyles,
  });
});
