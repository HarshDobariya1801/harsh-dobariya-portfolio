import { expect, test } from "@playwright/test";
import { fileURLToPath } from "node:url";

const stabilityStyles = fileURLToPath(new URL("./visual-stability.css", import.meta.url));

test("portfolio matches the reviewed full-page baseline", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot("portfolio-home.png", {
    fullPage: true,
    stylePath: stabilityStyles,
  });
});

test("collaborative editor hint matches the reviewed component baseline", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator(".site-header").evaluate((header) => { (header as HTMLElement).style.display = "none"; });
  const demo = page.locator(".collaborative-demo");
  await demo.scrollIntoViewIfNeeded();
  await expect(page.locator("[data-editor-hint]")).toContainText("Try editing this code...");

  await expect(demo).toHaveScreenshot("collaborative-editor-hint.png", {
    stylePath: stabilityStyles,
  });
});
