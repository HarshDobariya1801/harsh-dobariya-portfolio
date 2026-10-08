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
  assert.match(html, /Systems built end to end/i);
  assert.match(html, /Distributed Key-Value Store/);
  assert.match(html, /Real-Time Collaborative Workspace/);
  assert.match(html, /Arizona State University/);
  assert.match(html, /Tempe, Arizona, USA/);
  assert.match(html, /Open to relocate/);
  assert.match(html, /Community Dreams Foundation/);
  assert.match(html, /Ninja Technolabs/);
  assert.match(html, /Harsh_Dobariya_Resume\.pdf/);
  assert.match(html, /harsh-dobariya-962238183/);
  assert.match(html, /HarshDobariya1801/);
  assert.match(html, /og\.png/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Have something worth building/i);
  assert.match(html, /reliable software from interface to/i);
  assert.match(html, /retro-futurist computing workstation/i);
  assert.match(html, /GET, SET, and DEL commands/i);
  assert.match(html, /Interactive synchronization simulation/i);
  assert.match(html, /Edit either window and watch the change sync live/i);
  assert.match(html, /Node Server A/i);
  assert.match(html, /Redis Pub\/Sub/i);
  assert.match(html, /PostgreSQL/i);
  assert.match(html, /25%/);
  assert.match(html, /Backend depth, full-stack perspective/i);
  assert.match(html, /Tools I use/i);
  assert.match(html, /GitHub Actions/);
  assert.doesNotMatch(html, /Case study|Screenshot needed|Live demo|href="\/work\//i);
  assert.doesNotMatch(html, /custom-cursor|Toggle color theme|hero-blueprint/i);
  assert.doesNotMatch(
    html,
    /—|3K|monthly users supported|system-stats|harsh-system-poster\.png|harsh\.profile|understand the whole system|placeholder|lorem ipsum|AgentTime|AI Resume Analyzer/i,
  );
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("removes project case-study routes and sitemap entries", async () => {
  const sitemap = await readFile(new URL("app/sitemap.ts", projectRoot), "utf8");

  await assert.rejects(access(new URL("app/work/[slug]/page.tsx", projectRoot)));
  assert.doesNotMatch(sitemap, /\/work\//);
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
  assert.doesNotMatch(readme, /case stud|\/work\//i);
  assert.doesNotMatch(readme, /vinext-starter/);
  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
  await assert.rejects(access(new URL("public/file.svg", projectRoot)));
  await assert.rejects(access(new URL("public/globe.svg", projectRoot)));
  await assert.rejects(access(new URL("public/window.svg", projectRoot)));
});
