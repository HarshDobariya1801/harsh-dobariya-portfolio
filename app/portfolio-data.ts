export const profile = {
  name: "Harsh Dobariya",
  role: "Software Engineer",
  email: "dobariyaharsh10@gmail.com",
  phone: "+16232977900",
  phoneLabel: "+1 (623) 297-7900",
  linkedin: "https://www.linkedin.com/in/harsh-dobariya-962238183/",
  github: "https://github.com/HarshDobariya1801",
  location: "Tempe, Arizona",
  country: "United States",
} as const;

export type DiagramKind = "kv" | "realtime";

export type CaseStudyProject = {
  index: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  technologies: readonly string[];
  diagram: DiagramKind;
  overview: string;
  problem: string;
  decisions: readonly { title: string; description: string }[];
  challenges: readonly string[];
  tradeoffs: readonly { title: string; description: string }[];
  measurement: string;
  measurementPlaceholder?: string;
  learning: string;
};

export const projects = [
  {
    index: "01",
    slug: "distributed-key-value-store",
    category: "Distributed systems",
    title: "Distributed Key-Value Store",
    description:
      "A concurrent in-memory key-value store with TCP networking, thread-pooled request handling, TTL expiration, LRU eviction, append-only persistence, and crash recovery.",
    technologies: ["C++", "TCP/IP", "Multithreading", "CMake"],
    diagram: "kv",
    overview:
      "The system accepts key-value commands over TCP, processes concurrent clients through a bounded worker pool, and keeps data in memory for fast access. TTL expiration and LRU eviction manage the data lifecycle, while an append-only log provides a recovery path after a crash.",
    problem:
      "The main engineering problem was coordinating network connections, concurrent requests, shared in-memory state, expiration, eviction, and persistence without treating them as separate concerns.",
    decisions: [
      {
        title: "Bounded worker pool",
        description:
          "Connections feed a request queue instead of creating an unbounded thread per client. This keeps concurrency explicit and limits resource growth under load.",
      },
      {
        title: "Thread-safe shared state",
        description:
          "The in-memory engine coordinates access to the key map and its TTL and LRU policies so concurrent operations cannot update related state independently.",
      },
      {
        title: "Append-only recovery",
        description:
          "Mutations are written to an append-only log that can be replayed after a restart. The in-memory path stays simple while retaining a durable record of writes.",
      },
    ],
    challenges: [
      "Keeping the key map, TTL metadata, and LRU state consistent during concurrent reads and writes.",
      "Handling client connections without allowing connection count to create unbounded work.",
      "Coordinating expiration and eviction with ordinary commands and persisted mutations.",
    ],
    tradeoffs: [
      {
        title: "Worker pool vs. thread per connection",
        description:
          "A bounded pool provides predictable resource use, but queued requests can wait when every worker is occupied.",
      },
      {
        title: "Memory speed vs. durable state",
        description:
          "Serving from memory keeps the main path fast. The append-only log adds write and recovery work in exchange for crash recovery.",
      },
      {
        title: "Append-only log vs. snapshots",
        description:
          "A log is straightforward to append and replay, but it grows over time and makes recovery cost depend on log size.",
      },
    ],
    measurement:
      "The store was benchmarked under increasing concurrent workloads, tracking throughput and p95/p99 latency. Correctness checks covered command behavior, expiration, eviction, persistence, and recovery.",
    measurementPlaceholder:
      "Add the benchmark chart and final throughput, p95, and p99 measurements.",
    learning:
      "The project made the relationship between concurrency control, memory policy, and persistence concrete. Each decision changes the behavior of the others.",
  },
  {
    index: "02",
    slug: "realtime-collaborative-workspace",
    category: "Real-time product",
    title: "Real-Time Collaborative Workspace",
    description:
      "A multi-user workspace with real-time synchronization, presence, autosave, version history, optimistic updates, and role-based permissions.",
    technologies: ["TypeScript", "React", "Node.js", "WebSockets", "Redis", "PostgreSQL"],
    diagram: "realtime",
    overview:
      "Browser clients connect over WebSockets to Node.js application instances. Redis Pub/Sub carries events between instances, while PostgreSQL stores durable workspace data and history.",
    problem:
      "The system needed to keep multiple users synchronized while preserving responsive local interactions, reconnect behavior, permissions, autosave, and durable workspace state.",
    decisions: [
      {
        title: "WebSockets for live updates",
        description:
          "A persistent bidirectional connection fits presence and workspace updates better than repeatedly polling for changes.",
      },
      {
        title: "Redis for cross-instance fan-out",
        description:
          "Pub/Sub lets a workspace event received by one Node.js instance reach clients connected to another instance.",
      },
      {
        title: "PostgreSQL for durable state",
        description:
          "Workspace data, permissions, autosaves, and version history belong in durable storage rather than the ephemeral event channel.",
      },
      {
        title: "Optimistic client updates",
        description:
          "The interface applies local changes immediately, then reconciles with the server so collaboration feels responsive without treating the client as authoritative.",
      },
    ],
    challenges: [
      "Synchronizing events across clients connected to different application instances.",
      "Recovering from dropped WebSocket connections without leaving the client on stale state.",
      "Separating short-lived presence events from workspace data that must be saved and versioned.",
    ],
    tradeoffs: [
      {
        title: "Redis Pub/Sub vs. database-backed events",
        description:
          "Pub/Sub provides lightweight fan-out for live updates, but messages are ephemeral. Durable state still has to be written to PostgreSQL.",
      },
      {
        title: "Optimistic updates vs. server confirmation",
        description:
          "Optimistic updates make the interface feel immediate, but the client needs a clear reconciliation path when the server rejects or changes an update.",
      },
      {
        title: "Multiple instances vs. simpler deployment",
        description:
          "Horizontal scaling supports more connections and resilience, but it introduces an event-coordination layer that a single process would not need.",
      },
    ],
    measurement:
      "The architecture was exercised around synchronization, reconnect handling, autosave, permission boundaries, and optimistic update reconciliation.",
    measurementPlaceholder:
      "Add measured synchronization latency, reconnect test results, and a product screenshot if available.",
    learning:
      "The design reinforced a useful boundary: live coordination can be ephemeral, but product state and history need a durable source of truth.",
  },
] as const satisfies readonly CaseStudyProject[];

