export const profile = {
  name: "Harsh Dobariya",
  email: "dobariyaharsh10@gmail.com",
  phone: "+16232977900",
  phoneLabel: "+1 (623) 297-7900",
  linkedin: "https://www.linkedin.com/in/harsh-dobariya-962238183/",
  github: "https://github.com/HarshDobariya1801",
  location: "Tempe, Arizona, USA",
};

export const projects = [
  {
    index: "01",
    slug: "distributed-key-value-store",
    category: "Systems",
    title: "Distributed Key-Value Store",
    summary:
      "A concurrent in-memory database built around TCP communication, bounded worker execution, explicit data lifecycles, and recoverable persistence.",
    outcome:
      "An in-memory C++ database designed for concurrent clients, bounded memory, persistence, and recovery.",
    stack: ["C++", "TCP/IP", "Multithreading", "CMake"],
    engineering: [
      "Thread pool for concurrent clients",
      "TTL expiration and LRU eviction",
      "Append-only persistence",
      "Crash recovery",
      "p95 and p99 latency benchmarking",
    ],
    diagram: "kv" as const,
    repositoryUrl: null as string | null,
    demoUrl: null as string | null,
    visualPlaceholder: null,
    resultsPlaceholder:
      "Add verified throughput, p50/p95/p99 latency, dataset size, concurrency level, hardware, and test methodology.",
    nextStepsPlaceholder:
      "Add the concrete improvements you would prioritize next, such as replication, sharding, compaction, or stronger consistency guarantees.",
    caseStudy: {
      overview:
        "This project treats a key-value store as a complete systems problem: accept concurrent network traffic, keep memory bounded, expire stale data, persist mutations, and recover cleanly after a restart.",
      problem:
        "A fast in-memory map is only the center of the system. The harder work is coordinating clients, background lifecycle rules, eviction, persistence, and recovery without losing predictable behavior under load.",
      built: [
        "A TCP server for multiple concurrent clients",
        "A reusable thread pool for bounded request execution",
        "TTL expiration and least-recently-used eviction",
        "An append-only persistence path with crash recovery",
        "A benchmark harness focused on tail latency",
      ],
      decisions: [
        "Bound concurrency with a worker pool instead of creating unbounded execution for every connection.",
        "Treat expiration and eviction as part of the storage model rather than as presentation-layer cleanup.",
        "Favor an append-only durability path that is simple to replay and inspect after failure.",
      ],
      tradeoffs:
        "The append-only approach prioritizes simple writes and understandable recovery over compact storage. LRU and TTL also add coordination work, but keep memory behavior explicit instead of leaving growth unbounded.",
      reliability:
        "Recovery rebuilds state from persisted operations after a process failure. The project also separates request execution from storage responsibilities so failure boundaries are easier to reason about.",
      performance:
        "Benchmarking tracks p95 and p99 latency under concurrent load. Tail measurements make queueing and contention visible in a way that average response time cannot.",
      learned:
        "The useful lesson was that speed, durability, and bounded resource use are one design problem. A local optimization is not valuable if it makes recovery or concurrency harder to trust.",
    },
  },
  {
    index: "02",
    slug: "realtime-collaborative-workspace",
    category: "Real-time product",
    title: "Real-Time Collaborative Workspace",
    summary:
      "A multi-user workspace that keeps presence, edits, permissions, autosave, and version history synchronized across horizontally scaled application instances.",
    outcome:
      "A real-time product that keeps presence, edits, permissions, autosave, and history synchronized across application instances.",
    stack: ["TypeScript", "React", "Node.js", "WebSockets", "Redis", "PostgreSQL"],
    engineering: [
      "WebSocket synchronization",
      "Optimistic interface updates",
      "Redis Pub/Sub fan-out",
      "Autosave and version history",
      "Role-based access",
    ],
    diagram: "realtime" as const,
    repositoryUrl: null as string | null,
    demoUrl: null as string | null,
    visualPlaceholder: "Add a 1600 × 1000 product screenshot or a short optimized demo recording.",
    resultsPlaceholder:
      "Add verified concurrent-user counts, event latency, reconnect behavior, load-test conditions, and production or demo environment details.",
    nextStepsPlaceholder:
      "Add the concrete product or systems improvements you would build next, based on what you learned from this version.",
    caseStudy: {
      overview:
        "The workspace combines a responsive React interface with a real-time delivery path so multiple people can work in the same product without waiting on full-page refreshes.",
      problem:
        "Collaboration introduces more than live messages. The interface must stay responsive while the backend coordinates presence, updates, durable data, permissions, autosave, and history across more than one application instance.",
      built: [
        "A React interface with optimistic updates",
        "A Node.js WebSocket layer for live presence and edits",
        "Redis Pub/Sub for communication across instances",
        "PostgreSQL persistence for durable workspace data",
        "Autosave, version history, and role-based access",
      ],
      decisions: [
        "Use optimistic updates to keep direct manipulation responsive while server work completes.",
        "Use Redis Pub/Sub for event fan-out, while PostgreSQL remains the durable source of record.",
        "Keep version history and autosave explicit so real-time delivery does not replace durability.",
      ],
      tradeoffs:
        "Pub/Sub is effective for live delivery but is not durable storage. The architecture keeps ephemeral distribution separate from persisted workspace state, accepting a little more coordination for clearer responsibilities.",
      reliability:
        "Durable state lives in PostgreSQL, while version history gives users a path back when a live edit is wrong. Permissions are enforced as part of the product model rather than added only in the interface.",
      performance:
        "Optimistic updates shorten perceived latency, and the WebSocket path avoids repeated polling. Redis lets live events reach clients connected to different Node.js instances.",
      learned:
        "Real-time behavior is a product promise backed by systems choices. Fast delivery matters, but users trust the product only when permissions, persistence, and recovery remain understandable.",
    },
  },
] as const;

