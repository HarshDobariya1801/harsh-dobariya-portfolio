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

async function openProject(page: Page, id: "distributed-key-value-store" | "collab-work") {
  const volume = page.locator(`#${id}`);
  const summary = volume.locator("summary");
  if ((await volume.getAttribute("open")) === null) await summary.click();
  await expect(volume).toHaveAttribute("open", "");
  await volume.locator(".project-demo-frame").scrollIntoViewIfNeeded();
  await expect(volume.locator("[data-demo-ready]")).toHaveAttribute("data-demo-ready", "true");
  return volume;
}

test("loads without runtime failures or horizontal overflow", async ({ page }) => {
  const signals = collectRuntimeSignals(page);
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator("#contact").scrollIntoViewIfNeeded();

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

test("remains composed at the additional review breakpoints", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One breakpoint sweep is sufficient.");

  for (const width of [1280, 1024, 430, 375]) {
    await page.setViewportSize({ width, height: width <= 430 ? 812 : 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.locator("#contact").scrollIntoViewIfNeeded();

    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `${width}px viewport has horizontal overflow`).toBeLessThanOrEqual(1);
    await expect(page.locator("#experience")).toBeAttached();
    await expect(page.locator("#work")).toBeAttached();
    await expect(page.locator("#education")).toBeAttached();
  }
});

test("hero LRU cache follows deterministic eviction and reset behavior", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const workbench = page.locator(".cache-workbench");
  const order = async () => workbench.locator("[data-cache-key]").evaluateAll((entries) =>
    entries.map((entry) => entry.getAttribute("data-cache-key")),
  );

  await expect(workbench.getByRole("heading", { name: "Try my cache." })).toBeVisible();
  expect(await order()).toEqual(["A", "B", "C"]);
  await expect(workbench.getByText("Least recent", { exact: true })).toBeVisible();

  const touchB = workbench.getByRole("button", { name: "Touch B" });
  await touchB.focus();
  await touchB.press("Enter");
  expect(await order()).toEqual(["A", "C", "B"]);
  await expect(workbench.getByText("Touched B. It is now the most recently used entry.", { exact: true }).first()).toBeVisible();

  await workbench.getByRole("button", { name: "Add a key" }).click();
  expect(await order()).toEqual(["C", "B", "D"]);
  await expect(workbench.getByText("Evicted A", { exact: true })).toBeVisible();
  await expect(workbench.getByText("Added D. Evicted A because it was used least recently.", { exact: true }).first()).toBeVisible();

  await workbench.getByRole("button", { name: "Add a key" }).click();
  expect(await order()).toEqual(["B", "D", "E"]);
  await workbench.getByRole("button", { name: "Reset" }).click();
  expect(await order()).toEqual(["A", "B", "C"]);
  await expect(workbench.getByText("Reset cache to A, B, and C. A is least recently used.", { exact: true }).first()).toBeVisible();
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

test("editorial volumes are keyboard accessible and only one opens per collection", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const ninjaPreview = page.locator("#experience-ninja-technolabs summary");
  await expect(ninjaPreview.getByText("15%", { exact: true })).toBeVisible();
  await expect(ninjaPreview.getByText("2,000+", { exact: true })).toBeVisible();
  await expect(ninjaPreview.getByText("70%", { exact: true })).toBeVisible();
  await expect(ninjaPreview.getByText("Reworked a legacy billing workflow", { exact: false })).toBeVisible();

  const asuVolume = page.locator("#education-asu");
  const asuSummary = asuVolume.locator("summary");
  await asuSummary.focus();
  await asuSummary.press("Enter");
  await expect(asuVolume).toHaveAttribute("open", "");
  await expect(asuVolume.getByRole("heading", { name: "Arizona State University" })).toBeVisible();
  await expect(asuVolume.locator(".reader-metadata").getByText("3.5 / 4.0", { exact: true })).toBeVisible();
  await expect(asuVolume.getByText("IFT 511: Analyzing Big Data", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(asuVolume).not.toHaveAttribute("open", "");
  await expect(asuSummary).toBeFocused();

  const communityVolume = page.locator("#experience-community-dreams");
  const ninjaVolume = page.locator("#experience-ninja-technolabs");
  await communityVolume.locator("summary").click();
  await expect(communityVolume).toHaveAttribute("open", "");
  await ninjaVolume.locator("summary").click();
  await expect(ninjaVolume).toHaveAttribute("open", "");
  await expect(communityVolume).not.toHaveAttribute("open", "");
  await ninjaVolume.getByRole("button", { name: "Close reading view" }).click();
  await expect(ninjaVolume).not.toHaveAttribute("open", "");
});

test("project demos and contact interactions still work", async ({ context, page }, testInfo) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/", { waitUntil: "networkidle" });

  const kvVolume = await openProject(page, "distributed-key-value-store");
  const result = kvVolume.locator(".kv-command-readout strong");
  await kvVolume.getByRole("button", { name: "SET", exact: true }).click();
  await expect(result).toContainText("value stored");
  await kvVolume.getByRole("button", { name: "GET", exact: true }).click();
  await expect(result).toContainText("Harsh");
  await kvVolume.getByRole("button", { name: "DEL", exact: true }).click();
  await expect(result).toContainText("key removed");

  const collabVolume = await openProject(page, "collab-work");
  await expect(kvVolume).not.toHaveAttribute("open", "");
  const harshEditor = collabVolume.getByLabel("Harsh code editor");
  const guestEditor = collabVolume.getByLabel("Guest code editor");
  const editorHint = collabVolume.locator("[data-editor-hint]");
  const harshChange = "const message = \"Hello from Harsh\";\nreturn message;";
  const guestChange = "const message = \"Guest replied\";\n\nreturn message.toUpperCase();";

  await harshEditor.scrollIntoViewIfNeeded();
  await expect(editorHint).toBeVisible();
  await guestEditor.click();
  await expect(editorHint).not.toBeAttached();
  await harshEditor.fill(harshChange);
  await expect(guestEditor).toHaveValue(harshChange);
  await harshEditor.pressSequentially("\n// rapid edit", { delay: 0 });
  await expect(guestEditor).toHaveValue(`${harshChange}\n// rapid edit`);

  await guestEditor.selectText();
  await page.evaluate((text) => navigator.clipboard.writeText(text), guestChange);
  await page.keyboard.press(process.platform === "darwin" ? "Meta+V" : "Control+V");
  await expect(harshEditor).toHaveValue(guestChange);
  await collabVolume.getByRole("button", { name: "Reset demo" }).click();
  await expect(harshEditor).toHaveValue(/const workspace/);
  await expect(guestEditor).toHaveValue(/collaborators: 2/);

  if (testInfo.project.name === "mobile") {
    const architectureTab = collabVolume.getByRole("tab", { name: "Architecture" });
    const editorTab = collabVolume.getByRole("tab", { name: "Editor" });
    await architectureTab.click();
    await expect(architectureTab).toHaveAttribute("aria-selected", "true");
    await architectureTab.press("ArrowLeft");
    await expect(editorTab).toHaveAttribute("aria-selected", "true");
    await architectureTab.click();
  }

  const diagram = collabVolume.getByRole("img", { name: /Client A connects bidirectionally/ });
  await expect(diagram).toBeVisible();
  await expect(diagram.getByText("Redis Pub/Sub", { exact: true })).toBeVisible();
  await expect(diagram.getByText("PostgreSQL", { exact: true })).toBeVisible();

  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /^Copy email:/ }).click();
  await expect(page.getByRole("button", { name: /^Copied:/ })).toBeVisible();
  await page.getByRole("link", { name: "Back to introduction ↑" }).click();
  await expect(page).toHaveURL(/#intro$/);
});

test("collaborative editor hint types, cycles, and dismisses", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One animation lifecycle check is sufficient.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "networkidle" });
  const collabVolume = await openProject(page, "collab-work");
  const harshEditor = collabVolume.getByLabel("Harsh code editor");
  const hint = collabVolume.locator("[data-editor-hint]");
  await harshEditor.scrollIntoViewIfNeeded();

  await expect(hint).toBeVisible();
  await expect(hint.locator("i")).toBeVisible();
  await expect(hint).toContainText("Try editing this code...", { timeout: 4_000 });
  await expect(hint).toContainText("Your changes sync live!", { timeout: 7_500 });
  await harshEditor.click();
  await expect(hint).not.toBeAttached();
});

test("collaborative editor hint is static with reduced motion", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One reduced-motion check is sufficient.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  const collabVolume = await openProject(page, "collab-work");
  const harshEditor = collabVolume.getByLabel("Harsh code editor");
  const hint = collabVolume.locator("[data-editor-hint]");
  await harshEditor.scrollIntoViewIfNeeded();

  await expect(hint).toContainText("Try editing this code...");
  await page.waitForTimeout(1_000);
  await expect(hint).toContainText("Try editing this code...");
});

test("project deep links open the matching publication", async ({ page }) => {
  await page.goto("/#collab-work", { waitUntil: "networkidle" });
  await expect(page.locator("#collab-work")).toHaveAttribute("open", "");
  await expect(page).toHaveURL(/#collab-work$/);
});

test("mobile menu opens, traps focus, and closes with Escape", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "The index menu is mobile-only.");
  await page.goto("/", { waitUntil: "networkidle" });

  const menu = page.locator("[data-mobile-nav]");
  const summary = menu.locator("summary");
  await summary.click();
  await expect(menu).toHaveAttribute("open", "");
  await expect(menu.getByRole("link", { name: "Intro" })).toBeFocused();
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
