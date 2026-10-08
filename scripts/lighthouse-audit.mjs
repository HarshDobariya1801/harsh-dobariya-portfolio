import { chromium } from "@playwright/test";
import * as chromeLauncher from "chrome-launcher";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import lighthouse from "lighthouse";
import process from "node:process";

const defaultURL = "http://localhost:3000/";
const targetURL = process.env.LIGHTHOUSE_URL ?? defaultURL;
const outputDirectory = new URL("../artifacts/lighthouse/", import.meta.url);
const thresholds = {
  performance: 0.85,
  accessibility: 0.9,
  "best-practices": 0.9,
  seo: 0.9,
};

let server;
let chrome;

async function runCommand(command, arguments_) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, arguments_, {
      env: process.env,
      stdio: "inherit",
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${arguments_.join(" ")} exited with ${code ?? signal}`));
    });
  });
}

async function waitForServer(url, timeout = 120_000) {
  const deadline = Date.now() + timeout;
  let lastError;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
      lastError = new Error(`Server responded with ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Local site did not become ready: ${lastError?.message ?? "unknown error"}`);
}

function stopServer() {
  if (!server?.pid) return;
  try {
    if (process.platform === "win32") server.kill("SIGTERM");
    else process.kill(-server.pid, "SIGTERM");
  } catch {
    server.kill("SIGTERM");
  }
}

try {
  if (!process.env.LIGHTHOUSE_URL) {
    await runCommand("npm", ["run", "build"]);
    server = spawn("npm", ["run", "start"], {
      detached: process.platform !== "win32",
      env: { ...process.env, BROWSER: "none" },
      stdio: ["ignore", "pipe", "pipe"],
    });

    server.stdout?.on("data", (chunk) => process.stdout.write(`[site] ${chunk}`));
    server.stderr?.on("data", (chunk) => process.stderr.write(`[site] ${chunk}`));
    await waitForServer(defaultURL);
  } else {
    await waitForServer(targetURL, 20_000);
  }

  chrome = await chromeLauncher.launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
  });

  const result = await lighthouse(targetURL, {
    port: chrome.port,
    logLevel: "error",
    output: ["json", "html"],
    onlyCategories: Object.keys(thresholds),
  });

  if (!result) throw new Error("Lighthouse did not return a result.");

  const reports = Array.isArray(result.report) ? result.report : [result.report];
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all([
    writeFile(new URL("report.json", outputDirectory), reports[0]),
    writeFile(new URL("report.html", outputDirectory), reports[1]),
  ]);

  const failures = [];
  for (const [category, minimum] of Object.entries(thresholds)) {
    const score = result.lhr.categories[category]?.score ?? 0;
    const formatted = Math.round(score * 100);
    console.log(`${category}: ${formatted} (minimum ${Math.round(minimum * 100)})`);
    if (score < minimum) failures.push(`${category} ${formatted} < ${Math.round(minimum * 100)}`);
  }

  console.log("Reports: artifacts/lighthouse/report.html and report.json");
  if (failures.length > 0) {
    throw new Error(`Lighthouse thresholds failed: ${failures.join(", ")}`);
  }
} finally {
  await chrome?.kill();
  stopServer();
}
