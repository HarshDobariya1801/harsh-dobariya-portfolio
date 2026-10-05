import ProjectDiagram from "./ProjectDiagram";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import {
  education,
  experience,
  professionalWork,
  profile,
  projects,
  toolGroups,
  type Project,
} from "./portfolio-data";

function SectionHeading({ eyebrow, title, description, id }: {
  eyebrow: string;
  title: string;
  description?: string;
  id: string;
}) {
  return (
    <header className="section-heading" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <div>
        <h2 id={id}>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </header>
  );
}

function TechList({ technologies }: { technologies: readonly string[] }) {
  return (
    <ul className="tech-list" aria-label="Technologies">
      {technologies.map((technology) => <li key={technology}>{technology}</li>)}
    </ul>
  );
}

function ProjectLink({ project }: { project: Project }) {
  return (
    <a className="text-link" href={`/work/${project.slug}`}>
      Read case study <span aria-hidden="true">↗</span>
    </a>
  );
}

function PrimaryProject({ project }: { project: Project }) {
  return (
    <article className="project-feature project-feature-primary" data-reveal>
      <div className="project-copy">
        <p className="project-kicker">Project {project.index} / {project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <TechList technologies={project.technologies} />
        <ProjectLink project={project} />
      </div>
      <ProjectDiagram kind={project.diagram} />
    </article>
  );
}

function RealtimeProject({ project }: { project: Project }) {
  return (
    <article className="project-feature project-feature-realtime" data-reveal>
      <ProjectDiagram kind={project.diagram} />
      <div className="project-copy">
        <p className="project-kicker">Project {project.index} / {project.category}</p>
        <div className="project-copy-grid">
          <h3>{project.title}</h3>
          <div>
            <p className="project-description">{project.description}</p>
            <TechList technologies={project.technologies} />
            <ProjectLink project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content">
        <section className="hero site-shell" id="top" aria-labelledby="hero-title">
          <div className="hero-status">
            <span>{profile.location.toUpperCase()}</span>
            <i />
            <span>OPEN TO RELOCATE</span>
            <i />
            <span>AVAILABLE FOR SOFTWARE ROLES</span>
          </div>

          <div className="hero-main">
            <div>
              <p className="hero-name">{profile.name}</p>
              <h1 id="hero-title">{profile.role}</h1>
            </div>
            <div className="hero-intro">
              <p className="hero-statement">
                I build reliable software across backend systems and full-stack products.
              </p>
              <p className="hero-detail">
                C++, TypeScript, React, Node.js, SQL, and distributed systems, with a focus on
                clear design and measurable behavior.
              </p>
              <p className="hero-education">
                M.S. Information Technology, Arizona State University
              </p>
              <nav className="hero-actions" aria-label="Primary links">
                <a className="primary-link" href="#work">View selected work <span>↓</span></a>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Résumé ↗</a>
              </nav>
            </div>
          </div>

          <div className="hero-signal" aria-hidden="true">
            <span>PRODUCT</span><i><b /></i><span>API</span><i><b /></i><span>DATA</span><i><b /></i><span>INFRA</span>
          </div>
        </section>

        <section className="work site-shell" id="work" data-nav-section aria-labelledby="work-title">
          <SectionHeading
            eyebrow="Selected work"
            title="Systems, explained clearly."
            description="A few projects where the interesting part was not just making it work, but deciding how it should work."
            id="work-title"
          />
          <div className="projects-stack">
            <PrimaryProject project={projects[0]} />
            <RealtimeProject project={projects[1]} />

            <article className="professional-project" data-reveal>
              <div>
                <p className="project-kicker">Project {professionalWork.index} / {professionalWork.category}</p>
                <h3>{professionalWork.title}</h3>
              </div>
              <div>
                <p className="project-description">{professionalWork.description}</p>
                <TechList technologies={professionalWork.technologies} />
              </div>
              <dl className="project-metrics">
                {professionalWork.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.value}</dt><dd>{metric.label}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </div>
        </section>

        <section className="experience site-shell" id="experience" data-nav-section aria-labelledby="experience-title">
          <SectionHeading
            eyebrow="Experience"
            title="Product work, data work, and delivery."
            id="experience-title"
          />
          <ol className="experience-list">
            {experience.map((item) => (
              <li className="experience-item" key={item.company} data-reveal>
                <div className="experience-index">{item.index}</div>
                <div className="experience-title">
                  <p>{item.company}</p>
                  <h3>{item.role}</h3>
                  <span>{item.period} · {item.location}</span>
                </div>
                <div className="experience-body">
                  <p>{item.summary}</p>
                  <p className="experience-stack">{item.stack}</p>
                  <details>
                    <summary>Role details</summary>
                    <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  </details>
                </div>
                <dl className="impact-list">
                  {item.impact.map((metric) => (
                    <div key={metric.label}>
                      <dt><span className="count-up" data-count-value={metric.value}>{metric.value}</span></dt>
                      <dd>{metric.label}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ol>
        </section>

        <section className="about site-shell" id="about" data-nav-section aria-labelledby="about-title">
          <SectionHeading eyebrow="About" title="Backend depth. Full-stack range." id="about-title" />
          <div className="about-layout">
            <div className="about-copy" data-reveal>
              <p>
                I like working on problems where product decisions and systems decisions meet.
                That has taken me from React interfaces and APIs to database design, real-time
                communication, concurrency, and distributed systems.
              </p>
              <p>
                I continue to study backend engineering and system design, and I care about
                making tradeoffs visible in the code and in the product.
              </p>
              <p className="algorithm-note">
                <strong>1,000+</strong> algorithmic problems solved across LeetCode, Codeforces,
                CodeChef, and GeeksforGeeks.
              </p>
            </div>

            <section className="education-block" aria-labelledby="education-title" data-reveal>
              <p className="detail-label" id="education-title">Education</p>
              {education.map((item) => (
                <article key={item.school}>
                  <h3>{item.school}</h3>
                  <p>{item.degree}</p>
                  <span>{item.period} · {item.location}</span>
                </article>
              ))}
            </section>
          </div>

          <section className="skills-block" aria-labelledby="skills-title" data-reveal>
            <p className="detail-label" id="skills-title">Skills</p>
            <dl>
              {toolGroups.map((group) => (
                <div key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>{group.skills.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </section>
        </section>

        <section className="contact" id="contact" data-nav-section aria-labelledby="contact-title">
          <div className="contact-inner site-shell">
            <p className="eyebrow">Contact</p>
            <div className="contact-heading" data-reveal>
              <h2 id="contact-title">Let&apos;s build something useful.</h2>
              <p>Available for Software Engineer roles in the United States. Based in Tempe and open to relocation.</p>
            </div>
            <div className="contact-links" data-reveal>
              <div className="contact-email">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <button className="copy-email" type="button" data-copy-email={profile.email} aria-label={`Copy ${profile.email}`}>
                  <span>Copy email</span><i aria-hidden="true">⧉</i>
                </button>
              </div>
              <nav aria-label="Contact links">
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Résumé ↗</a>
              </nav>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
