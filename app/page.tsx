import CopyEmail from "./CopyEmail";
import CountUp from "./CountUp";
import CustomCursor from "./CustomCursor";
import ProjectDiagram from "./ProjectDiagram";
import ScrollMotion from "./ScrollMotion";
import ThemeToggle from "./ThemeToggle";
import { experience, profile, projects, toolGroups, type Project } from "./portfolio-data";

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      <a href="#work" data-nav-link>{mobile && <span>01</span>}Projects</a>
      <a href="#focus" data-nav-link>{mobile && <span>02</span>}What I do</a>
      <a href="#experience" data-nav-link>{mobile && <span>03</span>}Experience</a>
      <a href="#about" data-nav-link>{mobile && <span>04</span>}About</a>
    </>
  );
}

function SectionIntro({
  label,
  title,
  description,
  headingId,
}: {
  label: string;
  title: string;
  description?: string;
  headingId: string;
}) {
  return (
    <header className="section-intro" data-reveal>
      <p className="section-label"><i />{label}</p>
      <div className="section-intro-copy">
        <h2 id={headingId}>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </header>
  );
}

function HeroSystem() {
  return (
    <div className="hero-system" aria-label="Software stack from interface to persistent data" role="img" data-reveal>
      <div className="system-chrome" aria-hidden="true">
        <span><i /><i /><i /></span>
        <code>harsh.profile / stack</code>
        <b>online</b>
      </div>
      <div className="system-map" aria-hidden="true">
        <div className="system-rail"><i /><i /><i /><i /></div>
        <div className="system-layer">
          <span>01 / INTERFACE</span>
          <strong>React product surface</strong>
          <small>clear behavior, useful feedback</small>
        </div>
        <div className="system-layer">
          <span>02 / APPLICATION</span>
          <strong>Node.js API boundary</strong>
          <small>typed contracts, observable flows</small>
        </div>
        <div className="system-layer is-accent">
          <span>03 / SYSTEM</span>
          <strong>Concurrent service core</strong>
          <small>reliable paths, explicit failure modes</small>
        </div>
        <div className="system-layer">
          <span>04 / DATA</span>
          <strong>PostgreSQL + Redis</strong>
          <small>durable state, fast coordination</small>
        </div>
      </div>
      <div className="system-terminal" aria-hidden="true">
        <p><span>$</span> profile --boot harsh</p>
        <p>location ........ Tempe, Arizona</p>
        <p>focus ........... backend + full-stack</p>
        <p className="terminal-ready">ready ........... true<i /></p>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" data-reveal>
      <ProjectDiagram kind={project.diagram} />
      <div className="project-card-copy">
        <p className="project-index">{project.index}</p>
        <div>
          <h3>{project.title}</h3>
          <p>{project.category}</p>
        </div>
        <span className="project-state"><i />Architecture</span>
      </div>
    </article>
  );
}

const focusAreas = [
  {
    number: "01",
    title: "Product engineering",
    description: "Full-stack applications shaped from the interface through the API, data model, and production behavior.",
  },
  {
    number: "02",
    title: "Systems and infrastructure",
    description: "Concurrent services, real-time communication, caching, persistence, and failure paths designed as one system.",
  },
  {
    number: "03",
    title: "Cloud and delivery",
    description: "Docker, AWS, Kubernetes, and CI/CD workflows that make software repeatable to build, test, and ship.",
  },
] as const;

