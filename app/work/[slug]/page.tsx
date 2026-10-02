/* eslint-disable @next/next/no-html-link-for-pages -- Vinext client links trigger a duplicate React hook context in development. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDiagram from "../../ProjectDiagram";
import { profile, projects } from "../../portfolio-data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  const title = `${project.title} | Harsh Dobariya`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      url: `/work/${project.slug}`,
      images: [],
    },
    twitter: {
      card: "summary",
      title,
      description: project.summary,
      images: [],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="case-study">
      <header className="case-nav section-shell">
        <a href="/" aria-label="Back to Harsh Dobariya portfolio">Harsh Dobariya</a>
        <a href="/#work">All work</a>
      </header>

      <article>
        <header className="case-hero section-shell">
          <p className="case-eyebrow">{project.index} / {project.category}</p>
          <h1>{project.title}</h1>
          <p className="case-lede">{project.summary}</p>
          <dl className="case-meta">
            <div><dt>Focus</dt><dd>{project.engineering.slice(0, 3).join(" · ")}</dd></div>
            <div><dt>Stack</dt><dd>{project.stack.join(" · ")}</dd></div>
            <div><dt>Context</dt><dd>Independent engineering project</dd></div>
          </dl>
        </header>

        <div className="case-visual section-shell">
          <ProjectDiagram kind={project.diagram} />
        </div>

        <div className="case-content section-shell">
          <section>
            <p className="case-section-label">01 / Overview</p>
            <h2>One system, several responsibilities.</h2>
            <p>{project.caseStudy.overview}</p>
          </section>

          <section>
            <p className="case-section-label">02 / Problem</p>
            <h2>Where the design gets interesting.</h2>
            <p>{project.caseStudy.problem}</p>
          </section>

          <section>
            <p className="case-section-label">03 / What I built</p>
            <ul className="case-list">
              {project.caseStudy.built.map((item, index) => (
                <li key={item}><span>0{index + 1}</span>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className="case-section-label">04 / Engineering decisions</p>
            <ol className="decision-list">
              {project.caseStudy.decisions.map((item, index) => (
                <li key={item}><span>0{index + 1}</span><p>{item}</p></li>
              ))}
            </ol>
          </section>

          <div className="case-split">
            <section>
              <p className="case-section-label">05 / Tradeoffs</p>
              <h2>Choose what to optimize.</h2>
              <p>{project.caseStudy.tradeoffs}</p>
            </section>
            <section>
              <p className="case-section-label">06 / Reliability</p>
              <h2>Design for the unhappy path.</h2>
              <p>{project.caseStudy.reliability}</p>
            </section>
          </div>

          <div className="case-split">
            <section>
              <p className="case-section-label">07 / Performance</p>
              <h2>Measure what users feel.</h2>
              <p>{project.caseStudy.performance}</p>
            </section>
            <section>
              <p className="case-section-label">08 / What I learned</p>
              <h2>The lasting lesson.</h2>
              <p>{project.caseStudy.learned}</p>
            </section>
          </div>
        </div>
      </article>

      <footer className="case-footer section-shell">
        <div>
          <p>Next case study</p>
          <a href={`/work/${nextProject.slug}`}>{nextProject.title} <span aria-hidden="true">→</span></a>
        </div>
        <a href={profile.github} target="_blank" rel="noreferrer">Explore GitHub <span aria-hidden="true">↗</span></a>
      </footer>
    </main>
  );
}
