import ScrollMotion from "./ScrollMotion";
import { experience, profile, projects, toolGroups } from "./portfolio-data";

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

function SectionIntro({
  number,
  title,
  note,
}: {
  number: string;
  title: string;
  note?: string;
}) {
  return (
    <header className="section-intro" data-reveal>
      <p className="section-index">{number}</p>
      <h2>{title}</h2>
      {note && <p className="section-note">{note}</p>}
    </header>
  );
}

export default function Home() {
  return (
    <main id="top">
      <ScrollMotion />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header" data-site-header>
        <a className="wordmark" href="#top" aria-label="Harsh Dobariya, home">
          HD<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <NavigationLinks />
        </nav>
        <a className="header-resume" href="/Harsh_Dobariya_Resume.pdf" target="_blank">
          Resume <Arrow />
        </a>
        <details className="mobile-nav" data-mobile-nav>
          <summary>Menu</summary>
          <div className="mobile-menu-panel">
            <nav aria-label="Mobile navigation">
              <NavigationLinks mobile />
              <a href="/Harsh_Dobariya_Resume.pdf" target="_blank"><span>05</span>Resume <Arrow /></a>
            </nav>
            <p>{profile.location}<br />Open to relocate</p>
          </div>
        </details>
      </header>

      <div id="main-content">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-topline" data-reveal>
            <p>Software Engineer</p>
            <p>Tempe, Arizona</p>
          </div>
          <h1 id="hero-title" data-reveal>
            <span>Harsh</span>
            <em>Dobariya</em>
          </h1>
          <div className="hero-bottom" data-reveal>
            <p className="hero-statement">
              I build dependable software across products, APIs, real-time systems,
              and distributed infrastructure.
            </p>
            <div className="hero-status">
              <p><i /> Available for Software Engineer roles</p>
              <p>Open to relocate for the right opportunity</p>
            </div>
            <div className="hero-links">
              <a href="#work">Selected work <span aria-hidden="true">↓</span></a>
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
              <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Resume <Arrow /></a>
            </div>
          </div>
        </section>

        <section className="work section-shell" id="work" data-nav-section aria-labelledby="work-title">
          <SectionIntro number="01" title="Selected work" note="Two projects, built end to end." />
          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-row" key={project.slug} data-reveal>
                <p className="project-index">0{index + 1}</p>
                <div className="project-name">
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                </div>
                <p className="project-one-line">
                  {project.diagram === "kv"
                    ? "A concurrent in-memory database with bounded execution, persistence, and crash recovery."
                    : "A multi-user workspace with live presence, autosave, version history, and synchronized events."}
                </p>
                <div className="project-meta">
                  <p>{project.stack.join(" / ")}</p>
                  <a href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}>
                    View <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience section-shell" id="experience" data-nav-section aria-labelledby="experience-title">
          <SectionIntro number="02" title="Experience" />
          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-row" key={item.company} data-reveal>
                <p className="experience-index">{item.index}</p>
                <div className="experience-title">
                  <h3>{item.company}</h3>
                  <p>{item.role}</p>
                </div>
                <div className="experience-copy">
                  <div className="experience-meta">
                    <span>{item.period}</span>
                    <span>{item.location}</span>
                  </div>
                  <p>{item.summary}</p>
                </div>
                <div className="metrics">
                  {item.impact.map((metric) => (
                    <div className="metric" key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about section-shell" id="about" data-nav-section aria-labelledby="about-title">
          <SectionIntro number="03" title="About" />
          <div className="about-grid">
            <div className="about-statement" data-reveal>
              <h2 id="about-title">
                I like understanding the <em>whole</em> system.
              </h2>
              <p>
                I work from the interface through the API, database, and infrastructure.
                My focus is simple: reliable software that stays easy to change.
              </p>
              <p className="achievement">
                Solved 1,000+ algorithm and data structure problems across LeetCode,
                Codeforces, CodeChef, and GeeksforGeeks.
              </p>
            </div>

            <div className="about-details" data-reveal>
              <section className="education-block" aria-labelledby="education-title">
                <h3 id="education-title">Education</h3>
                <article>
                  <div><strong>Arizona State University</strong><span>M.S. Information Technology</span></div>
                  <time>2024 – 2025</time>
                </article>
                <article>
                  <div><strong>Gujarat Technological University</strong><span>B.E. Information Technology</span></div>
                  <time>2019 – 2023</time>
                </article>
              </section>

              <section className="skills-block" aria-labelledby="skills-title">
                <h3 id="skills-title">Skills</h3>
                <dl>
                  {toolGroups.map((group) => (
                    <div key={group.label}><dt>{group.label}</dt><dd>{group.value}</dd></div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </section>

        <section className="contact" id="contact" data-nav-section aria-labelledby="contact-title">
          <div className="contact-inner section-shell">
            <p className="contact-index">04 / Contact</p>
            <h2 id="contact-title" data-reveal>
              Let&apos;s make<br /><em>something useful.</em>
            </h2>
            <div className="contact-bottom" data-reveal>
              <a className="contact-email" href={`mailto:${profile.email}`}>
                {profile.email} <Arrow />
              </a>
              <div className="contact-links">
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
                <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Resume <Arrow /></a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="site-footer section-shell">
        <div><strong>Harsh Dobariya</strong><span>Software Engineer</span></div>
        <p>Tempe, Arizona</p>
        <div><span>© {new Date().getFullYear()}</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
