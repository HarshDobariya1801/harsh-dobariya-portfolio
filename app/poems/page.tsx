import type { Metadata } from "next";
import PoemsHeader from "./PoemsHeader";
import { featuredPoem, poems } from "./poems-data";

export const metadata: Metadata = {
  title: "Poems | Harsh Dobariya",
  description: "On love, distance, and looking within. A bilingual poetry collection by Harsh Dobariya.",
  alternates: { canonical: "/poems" },
  openGraph: {
    title: "Poems | Harsh Dobariya",
    description: "On love, distance, and looking within.",
    url: "https://harshdobariya.com/poems",
    images: [{
      url: "https://harshdobariya.com/poems/poems-cover-1600.webp",
      width: 1600,
      height: 900,
      alt: "A rain-darkened stone lane leading to a closed wooden door at dusk",
    }],
  },
};

export default function PoemsPage() {
  return (
    <main className="poems-index" id="top">
      <a className="skip-link" href="#poems-content">Skip to poems</a>
      <PoemsHeader />

      <div id="poems-content">
        <section className="poems-cover" aria-labelledby="poems-title">
          <div className="poems-cover-copy section-shell">
            <p className="poems-eyebrow">A bilingual collection</p>
            <h1 id="poems-title">Poems</h1>
            <p>On love, distance, and looking within.</p>
            <a href={`/poems/${featuredPoem.slug}`}>Read the featured poem</a>
          </div>
          <picture>
            <source media="(max-width: 600px)" srcSet="/poems/poems-cover-720.webp" />
            <img
              src="/poems/poems-cover-1600.webp"
              width="1600"
              height="900"
              alt="A narrow rain-darkened stone lane at dusk, ending at a closed wooden door beneath an amber streetlight"
              fetchPriority="high"
            />
          </picture>
        </section>

        <section className="poems-contents section-shell" aria-labelledby="contents-title">
          <header>
            <p>Ten manuscripts / Hindi and English</p>
            <h2 id="contents-title">Table of contents</h2>
          </header>
          <ol>
            {poems.map((poem) => (
              <li key={poem.slug}>
                <a href={`/poems/${poem.slug}`} lang={poem.language}>
                  <span className="poem-list-title">{poem.title}</span>
                  <span className="poem-list-excerpt">{poem.excerpt}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
