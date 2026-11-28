import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PoemText, { getPoemSubtitle } from "../PoemText";
import PoemsHeader from "../PoemsHeader";
import { getPoem, poems } from "../poems-data";

type PoemPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return poems.map((poem) => ({ slug: poem.slug }));
}

export async function generateMetadata({ params }: PoemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const poem = getPoem(slug);
  if (!poem) return {};

  return {
    title: `${poem.title} | Poems | Harsh Dobariya`,
    description: poem.excerpt,
    alternates: { canonical: `/poems/${poem.slug}` },
  };
}

export default async function PoemPage({ params }: PoemPageProps) {
  const { slug } = await params;
  const poem = getPoem(slug);
  if (!poem) notFound();

  const index = poems.findIndex((entry) => entry.slug === poem.slug);
  const nextPoem = poems[index + 1];
  const subtitle = getPoemSubtitle(poem);

  return (
    <main className="poem-reading-page" id="top">
      <a className="skip-link" href="#poem-content">Skip to poem</a>
      <PoemsHeader />
      <article className="poem-reading" id="poem-content" lang={poem.language}>
        <header>
          <Link className="all-poems-link" href="/poems">All poems</Link>
          <h1>{poem.title}</h1>
          {subtitle ? <p className="poem-subtitle"><strong>{subtitle}</strong></p> : null}
        </header>
        <PoemText poem={poem} />
        <footer>
          {nextPoem ? (
            <>
              <span>Next poem</span>
              <Link href={`/poems/${nextPoem.slug}`} lang={nextPoem.language}>{nextPoem.title}</Link>
            </>
          ) : (
            <Link href="/poems">Back to all poems.</Link>
          )}
        </footer>
      </article>
    </main>
  );
}
