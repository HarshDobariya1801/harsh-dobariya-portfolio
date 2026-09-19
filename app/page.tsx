const profile = {
  email: "dobariyaharsh10@gmail.com",
  phone: "+16232977900",
  phoneLabel: "+1 (623) 297-7900",
  linkedin: "https://www.linkedin.com/in/harsh-dobariya-962238183/",
  github: "https://github.com/HarshDobariya1801",
};

const experience = [
  {
    company: "Ninja Technolabs",
    role: "Software Engineer, Full Stack",
    period: "Jan 2023 — Nov 2023",
    location: "Ahmedabad, India",
    summary:
      "Modernized a legacy billing platform into a reliable React, Node.js, and MySQL product serving 3,000 monthly users.",
    impact: [
      "Reduced invoice propagation errors by 15% while migrating 2,000+ invoices each month.",
      "Built a reusable component kit and API layer that removed 28% of duplicated UI code.",
      "Introduced transactional updates and automated testing, lifting critical-flow coverage to 70%.",
    ],
  },
  {
    company: "BrainyBeam Technologies",
    role: "Software Engineer Intern",
    period: "Aug 2022 — Nov 2022",
    location: "Ahmedabad, India",
    summary:
      "Improved data discovery and delivery systems for analysts and engineers across the organization.",
    impact: [
      "Created search and visualization tools that supported 20+ data analysts.",
      "Normalized fragmented customer data into a dependable MySQL schema.",
      "Reworked CI/CD with caching and parallelization, cutting release time by 35% for 35 engineers.",
    ],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "Jan 2022 — Jul 2022",
    location: "Ahmedabad, India",
    summary:
      "Delivered a production React and Node.js application with a focus on performance and secure API design.",
    impact: [
      "Improved Lighthouse LCP performance by 25% for a client startup.",
      "Designed REST APIs with JWT, API-key authorization, rate limiting, and token revocation.",
    ],
  },
];

const projects = [
  {
    index: "01",
    name: "Distributed Key-Value Store",
    eyebrow: "Systems engineering",
    description:
      "A high-performance in-memory database built around TCP socket communication, concurrent clients, and predictable recovery.",
    details: [
      "Thread pooling, TTL expiration, and LRU cache eviction",
      "Append-only persistence with crash recovery",
      "p95/p99 latency benchmarking under concurrent load",
    ],
    stack: ["C++", "TCP/IP", "Multithreading", "CMake"],
    accent: "blue",
  },
  {
    index: "02",
    name: "Real-Time Collaborative Workspace",
    eyebrow: "Distributed product",
    description:
      "A multi-user workspace that keeps presence, edits, history, and permissions synchronized in real time.",
    details: [
      "WebSocket synchronization and optimistic updates",
      "Autosave, version history, and role-based access",
      "Redis Pub/Sub across horizontally scaled Node.js instances",
    ],
    stack: ["TypeScript", "React", "Node.js", "WebSockets", "Redis", "PostgreSQL"],
    accent: "coral",
  },
];

