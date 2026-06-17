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
    title: "HIPAA Compliance: A Complete Guide",
    issuer: "Alison",
    issued: "2025",
    credentialId: "6019-46799185",
    url: "https://alison.com/certification/check/dda192d475",
    skills: ["HIPAA", "Compliance", "Security"],
  },
  {
    title: "Cloud Foundation",
    issuer: "Great Learning",
    issued: "2023",
    credentialId: "BCVRSPSD",
    url: "https://www.mygreatlearning.com/certificate/BCVRSPSD?referrer_code=GLQWOZORJVMPO",
    skills: ["Cloud", "Cloud Computing", "Cloud Applications", "Microservices"],
  },
  {
    title: "Graphics & Web Designing",
    issuer: "Hi Tech Animation",
    issued: "2020",
    skills: ["Graphics Design", "Web Design", "UI/UX", "Version Control"],
  },
]
