/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDiagram from "../../ProjectDiagram";
import SiteFooter from "../../SiteFooter";
import SiteHeader from "../../SiteHeader";
import { getProject, projects } from "../../portfolio-data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} | Harsh Dobariya`;
  return {
    title,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title,
      description: project.description,
      url: `https://harshdobariya.com/work/${project.slug}`,
      type: "article",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${project.title} by Harsh Dobariya` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: ["/og.png"],
    },
  };
}

function CaseSection({ number, title, children }: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="case-section" data-reveal>
      <p className="case-number">{number}</p>
      <h2>{title}</h2>
      <div className="case-section-body">{children}</div>
    </section>
  );
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <a className="skip-link" href="#case-content">Skip to case study</a>
      <SiteHeader />

      <main className="case-study" id="case-content">
        <header className="case-hero site-shell">
          <a className="back-link" href="/#work">← Selected work</a>
          <p className="project-kicker">Project {project.index} / {project.category}</p>
          <h1>{project.title}</h1>
          <p className="case-deck">{project.description}</p>
          <ul className="tech-list" aria-label="Technologies">
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </header>

        <div className="case-visual site-shell" data-reveal>
          <ProjectDiagram kind={project.diagram} />
        </div>

        <div className="case-content site-shell">
          <CaseSection number="01" title="Overview">
            <p>{project.overview}</p>
          </CaseSection>

          <CaseSection number="02" title="Problem">
            <p>{project.problem}</p>
          </CaseSection>

          <CaseSection number="03" title="Architecture">
            <p>
              The diagram above follows the main path through the system. It separates network
              coordination, application work, and durable state so each boundary is visible.
            </p>
          </CaseSection>

          <CaseSection number="04" title="Key decisions">
            <div className="decision-list">
              {project.decisions.map((decision) => (
                <article key={decision.title}>
                  <h3>{decision.title}</h3>
                  <p>{decision.description}</p>
                </article>
              ))}
            </div>
          </CaseSection>

          <CaseSection number="05" title="Engineering challenges">
            <ul className="case-list">
              {project.challenges.map((challenge) => <li key={challenge}>{challenge}</li>)}
            </ul>
          </CaseSection>

          <CaseSection number="06" title="Tradeoffs">
            <div className="tradeoff-list">
              {project.tradeoffs.map((tradeoff) => (
                <article key={tradeoff.title}>
                  <h3>{tradeoff.title}</h3>
                  <p>{tradeoff.description}</p>
                </article>
              ))}
            </div>
          </CaseSection>

          <CaseSection number="07" title="Testing and measurement">
            <p>{project.measurement}</p>
            {project.measurementPlaceholder && (
              <p className="case-placeholder"><span>Project asset needed</span>{project.measurementPlaceholder}</p>
            )}
          </CaseSection>

          <CaseSection number="08" title="What I learned">
            <p>{project.learning}</p>
          </CaseSection>
        </div>

        <nav className="next-project site-shell" aria-label="More selected work">
          <p>Continue reading</p>
          {projects.filter((item) => item.slug !== project.slug).map((item) => (
            <a key={item.slug} href={`/work/${item.slug}`}>
              <span>{item.category}</span>{item.title} <i aria-hidden="true">↗</i>
            </a>
          ))}
        </nav>
      </main>

      <SiteFooter />
    </>
  );
}