export default function Home() {
  return (
    <main id="top">
      <ScrollMotion />
      <CustomCursor />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header" data-site-header>
        <div className="site-header-inner section-shell">
          <a className="wordmark" href="#top" aria-label="Harsh Dobariya, home">harsh<span>.</span>dobariya</a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <NavigationLinks />
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <a className="header-resume" href="/Harsh_Dobariya_Resume.pdf" target="_blank">Résumé</a>
            <a className="header-contact" href="#contact">Get in touch</a>
            <details className="mobile-nav" data-mobile-nav>
              <summary>Menu</summary>
              <div className="mobile-menu-panel">
                <nav aria-label="Mobile navigation">
                  <NavigationLinks mobile />
                  <a href="/Harsh_Dobariya_Resume.pdf" target="_blank"><span>05</span>Résumé</a>
                  <a href="#contact"><span>06</span>Contact</a>
                </nav>
                <p>{profile.location}<br />Open to relocate for the right opportunity</p>
              </div>
            </details>
          </div>
        </div>
      </header>

      <div id="main-content">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="availability" data-reveal><i />Open to Software Engineer roles</p>
            <h1 id="hero-title" data-reveal>
              I build reliable software from <em>interface to infrastructure.</em>
            </h1>
            <p className="hero-summary" data-reveal>
              Full-stack products and backend systems built with clear boundaries,
              dependable data flows, and the discipline to hold up in production.
            </p>
            <div className="hero-actions" data-reveal>
              <a className="button button-primary" href="#work">See the work</a>
              <a className="button button-quiet" href="/Harsh_Dobariya_Resume.pdf" target="_blank">Résumé</a>
            </div>
            <dl className="hero-meta" data-reveal>
              <div><dt>Based in</dt><dd>{profile.location}</dd></div>
              <div><dt>Availability</dt><dd>Open to relocate</dd></div>
            </dl>
          </div>
          <HeroSystem />
        </section>

        <section className="work section-shell" id="work" data-nav-section aria-labelledby="work-title">
          <SectionIntro
            label="Selected work"
            title="Systems built end to end."
            headingId="work-title"
            description="Two projects that show how I think about concurrency, real-time behavior, storage, and the boundaries between them."
          />
          <div className="project-grid">
            <ProjectCard project={projects[0]} />
            <ProjectCard project={projects[1]} />
          </div>
        </section>

        <section className="focus section-shell" id="focus" data-nav-section aria-labelledby="focus-title">
          <SectionIntro
            label="What I do"
            title="One engineer, across the stack."
            headingId="focus-title"
          />
          <ol className="focus-list">
            {focusAreas.map((item) => (
              <li key={item.number} data-reveal>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="experience section-shell" id="experience" data-nav-section aria-labelledby="experience-title">
          <SectionIntro
            label="Experience"
            title="A path through product and platform work."
            headingId="experience-title"
          />
          <ol className="experience-list">
            {experience.map((item) => (
              <li className="experience-row" key={item.company} data-reveal>
                <div className="experience-meta">
                  <span>{item.period}</span>
                  <span>{item.location}</span>
                </div>
                <div className="experience-role">
                  <p>{item.company}</p>
                  <h3>{item.role}</h3>
                  <span>{item.stack}</span>
                </div>
                <div className="experience-outcome">
                  <p>{item.summary}</p>
                  <div className="impact-list">
                    {item.impact.map((metric) => (
                      <span key={metric.label}>
                        <strong><CountUp value={metric.value} /></strong>{metric.label}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about section-shell" id="about" data-nav-section aria-labelledby="about-title">
          <SectionIntro
            label="About"
            title="I want to understand the whole system."
            headingId="about-title"
          />
          <div className="about-grid">
            <div className="about-story" data-reveal>
              <p>
                I work from the interface through the API, database, and infrastructure.
                My focus is reliable software that stays understandable and easy to change.
              </p>
              <p>
                I have solved 1,000+ algorithm and data structure problems across LeetCode,
                Codeforces, CodeChef, and GeeksforGeeks.
              </p>
              <ol className="principle-list" aria-label="How I work">
                <li><span>01</span>Understand the whole system.</li>
                <li><span>02</span>Keep boundaries clear.</li>
                <li><span>03</span>Design for failure paths.</li>
                <li><span>04</span>Leave code easier to change.</li>
              </ol>
            </div>

            <div className="about-details">
              <section className="education-panel" aria-labelledby="education-title" data-reveal>
                <p className="detail-label" id="education-title">Education</p>
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
                <p className="detail-label" id="skills-title">Tools I use</p>
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
          </div>
        </section>

        <section className="contact" id="contact" data-nav-section aria-labelledby="contact-title">
          <div className="contact-inner section-shell">
            <p className="section-label"><i />Contact</p>
            <div className="contact-copy" data-reveal>
              <h2 id="contact-title">Have something worth building?</h2>
              <p>I&apos;m available for Software Engineer roles and open to relocating for the right opportunity.</p>
            </div>
            <div className="contact-actions" data-reveal>
              <div className="contact-email">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <CopyEmail email={profile.email} />
              </div>
              <nav aria-label="Social links">
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Résumé</a>
              </nav>
            </div>
          </div>
        </section>
      </div>

      <footer className="site-footer section-shell">
        <a className="footer-mark" href="#top">harsh<span>.</span>dobariya</a>
        <p>Software Engineer<br />{profile.location}</p>
        <p>© {new Date().getFullYear()} Harsh Dobariya</p>
        <a href="#top">Back to top</a>
      </footer>
    </main>
  );
}
