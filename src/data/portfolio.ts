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
    role: "Assistente de Operações | Suporte em Hardware e IoT",
    company: "Scope Technology",
    period: "2025 — Atual",
    description: `Atuação na área operacional e técnica, realizando suporte em dispositivos IoT, configuração de rastreadores, logística tecnológica e preparação de equipamentos para clientes.\n\nPrincipais atividades:\n• Configuração e preparação de dispositivos de rastreamento e equipamentos IoT.\n• Atualização e instalação de firmwares em diferentes aparelhos.\n• Configuração de chips 4G multioperadora, incluindo operadoras como Algar.\n• Testes funcionais e validação de equipamentos antes do envio.\n• Emissão de notas fiscais para logística e expedição.\n• Organização e controle logístico de dispositivos e materiais.\n• Separação, embalagem e envio de equipamentos para clientes.\n• Suporte técnico operacional em diferentes modelos de rastreadores.\n• Configuração de diversos dispositivos com necessidades específicas.\n• Apoio aos processos internos de operações e tecnologia.\n\nTecnologias e conhecimentos utilizados:\nHardware e dispositivos IoT, Configuração de rastreadores, Firmware e atualização de dispositivos, Redes móveis e chips 4G, Logística operacional, Emissão de notas fiscais, Suporte técnico, Controle e organização de equipamentos.\n\nCompetências desenvolvidas:\nSuporte técnico em hardware, Operações e logística, IoT e rastreamento, Configuração de dispositivos, Organização operacional, Resolução de problemas, Atenção técnica e analítica.`,
  },
  {
    role: "Operador de Máquina / Conferente",
    company: "Gold Pan",
    period: "2021 — 2025",
    description: `Atuação em indústria de panificação, trabalhando diretamente na operação de máquinas industriais, controle de produção, conferência de produtos e suporte logístico interno da fábrica.\n\nPrincipais atividades:\n• Operação de diversas máquinas industriais da linha de produção.\n• Monitoramento de processos produtivos e controle operacional.\n• Conferência de produtos, materiais e pedidos.\n• Atuação em câmara fria e ambientes de armazenamento refrigerado.\n• Organização do setor produtivo e apoio na logística interna.\n• Controle de qualidade e acompanhamento da produção.\n• Separação e movimentação de materiais e mercadorias.\n• Apoio às demandas gerais da fábrica e da produção.\n\nCompetências desenvolvidas:\nOperação de máquinas industriais, Controle de produção, Conferência e logística, Trabalho em ambiente industrial, Organização e atenção aos detalhes, Adaptabilidade operacional, Trabalho em equipe.`,
  },
  {
    role: "Atendente de Restaurante / Auxiliar de Recebimento",
    company: "McDonald's",
    period: "2019 — 2021",
    description: `Atuação multifuncional no ambiente operacional do restaurante, desenvolvendo experiência em atendimento ao público, organização, agilidade e trabalho em equipe em um ambiente de alta demanda.\n\nPrincipais atividades:\n• Atendimento ao cliente no balcão e apoio nos pedidos.\n• Preparação de alimentos e suporte na cozinha.\n• Organização e limpeza do ambiente, seguindo padrões de higiene e qualidade.\n• Auxílio no recebimento e armazenamento de mercadorias.\n• Controle básico de estoque e reposição de produtos.\n• Trabalho em equipe com foco em rapidez, qualidade e atendimento eficiente.\n• Suporte geral às operações do restaurante durante horários de pico.\n\nCompetências desenvolvidas:\nAtendimento ao cliente, Organização operacional, Trabalho sob pressão, Agilidade e produtividade, Trabalho em equipe, Responsabilidade e disciplina operacional.`,
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
