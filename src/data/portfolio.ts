import type {
  NavLink,
  Project,
  TechItem,
  Experience,
  Education,
  Language,
  Certificate,
  Tool,
  SocialLink,
} from "@/types/portfolio";
import projectNexus from "@/assets/project-nexus.jpg";
import projectLumina from "@/assets/project-lumina.jpg";
import projectOrbit from "@/assets/project-orbit.jpg";

export const personal = {
  name: "Wallace Coimbra",
  role: "Desenvolvedor Full Stack Sênior",
  initials: "WC",
  tagline: "Construindo o futuro digital com precisão.",
  description:
    "Especialista em arquiteturas escaláveis e experiências de usuário de alto nível. Foco em transformar problemas complexos em soluções elegantes e performáticas.",
  email: "wallace.wcs83@gmail.com",
  location: "São Paulo, Brasil",
  cvUrl: "/cv.pdf",
};

export const navLinks: NavLink[] = [
  { label: "Projetos", href: "#projects" },
  { label: "Sobre", href: "#about" },
  { label: "Experiência", href: "#experience" },
  { label: "Formação", href: "#education" },
  { label: "Contato", href: "#contact" },
];

export const projects: Project[] = [
  {
    title: "Nexus Fintech Platform",
    description:
      "Sistema de gestão financeira em tempo real com dashboards dinâmicos e segurança de ponta.",
    image: projectNexus,
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Lumina E-commerce",
    description:
      "Plataforma de e-commerce minimalista focada em performance e experiência de compra fluida.",
    image: projectLumina,
    tags: ["Next.js", "Tailwind", "Stripe"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Orbit Analytics Suite",
    description:
      "Suite SaaS de analytics com pipelines de dados em tempo real e visualizações customizáveis.",
    image: projectOrbit,
    tags: ["React", "GraphQL", "AWS"],
    github: "https://github.com",
    demo: "https://example.com",
  },
];

export const aboutParagraphs = [
  "Sou desenvolvedor há mais de 8 anos, com paixão por construir produtos digitais que combinam excelência técnica e design atencioso. Trabalho com equipes multidisciplinares entregando soluções robustas para startups e empresas de tecnologia.",
  "Meu foco está em arquiteturas escaláveis, qualidade de código e mentoria técnica. Acredito que software de alta qualidade nasce da combinação entre engenharia disciplinada e empatia pelo usuário final.",
];

export const techStack: TechItem[] = [
  { name: "TypeScript", abbr: "TS", category: "Linguagem" },
  { name: "React", abbr: "RE", category: "Frontend" },
  { name: "Next.js", abbr: "NX", category: "Framework" },
  { name: "Tailwind", abbr: "TW", category: "Estilização" },
  { name: "Node.js", abbr: "ND", category: "Backend" },
  { name: "PostgreSQL", abbr: "PG", category: "Banco" },
  { name: "GraphQL", abbr: "GQ", category: "API" },
  { name: "Docker", abbr: "DK", category: "DevOps" },
  { name: "AWS", abbr: "AW", category: "Cloud" },
  { name: "Redis", abbr: "RD", category: "Cache" },
  { name: "Python", abbr: "PY", category: "Linguagem" },
  { name: "Go", abbr: "GO", category: "Linguagem" },
];

export const experiences: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "Global Tech Solutions",
    period: "2021 — Presente",
    description:
      "Liderança técnica de equipes multidisciplinares no desenvolvimento de microserviços escaláveis e otimização de performance de sistemas críticos.",
  },
  {
    role: "Full Stack Developer",
    company: "Innovative Startup Hub",
    period: "2018 — 2021",
    description:
      "Desenvolvimento de aplicações web complexas com React e Node.js, com foco em UI/UX e integração de APIs de terceiros.",
  },
  {
    role: "Frontend Developer",
    company: "Pixel Studio",
    period: "2016 — 2018",
    description:
      "Construção de interfaces responsivas e acessíveis para clientes de e-commerce e mídia, com forte atenção a performance e SEO.",
  },
];

export const education: Education[] = [
  {
    title: "Bacharelado em Ciência da Computação",
    institution: "Universidade Federal",
    period: "2012 — 2016",
    description: "Foco em algoritmos, sistemas distribuídos e engenharia de software.",
  },
  {
    title: "Pós-graduação em Arquitetura de Software",
    institution: "Instituto de Tecnologia",
    period: "2019 — 2020",
    description: "Padrões de arquitetura, microserviços e escalabilidade.",
  },
];

export const languages: Language[] = [
  { name: "Português", level: "Nativo" },
  { name: "Inglês", level: "Avançado (C1)" },
  { name: "Espanhol", level: "Intermediário (B1)" },
];

export const certificates: Certificate[] = [
  { title: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2023" },
  { title: "Professional Scrum Master I", issuer: "Scrum.org", year: "2022" },
  { title: "Advanced React Patterns", issuer: "Frontend Masters", year: "2022" },
  { title: "System Design for Senior Engineers", issuer: "Educative", year: "2021" },
];

export const tools: Tool[] = [
  { name: "VS Code", category: "Desenvolvimento" },
  { name: "Git & GitHub", category: "Desenvolvimento" },
  { name: "Linear", category: "Produtividade" },
  { name: "Notion", category: "Produtividade" },
  { name: "Figma", category: "Design" },
  { name: "Postman", category: "Desenvolvimento" },
  { name: "Slack", category: "Comunicação" },
  { name: "Vercel", category: "Deploy" },
];

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/wallace-2105", icon: "Github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/wallace-coimbra2105/", icon: "Linkedin" },
  { label: "Twitter", href: "https://twitter.com", icon: "Twitter" },
  { label: "Email", href: "mailto:wallace.wcs83@gmail.com", icon: "Mail" },
];
