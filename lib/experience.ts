export interface ExperienceItem {
  company: string
  role: string
  type: "Full-time" | "Contract" | "Freelance" | "Internship"
  location: string
  start: string
  end: string
  current?: boolean
  summary: string
  highlights: string[]
  stack: string[]
}

export const experience: ExperienceItem[] = [
  {
    company: "EMPWR by Wellness Connection",
    role: "Software Development Engineer",
    type: "Full-time",
    location: "Kolkata, India",
    start: "Aug 2024",
    end: "Present",
    current: true,
    summary:
      "Building scalable healthcare web and mobile applications across React, Flutter, Node.js, GraphQL, and AWS. Contributing to backend architecture, health-data integrations, CMS modernization, and end-to-end feature delivery for production systems.",
    highlights: [
      "Designed and implemented the BH Assessment engine, enabling dynamic questionnaire flows through branching logic, runtime conditions, and score-based evaluation.",
      "Built wearable health-data synchronization workflows integrating Android Health Connect and Apple Health with background sync and event-driven processing.",
      "Developed AWS-based event-driven services using Lambda, EventBridge, API Gateway, and S3 to improve scalability and service decoupling.",
      "Led migration from Keystone CMS to Payload CMS, improving content management workflows and platform maintainability.",
      "Implemented real-time features using Firebase Realtime Database for notifications, live updates, and system-state synchronization.",
      "Contributed across Flutter, React, Node.js, and GraphQL to deliver production-ready features for web and mobile applications.",
    ],
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "GraphQL",
      "Flutter",
      "AWS",
      "Firebase",
      "Payload CMS",
      "MongoDB",
    ],
  },
  {
    company: "EMPWR by Wellness Connection",
    role: "Software Development Engineer Intern",
    type: "Internship",
    location: "Kolkata, India",
    start: "Apr 2024",
    end: "Jul 2024",
    summary:
      "Worked on frontend and full-stack feature development for healthcare applications, contributing to dashboards, APIs, and reusable component systems.",
    highlights: [
      "Built patient overview dashboards using React and Chart.js to visualize medical and health-related data.",
      "Developed reusable UI components to accelerate feature delivery and improve maintainability.",
      "Rapidly learned Flutter and delivered production mobile features within the first month.",
      "Implemented React Query caching strategies to improve responsiveness and reduce redundant API requests.",
      "Developed and tested GraphQL APIs to improve frontend-backend communication and data-fetching efficiency.",
    ],
    stack: [
      "React",
      "TypeScript",
      "GraphQL",
      "React Query",
      "Chart.js",
      "Flutter",
      "Node.js",
    ],
  },
  {
    company: "Freelance",
    role: "Graphics Designer",
    type: "Freelance",
    location: "Remote",
    start: "2019",
    end: "2024",
    summary:
      "Created visual designs, branding, and marketing materials for startups and small businesses.",
    highlights: [
      "Designed logos, social media graphics, and print materials for 20+ clients.",
      "Collaborated with clients to understand their brand identity and translate it into cohesive visual systems.",
    ],
    stack: ["Figma", "Adobe Photoshop", "Adobe Illustrator"],
  },
]
