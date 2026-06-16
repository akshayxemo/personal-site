export interface Certification {
  title: string
  issuer: string
  issued: string
  credentialId?: string
  url?: string
  skills: string[]
}

export const certifications: Certification[] = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    issued: "2024",
    credentialId: "AWS-ASA-2024-AKD",
    url: "https://aws.amazon.com/certification/",
    skills: ["AWS", "Cloud Architecture", "Scalability", "Security"],
  },
  {
    title: "Professional Cloud Developer",
    issuer: "Google Cloud",
    issued: "2023",
    credentialId: "GCP-PCD-2023-AKD",
    url: "https://cloud.google.com/certification",
    skills: ["GCP", "Kubernetes", "CI/CD", "Microservices"],
  },
  {
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta",
    issued: "2022",
    credentialId: "META-FED-2022-AKD",
    url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    skills: ["React", "JavaScript", "UI/UX", "Version Control"],
  },
  {
    title: "MongoDB Associate Developer",
    issuer: "MongoDB University",
    issued: "2022",
    credentialId: "MDB-AD-2022-AKD",
    url: "https://university.mongodb.com/",
    skills: ["MongoDB", "Data Modeling", "Aggregation", "Indexing"],
  },
  {
    title: "Certified Kubernetes Application Developer (CKAD)",
    issuer: "Cloud Native Computing Foundation",
    issued: "2023",
    credentialId: "CKAD-2023-AKD",
    url: "https://www.cncf.io/certification/ckad/",
    skills: ["Kubernetes", "Containers", "Helm", "Observability"],
  },
  {
    title: "Professional Scrum Developer I",
    issuer: "Scrum.org",
    issued: "2021",
    credentialId: "PSD-I-2021-AKD",
    url: "https://www.scrum.org/",
    skills: ["Agile", "Scrum", "TDD", "Collaboration"],
  },
]
