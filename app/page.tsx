import CollaborativeDemo from "./CollaborativeDemo";
import CountUp from "./CountUp";
import KVStoreDemo from "./KVStoreDemo";
import ScrollMotion from "./ScrollMotion";
import SystemShowcase from "./SystemShowcase";
import { education, experience, profile, toolGroups } from "./portfolio-data";

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      <a href="#work" data-nav-link>Work</a>
      <a href="#experience" data-nav-link>Experience</a>
      <a href="#about" data-nav-link>About</a>
      <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Resume</a>
      <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
      {mobile && <a className="mobile-contact-link" href="#contact">Contact</a>}
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
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

export default function Home() {
  return (
    <main id="top">
      <ScrollMotion />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header" data-site-header>
        <div className="site-header-inner section-shell">
          <a className="wordmark" href="#top" aria-label="Harsh Dobariya, home">Harsh Dobariya</a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <NavigationLinks />
          </nav>
          <a className="nav-contact" href="#contact">Contact</a>
          <details className="mobile-nav" data-mobile-nav>
            <summary>Menu</summary>
            <div className="mobile-menu-panel">
              <nav aria-label="Mobile navigation"><NavigationLinks mobile /></nav>
              <p>{profile.location}<br />Open to relocate for the right opportunity</p>
            </div>
          </details>
        </div>
      </header>

      <div id="main-content">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-name" data-reveal>Harsh Dobariya <span>Software Engineer</span></p>
            <h1 id="hero-title" data-reveal>
              I build systems that stay fast when things get <em>messy.</em>
            </h1>
            <p className="hero-summary" data-reveal>
              Backend infrastructure, distributed systems, and product engineering.
              From APIs and databases to real-time applications.
            </p>
            <div className="hero-actions" data-reveal>
              <a className="button button-primary" href="#work">View my work</a>
              <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
              <a className="text-link" href="/Harsh_Dobariya_Resume.pdf" target="_blank">Resume</a>
            </div>
            <p className="hero-context" data-reveal>
              <i />
              <span>Based in Tempe, Arizona</span>
              <b>·</b>
              <span>Open to Software Engineer roles</span>
              <b>·</b>
              <span>Open to relocate</span>
            </p>
          </div>
        </section>

        <SystemShowcase />

        <section className="project-story section-shell" aria-labelledby="kv-title">
          <div className="story-copy" data-reveal>
            <p className="eyebrow">Distributed Key-Value Store</p>
            <h2 id="kv-title">What happens after <code>PUT(key, value)</code>?</h2>
            <p>
              Five nodes, TCP connections, and concurrent clients. Requests are routed by key while TTL expiry,
              LRU eviction, and append-only persistence keep the system predictable under load.
            </p>
            <ul className="inline-specs" aria-label="Distributed key-value store technologies">
              <li>C++</li><li>TCP/IP</li><li>Multithreading</li><li>CMake</li>
            </ul>
          </div>
          <div data-reveal><KVStoreDemo /></div>
        </section>

        <section className="project-story collaborative-story section-shell" aria-labelledby="collab-title">
          <div className="story-copy" data-reveal>
            <p className="eyebrow">Real-Time Collaborative Workspace</p>
            <h2 id="collab-title">Realtime without refreshes.</h2>
            <p>
              WebSockets move low-latency updates, Redis Pub/Sub carries events between Node.js instances,
              and PostgreSQL keeps durable workspace history.
            </p>
            <ul className="inline-specs" aria-label="Collaborative workspace technologies">
              <li>TypeScript</li><li>React</li><li>Node.js</li><li>Redis</li><li>PostgreSQL</li>
            </ul>
          </div>
          <div data-reveal><CollaborativeDemo /></div>
        </section>

        <section className="more-work section-shell" aria-labelledby="more-work-title">
          <div className="more-work-heading" data-reveal>
            <p className="eyebrow">More work</p>
            <h2 id="more-work-title">Smaller explorations, same standard.</h2>
          </div>
          <div className="more-work-list">
            <article data-reveal>
              <span>04</span>
              <div><h3>AI Resume Analyzer</h3><p>Document structure, role signals, and a focused review workflow.</p></div>
              <small>AI tooling</small>
            </article>
            <article data-reveal>
              <span>05</span>
              <div><h3>Competitive Programming</h3><p>Algorithm practice across graphs, dynamic programming, data structures, and optimization.</p></div>
              <small>C++</small>
            </article>
          </div>
        </section>

        <section className="experience section-shell" id="experience" data-nav-section aria-labelledby="experience-title">
          <SectionHeading
            eyebrow="Experience"
            title="Software that had to work outside a demo."
            description="Product delivery, legacy modernization, internal tooling, and the engineering details that kept each system moving."
            id="experience-title"
          />
          <ol className="experience-list">
            {experience.map((item) => (
              <li className="experience-row" key={`${item.company}-${item.period}`} data-reveal>
                <div className="experience-period"><time>{item.period}</time><span>{item.location}</span></div>
                <div className="experience-role"><h3>{item.company}</h3><p>{item.role}</p></div>
                <div className="experience-impact">
                  <p>{item.summary}</p>
                  {item.metrics.length > 0 && (
                    <div className="metric-strip">
                      {item.metrics.map((metric) => (
                        <div key={metric.label}>
                          <strong><CountUp value={metric.value} /></strong>
                          <span>{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about section-shell" id="about" data-nav-section aria-labelledby="about-title">
          <SectionHeading eyebrow="About" title="Depth in the system. Care at the surface." id="about-title" />
          <div className="about-layout">
            <div className="about-copy" data-reveal>
              <p>
                I enjoy understanding how software behaves beneath the abstraction: databases, networks,
                concurrency, and distributed systems, while still caring deeply about what the end user experiences.
              </p>
              <p>
                I completed my Master&apos;s in Information Technology at Arizona State University and continue
                building systems that help me understand software at a deeper level.
              </p>
              <div className="interest-list" aria-label="Engineering interests">
                <span>Distributed systems</span><span>System design</span><span>AI tooling</span><span>Product engineering</span>
              </div>
            </div>

            <div className="about-details">
              <section className="detail-block" aria-labelledby="education-title" data-reveal>
                <h3 id="education-title">Education</h3>
                {education.map((item) => (
                  <article key={item.school}>
                    <div><strong>{item.school}</strong><span>{item.degree}</span></div>
                    <p>{item.period}<br />{item.location}</p>
                  </article>
                ))}
              </section>
              <section className="detail-block tools-block" aria-labelledby="tools-title" data-reveal>
                <h3 id="tools-title">Tools I reach for</h3>
                <dl>
                  {toolGroups.map((group) => (
                    <div key={group.label}>
                      <dt>{group.label}</dt>
                      <dd>{group.tools.join(" · ")}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </section>

        <section className="contact" id="contact" data-nav-section aria-labelledby="contact-title">
          <div className="contact-inner section-shell" data-reveal>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Let&apos;s build something useful.</h2>
            <p>I&apos;m currently open to software engineering opportunities.</p>
            <nav aria-label="Contact links">
              <a className="button button-primary" href={`mailto:${profile.email}`}>Email me</a>
              <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
              <a className="text-link" href="/Harsh_Dobariya_Resume.pdf" target="_blank">Resume</a>
            </nav>
          </div>
        </section>
      </div>

      <footer className="site-footer section-shell">
        <div><strong>Harsh Dobariya</strong><span>Software Engineer</span></div>
        <nav aria-label="Footer links">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </nav>
        <p>© {new Date().getFullYear()} Harsh Dobariya</p>
      </footer>
    </main>
  );
}
