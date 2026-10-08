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
