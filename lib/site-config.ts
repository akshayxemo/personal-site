export const siteConfig = {
  name: "Akshay Kumar Das",
  shortName: "Akshay Das",
  initials: "AKD",
  role: "Software Engineer | Full Stack & Mobile",
  tagline: "I build scalable products with React, Flutter, Node.js, and AWS.",
  description:
    "Software Engineer with hands-on experience building production web and mobile applications. Skilled in React, Next.js, Node.js, Flutter, GraphQL, AWS, and modern cloud architectures. Passionate about system design, developer experience, and shipping reliable products that solve real-world problems.",
  url: "https://akshaykumardas.vercel.app",
  location: "Kolkata, West Bengal, India",
  email: "iamakshaykumardas007@gmail.com",
  phone: "+91 9007998706",
  phoneHref: "+919007998706",
  availability: "Open to Software Engineering roles",
  resumePath: "/resume/akshay-kumar-das-resume.pdf",
  social: {
    github: "https://github.com/akshayxemo",
    linkedin: "https://www.linkedin.com/in/akshay-kumar-das-945405240/",
    email: "mailto:iamakshaykumardas007@gmail.com",
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
