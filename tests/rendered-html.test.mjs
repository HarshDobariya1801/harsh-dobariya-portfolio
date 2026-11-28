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
  assert.match(html, /Selected Projects/i);
  assert.match(html, /Distributed Key-Value Store/);
  assert.match(html, /Real-Time Collaborative Workspace/);
  assert.match(html, /Arizona State University/);
  assert.match(html, /Gujarat Technological University/);
  assert.match(html, /3\.5 \/ 4\.0/);
  assert.match(html, /8\.00 \/ 10/);
  assert.match(html, /IFT 511: Analyzing Big Data/);
  assert.match(html, /Advanced Database Management Systems/);
  assert.match(html, /Computer Organization &amp; Architecture/);
  assert.match(html, /Artificial Intelligence/);
  assert.match(html, /Seattle, Washington, USA/);
  assert.match(html, /Open to relocate/);
  assert.match(html, /Community Dreams Foundation/);
  assert.match(html, /Ninja Technolabs/);
  assert.match(html, /Harsh_Dobariya_Resume\.pdf/);
  assert.match(html, /harsh-dobariya-962238183/);
  assert.match(html, /HarshDobariya1801/);
  assert.match(html, /og\.png/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Let(?:'|&apos;)s build something dependable/i);
  assert.match(html, /Back to introduction/i);
  assert.match(html, /building backend systems, distributed infrastructure, and polished products/i);
  assert.match(html, /GET, SET, and DEL behavior/i);
  assert.match(html, /data-demo-kind="kv"/i);
  assert.match(html, /data-demo-kind="collaborative"/i);
  assert.match(html, /Loading as it enters view/i);
  assert.match(html, /25%/);
  assert.match(html, /About and Contact/i);
  assert.match(html, /Working set/i);
  assert.match(html, /GitHub Actions/);
  assert.match(html, /aria-label="Education"/i);
  assert.match(html, /aria-label="Professional experience"/i);
  assert.match(html, /experience-preview-metrics/i);
  assert.match(html, /View architecture \+ demo/i);
  assert.equal((html.match(/<details[^>]*data-volume/gi) ?? []).length, 8);
  assert.match(html, /Open Arizona State University details/i);
  assert.match(html, /Open Distributed Key-Value Store project/i);
  assert.doesNotMatch(html, /Case study|Screenshot needed|href="\/work\//i);
  assert.doesNotMatch(html, /<footer\b|Footer links|©/i);
  assert.doesNotMatch(html, /id="engineering"|href="#engineering"|What I build/i);
  assert.doesNotMatch(html, /custom-cursor|Toggle color theme|hero-blueprint/i);
  const visibleText = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  assert.doesNotMatch(
    visibleText,
    /—|\bASU\b|\bGTU\b|3K|monthly users supported|harsh\.profile|understand the whole system|placeholder|lorem ipsum|AgentTime|AI Resume Analyzer/i,
  );
  assert.doesNotMatch(html, /system-stats|harsh-system-poster\.png|hero-system-diagram/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
  assert.doesNotMatch(html, /Academic volume|technical publication|VOL\./i);

  const experiencePosition = html.indexOf('id="experience"');
  const projectsPosition = html.indexOf('id="work"');
  const educationPosition = html.indexOf('id="education"');
  const aboutPosition = html.indexOf('id="about"');
  assert.ok(experiencePosition > -1 && experiencePosition < projectsPosition);
  assert.ok(projectsPosition < educationPosition);
  assert.ok(educationPosition < aboutPosition);
});

test("removes project case-study routes and sitemap entries", async () => {
  const sitemap = await readFile(new URL("app/sitemap.ts", projectRoot), "utf8");

  await assert.rejects(access(new URL("app/work/[slug]/page.tsx", projectRoot)));
  assert.doesNotMatch(sitemap, /\/work\//);
  assert.match(sitemap, /\/poems/);
});

test("server-renders the poetry index and individual reading pages", async () => {
  const indexResponse = await render("/poems");
  assert.equal(indexResponse.status, 200);
  const indexHtml = await indexResponse.text();

  assert.match(indexHtml, /On love, distance, and looking within/);
  assert.match(indexHtml, /poems-cover-1600\.webp/);
  assert.match(indexHtml, /poems-cover-720\.webp/);
  assert.match(indexHtml, /Read the featured poem/);
  const visibleIndexText = indexHtml
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  assert.equal((visibleIndexText.match(/उस पते पर कोई नहीं था/g) ?? []).length, 1);
  assert.equal((indexHtml.match(/class="poem-list-title"/g) ?? []).length, 10);

  const hindiResponse = await render("/poems/tumko-dekhun-to");
  assert.equal(hindiResponse.status, 200);
  const hindiHtml = await hindiResponse.text();
  assert.match(hindiHtml, /lang="hi"/);
  assert.match(hindiHtml, /तुमको देखूँ तो फूल-सा बिखर जाता हूँ/);
  assert.match(hindiHtml, /—हर्ष/);
  assert.match(hindiHtml, /All poems/);
  assert.match(hindiHtml, /नज़दीकियों की दूरी/);

  const finalResponse = await render("/poems/prem-jahan-ant-hi-aarambh-hai");
  assert.equal(finalResponse.status, 200);
  const finalHtml = await finalResponse.text();
  assert.match(finalHtml, /class="poem-subtitle"><strong>प्रेम - जहाँ &#x27;मैं&#x27; समाप्त होता है।<\/strong>/);
  assert.match(finalHtml, /<strong>जीवन ही प्रेम है।<\/strong>/);
  assert.match(finalHtml, /अगर तुम प्रेम को समझ रहे हो, तो वह प्रेम नहीं है।/);
  assert.match(finalHtml, /Back to all poems\./);
});

test("includes portfolio assets and removes starter-only files", async () => {
  const resume = await stat(new URL("public/Harsh_Dobariya_Resume.pdf", projectRoot));
  const ogImage = await readFile(new URL("public/og.png", projectRoot));
  const poemCoverDesktop = await stat(new URL("public/poems/poems-cover-1600.webp", projectRoot));
  const poemCoverMobile = await stat(new URL("public/poems/poems-cover-720.webp", projectRoot));
  const packageJson = await readFile(new URL("package.json", projectRoot), "utf8");
  const readme = await readFile(new URL("README.md", projectRoot), "utf8");

  assert.ok(resume.size > 50_000);
  assert.equal(ogImage.readUInt32BE(16), 1200);
  assert.equal(ogImage.readUInt32BE(20), 630);
  assert.ok(poemCoverDesktop.size > poemCoverMobile.size);
  assert.ok(poemCoverMobile.size < 40_000);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(readme, /Harsh Dobariya Portfolio/);
  assert.doesNotMatch(readme, /case stud|\/work\//i);
  assert.doesNotMatch(readme, /vinext-starter/);
  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
  await assert.rejects(access(new URL("public/file.svg", projectRoot)));
  await assert.rejects(access(new URL("public/globe.svg", projectRoot)));
  await assert.rejects(access(new URL("public/window.svg", projectRoot)));
});