export type Project = (typeof projects)[number];

export const experience = [
  {
    index: "01",
    company: "Ninja Technolabs",
    role: "Software Engineer, Full Stack",
    period: "Jan 2023 – Nov 2023",
    location: "Ahmedabad, India",
    stack: "React · Node.js · MySQL",
    summary:
      "Modernized a billing system used by around 3,000 users.",
    impact: [
      { value: "15%", label: "fewer invoice propagation errors" },
      { value: "2,000+", label: "invoices migrated each month" },
      { value: "28%", label: "less duplicated interface code" },
      { value: "70%+", label: "test coverage on core flows" },
    ],
  },
  {
    index: "02",
    company: "BrainyBeam Technologies",
    role: "Software Engineer Intern",
    period: "Aug 2022 – Nov 2022",
    location: "Ahmedabad, India",
    stack: "Python · Search · Data tooling",
    summary:
      "Helped build internal search and data tools for analysts.",
    impact: [
      { value: "35%", label: "faster PR-to-production process" },
      { value: "20+", label: "analysts supported" },
    ],
  },
  {
    index: "03",
    company: "Freelance",
    role: "Web Developer",
    period: "Jan 2022 – Jul 2022",
    location: "Ahmedabad, India",
    stack: "React · Node.js · REST APIs",
    summary:
      "Built a React and Node.js application for a client.",
    impact: [{ value: "25%", label: "improvement in Lighthouse LCP" }],
  },
] as const;

export const toolGroups = [
  {
    label: "Languages",
    skills: [
      { name: "C++", strong: true },
      { name: "TypeScript", strong: true },
      { name: "Java", strong: false },
      { name: "Python", strong: false },
      { name: "JavaScript", strong: false },
      { name: "SQL", strong: true },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React", strong: true },
      { name: "HTML", strong: false },
      { name: "CSS", strong: false },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", strong: true },
      { name: "Express", strong: false },
      { name: "REST APIs", strong: true },
      { name: "WebSockets", strong: true },
    ],
  },
  {
    label: "Data",
    skills: [
      { name: "PostgreSQL", strong: true },
      { name: "MySQL", strong: false },
      { name: "Redis", strong: true },
      { name: "MongoDB", strong: false },
    ],
  },
  {
    label: "Cloud / DevOps",
    skills: [
      { name: "AWS", strong: true },
      { name: "Docker", strong: true },
      { name: "Kubernetes", strong: false },
      { name: "GitHub Actions", strong: false },
    ],
  },
] as const;
