import ScrollMotion from "./ScrollMotion";

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
    period: "Jan 2023 to Nov 2023",
    location: "Ahmedabad, India",
    summary:
      "Modernized a legacy billing platform into a reliable React, Node.js, and MySQL product.",
    impact: [
      "Reduced invoice propagation errors by 15% while migrating 2,000+ invoices each month.",
      "Built a reusable component kit and API layer that removed 28% of duplicated UI code.",
      "Introduced transactional updates and automated testing, lifting critical-flow coverage to 70%.",
    ],
  },
  {
    company: "BrainyBeam Technologies",
    role: "Software Engineer Intern",
    period: "Aug 2022 to Nov 2022",
    location: "Ahmedabad, India",
    summary:
      "Improved data discovery and delivery systems for analysts and engineers across the organization.",
    impact: [
      "Created search and visualization tools that supported 20+ data analysts.",
      "Normalized fragmented customer data into a dependable MySQL schema.",
      "Reworked CI/CD with caching and parallelization for a faster release process.",
    ],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "Jan 2022 to Jul 2022",
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
      "p95 and p99 latency benchmarking under concurrent load",
    ],
    stack: ["C++", "TCP/IP", "Multithreading", "CMake"],
    accent: "blue",
    visual: {
      top: "TCP CLIENTS",
      center: "KV CORE",
      bottom: "AOF STORAGE",
    },
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
    accent: "orange",
    visual: {
      top: "LIVE CLIENTS",
      center: "SYNC ENGINE",
      bottom: "REDIS + DATA",
    },
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
    title: "Data and infrastructure",
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
      <ScrollMotion />

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Harsh Dobariya, home">
          HD<span>/</span>
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

      <section className="poster-hero section-shell" aria-labelledby="hero-title">
        <h1 id="hero-title" className="sr-only">
          Harsh Dobariya, Full-Stack Software Engineer
        </h1>
        <div className="poster-frame" data-reveal>
          <img
            src="/harsh-system-poster.png"
            alt="Harsh Dobariya, Full-Stack Software Engineer, with a layered software architecture illustration"
            width="1672"
            height="941"
            fetchPriority="high"
          />
        </div>
        <div className="poster-intro" data-reveal>
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            Available for software engineering roles
          </p>
          <p>
            Building clear products and resilient systems across interfaces,
            real-time applications, APIs, and cloud infrastructure. Based in Tempe,
            Arizona, USA. Open to relocate for the right opportunity.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">
              View selected work <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href={`mailto:${profile.email}`}>
              Start a conversation <Arrow />
            </a>
          </div>
        </div>
      </section>

      <div className="discipline-rail" aria-label="Technical focus areas">
        <span>01 Product engineering</span>
        <span>02 Distributed systems</span>
        <span>03 Real-time applications</span>
        <span>04 Cloud infrastructure</span>
      </div>

      <section className="about section-shell" aria-labelledby="about-title">
        <div className="section-index" data-reveal>
          <span>01</span>
          <p>About</p>
        </div>
        <div className="about-content" data-reveal>
          <h2 id="about-title">
            Thoughtful at the surface. Dependable underneath.
          </h2>
          <div className="about-copy">
            <p>
              I enjoy the space where product thinking meets systems thinking:
              shaping an intuitive interface, defining a reliable API, and making
              sure the data path holds up under real-world pressure.
            </p>
            <p>
              My background spans full-stack delivery, data modeling, CI/CD,
              performance work, and distributed-system fundamentals. I care about
              useful software, measurable outcomes, and codebases that improve over time.
            </p>
          </div>
        </div>
      </section>

      <section className="work section-shell" id="work" aria-labelledby="work-title">
        <div className="section-heading" data-reveal>
          <div>
            <p className="section-kicker">02 / Selected work</p>
            <h2 id="work-title">Built for real constraints.</h2>
          </div>
          <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
            Explore GitHub <Arrow />
          </a>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card ${project.accent}`} key={project.name} data-reveal>
              <header className="project-card-head">
                <span>{project.index}</span>
                <span>{project.eyebrow}</span>
              </header>
              <div className="project-layout">
                <div className="project-copy">
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
                <div className="project-visual" aria-hidden="true">
                  <div className="architecture-node architecture-top">
                    {project.visual.top}
                  </div>
                  <span className="architecture-line line-one" />
                  <div className="architecture-node architecture-center">
                    {project.visual.center}
                  </div>
                  <span className="architecture-line line-two" />
                  <div className="architecture-node architecture-bottom">
                    {project.visual.bottom}
                  </div>
                  <span className="pulse pulse-one" />
                  <span className="pulse pulse-two" />
                </div>
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
        <div className="section-heading" data-reveal>
          <div>
            <p className="section-kicker">03 / Experience</p>
            <h2 id="experience-title">Work that moved the product forward.</h2>
          </div>
        </div>
        <div className="experience-list">
          {experience.map((item, index) => (
            <article className="experience-card" key={item.company} data-reveal>
              <span className="experience-number">0{index + 1}</span>
              <div className="experience-meta">
                <span>{item.period}</span>
                <span>{item.location}</span>
              </div>
              <div className="experience-body">
                <p className="role">{item.role}</p>
                <h3>{item.company}</h3>
                <p className="experience-summary">{item.summary}</p>
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
        <div className="section-heading" data-reveal>
          <div>
            <p className="section-kicker">04 / Education</p>
            <h2 id="education-title">Grounded in information technology.</h2>
          </div>
        </div>
        <div className="education-grid">
          <article className="education-card asu-card" data-reveal>
            <div className="asu-sun" aria-hidden="true" />
            <span className="education-year">2024 to 2025</span>
            <div className="education-copy">
              <p>M.S. in Information Technology</p>
              <h3>Arizona State University</h3>
              <span>Tempe, Arizona, USA</span>
            </div>
            <strong className="education-mark">ASU</strong>
          </article>
          <article className="education-card gtu-card" data-reveal>
            <span className="education-year">2019 to 2023</span>
            <div className="education-copy">
              <p>B.E. in Information Technology</p>
              <h3>Gujarat Technological University</h3>
              <span>Gujarat, India</span>
            </div>
            <strong className="education-mark">GTU</strong>
          </article>
        </div>
      </section>

      <section className="skills section-shell" aria-labelledby="skills-title">
        <div className="section-heading" data-reveal>
          <div>
            <p className="section-kicker">05 / Toolkit</p>
            <h2 id="skills-title">A practical stack for complete products.</h2>
          </div>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.title} data-reveal>
              <span>{group.number}</span>
              <h3>{group.title}</h3>
              <p>{group.skills}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="problem-solving section-shell" data-reveal>
        <p className="section-kicker">Competitive problem solving</p>
        <h2>Practice that sharpens how I reason about performance and tradeoffs.</h2>
        <p>
          College rank <strong>#1</strong>, with experience across LeetCode,
          Codeforces, CodeChef, and GeeksforGeeks.
        </p>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="contact-inner section-shell">
          <p className="section-kicker">06 / Contact</p>
          <h2 id="contact-title" data-reveal>
            Let&apos;s build something useful.
          </h2>
          <p className="contact-copy">
            Based in Tempe, Arizona, USA, and open to relocate for the right
            opportunity. I’m available for software engineering roles and thoughtful
            collaborations.
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
        <span>Full-stack software engineer · Tempe, Arizona</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
