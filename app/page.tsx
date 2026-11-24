import CopyEmail from "./CopyEmail";
import CountUp from "./CountUp";
import LazyProjectDemo from "./LazyProjectDemo";
import ScrollMotion from "./ScrollMotion";
import { education, experience, profile, projects, toolGroups } from "./portfolio-data";
import ActionLink from "./ui/ActionLink";

const navigation = [
  { href: "#intro", label: "Intro" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Projects" },
  { href: "#about", label: "About" },
] as const;

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      {navigation.map((item) => (
        <a href={item.href} data-nav-link key={item.href}>{item.label}</a>
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
      <p className="collection-number">Collection {number}</p>
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
        number="02"
        title="Education"
        description="Two institutions that shaped how I think about software, systems, and the discipline of learning."
        id="education-title"
      />
      <div className="academic-shelf" aria-label="Academic collection">
        {education.map((item, index) => (
          <details className={`volume academic-volume theme-${item.theme}`} data-volume id={`education-${item.id}`} key={item.school}>
            <summary className="book-object" data-tilt aria-label={`Open ${item.school} details`}>
              <span className="book-shadow" aria-hidden="true" />
              <span className="book-spine" aria-hidden="true"><b>{item.school}</b><i>0{index + 1}</i></span>
              <span className="book-cover">
                <span className="book-kicker">Academic volume 0{index + 1}</span>
                <strong>{item.school}</strong>
                <span className="book-degree">{item.degree}</span>
                <span className="book-rule" aria-hidden="true" />
                <small>{item.period}</small>
                <i aria-hidden="true">Open +</i>
              </span>
            </summary>
            <div className="volume-reader academic-reader">
              <CloseVolumeButton />
              <div className="reader-folio" aria-hidden="true">ED / 0{index + 1}</div>
              <div className="reader-lead">
                <p className="reader-label">{item.edition}</p>
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
      <p className="shelf-instruction" data-reveal><span aria-hidden="true">↳</span> Select a volume to read the record. Use Escape to close.</p>
    </section>
  );
}

function ExperienceCollection() {
  return (
    <section className="collection experience-collection" id="experience" data-nav-section aria-labelledby="experience-title">
      <div className="section-shell">
        <CollectionHeading
          number="03"
          title="Professional Experience"
          description="Product delivery, modernization, internal tooling, and the engineering details that kept each system moving."
          id="experience-title"
        />
        <div className="experience-library" aria-label="Professional experience collection">
          {experience.map((item, index) => (
            <details className={`volume experience-volume theme-${item.theme}`} data-volume id={`experience-${item.id}`} key={item.company}>
              <summary className="experience-cover" data-tilt aria-label={`Open ${item.company} experience`}>
                <span className="experience-spine" aria-hidden="true">VOL. {String(index + 1).padStart(2, "0")}</span>
                <span className="experience-cover-copy">
                  <small>{item.period}</small>
                  <strong>{item.shortCompany}</strong>
                  <span>{item.role}</span>
                  <i aria-hidden="true">Read record +</i>
                </span>
              </summary>
              <div className="volume-reader experience-reader">
                <CloseVolumeButton />
                <div className="reader-folio" aria-hidden="true">EXP / {String(index + 1).padStart(2, "0")}</div>
                <div className="experience-reader-heading">
                  <p className="reader-label">{item.period} / {item.location}</p>
                  <h3>{item.company}</h3>
                  <p>{item.role}</p>
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
        number="04"
        title="Engineering Projects"
        description="Two working systems presented as technical publications. Open a volume to inspect the architecture and use the live demonstration."
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
              <span className="publication-index">PROJECT / {project.number}</span>
              <strong>{project.title}</strong>
              <span>{project.subtitle}</span>
              <ul aria-label={`${project.title} technologies`}>
                {project.technologies.slice(0, 4).map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
              <i aria-hidden="true">Open publication +</i>
              <b aria-hidden="true">{String(2025 - index).slice(-2)}</b>
            </summary>
            <div className="volume-reader project-reader">
              <CloseVolumeButton />
              <div className="project-reader-masthead">
                <p className="reader-label">Technical publication / {project.number}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <ul className="technology-index" aria-label={`${project.title} technology index`}>
                {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
              <div className="decision-notes">
                <h4>Architecture notes</h4>
                <ol>
                  {project.decisions.map((decision) => <li key={decision}>{decision}</li>)}
                </ol>
              </div>
              <div className="project-demo-frame">
                <div className="demo-caption"><span>Interactive system plate</span><small>Use the controls below</small></div>
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
              <nav aria-label="Mobile navigation"><NavigationLinks mobile /></nav>
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
              I build reliable systems and thoughtful software products, from interface to infrastructure.
            </p>
            <p className="intro-summary" data-reveal>
              Backend and full-stack engineering with clear APIs, durable data flows, and careful attention to the people using the product.
            </p>
            <div className="intro-actions" data-reveal>
              <ActionLink href="/Harsh_Dobariya_Resume.pdf" icon="external" variant="primary" target="_blank">Resume</ActionLink>
              <ActionLink href={profile.github} icon="external" target="_blank" rel="noreferrer">GitHub</ActionLink>
              <ActionLink href={`mailto:${profile.email}`}>Email</ActionLink>
            </div>
            <div className="intro-status" data-reveal>
              <span><i aria-hidden="true" />{profile.location}</span>
              <span>Open to relocate for the right opportunity</span>
            </div>
          </div>
          <aside className="archive-index" aria-label="Portfolio collection index" data-reveal>
            <div className="archive-monogram" aria-hidden="true"><span>H</span><span>D</span></div>
            <p>Selected records in systems, products, and software engineering.</p>
            <ol>
              {navigation.slice(1).map((item, index) => (
                <li key={item.href}><a href={item.href}><span>0{index + 2}</span>{item.label}</a></li>
              ))}
            </ol>
            <a className="browse-collection" href="#education">Browse the collection <span aria-hidden="true">↓</span></a>
          </aside>
        </section>

        <EducationCollection />
        <ExperienceCollection />
        <ProjectCollection />

        <section className="collection about-collection" id="about" data-nav-section aria-labelledby="about-title">
          <div className="section-shell">
            <CollectionHeading
              number="05"
              title="About and Contact"
              description="A backend-focused full-stack engineer who values explicit tradeoffs, dependable systems, and software that stays understandable."
              id="about-title"
            />
            <div className="about-layout">
              <div className="about-copy" data-reveal>
                <p>
                  I am a software engineer based in Seattle. I turn complex requirements into dependable products with clear interfaces, maintainable code, and thoughtful data design.
                </p>
                <p>
                  My work is guided by four habits: start with the problem, make tradeoffs explicit, design for failure, and leave the next change easy.
                </p>
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
