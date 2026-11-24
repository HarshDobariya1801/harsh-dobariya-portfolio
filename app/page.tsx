import CopyEmail from "./CopyEmail";
import CountUp from "./CountUp";
import LazyProjectDemo from "./LazyProjectDemo";
import ScrollMotion from "./ScrollMotion";
import { education, experience, profile, projects, toolGroups } from "./portfolio-data";
import ActionLink from "./ui/ActionLink";

const navigation = [
  { href: "#experience", label: "Experience", number: "02" },
  { href: "#work", label: "Projects", number: "03" },
  { href: "#education", label: "Education", number: "04" },
  { href: "#about", label: "About", number: "05" },
] as const;

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      {navigation.map((item) => (
        <a href={item.href} data-nav-link key={item.href}><span aria-hidden="true">{item.number}</span>{item.label}</a>
      ))}
      {mobile ? (
        <>
          <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Resume</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="mobile-contact-link" href="#contact">Contact</a>
        </>
      ) : null}
    </>
  );
}

function CollectionHeading({
  number,
  title,
  description,
  id,
}: {
  number: string;
  title: string;
  description: string;
  id: string;
}) {
  return (
    <header className="collection-heading" data-reveal>
      <p className="collection-number"><span>{number}</span> / {title}</p>
      <div>
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
      </div>
    </header>
  );
}

function CloseVolumeButton() {
  return <button className="close-volume" type="button" data-volume-close>Close reading view <span aria-hidden="true">x</span></button>;
}

function EducationCollection() {
  return (
    <section className="collection education-collection section-shell" id="education" data-nav-section aria-labelledby="education-title">
      <CollectionHeading
        number="04"
        title="Education"
        description="Graduate and undergraduate foundations in data, networks, databases, systems, and software engineering."
        id="education-title"
      />
      <div className="academic-shelf" aria-label="Education">
        {education.map((item, index) => (
          <details className={`volume academic-volume theme-${item.theme}`} data-volume id={`education-${item.id}`} key={item.school}>
            <summary className="book-object" aria-label={`Open ${item.school} details`}>
              <span className="book-cover">
                <span className="book-kicker">Education / 0{index + 1}</span>
                <strong>{item.school}</strong>
                <span className="book-degree">{item.degree}</span>
                <span className="book-metadata"><small>{item.period}</small><small>{item.location}</small></span>
                <span className="book-score"><small>{item.scoreLabel}</small><b>{item.score}</b></span>
                <i aria-hidden="true">View coursework +</i>
              </span>
            </summary>
            <div className="volume-reader academic-reader">
              <CloseVolumeButton />
              <div className="reader-lead">
                <p className="reader-label">Education / 0{index + 1} / {item.edition}</p>
                <h3>{item.school}</h3>
                <p>{item.degree}</p>
              </div>
              <dl className="reader-metadata">
                <div><dt>Study period</dt><dd>{item.period}</dd></div>
                <div><dt>Location</dt><dd>{item.location}</dd></div>
                <div><dt>{item.scoreLabel}</dt><dd>{item.score}</dd></div>
              </dl>
              <div className="reader-content">
                <h4>Selected coursework</h4>
                <ul className="coursework-list">
                  {item.subjects.map((subject) => <li key={subject}>{subject}</li>)}
                </ul>
                {"note" in item ? <p className="academic-note">{item.note}</p> : null}
              </div>
            </div>
          </details>
        ))}
      </div>
      <p className="shelf-instruction" data-reveal><span aria-hidden="true">↳</span> Open a school to view selected coursework. Use Escape to close.</p>
    </section>
  );
}

