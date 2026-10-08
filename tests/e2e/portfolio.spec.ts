import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

type RuntimeSignals = {
  consoleErrors: string[];
  failedRequests: string[];
  failedResponses: string[];
  pageErrors: string[];
};

function collectRuntimeSignals(page: Page): RuntimeSignals {
  const signals: RuntimeSignals = {
    consoleErrors: [],
    failedRequests: [],
    failedResponses: [],
    pageErrors: [],
  };

  page.on("console", (message) => {
    if (message.type() === "error") signals.consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => signals.pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    signals.failedRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText ?? "unknown error"}`);
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      signals.failedResponses.push(`${response.status()} ${response.request().method()} ${response.url()}`);
    }
  });

  return signals;
}

test("loads without runtime failures or horizontal overflow", async ({ page }) => {
  const signals = collectRuntimeSignals(page);
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator("footer").scrollIntoViewIfNeeded();

  const overflow = await page.evaluate(() => ({
    body: document.body.scrollWidth - document.body.clientWidth,
    document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));

  expect(overflow.body, "body horizontal overflow in CSS pixels").toBeLessThanOrEqual(1);
  expect(overflow.document, "document horizontal overflow in CSS pixels").toBeLessThanOrEqual(1);
  expect(signals.consoleErrors, "browser console errors").toEqual([]);
  expect(signals.pageErrors, "uncaught page errors").toEqual([]);
  expect(signals.failedRequests, "failed browser requests").toEqual([]);
  expect(signals.failedResponses, "HTTP error responses").toEqual([]);
});

test("links have valid targets and local destinations resolve", async ({ page, request }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const hrefs = await page.locator("a[href]").evaluateAll((links) =>
    [...new Set(links.map((link) => link.getAttribute("href") ?? ""))],
  );

  expect(hrefs).not.toContain("");
  expect(hrefs).not.toContain("#");

  for (const href of hrefs) {
    if (href.startsWith("#")) {
      const targetExists = await page.evaluate((selector) => Boolean(document.querySelector(selector)), href);
      expect(targetExists, `missing anchor target for ${href}`).toBe(true);
      continue;
    }

    if (href.startsWith("mailto:")) {
      expect(href).toMatch(/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/);
      continue;
    }

    const destination = new URL(href, page.url());
    if (destination.origin === new URL(page.url()).origin) {
      const response = await request.get(destination.toString(), { failOnStatusCode: false });
      expect(response.status(), `broken local link: ${destination}`).toBeLessThan(400);
    } else {
      expect(destination.protocol, `external links must use HTTPS: ${destination}`).toBe("https:");
    }
  }
});

test("external profile links are not missing", async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One live probe is sufficient for external links.");
  await page.goto("/", { waitUntil: "networkidle" });
  const links = await page.locator('a[href^="https://"]').evaluateAll((anchors) =>
    [...new Set(anchors.map((anchor) => (anchor as HTMLAnchorElement).href))],
  );

  for (const link of links) {
    const response = await request.get(link, { failOnStatusCode: false, timeout: 20_000 });
    expect([404, 410], `external link is missing: ${link}`).not.toContain(response.status());
  }
});

test("critical project and contact interactions work", async ({ context, page }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/", { waitUntil: "networkidle" });

  const result = page.locator(".kv-command-readout strong");
  await page.getByRole("button", { name: "SET", exact: true }).click();
  await expect(result).toContainText("value stored");
  await page.getByRole("button", { name: "GET", exact: true }).click();
  await expect(result).toContainText("Harsh");
  await page.getByRole("button", { name: "DEL", exact: true }).click();
  await expect(result).toContainText("key removed");

  await page.getByRole("button", { name: "Send an edit" }).click();
  await expect(page.getByText("Synced", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Guest editor")).toContainText("Reliability starts at clear boundaries.");

  await page.getByRole("button", { name: /^Copy email:/ }).click();
  await expect(page.getByRole("button", { name: /^Copied:/ })).toBeVisible();

  await page.getByRole("link", { name: "View my work" }).click();
  await expect(page).toHaveURL(/#work$/);
});

test("mobile menu opens, traps focus, and closes with Escape", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "The menu is a mobile-only interaction.");
  await page.goto("/", { waitUntil: "networkidle" });

  const menu = page.locator("[data-mobile-nav]");
  const summary = menu.locator("summary");
  await summary.click();
  await expect(menu).toHaveAttribute("open", "");
  await expect(menu.getByRole("link", { name: "Work" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open", "");
  await expect(summary).toBeFocused();
});

test("has no automatically detectable WCAG A or AA violations", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});
