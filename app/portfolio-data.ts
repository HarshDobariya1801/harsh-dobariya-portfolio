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
    category: "Systems",
    title: "Distributed Key-Value Store",
    diagram: "kv" as const,
  },
  {
    index: "02",
    category: "Real-time product",
    title: "Real-Time Collaborative Workspace",
    diagram: "realtime" as const,
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
