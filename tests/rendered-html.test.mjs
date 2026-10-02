import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Harsh Dobariya's portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Harsh Dobariya \| Software Engineer<\/title>/i);
  assert.match(html, /Harsh/);
  assert.match(html, /Dobariya/);
  assert.match(html, /Selected work/i);
  assert.match(html, /Distributed Key-Value Store/);
  assert.match(html, /Real-Time Collaborative Workspace/);
  assert.match(html, /Arizona State University/);
  assert.match(html, /Tempe, Arizona, USA/);
  assert.match(html, /Open to relocate/);
  assert.match(html, /Ninja Technolabs/);
  assert.match(html, /Harsh_Dobariya_Resume\.pdf/);
  assert.match(html, /harsh-dobariya-962238183/);
  assert.match(html, /HarshDobariya1801/);
  assert.match(html, /og\.png/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Have a useful problem/i);
  assert.match(html, /Backend systems\. Full-stack products\./i);
  assert.match(html, /Toggle color theme/i);
  assert.match(html, /URL needed/i);
  assert.match(html, /Screenshot needed/i);
  assert.match(html, /aria-label="Case study: Distributed Key-Value Store"/);
  assert.match(html, /aria-label="Case study: Real-Time Collaborative Workspace"/);
  assert.match(html, /1,000\+ algorithm and data structure problems/);
  assert.match(html, /35%/);
  assert.doesNotMatch(
    html,
    /—|3K|monthly users supported|system-stats|harsh-system-poster\.png/i,
  );
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("renders both project case studies", async () => {
  const first = await render("/work/distributed-key-value-store");
  assert.equal(first.status, 200);
  const firstHtml = await first.text();
  assert.match(firstHtml, /<title>Distributed Key-Value Store \| Harsh Dobariya<\/title>/);
  assert.match(firstHtml, /property="og:title" content="Distributed Key-Value Store \| Harsh Dobariya"/);
  assert.doesNotMatch(firstHtml, /property="og:image"/);
  assert.match(firstHtml, /Key decisions and tradeoffs/);
  assert.match(firstHtml, /p95 and p99 latency/);
  assert.match(firstHtml, /What I would do next/);
  assert.match(firstHtml, /Content needed/);

  const second = await render("/work/realtime-collaborative-workspace");
  assert.equal(second.status, 200);
  const secondHtml = await second.text();
  assert.match(secondHtml, /<title>Real-Time Collaborative Workspace \| Harsh Dobariya<\/title>/);
  assert.match(secondHtml, /property="og:title" content="Real-Time Collaborative Workspace \| Harsh Dobariya"/);
  assert.doesNotMatch(secondHtml, /property="og:image"/);
  assert.match(secondHtml, /Redis Pub\/Sub/);
  assert.match(secondHtml, /Screenshot needed/);
  assert.match(secondHtml, /Results and benchmarks/);
  assert.match(secondHtml, /Content needed/);
});

test("includes portfolio assets and removes starter-only files", async () => {
  const resume = await stat(new URL("public/Harsh_Dobariya_Resume.pdf", projectRoot));
  const ogImage = await readFile(new URL("public/og.png", projectRoot));
  const packageJson = await readFile(new URL("package.json", projectRoot), "utf8");
  const readme = await readFile(new URL("README.md", projectRoot), "utf8");

  assert.ok(resume.size > 50_000);
  assert.equal(ogImage.readUInt32BE(16), 1200);
  assert.equal(ogImage.readUInt32BE(20), 630);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(readme, /Harsh Dobariya Portfolio/);
  assert.match(readme, /Content still needed/);
  assert.doesNotMatch(readme, /vinext-starter/);
  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
  await assert.rejects(access(new URL("public/file.svg", projectRoot)));
  await assert.rejects(access(new URL("public/globe.svg", projectRoot)));
  await assert.rejects(access(new URL("public/window.svg", projectRoot)));
});
