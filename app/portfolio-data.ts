export const profile = {
  name: "Harsh Dobariya",
  email: "dobariyaharsh10@gmail.com",
  linkedin: "https://www.linkedin.com/in/harsh-dobariya-962238183/",
  github: "https://github.com/HarshDobariya1801",
  location: "Tempe, Arizona, USA",
};

export const experience = [
  {
    company: "Community Dreams Foundation",
    role: "Software Developer",
    period: "Feb 2026 - Present",
    location: "Remote, USA",
    summary:
      "Building and maintaining React workflows, REST APIs, task tracking, forms, and user-facing dashboards for volunteer and project operations.",
    metrics: [],
  },
  {
    company: "Ninja Technolabs",
    role: "Software Engineer, Full Stack",
    period: "Jan 2023 - Nov 2023",
    location: "Ahmedabad, India",
    summary:
      "Reworked a legacy billing workflow across React, Node.js, and MySQL, improving how invoices moved through a product used by approximately 3,000 people each month.",
    metrics: [
      { value: "15%", label: "fewer invoice propagation errors" },
      { value: "2,000+", label: "invoices processed monthly" },
      { value: "28%", label: "less duplicate UI code" },
      { value: "70%+", label: "test coverage on core flows" },
    ],
  },
  {
    company: "BrainyBeam Technologies",
    role: "Software Engineer Intern",
    period: "Aug 2022 - Nov 2022",
    location: "Ahmedabad, India",
    summary:
      "Consolidated MySQL data for internal search and visualization tools, then improved the CI/CD path from pull request to production.",
    metrics: [
      { value: "20+", label: "analysts supported" },
      { value: "35%", label: "faster PR-to-production workflow" },
    ],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "Jan 2022 - Jul 2022",
    location: "Ahmedabad, India",
    summary:
      "Built a React and Node.js application with REST APIs and authentication for a startup client.",
    metrics: [
      { value: "25%", label: "improvement in Lighthouse LCP" },
    ],
  },
] as const;

export const toolGroups = [
  { label: "Languages", tools: ["C++", "Java", "Python", "TypeScript", "JavaScript", "SQL"] },
  { label: "Frontend", tools: ["React", "Next.js", "HTML", "CSS"] },
  { label: "Backend", tools: ["Node.js", "Express", "REST APIs", "WebSockets"] },
  { label: "Data", tools: ["PostgreSQL", "MySQL", "Redis", "MongoDB"] },
  { label: "Cloud / DevOps", tools: ["AWS", "Docker", "Kubernetes", "GitHub Actions"] },
] as const;

export const education = [
  {
    school: "Arizona State University",
    degree: "M.S. Information Technology",
    period: "2024 - 2025",
    location: "Tempe, Arizona",
  },
  {
    school: "Gujarat Technological University",
    degree: "B.E. Information Technology",
    period: "2019 - 2023",
    location: "Gujarat, India",
  },
] as const;
