export const profile = {
  name: "Harsh Dobariya",
  email: "dobariyaharsh10@gmail.com",
  linkedin: "https://www.linkedin.com/in/harsh-dobariya-962238183/",
  github: "https://github.com/HarshDobariya1801",
  location: "Seattle, Washington, USA",
};

export const education = [
  {
    id: "asu",
    school: "Arizona State University",
    degree: "M.S. Information Technology",
    period: "January 2024 - December 2025",
    location: "Tempe, Arizona",
    edition: "Graduate study",
    theme: "maroon",
    scoreLabel: "GPA",
    score: "3.5 / 4.0",
    subjects: [
      "IFT 511: Analyzing Big Data",
      "IFT 530: Advanced Database Management Systems",
      "IFT 536: Natural Language Processing for IT",
      "IFT 598: Advanced Computer Networks for Information Technology",
    ],
  },
  {
    id: "gtu",
    school: "Gujarat Technological University",
    degree: "B.E. Information Technology",
    period: "August 2019 - July 2023",
    location: "Gujarat, India",
    edition: "Undergraduate study",
    theme: "navy",
    scoreLabel: "CGPA",
    score: "8.00 / 10",
    subjects: [
      "Computer Organization & Architecture",
      "Operating System and Virtualization",
      "Computer Networks",
      "Artificial Intelligence",
    ],
    note: "Ranked first in college for competitive programming and algorithmic problem solving.",
  },
] as const;

export const experience = [
  {
    id: "community-dreams",
    company: "Community Dreams Foundation",
    shortCompany: "Community Dreams",
    role: "Software Developer",
    period: "February 2026 - Present",
    location: "Remote, USA",
    summary:
      "Building and maintaining React workflows, REST APIs, task tracking, forms, and user-facing dashboards for volunteer and project operations.",
    details: [
      "Developed React features across 3+ volunteer and project-management workflows.",
      "Built and integrated 10+ REST API endpoints for project, task, and user operations.",
      "Resolved 20+ application bugs and interface issues across shared workflows.",
      "Collaborated through Git and GitHub on 30+ code changes and pull requests.",
    ],
    metrics: [
      { value: "3+", label: "product workflows", featured: true },
      { value: "10+", label: "REST endpoints", featured: true },
      { value: "20+", label: "issues resolved", featured: true },
    ],
    theme: "olive",
  },
  {
    id: "ninja-technolabs",
    company: "Ninja Technolabs",
    shortCompany: "Ninja Technolabs",
    role: "Software Engineer, Full Stack",
    period: "January 2023 - November 2023",
    location: "Ahmedabad, India",
    summary:
      "Reworked a legacy billing workflow across React, Node.js, and MySQL so invoice data moved through one reliable relational system.",
    details: [
      "Re-architected a fragmented billing workflow into a React, Node.js, and MySQL stack.",
      "Designed REST contracts and relational schemas for multi-entity billing flows.",
      "Created a reusable React component kit and standardized API utility layer.",
      "Added transactional database updates with Jest and Supertest coverage on critical journeys.",
    ],
    metrics: [
      { value: "15%", label: "fewer invoice propagation errors", featured: true },
      { value: "2,000+", label: "invoices processed monthly", featured: true },
      { value: "28%", label: "less duplicate UI code" },
      { value: "70%", label: "coverage on core flows", featured: true },
    ],
    theme: "maroon",
  },
  {
    id: "brainybeam",
    company: "BrainyBeam Technologies Pvt. Ltd.",
    shortCompany: "BrainyBeam",
    role: "Software Engineer Intern",
    period: "August 2022 - November 2022",
    location: "Ahmedabad, India",
    summary:
      "Consolidated inconsistent data into a normalized MySQL schema and improved the path from pull request to production.",
    details: [
      "Consolidated customer data from multiple sources into one normalized MySQL schema.",
      "Re-engineered GitHub Actions pipelines with caching, parallelization, and clearer dependency boundaries.",
      "Added Slack notifications and GitHub status checks for build visibility and error reporting.",
    ],
    metrics: [
      { value: "35%", label: "faster PR-to-production path", featured: true },
      { value: "35", label: "engineers supported", featured: true },
    ],
    theme: "navy",
  },
  {
    id: "freelance",
    company: "Freelancing Work",
    shortCompany: "Freelance",
    role: "Web Developer",
    period: "January 2022 - July 2022",
    location: "Ahmedabad, India",
    summary:
      "Built and improved a React and Node.js application for a startup, including REST APIs and protected user access.",
    details: [
      "Improved page-load performance based on Lighthouse testing.",
      "Connected REST APIs across the frontend and backend.",
      "Implemented JWT authentication for protected user access.",
    ],
    metrics: [{ value: "25%", label: "improvement in Lighthouse page load performance", featured: true }],
    theme: "gold",
  },
] as const;

export const projects = [
  {
    id: "distributed-key-value-store",
    number: "01",
    title: "Distributed Key-Value Store",
    subtitle: "Concurrency, eviction, persistence",
    description:
      "A high-performance in-memory database with TCP communication, concurrent client handling, TTL expiration, LRU eviction, and append-only persistence.",
    technologies: ["C++", "TCP/IP", "Multithreading", "CMake"],
    decisions: [
      "A bounded worker pool separates network acceptance from command execution.",
      "Thread-safe state ownership keeps GET, SET, and DEL behavior explicit under concurrency.",
      "TTL and LRU policies manage memory while append-only persistence supports recovery.",
    ],
    demo: "kv",
    theme: "navy",
  },
  {
    id: "real-time-collaborative-workspace",
    number: "02",
    title: "Real-Time Collaborative Workspace",
    subtitle: "Presence, synchronization, durable state",
    description:
      "A multi-user workspace with WebSocket synchronization, presence, autosave, version history, and role-based permissions.",
    technologies: ["TypeScript", "React", "Node.js", "WebSockets", "Redis", "PostgreSQL"],
    decisions: [
      "WebSocket sessions keep connected clients responsive without page refreshes.",
      "Redis Pub/Sub shares events across multiple Node.js instances.",
      "PostgreSQL preserves durable workspace state while optimistic updates keep interaction immediate.",
    ],
    demo: "collaborative",
    theme: "olive",
  },
] as const;

export const toolGroups = [
  { label: "Languages", tools: ["C++", "Java", "Python", "TypeScript", "JavaScript", "SQL"] },
  { label: "Backend", tools: ["Node.js", "Express", "REST APIs", "WebSockets"] },
  { label: "Frontend", tools: ["React", "Next.js", "HTML", "CSS"] },
  { label: "Data", tools: ["PostgreSQL", "MySQL", "Redis", "MongoDB"] },
  { label: "Infrastructure / Cloud", tools: ["AWS", "Docker", "Kubernetes", "GitHub Actions"] },
] as const;
