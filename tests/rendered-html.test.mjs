import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

test("server-renders Harsh Dobariya's complete portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Harsh Dobariya — Full-Stack Software Engineer<\/title>/i);
  assert.match(html, /Distributed Key-Value Store/);
  assert.match(html, /Real-Time Collaborative Workspace/);
  assert.match(html, /Arizona State University/);
  assert.match(html, /Tempe, Arizona, USA/);
  assert.match(html, /Open to relocate for the right opportunity/);
  assert.match(html, /Ninja Technolabs/);
  assert.match(html, /Harsh_Dobariya_Resume\.pdf/);
  assert.match(html, /harsh-dobariya-962238183/);
  assert.match(html, /HarshDobariya1801/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("includes the downloadable resume and removes starter-only assets", async () => {
  const resume = await stat(new URL("public/Harsh_Dobariya_Resume.pdf", projectRoot));
  const socialCard = await stat(new URL("public/og.png", projectRoot));
  const packageJson = await readFile(new URL("package.json", projectRoot), "utf8");

  assert.ok(resume.size > 50_000);
  assert.ok(socialCard.size > 100_000);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
});
