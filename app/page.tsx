import CopyEmail from "./CopyEmail";
import CountUp from "./CountUp";
import HeroSculptureVisual from "./HeroSculptureVisual";
import LazyProjectDemo from "./LazyProjectDemo";
import ScrollMotion from "./ScrollMotion";
import { education, experience, profile, toolGroups } from "./portfolio-data";
import ActionLink from "./ui/ActionLink";

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

const journeyScenes = [
  { number: "01", label: "Intro", href: "#intro" },
  { number: "02", label: "Engineering", href: "#engineering" },
  { number: "03", label: "Experience", href: "#experience" },
  { number: "04", label: "Key-value store", href: "#work" },
  { number: "05", label: "Collaboration", href: "#collab-work" },
  { number: "06", label: "About", href: "#about" },
  { number: "07", label: "Contact", href: "#contact" },
] as const;

function JourneyNavigation() {
  return (
    <nav className="journey-nav" aria-label="Portfolio journey">
      <ol>
        {journeyScenes.map((scene, index) => (
          <li key={scene.href}>
            <a href={scene.href} data-journey-link aria-current={index === 0 ? "step" : undefined}>
              <span>{scene.number}</span>
              <b>{scene.label}</b>
            </a>
          </li>
        ))}
      </ol>
      <i aria-hidden="true"><span data-journey-progress /></i>
    </nav>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  id,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
  id: string;
}) {
  return (
    <header className="section-heading" data-reveal>
      <p className="eyebrow"><span>{number}</span>{eyebrow}</p>
      <div>
        <h2 id={id}>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </header>
  );
}

function EngineeringDiagram() {
  return (
    <div
      className="engineering-diagram"
      role="img"
      aria-label="Client requests move through an API and service before reaching Redis and PostgreSQL"
      data-reveal
    >
      <div className="engineering-node node-client"><span>01</span><strong>Client</strong><small>intent</small></div>
      <i className="engineering-link link-down" aria-hidden="true"><b /></i>
      <div className="engineering-node node-api"><span>02</span><strong>API</strong><small>contract</small></div>
      <i className="engineering-link link-down" aria-hidden="true"><b /></i>
      <div className="engineering-node node-service"><span>03</span><strong>Service</strong><small>ownership</small></div>
      <div className="engineering-branch" aria-hidden="true"><i /><i /></div>
      <div className="engineering-destinations">
        <div className="engineering-node"><span>04A</span><strong>Redis</strong><small>speed</small></div>
        <div className="engineering-node"><span>04B</span><strong>PostgreSQL</strong><small>durability</small></div>
      </div>
    </div>
  );
}

const capabilities = [
  {
    number: "01",
    title: "Product engineering",
    description: "Interfaces, APIs, and data models designed as one product instead of separate layers.",
  },
  {
    number: "02",
    title: "Systems and infrastructure",
    description: "Concurrent services, real-time communication, caching, persistence, and failure paths.",
  },
  {
    number: "03",
    title: "Cloud and delivery",
    description: "Docker, AWS, Kubernetes, and CI/CD workflows that make releases repeatable.",
  },
] as const;

const principles = [
  "Start with the problem.",
  "Make tradeoffs explicit.",
  "Design for failure.",
  "Leave the next change easy.",
] as const;

