import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the recruiter-focused portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Harsh Dobariya — Software Engineer<\/title>/i);
  assert.match(html, /Software Engineer/);
  assert.match(html, /Arizona State University/);
  assert.match(html, /Tempe, Arizona/);
  assert.match(html, /Open to relocate/i);
  assert.match(html, /Available for Software roles/i);
  assert.match(html, /Selected work/i);
  assert.match(html, /Distributed Key-Value Store/);
  assert.match(html, /Real-Time Collaborative Workspace/);
  assert.match(html, /Billing Platform Modernization/);
  assert.match(html, /href="\/work\/distributed-key-value-store"/i);
  assert.match(html, /href="\/work\/realtime-collaborative-workspace"/i);
  assert.match(html, /Request queue/i);
  assert.match(html, /Redis Pub\/Sub/i);
  assert.match(html, /Ninja Technolabs/);
  assert.match(html, /BrainyBeam Technologies/);
  assert.match(html, /1,000\+/);
  assert.match(html, /Harsh_Dobariya_Resume\.pdf/);
  assert.match(html, /harsh-dobariya-962238183/);
  assert.match(html, /HarshDobariya1801/);
  assert.match(html, /og\.png/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /harsh\.profile|fake terminal|Live demo|AI-Powered Resume Analyzer/i);
});

test("renders both project case-study routes", async () => {
  const cases = [
    ["/work/distributed-key-value-store", /p95\/p99 latency/i],
    ["/work/realtime-collaborative-workspace", /Redis Pub\/Sub vs\. database-backed events/i],
  ];

  for (const [pathname, expected] of cases) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, /Overview/i);
    assert.match(html, /Key decisions/i);
    assert.match(html, /Engineering challenges/i);
    assert.match(html, /Tradeoffs/i);
    assert.match(html, /Testing and measurement/i);
    assert.match(html, /What I learned/i);
    assert.match(html, expected);
  }
});

test("includes case studies in the sitemap", async () => {
  const sitemap = await readFile(new URL("app/sitemap.ts", projectRoot), "utf8");
  await access(new URL("app/work/[slug]/page.tsx", projectRoot));
  assert.match(sitemap, /projects\.map/);
  assert.match(sitemap, /\/work\//);
});

test("keeps portfolio assets and removes obsolete interaction code", async () => {
  const resume = await stat(new URL("public/Harsh_Dobariya_Resume.pdf", projectRoot));
  const ogImage = await readFile(new URL("public/og.png", projectRoot));
  const packageJson = await readFile(new URL("package.json", projectRoot), "utf8");
  const readme = await readFile(new URL("README.md", projectRoot), "utf8");

  assert.ok(resume.size > 50_000);
  assert.equal(ogImage.readUInt32BE(16), 1200);
  assert.equal(ogImage.readUInt32BE(20), 630);
  assert.doesNotMatch(packageJson, /framer-motion|react-loading-skeleton/);
  assert.match(readme, /Harsh Dobariya Portfolio/);
  assert.match(readme, /\/work\/distributed-key-value-store/);
  assert.match(readme, /\/work\/realtime-collaborative-workspace/);
  await assert.rejects(access(new URL("app/CustomCursor.tsx", projectRoot)));
  await assert.rejects(access(new URL("app/ThemeToggle.tsx", projectRoot)));
});
