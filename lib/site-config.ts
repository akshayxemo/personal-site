export const siteConfig = {
  "name": "Akshay Kumari Das",
  "shortName": "Akshay Das",
  "initials": "AD",
  "role": "Senior Full Stack Engineer",
  "tagline": "I build fast, reliable, and accessible web products end to end.",
  "description": "Senior Full Stack Engineer specializing in TypeScript, React, Next.js, and Node.js. I design and ship production-grade web applications, design systems, and developer tooling.",
  "url": "https://akshaykumardas.vercel.app",
  "location": "Kolkata, West Bengal, India",
  "email": "iamakshaykumardas007@gmail.com",
  "phone": "+91 9007998706",
  "phoneHref": "+919007998706",
  "availability": "Open to senior full-stack & platform roles",
  "resumePath": "/resume/akshay-kumar-das-resume.pdf",
  "social": {
    "github": "https://github.com/akshayxemo",
    "linkedin": "https://www.linkedin.com/in/akshay-kumar-das-945405240/",
    "email": "mailto:iamakshaykumardas007@gmail.com"
  },
  "nav": [
    {
      "title": "Home",
      "href": "/"
    },
    {
      "title": "About",
      "href": "/about"
    },
    {
      "title": "Projects",
      "href": "/projects"
    },
    {
      "title": "Articles",
      "href": "/articles"
    },
    {
      "title": "Experience",
      "href": "/experience"
    },
    {
      "title": "Certifications",
      "href": "/certifications"
    },
    {
      "title": "Resume",
      "href": "/resume"
    },
    {
      "title": "Contact",
      "href": "/contact"
    }
  ]
} as const

export type SiteConfig = typeof siteConfig