export type Project = (typeof projects)[number];

export const professionalWork = {
  index: "03",
  category: "Professional work",
  title: "Billing Platform Modernization",
  description:
    "Reworked a fragmented billing workflow into a React, Node.js, and MySQL application with clearer API contracts, relational data models, and automated validation for core billing flows.",
  technologies: ["React", "Node.js", "MySQL", "REST APIs", "Jest", "Supertest"],
  metrics: [
    { value: "15%", label: "fewer invoice propagation errors" },
    { value: "2,000+", label: "invoices migrated per month" },
    { value: "70%+", label: "test coverage on critical flows" },
  ],
} as const;

export const experience = [
  {
    index: "01",
    company: "Ninja Technolabs",
    role: "Software Engineer, Full Stack",
    period: "Jan 2023 – Nov 2023",
    location: "Ahmedabad, India",
    stack: "React · Node.js · MySQL",
    summary: "Modernized a legacy billing workflow and its supporting APIs and data model.",
    details: [
      "Re-architected the billing workflow and reduced invoice propagation errors by 15%.",
      "Designed REST contracts and relational schemas, then migrated 2,000+ invoices per month without losing referential integrity.",
      "Built a reusable React component kit and API utility layer that reduced duplicated interface code by 28%.",
      "Added transactional database updates and automated coverage for critical billing flows.",
    ],
    impact: [
      { value: "15% ↓", label: "invoice propagation errors" },
      { value: "2,000+", label: "invoices migrated / month" },
      { value: "28% ↓", label: "duplicated interface code" },
      { value: "70%+", label: "critical-flow test coverage" },
    ],
  },
  {
    index: "02",
    company: "BrainyBeam Technologies",
    role: "Software Engineer Intern",
    period: "Aug 2022 – Nov 2022",
    location: "Ahmedabad, India",
    stack: "Python · MySQL · GitHub Actions",
    summary: "Built search and data tools for analysts and improved the delivery pipeline.",
    details: [
      "Built internal search and visualization tools used by more than 20 data analysts.",
      "Consolidated inconsistent customer data into a normalized MySQL schema.",
      "Added caching and parallelization to GitHub Actions pipelines, reducing PR-to-production time by 35%.",
      "Added Slack notifications and GitHub status checks for build and error visibility.",
    ],
    impact: [
      { value: "20+", label: "analysts supported" },
      { value: "35%", label: "faster PR-to-production" },
    ],
  },
  {
    index: "03",
    company: "Freelance",
    role: "Web Developer",
    period: "Jan 2022 – Jul 2022",
    location: "Ahmedabad, India",
    stack: "React · Node.js · REST APIs",
    summary: "Built a production React and Node.js application for a client startup.",
    details: [
      "Improved Lighthouse Largest Contentful Paint by 25%.",
      "Designed REST APIs with JWT authentication, API-key authorization, rate limiting, and token revocation patterns.",
    ],
    impact: [{ value: "25%", label: "Lighthouse LCP improvement" }],
  },
] as const;

export const education = [
  {
    school: "Arizona State University",
    degree: "M.S. Information Technology",
    period: "2024–2025",
    location: "Tempe, Arizona",
  },
  {
    school: "Gujarat Technological University",
    degree: "B.E. Information Technology",
    period: "2019–2023",
    location: "Gujarat, India",
  },
] as const;

export const toolGroups = [
  {
    label: "Languages",
    skills: ["C++", "Java", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    label: "Frontend",
    skills: ["React", "HTML", "CSS"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "WebSockets"],
  },
  {
    label: "Data",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    label: "Cloud / Infrastructure",
    skills: ["AWS", "Docker", "Kubernetes", "GitHub Actions"],
  },
  {
    label: "Engineering",
    skills: ["Distributed Systems", "API Design", "Testing", "CI/CD", "Data Structures & Algorithms"],
  },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
