/* eslint-disable @next/next/no-html-link-for-pages -- Vinext client links trigger a duplicate React hook context in development. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDiagram from "../../ProjectDiagram";
import ScrollMotion from "../../ScrollMotion";
import ThemeToggle from "../../ThemeToggle";
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

function ContentNeeded({ children }: { children: React.ReactNode }) {
  return (
    <div className="content-needed">
      <span>Content needed</span>
      <p>{children}</p>
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="case-study" id="top">
      <ScrollMotion />
      <a className="skip-link" href="#case-content">Skip to case study</a>

      <header className="case-nav">
        <div className="case-nav-inner section-shell">
          <a className="wordmark" href="/" aria-label="Back to Harsh Dobariya portfolio">HD<span>/</span></a>
          <nav aria-label="Case study navigation">
            <a href="/#work">All work</a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <article id="case-content">
        <header className="case-hero section-shell" data-reveal>
          <p className="eyebrow">{project.index} / {project.category} / Case study</p>
          <h1>{project.title}</h1>
          <p className="case-lede">{project.summary}</p>
          <dl className="case-meta">
            <div><dt>Role</dt><dd>Independent engineering project</dd></div>
            <div><dt>Stack</dt><dd>{project.stack.join(" · ")}</dd></div>
            <div><dt>Focus</dt><dd>{project.engineering.slice(0, 3).join(" · ")}</dd></div>
          </dl>
          <div className="case-links">
            {project.repositoryUrl ? (
              <a href={project.repositoryUrl} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            ) : (
              <span className="link-placeholder"><b>GitHub</b><small>URL needed</small></span>
            )}
            {project.demoUrl ? (
              <a href={project.demoUrl} target="_blank" rel="noreferrer">Live demo <span aria-hidden="true">↗</span></a>
            ) : project.diagram === "realtime" && (
              <span className="link-placeholder"><b>Live demo</b><small>URL needed</small></span>
            )}
          </div>
        </header>

        <section className="case-architecture section-shell" aria-labelledby="architecture-title" data-reveal>
          <div className="case-section-heading">
            <p className="eyebrow">01 / Architecture</p>
            <h2 id="architecture-title">System overview</h2>
          </div>
          <ProjectDiagram kind={project.diagram} />
          {project.visualPlaceholder && <ContentNeeded>{project.visualPlaceholder}</ContentNeeded>}
        </section>

        <div className="case-content section-shell">
          <section aria-labelledby="problem-title" data-reveal>
            <p className="eyebrow">02 / Problem</p>
            <div>
              <h2 id="problem-title">What the system needed to handle</h2>
              <p>{project.caseStudy.problem}</p>
            </div>
          </section>

          <section aria-labelledby="approach-title" data-reveal>
            <p className="eyebrow">03 / Approach</p>
            <div>
              <h2 id="approach-title">How I approached it</h2>
              <p>{project.caseStudy.overview}</p>
              <ul className="case-list">
                {project.caseStudy.built.map((item, index) => (
                  <li key={item}><span>0{index + 1}</span>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="decisions-title" data-reveal>
            <p className="eyebrow">04 / Decisions</p>
            <div>
              <h2 id="decisions-title">Key decisions and tradeoffs</h2>
              <ol className="decision-list">
                {project.caseStudy.decisions.map((item, index) => (
                  <li key={item}><span>0{index + 1}</span><p>{item}</p></li>
                ))}
              </ol>
              <p className="case-supporting-copy">{project.caseStudy.tradeoffs}</p>
            </div>
          </section>

          <section aria-labelledby="results-title" data-reveal>
            <p className="eyebrow">05 / Results</p>
            <div>
              <h2 id="results-title">Results and benchmarks</h2>
              <p>{project.caseStudy.performance}</p>
              <ContentNeeded>{project.resultsPlaceholder}</ContentNeeded>
            </div>
          </section>

          <section aria-labelledby="next-title" data-reveal>
            <p className="eyebrow">06 / Next</p>
            <div>
              <h2 id="next-title">What I would do next</h2>
              <ContentNeeded>{project.nextStepsPlaceholder}</ContentNeeded>
            </div>
          </section>
        </div>
      </article>

      <footer className="case-footer section-shell">
        <div>
          <p>Next case study</p>
          <a href={`/work/${nextProject.slug}`}>{nextProject.title} <span aria-hidden="true">→</span></a>
        </div>
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub profile <span aria-hidden="true">↗</span></a>
      </footer>
    </main>
  );
}