export default function Home() {
  return (
    <main id="top">
      <ScrollMotion />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header" data-site-header>
        <div className="site-header-inner section-shell">
          <a className="wordmark" href="#top" aria-label="Harsh Dobariya, home">harsh.dobariya</a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <NavigationLinks />
          </nav>
          <ActionLink className="nav-contact" href="#contact" variant="outline">Contact</ActionLink>
          <details className="mobile-nav" data-mobile-nav>
            <summary>Menu</summary>
            <div className="mobile-menu-panel">
              <nav aria-label="Mobile navigation"><NavigationLinks mobile /></nav>
              <p>{profile.location}<br />Open to relocate for the right opportunity</p>
            </div>
          </details>
        </div>
      </header>

      <JourneyNavigation />

      <div id="main-content" className="journey" data-journey>
        <section
          className="journey-card scene-intro hero"
          id="intro"
          data-journey-card
          data-journey-label="Intro"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="scene-kicker" data-reveal><span>01</span>Software Engineer</p>
            <h1 id="hero-title" data-reveal>Harsh <em>Dobariya</em></h1>
            <p className="hero-statement" data-reveal>
              I build reliable software from interface to infrastructure.
            </p>
            <p className="hero-summary" data-reveal>
              Backend and full-stack engineering with a systems mindset. Clear APIs,
              durable data flows, and interfaces built for real users.
            </p>
            <div className="hero-actions" data-reveal>
              <ActionLink href="#work" icon="arrow" variant="primary">View my work</ActionLink>
              <ActionLink href={profile.github} icon="external" target="_blank" rel="noreferrer">GitHub</ActionLink>
              <ActionLink href="/Harsh_Dobariya_Resume.pdf" icon="external" target="_blank">Resume</ActionLink>
            </div>
            <p className="hero-context" data-reveal>
              <i />
              <span>Seattle, Washington</span>
              <b>·</b>
              <span>Backend + Full Stack</span>
              <b>·</b>
              <span>Open to relocate</span>
            </p>
          </div>
          <div className="hero-visual">
            <HeroSculptureVisual />
          </div>
          <a className="scroll-cue" href="#engineering" aria-label="Scroll to engineering scene">
            <span>Scroll to explore</span><i aria-hidden="true" />
          </a>
        </section>

        <section
          className="journey-card scene-engineering capabilities"
          id="engineering"
          data-journey-card
          data-journey-label="Engineering"
          aria-labelledby="engineering-title"
        >
          <div className="engineering-copy">
            <p className="scene-kicker" data-reveal><span>02</span>What I build</p>
            <h2 id="engineering-title" data-reveal>
              I build systems that move data, coordinate users, and stay reliable under pressure.
            </h2>
            <div className="capability-list">
              {capabilities.map((item) => (
                <article key={item.number} data-reveal>
                  <span>{item.number}</span>
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                </article>
              ))}
            </div>
          </div>
          <EngineeringDiagram />
        </section>

        <section
          className="journey-card scene-experience experience"
          id="experience"
          data-nav-section
          data-journey-card
          data-journey-label="Experience"
          aria-labelledby="experience-title"
        >
          <SectionHeading
            number="03"
            eyebrow="Experience"
            title="Software that had to work outside a demo."
            description="Product delivery, legacy modernization, internal tooling, and the engineering details that kept each system moving."
            id="experience-title"
          />
          <ol className="experience-list">
            {experience.map((item, index) => (
              <li className="experience-row" key={`${item.company}-${item.period}`} data-reveal>
                <div className="experience-index">0{index + 1}</div>
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

        <section
          className="journey-card scene-project scene-project-warm"
          id="work"
          data-nav-section
          data-journey-card
          data-journey-label="Key-value store"
          aria-labelledby="kv-title"
        >
          <div className="project-case">
            <header className="project-overview" data-reveal>
              <p className="scene-kicker"><span>04</span>Selected work · 01 / 02</p>
              <p className="project-collection-title">Systems built end to end.</p>
              <div>
                <p className="eyebrow">C++ systems project</p>
                <h2 id="kv-title">Distributed Key-Value Store</h2>
              </div>
              <div className="project-summary">
                <p>
                  A concurrent in-memory store that accepts commands over TCP and keeps
                  expiration, eviction, and persistence behavior explicit.
                </p>
                <ul className="inline-specs" aria-label="Distributed key-value store technologies">
                  <li>C++</li><li>TCP/IP</li><li>Multithreading</li><li>CMake</li>
                </ul>
              </div>
            </header>
            <div className="project-visual" data-reveal><LazyProjectDemo kind="kv" /></div>
            <div className="project-notes" data-reveal>
              <article><span>What</span><p>GET, SET, and DEL commands move through a bounded concurrent execution path.</p></article>
              <article><span>How</span><p>A TCP listener hands work to a worker pool before the key-value engine owns state changes.</p></article>
              <article><span>Tradeoff</span><p>Memory-first access stays direct while TTL, LRU, and AOF make lifecycle decisions visible.</p></article>
              <article><span>Learning</span><p>Concurrency is easier to reason about when transport, execution, and state ownership stay separate.</p></article>
            </div>
          </div>
        </section>

        <section
          className="journey-card scene-project scene-project-cool"
          id="collab-work"
          data-journey-card
          data-journey-label="Collaboration"
          aria-labelledby="collab-title"
        >
          <div className="project-case">
            <header className="project-overview" data-reveal>
              <p className="scene-kicker"><span>05</span>Selected work · 02 / 02</p>
              <div>
                <p className="eyebrow">Real-time product system</p>
                <h2 id="collab-title">Real-Time Collaborative Workspace</h2>
              </div>
              <div className="project-summary">
                <p>
                  Changes move between connected clients over WebSockets. Redis Pub/Sub
                  shares events across Node.js instances while PostgreSQL keeps durable state.
                </p>
                <ul className="inline-specs" aria-label="Collaborative workspace technologies">
                  <li>WebSockets</li><li>Redis Pub/Sub</li><li>PostgreSQL</li><li>Optimistic UI</li>
                </ul>
              </div>
            </header>
            <div className="project-visual" data-reveal><LazyProjectDemo kind="collaborative" /></div>
            <div className="project-notes" data-reveal>
              <article><span>What</span><p>A shared workspace keeps active collaborators in sync without page refreshes.</p></article>
              <article><span>How</span><p>WebSocket sessions publish events through Redis so separate Node.js processes agree.</p></article>
              <article><span>Tradeoff</span><p>Fast optimistic updates improve flow while durable writes preserve recoverable workspace state.</p></article>
              <article><span>Learning</span><p>Realtime UX depends as much on clear event ownership as it does on transport speed.</p></article>
            </div>
          </div>
        </section>

        <section
          className="journey-card scene-about about"
          id="about"
          data-nav-section
          data-journey-card
          data-journey-label="About"
          aria-labelledby="about-title"
        >
          <SectionHeading number="06" eyebrow="About" title="Backend depth, full-stack perspective." id="about-title" />
          <div className="about-editorial">
            <div className="about-copy" data-reveal>
              <p>
                I am a software engineer based in Seattle, focused on backend and full-stack systems.
                I turn complex requirements into dependable products with clear APIs, maintainable code,
                and thoughtful data design.
              </p>
              <p>
                I care about the details that make software easier to operate and easier to change:
                explicit boundaries, visible tradeoffs, and useful interfaces.
              </p>
            </div>
            <ol className="principles" aria-label="How I work" data-reveal>
              {principles.map((principle, index) => (
                <li key={principle}><span>0{index + 1}</span><strong>{principle}</strong></li>
              ))}
            </ol>
          </div>

          <div className="profile-details">
            <section className="education-block" aria-labelledby="education-title" data-reveal>
              <h3 id="education-title">Education</h3>
              <div>
                {education.map((item) => (
                  <article key={item.school}>
                    <div><strong>{item.school}</strong><span>{item.degree}</span></div>
                    <p>{item.period}<br />{item.location}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="tools-block" aria-labelledby="tools-title" data-reveal>
              <h3 id="tools-title">Tools I use</h3>
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
        </section>

        <section
          className="journey-card scene-contact contact"
          id="contact"
          data-nav-section
          data-journey-card
          data-journey-label="Contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-inner" data-reveal>
            <p className="eyebrow"><span>07</span>What I can build next</p>
            <h2 id="contact-title">Have something worth building?</h2>
            <p>I&apos;m currently open to software engineering opportunities.</p>
            <div className="email-row">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <CopyEmail email={profile.email} />
            </div>
            <nav aria-label="Contact links">
              <ActionLink href={profile.linkedin} icon="external" target="_blank" rel="noreferrer">LinkedIn</ActionLink>
              <ActionLink href={profile.github} icon="external" target="_blank" rel="noreferrer">GitHub</ActionLink>
              <ActionLink href="/Harsh_Dobariya_Resume.pdf" icon="external" target="_blank">Resume</ActionLink>
            </nav>
          </div>
        </section>
      </div>

      <footer className="site-footer section-shell">
        <div><strong>harsh.dobariya</strong><span>Software Engineer</span></div>
        <p>Seattle, Washington</p>
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
