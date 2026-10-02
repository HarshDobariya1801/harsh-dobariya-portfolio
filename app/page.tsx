import ProjectDiagram from "./ProjectDiagram";
import ScrollMotion from "./ScrollMotion";
import { experience, profile, projects, toolGroups } from "./portfolio-data";

function Arrow() {
  return <span className="link-arrow" aria-hidden="true">↗</span>;
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <p>{children}</p>
    </div>
  );
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

export default function Home() {
  return (
    <main id="top">
      <ScrollMotion />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header" data-site-header>
        <a className="wordmark" href="#top" aria-label="Harsh Dobariya, home">
          Harsh Dobariya
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <NavigationLinks />
        </nav>
        <a className="header-resume" href="/Harsh_Dobariya_Resume.pdf" target="_blank">
          Résumé <Arrow />
        </a>
        <details className="mobile-nav" data-mobile-nav>
          <summary>Menu</summary>
          <div className="mobile-menu-panel">
            <nav aria-label="Mobile navigation">
              <NavigationLinks mobile />
              <a href="/Harsh_Dobariya_Resume.pdf" target="_blank"><span>05</span>Résumé <Arrow /></a>
            </nav>
            <p>{profile.location}<br />Open to relocate</p>
          </div>
        </details>
      </header>

      <div id="main-content">
        <section className="editorial-hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-identity" data-reveal>
              Harsh Dobariya <span>/</span> Software engineer
            </p>
            <h1 id="hero-title" data-reveal>
              Software that holds up, from interface to infrastructure.
            </h1>
            <p className="hero-summary" data-reveal>
              I work across full-stack products and backend systems, building
              real-time experiences, dependable APIs, and data paths designed for
              the moments when things go wrong.
            </p>
            <div className="hero-links" data-reveal>
              <a href="#work">View selected work <span aria-hidden="true">↓</span></a>
              <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Résumé <Arrow /></a>
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            </div>
          </div>

          <aside className="hero-aside" aria-label="Current status" data-reveal>
            <div className="system-trace" aria-hidden="true">
              {["Client", "API", "Process", "Data", "Response"].map((label, index) => (
                <div className="trace-step" key={label}>
                  <span className="trace-index">0{index + 1}</span>
                  <span className="trace-node" />
                  <span className="trace-label">{label}</span>
                </div>
              ))}
              <span className="trace-signal" />
            </div>
            <dl className="hero-meta">
              <div><dt>Based</dt><dd>{profile.location}</dd></div>
              <div><dt>Mobility</dt><dd>Open to relocate</dd></div>
              <div><dt>Status</dt><dd>Available for software roles</dd></div>
            </dl>
          </aside>
        </section>

        <section className="work section-shell" id="work" data-nav-section aria-labelledby="work-title">
          <header className="section-header" data-reveal>
            <SectionLabel number="01">Selected work</SectionLabel>
            <div>
              <h2 id="work-title">Systems with a product point of view.</h2>
              <p>
                Two projects that show how I think about concurrency, reliability,
                real-time behavior, and the interface people actually use.
              </p>
            </div>
          </header>

          <div className="project-list">
            {projects.map((project, index) => (
              <article className={`project-feature project-${project.diagram}`} key={project.slug} data-reveal>
                <header className="project-title-row">
                  <div className="project-number">{project.index}</div>
                  <div>
                    <p>{project.category}</p>
                    <h3>{project.title}</h3>
                  </div>
                </header>
                <div className="project-summary-row">
                  <p>{project.summary}</p>
                  <p className="project-stack">{project.stack.join(" · ")}</p>
                </div>
                <div className={`project-body ${index % 2 === 1 ? "project-body-reverse" : ""}`}>
                  <ProjectDiagram kind={project.diagram} />
                  <div className="project-engineering">
                    <p className="micro-label">Selected engineering</p>
                    <ol>
                      {project.engineering.map((item, itemIndex) => (
                        <li key={item}><span>0{itemIndex + 1}</span>{item}</li>
                      ))}
                    </ol>
                    <a className="text-link" href={`/work/${project.slug}`}>
                      Read case study <Arrow />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience section-shell" id="experience" data-nav-section aria-labelledby="experience-title">
          <header className="section-header" data-reveal>
            <SectionLabel number="02">Experience</SectionLabel>
            <div><h2 id="experience-title">Work measured by what changed.</h2></div>
          </header>

          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-item" key={item.company} data-reveal>
                <span className="experience-index">{item.index}</span>
                <div className="experience-company">
                  <h3>{item.company}</h3>
                  <p>{item.role}</p>
                </div>
                <div className="experience-detail">
                  <div className="experience-meta">
                    <span>{item.period}</span>
                    <span>{item.location}</span>
                  </div>
                  <p className="experience-summary">{item.summary}</p>
                  <div className="metrics">
                    {item.impact.map((metric) => (
                      <div className="metric" key={metric.label}>
                        <strong>{metric.value}</strong>
                        <span>{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about section-shell" id="about" data-nav-section aria-labelledby="about-title">
          <SectionLabel number="03">About</SectionLabel>
          <div className="about-main" data-reveal>
            <h2 id="about-title">The interface matters. So does the failure path.</h2>
            <div className="about-copy">
              <p>
                I like engineering problems that sit between product and systems
                work: shaping an interface people understand, defining the API
                behind it, and making sure the data stays correct when conditions
                are less than ideal.
              </p>
              <p>
                That has led me through full-stack delivery, data modeling,
                real-time applications, CI/CD, performance work, and distributed
                systems. I care about useful software and codebases that get easier,
                not harder, to change.
              </p>
            </div>
          </div>

          <div className="education-list" aria-label="Education" data-reveal>
            <p className="micro-label">Education</p>
            <article>
              <span>2024 – 2025</span>
              <div><h3>Arizona State University</h3><p>M.S. Information Technology · Tempe, Arizona</p></div>
            </article>
            <article>
              <span>2019 – 2023</span>
              <div><h3>Gujarat Technological University</h3><p>B.E. Information Technology · Gujarat, India</p></div>
            </article>
          </div>
        </section>

        <section className="tools section-shell" aria-labelledby="tools-title">
          <SectionLabel number="04">Tools I reach for</SectionLabel>
          <div className="tools-main" data-reveal>
            <h2 id="tools-title">A practical stack for complete products.</h2>
            <dl>
              {toolGroups.map((group) => (
                <div key={group.label}><dt>{group.label}</dt><dd>{group.value}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section className="contact" id="contact" data-nav-section aria-labelledby="contact-title">
          <div className="contact-inner section-shell">
            <SectionLabel number="05">Contact</SectionLabel>
            <div className="contact-main" data-reveal>
              <h2 id="contact-title">Have a useful problem?</h2>
              <p>
                I’m based in Tempe, open to relocate, and available for software
                engineering roles across product and systems work.
              </p>
              <a className="contact-email" href={`mailto:${profile.email}`}>
                {profile.email} <Arrow />
              </a>
              <div className="contact-links">
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
                <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Résumé <Arrow /></a>
                <a href={`tel:${profile.phone}`}>{profile.phoneLabel}</a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="site-footer section-shell">
        <div><strong>Harsh Dobariya</strong><span>Software engineer · Tempe, Arizona</span></div>
        <div className="footer-trace" aria-hidden="true"><i /><i /><i /><i /></div>
        <div><span>© {new Date().getFullYear()}</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