const skillGroups = [
  {
    number: "01",
    title: "Languages",
    skills: "Python, Java, C++, JavaScript, TypeScript, SQL",
  },
  {
    number: "02",
    title: "Product engineering",
    skills: "React, HTML, CSS, Node.js, Express, REST APIs, JWT, OAuth2",
  },
  {
    number: "03",
    title: "Data & infrastructure",
    skills: "MySQL, MongoDB Atlas, PostgreSQL, Redis, AWS, Docker, Kubernetes",
  },
  {
    number: "04",
    title: "Engineering practice",
    skills: "GitHub Actions, CI/CD, Linux, Postman, Jest, Supertest, system design",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Harsh Dobariya, home">
          HD<span>.</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="resume-link" href="/Harsh_Dobariya_Resume.pdf" target="_blank">
          Résumé <Arrow />
        </a>
      </header>

      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="kicker">
            <span className="status-dot" aria-hidden="true" />
            Full-stack software engineer · Tempe, Arizona
          </p>
          <h1 id="hero-title">
            I build software that stays <em>fast, clear,</em> and dependable.
          </h1>
          <p className="hero-intro">
            I’m Harsh Dobariya, an engineer who turns complex product and systems
            problems into resilient experiences—from real-time collaboration to
            distributed infrastructure.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-quiet" href={`mailto:${profile.email}`}>
              Start a conversation <Arrow />
            </a>
          </div>
        </div>

        <div className="system-card" aria-label="Engineering impact summary">
          <div className="system-card-head">
            <span>ENGINEERING PROFILE</span>
            <span className="system-online">ONLINE</span>
          </div>
          <div className="system-visual" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="core">HD</div>
            <span className="node node-a" />
            <span className="node node-b" />
            <span className="node node-c" />
          </div>
          <div className="system-stats">
            <div>
              <strong>3K</strong>
              <span>monthly users supported</span>
            </div>
            <div>
              <strong>35%</strong>
              <span>faster release cycle</span>
            </div>
            <div>
              <strong>1K+</strong>
              <span>algorithmic problems solved</span>
            </div>
          </div>
        </div>
      </section>

      <div className="capability-strip" aria-label="Technical focus areas">
        <div>
          <span>Product Engineering</span><i>●</i>
          <span>Distributed Systems</span><i>●</i>
          <span>Real-Time Applications</span><i>●</i>
          <span>Cloud Infrastructure</span><i>●</i>
          <span>Product Engineering</span><i>●</i>
          <span>Distributed Systems</span><i>●</i>
        </div>
      </div>

      <section className="about section-shell" aria-labelledby="about-title">
        <div className="section-label">01 / ABOUT</div>
        <div className="about-content">
          <h2 id="about-title">
            Engineering across the whole stack, with equal attention to the user
            and the system underneath.
          </h2>
          <div className="about-grid">
            <p>
              I enjoy the space where product thinking meets systems thinking:
              shaping an intuitive interface, defining a reliable API, and making
              sure the data path holds up under real-world pressure.
            </p>
            <p>
              My background spans full-stack delivery, data modeling, CI/CD,
              performance work, and distributed-system fundamentals. The common
              thread is simple: build useful software, measure its impact, and
              leave the codebase stronger than I found it.
            </p>
          </div>
        </div>
      </section>

      <section className="work section-shell" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <div>
            <div className="section-label">02 / SELECTED WORK</div>
            <h2 id="work-title">Built for real constraints.</h2>
          </div>
          <a href={profile.github} target="_blank" rel="noreferrer">
            Explore GitHub <Arrow />
          </a>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card ${project.accent}`} key={project.name}>
              <div className="project-number">{project.index}</div>
              <div className="project-content">
                <p className="project-eyebrow">{project.eyebrow}</p>
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <ul>
                  {project.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <div className="tag-list" aria-label={`${project.name} technologies`}>
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div className="project-diagram" aria-hidden="true">
                <span className="diagram-label label-a">CLIENT</span>
                <span className="diagram-label label-b">CORE</span>
                <span className="diagram-label label-c">DATA</span>
                <i className="diagram-line line-a" />
                <i className="diagram-line line-b" />
                <i className="diagram-node point-a" />
                <i className="diagram-node point-b" />
                <i className="diagram-node point-c" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="experience section-shell"
        id="experience"
        aria-labelledby="experience-title"
      >
        <div className="section-heading">
          <div>
            <div className="section-label">03 / EXPERIENCE</div>
            <h2 id="experience-title">Impact, not just output.</h2>
          </div>
          <span className="heading-note">2022 — 2023</span>
        </div>

        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-row" key={item.company}>
              <div className="timeline-meta">
                <span>{item.period}</span>
                <span>{item.location}</span>
              </div>
              <div className="timeline-body">
                <h3>{item.company}</h3>
                <p className="role">{item.role}</p>
                <p className="timeline-summary">{item.summary}</p>
                <ul>
                  {item.impact.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="education section-shell"
        id="education"
        aria-labelledby="education-title"
      >
        <div className="section-heading">
          <div>
            <div className="section-label">04 / EDUCATION</div>
            <h2 id="education-title">A foundation in information technology.</h2>
          </div>
        </div>
        <div className="education-grid">
          <article>
            <div className="education-year">2024 — 2025</div>
            <div>
              <p className="degree">M.S. in Information Technology</p>
              <h3>Arizona State University</h3>
              <p>Tempe, Arizona</p>
            </div>
            <span className="education-mark">ASU</span>
          </article>
          <article>
            <div className="education-year">2019 — 2023</div>
            <div>
              <p className="degree">B.E. in Information Technology</p>
              <h3>Gujarat Technological University</h3>
              <p>Gujarat, India</p>
            </div>
            <span className="education-mark">GTU</span>
          </article>
        </div>
      </section>

      <section className="skills section-shell" aria-labelledby="skills-title">
        <div className="skills-intro">
          <div className="section-label">05 / TOOLKIT</div>
          <h2 id="skills-title">Tools change. Strong engineering habits travel.</h2>
          <p>
            A practical toolkit for shipping complete products—from accessible
            interfaces to observable, scalable backends.
          </p>
        </div>
        <div className="skill-list">
          {skillGroups.map((group) => (
            <div className="skill-row" key={group.title}>
              <span className="skill-number">{group.number}</span>
              <h3>{group.title}</h3>
              <p>{group.skills}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="competitive section-shell" aria-label="Competitive programming">
        <div className="competitive-score">1,000+</div>
        <div>
          <p className="section-label">COMPETITIVE PROGRAMMING</p>
          <h2>Problems solved across LeetCode, Codeforces, CodeChef & GeeksforGeeks.</h2>
        </div>
        <p>
          College rank <strong>#1</strong>, with a focus on data structures,
          dynamic programming, graph algorithms, and optimization.
        </p>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="contact-inner section-shell">
          <div className="contact-orbit" aria-hidden="true">
            <span>LET&apos;S BUILD · LET&apos;S BUILD ·</span>
          </div>
          <p className="section-label">06 / CONTACT</p>
          <h2 id="contact-title">Have a hard problem worth solving?</h2>
          <p className="contact-copy">
            I’m open to software engineering opportunities and thoughtful
            collaborations. Tell me what you’re building.
          </p>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email} <Arrow />
          </a>
          <div className="contact-links">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <Arrow />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <Arrow />
            </a>
            <a href={`tel:${profile.phone}`}>{profile.phoneLabel}</a>
            <a href="/Harsh_Dobariya_Resume.pdf" target="_blank">
              Download résumé <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer>
        <span>© {new Date().getFullYear()} Harsh Dobariya</span>
        <span>Designed with intent. Engineered for speed.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