function ExperienceCollection() {
  return (
    <section className="collection experience-collection" id="experience" data-nav-section aria-labelledby="experience-title">
      <div className="section-shell">
        <CollectionHeading
          number="02"
          title="Experience"
          description="Production work across full-stack delivery, backend systems, data flows, deployment pipelines, and product operations."
          id="experience-title"
        />
        <div className="experience-library" aria-label="Professional experience">
          {experience.map((item, index) => (
            <details className={`volume experience-volume theme-${item.theme}`} data-volume id={`experience-${item.id}`} key={item.company}>
              <summary className="experience-cover" aria-label={`Open ${item.company} experience`}>
                <span className="experience-cover-copy">
                  <span className="experience-index">Experience / {String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.shortCompany}</strong>
                  <span className="experience-role">{item.role}</span>
                  <p>{item.summary}</p>
                  <dl className="experience-preview-metrics" aria-label={`${item.company} highlights`}>
                    {item.metrics.filter((metric) => "featured" in metric && metric.featured).map((metric) => (
                      <div key={metric.label}><dt>{metric.value}</dt><dd>{metric.label}</dd></div>
                    ))}
                  </dl>
                  <span className="experience-meta">{item.period}<br />{item.location}</span>
                  <i aria-hidden="true">View details +</i>
                </span>
              </summary>
              <div className="volume-reader experience-reader">
                <CloseVolumeButton />
                <div className="experience-reader-heading">
                  <p className="reader-label">Experience / {String(index + 1).padStart(2, "0")}</p>
                  <h3>{item.company}</h3>
                  <p>{item.role}</p>
                  <span className="experience-reader-meta">{item.period} / {item.location}</span>
                </div>
                <p className="experience-summary">{item.summary}</p>
                <ul className="experience-details">
                  {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
                <div className="metric-ledger" aria-label={`${item.company} outcomes`}>
                  {item.metrics.map((metric) => (
                    <div key={metric.label}>
                      <strong><CountUp value={metric.value} /></strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCollection() {
  return (
    <section className="collection project-collection section-shell" id="work" data-nav-section aria-labelledby="work-title">
      <CollectionHeading
        number="03"
        title="Selected Projects"
        description="Two working systems that make the architecture, engineering decisions, and runtime behavior visible."
        id="work-title"
      />
      <div className="publication-shelf">
        {projects.map((project, index) => (
          <details
            className={`volume project-publication theme-${project.theme}`}
            data-volume
            id={project.id === "real-time-collaborative-workspace" ? "collab-work" : project.id}
            key={project.id}
          >
            <summary className="publication-cover" data-tilt aria-label={`Open ${project.title} project`}>
              <span className="publication-index">Project / {project.number}</span>
              <strong>{project.title}</strong>
              <span>{project.subtitle}</span>
              <ul aria-label={`${project.title} technologies`}>
                {project.technologies.slice(0, 4).map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
              <i aria-hidden="true">View architecture + demo</i>
              <b aria-hidden="true">0{index + 1}</b>
            </summary>
            <div className="volume-reader project-reader">
              <CloseVolumeButton />
              <div className="project-reader-masthead">
                <p className="reader-label">Project / {project.number}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <ul className="technology-index" aria-label={`${project.title} technology index`}>
                {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
              <nav className="project-jump-links" aria-label={`${project.title} sections`}>
                <a href={`#${project.id}-architecture`}>Architecture</a>
                <a href={`#${project.id}-demo`}>Interactive demo</a>
              </nav>
              <div className="decision-notes" id={`${project.id}-architecture`}>
                <h4>Architecture notes</h4>
                <ol>
                  {project.decisions.map((decision) => <li key={decision}>{decision}</li>)}
                </ol>
              </div>
              <div className="project-demo-frame" id={`${project.id}-demo`}>
                <div className="demo-caption"><span>Interactive demo</span><small>Use the controls below</small></div>
                <LazyProjectDemo kind={project.demo} />
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main id="top">
      <ScrollMotion />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header" data-site-header>
        <div className="site-header-inner section-shell">
          <a className="wordmark" href="#intro" aria-label="Harsh Dobariya, introduction">HD / Portfolio</a>
          <nav className="desktop-nav" aria-label="Primary navigation"><NavigationLinks /></nav>
          <div className="header-utilities">
            <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Resume</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <details className="mobile-nav" data-mobile-nav>
            <summary>Index</summary>
            <div className="mobile-menu-panel">
              <nav aria-label="Mobile navigation"><a href="#intro" data-nav-link>Intro</a><NavigationLinks mobile /></nav>
              <p>{profile.location}<br />Open to relocate for the right opportunity</p>
            </div>
          </details>
        </div>
      </header>

      <div id="main-content">
        <section className="intro section-shell" id="intro" data-nav-section aria-labelledby="hero-title">
          <div className="intro-copy">
            <p className="intro-kicker" data-reveal>Software Engineer / Seattle</p>
            <h1 id="hero-title" data-reveal>Harsh<br /><em>Dobariya</em></h1>
            <p className="intro-statement" data-reveal>
              Software Engineer building backend systems, distributed infrastructure, and polished products.
            </p>
            <p className="intro-summary" data-reveal>
              I work across backend and full-stack engineering, designing clear APIs, reliable data flows, and thoughtful product experiences.
            </p>
            <div className="intro-actions" data-reveal>
              <ActionLink href="/Harsh_Dobariya_Resume.pdf" icon="external" variant="primary" target="_blank">Resume</ActionLink>
              <ActionLink href={profile.github} icon="external" target="_blank" rel="noreferrer">GitHub</ActionLink>
              <ActionLink href={`mailto:${profile.email}`}>Email</ActionLink>
            </div>
            <div className="intro-status" data-reveal>
              <span><i aria-hidden="true" />Available for software engineering opportunities</span>
              <span>{profile.location} / Open to relocate</span>
            </div>
          </div>
          <aside className="archive-index" aria-label="Portfolio collection index" data-reveal>
            <div className="archive-monogram" aria-hidden="true"><span>H</span><span>D</span></div>
            <p>Backend systems, distributed infrastructure, and full-stack product engineering.</p>
            <ol>
              {navigation.map((item) => (
                <li key={item.href}><a href={item.href}><span>{item.number}</span>{item.label}</a></li>
              ))}
            </ol>
            <a className="browse-collection" href="#experience">View experience <span aria-hidden="true">↓</span></a>
          </aside>
        </section>

        <ExperienceCollection />
        <ProjectCollection />
        <EducationCollection />

        <section className="collection about-collection" id="about" data-nav-section aria-labelledby="about-title">
          <div className="section-shell">
            <CollectionHeading
              number="05"
              title="About and Contact"
              description="A backend-focused full-stack engineer who values dependable systems, explicit tradeoffs, and software that remains clear as it grows."
              id="about-title"
            />
            <div className="about-layout">
              <div className="about-copy" data-reveal>
                <p>
                  I am a software engineer based in Seattle. I turn complex requirements into dependable products with clear interfaces, maintainable code, and thoughtful data design.
                </p>
                <ol className="work-principles" aria-label="How I work">
                  <li><span>01</span><strong>Start with the problem</strong><small>Clarify the outcome before choosing the implementation.</small></li>
                  <li><span>02</span><strong>Make tradeoffs explicit</strong><small>Prefer decisions that teammates can understand and revisit.</small></li>
                  <li><span>03</span><strong>Design for failure</strong><small>Make recovery, observability, and edge cases part of the design.</small></li>
                  <li><span>04</span><strong>Leave the next change easy</strong><small>Build clear boundaries so the product can evolve safely.</small></li>
                </ol>
              </div>
              <div className="tool-index" data-reveal>
                <p className="reader-label">Working set</p>
                <dl>
                  {toolGroups.map((group) => (
                    <div key={group.label}><dt>{group.label}</dt><dd>{group.tools.join(" / ")}</dd></div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="contact-ledger" id="contact" data-reveal>
              <div>
                <p className="reader-label">Available for software engineering opportunities</p>
                <h3>Let&apos;s build something dependable.</h3>
              </div>
              <div className="email-row">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <CopyEmail email={profile.email} />
              </div>
              <nav aria-label="Contact links">
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">Resume ↗</a>
                <a href="#intro">Back to introduction ↑</a>
              </nav>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
