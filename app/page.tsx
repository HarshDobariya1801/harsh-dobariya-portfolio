import CopyEmail from "./CopyEmail";
import CountUp from "./CountUp";
import ProjectDiagram from "./ProjectDiagram";
import ScrollMotion from "./ScrollMotion";
import ThemeToggle from "./ThemeToggle";
import { experience, profile, projects, toolGroups, type Project } from "./portfolio-data";

function Arrow() {
  return <span className="link-arrow" aria-hidden="true">↗</span>;
}

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      <a href="#work" data-nav-link>{mobile && <span>01</span>}Work</a>
      <a href="#experience" data-nav-link>{mobile && <span>02</span>}Experience</a>
      <a href="#about" data-nav-link>{mobile && <span>03</span>}About</a>
      <a href="#contact" data-nav-link>{mobile && <span>04</span>}Contact</a>
    </>
  );
}

function SectionHeading({
  number,
  title,
  description,
  headingId,
}: {
  number: string;
  title: string;
  description: string;
  headingId?: string;
}) {
  return (
    <header className="section-heading" data-reveal>
      <p className="eyebrow">{number} / {title}</p>
      <h2 id={headingId}>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
      <a href={`/work/${project.slug}`}>Case study <Arrow /></a>
      {project.repositoryUrl ? (
        <a href={project.repositoryUrl} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
      ) : (
        <span className="link-placeholder"><b>GitHub</b><small>URL needed</small></span>
      )}
      {project.demoUrl ? (
        <a href={project.demoUrl} target="_blank" rel="noreferrer">Live demo <Arrow /></a>
      ) : project.diagram === "realtime" ? (
        <span className="link-placeholder"><b>Live demo</b><small>URL needed</small></span>
      ) : null}
    </div>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card${featured ? " project-card-featured" : ""}`} data-reveal>
      <div className="project-card-copy">
        <p className="eyebrow">{project.index} / {featured ? "Featured system" : project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-outcome">{project.outcome}</p>
        <ul className="tech-list" aria-label="Technologies used">
          {project.stack.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <ProjectLinks project={project} />
      </div>
      <ProjectDiagram kind={project.diagram} />
    </article>
  );
}

export default function Home() {
  return (
    <main id="top">
      <ScrollMotion />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header" data-site-header>
        <div className="site-header-inner section-shell">
          <a className="wordmark" href="#top" aria-label="Harsh Dobariya, home">HD<span>/</span></a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <NavigationLinks />
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <a className="header-resume" href="/Harsh_Dobariya_Resume.pdf" target="_blank">Resume</a>
            <details className="mobile-nav" data-mobile-nav>
              <summary>Menu</summary>
              <div className="mobile-menu-panel">
                <nav aria-label="Mobile navigation">
                  <NavigationLinks mobile />
                  <a href="/Harsh_Dobariya_Resume.pdf" target="_blank"><span>05</span>Resume</a>
                </nav>
                <p>{profile.location}<br />Open to relocate</p>
              </div>
            </details>
          </div>
        </div>
      </header>

      <div id="main-content">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-kicker" data-reveal>
            <p>Software Engineer</p>
            <span>Backend · Full-stack · Distributed systems</span>
          </div>
          <div className="hero-name-wrap">
            <h1 id="hero-title" data-reveal>
              <span>Harsh</span>
              <span>Dobariya</span>
            </h1>
            <span className="hero-index" aria-hidden="true">01</span>
          </div>
          <div className="hero-grid" data-reveal>
            <p className="hero-positioning">
              Backend systems. Full-stack products. <em>Software built to hold up.</em>
            </p>
            <div className="hero-availability">
              <p><i /> Available for Software Engineer roles</p>
              <span>{profile.location}</span>
              <span>Open to relocate for the right opportunity</span>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="/Harsh_Dobariya_Resume.pdf" target="_blank">View resume</a>
              <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
              <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
              <a className="text-link" href={`mailto:${profile.email}`}>Email <Arrow /></a>
            </div>
          </div>
          <div className="hero-signal" aria-hidden="true">
            <span>Interface</span><i /><span>API</span><i /><span>System</span><i /><span>Data</span><b />
          </div>
        </section>

        <section className="work section-shell" id="work" data-nav-section aria-labelledby="work-title">
          <SectionHeading
            number="01"
            title="Selected Work"
            headingId="work-title"
            description="Two end-to-end projects that show how I reason about product behavior, concurrency, data, and failure."
          />
          <div className="project-grid">
            <ProjectCard project={projects[0]} featured />
            <ProjectCard project={projects[1]} />
          </div>
        </section>

        <section className="experience section-shell" id="experience" data-nav-section aria-labelledby="experience-title">
          <SectionHeading
            number="02"
            title="Experience"
            headingId="experience-title"
            description="Product and platform work, summarized by the change it created."
          />
          <ol className="timeline">
            {experience.map((item) => (
              <li className="timeline-item" key={item.company} data-reveal>
                <div className="timeline-marker" aria-hidden="true"><i /></div>
                <div className="timeline-date">
                  <span>{item.period}</span>
                  <span>{item.location}</span>
                </div>
                <div className="timeline-role">
                  <p>{item.company}</p>
                  <h3>{item.role}</h3>
                  <p>{item.stack}</p>
                </div>
                <div className="timeline-summary">
                  <p>{item.summary}</p>
                  <div className="stat-grid">
                    {item.impact.map((metric) => (
                      <div className="stat" key={metric.label}>
                        <strong><CountUp value={metric.value} /></strong>
                        <span>{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about section-shell" id="about" data-nav-section aria-labelledby="about-title">
          <SectionHeading
            number="03"
            title="About"
            description="How I approach software, what I have studied, and the tools I use most."
          />
          <div className="about-layout">
            <div className="about-intro" data-reveal>
              <h2 id="about-title">
                I like understanding the <em>whole system</em>, not just the piece in front of me.
              </h2>
              <p>
                I work from the interface through the API, database, and infrastructure.
                My focus is reliable software that stays understandable and easy to change.
              </p>
              <p className="achievement">
                Solved 1,000+ algorithm and data structure problems across LeetCode,
                Codeforces, CodeChef, and GeeksforGeeks.
              </p>
            </div>

            <section className="principles" aria-labelledby="principles-title" data-reveal>
              <p className="eyebrow" id="principles-title">How I work</p>
              <ol>
                <li><span>01</span><strong>Understand the whole system.</strong></li>
                <li><span>02</span><strong>Keep boundaries clear.</strong></li>
                <li><span>03</span><strong>Design for failure paths.</strong></li>
                <li><span>04</span><strong>Leave code easier to change.</strong></li>
              </ol>
            </section>

            <section className="education-panel" aria-labelledby="education-title" data-reveal>
              <p className="eyebrow" id="education-title">Education</p>
              <article>
                <div><h3>Arizona State University</h3><p>M.S. Information Technology</p></div>
                <time>2024 – 2025</time>
              </article>
              <article>
                <div><h3>Gujarat Technological University</h3><p>B.E. Information Technology</p></div>
                <time>2019 – 2023</time>
              </article>
            </section>

            <section className="skills-panel" aria-labelledby="skills-title" data-reveal>
              <p className="eyebrow" id="skills-title">Skills</p>
              <dl>
                {toolGroups.map((group) => (
                  <div key={group.label}>
                    <dt>{group.label}</dt>
                    <dd>
                      {group.skills.map((skill) => (
                        skill.strong
                          ? <strong key={skill.name}>{skill.name}</strong>
                          : <span key={skill.name}>{skill.name}</span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </section>

        <section className="contact" id="contact" data-nav-section aria-labelledby="contact-title">
          <div className="contact-inner section-shell">
            <p className="eyebrow">04 / Contact</p>
            <h2 id="contact-title" data-reveal>Have a useful problem?<br /><em>Let&apos;s talk.</em></h2>
            <div className="contact-grid" data-reveal>
              <div>
                <p>I&apos;m available for Software Engineer roles and open to relocating for the right opportunity.</p>
              </div>
              <div className="email-actions">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <CopyEmail email={profile.email} />
              </div>
              <nav className="contact-links" aria-label="Social links">
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
                <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Resume <Arrow /></a>
              </nav>
            </div>
          </div>
        </section>
      </div>

      <footer className="site-footer section-shell">
        <div><strong>Harsh Dobariya</strong><span>Software Engineer · Tempe, Arizona</span></div>
        <p>© {new Date().getFullYear()}</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
