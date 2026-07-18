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
import imgMarques3D from "@/assets/marques3D.jpg.png";
import imgWall from "@/assets/walls.jpg.png";
import imgBrait from "@/assets/clinica.jpg.png";
import imgNoticia from "@/assets/noticia.jpg.jpeg";
import imgHersafe from "@/assets/hersafe.png";
import imgDama from "@/assets/dama.png";
import cruzeirodosulLogo from "@/assets/logo-cruzeiro-do-sul-estrela.png";
import obrasocialLogo from "@/assets/obrasocial.png";
import bradescoLogo from "@/assets/bradesco.jpg";
import awsLogo from "@/assets/aws.png";
import senaiLogo from "@/assets/senai.png";
import ifrsLogo from "@/assets/rio.png";

export const personal = {
  name: "Wallace Coimbra",
  role: "Desenvolvedor Full Stack",
  initials: "WC",
  tagline: "Construindo o futuro digital com precisão.",
  description:
    "Especialista em arquiteturas escaláveis e experiências de usuário de alto nível. Foco em transformar problemas complexos em soluções elegantes e performáticas.",
  email: "wallace.wcs83@gmail.com",
  location: "São Paulo, Brasil",
  cvUrl: "/Curriculo_Wallace_Coimbra.pdf",
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
    title: "Site Marques Makers 3D",
    description: `Loja virtual desenvolvida para apresentação e divulgação de produtos produzidos em impressão 3D. O projeto foi criado com foco em design moderno, navegação simples e responsividade.`,
    image: imgMarques3D,
    tags: ["HTML5", "CSS3"],
    themeColor: "#6366f1",
    github: "https://github.com/wallace-2105/site-marques-makers-3D",
    demo: "https://wallace-2105.github.io/site-marques-makers-3D/",
    features: [
      "Catálogo de produtos com lógica de orçamento",
      "Cálculo automático de valores por item",
      "Estrutura de loja virtual",
      "Layout responsivo",
      "Navegação simples e intuitiva",
    ],
  },
  {
    title: "Wall Seventy",
    description: `Projeto de uma loja de roupas desenvolvido com foco em visual moderno e experiência do usuário, apresentando uma interface limpa e estilizada.`,
    image: imgWall,
    tags: ["HTML5", "CSS3", "JavaScript"],
    themeColor: "#eab308",
    github: "https://github.com/wallace-2105/wall-saventy",
    demo: "https://wallace-2105.github.io/wall-saventy/",
    features: [
      "Carrinho de compras funcional",
      "Catálogo filtrado por categoria",
      "Design moderno e minimalista",
    ],
  },
  {
    title: "Clínica Eliane Brait",
    description: `Site institucional desenvolvido para uma clínica de ortopedia, pensado para funcionar perfeitamente tanto em computadores quanto em dispositivos móveis.`,
    image: imgBrait,
    tags: ["HTML5", "CSS3"],
    themeColor: "#10b981",
    github: "https://github.com/wallace-2105/clinica-eliane-brait",
    demo: "https://wallace-2105.github.io/clinica-eliane-brait/",
    features: [
      "Envio automático da solicitação via WhatsApp",
      "Formulário de agendamento por serviço e profissional",
      "Interface adaptada para mobile",
    ],
  },
  {
    title: "Verifica Notícia",
    description: `Sistema desenvolvido para análise de notícias e verificação de possíveis fake news através do processamento de textos e links enviados pelos usuários.`,
    image: imgNoticia,
    tags: ["HTML5", "CSS3", "JavaScript", "Node.js", "MongoDB"],
    themeColor: "#f97316",
    github: "https://github.com/wallace-2105/verifica-noticia",
    demo: "https://github.com/wallace-2105/verifica-noticia",
    features: [
      "Análise de links de notícias",
      "Processamento de texto",
      "Integração com APIs",
      "Validação e verificação de conteúdo",
      "Sistema completo com backend e banco de dados",
    ],
  },
  {
    title: "HerSafe",
    description: `Aplicativo mobile voltado para segurança feminina, permitindo compartilhamento de localização em tempo real com contatos de confiança e acionamento rápido de SOS em situações de emergência.`,
    image: imgHersafe,
    tags: ["TypeScript", "React Native", "JavaScript", "Node.js", "CSS3", "MongoDB"],
    themeColor: "#8b5cf6",
    github: "https://github.com/wallace-2105/hersafe",
    demo: "https://github.com/wallace-2105/hersafe",
    features: [
      "Compartilhamento de localização em tempo real",
      "Botão de SOS",
      "Alertas para contatos confiáveis",
      "Sistema inspirado em rastreamento familiar",
      "Estrutura mobile moderna",
      "Integração entre aplicativo e backend",
    ],
  },
  {
    title: "Dama — Python Edition",
    description: `Jogo de Damas (Checkers) clássico reconstruído do zero com Python e Pygame. Dois jogadores, captura obrigatória, sistema de Dama com coroa — tudo feito com lógica pura, sem frameworks prontos.`,
    image: imgDama,
    tags: ["Python", "Pygame"],
    themeColor: "#d4a76a",
    github: "https://github.com/wallace-2105/dama-python",
    demo: "https://github.com/wallace-2105/dama-python",
    features: [
      "Tabuleiro 8x8 com renderização gráfica via Pygame",
      "Sistema de captura obrigatória e captura múltipla",
      "Peça vira Dama ao alcançar a última linha",
      "Reinício rápido com tecla R",
      "Jogo local para dois jogadores",
      "100% Python — sem engine externa",
    ],
  },
];

export const aboutParagraphs = [
  "Sou estudante de Análise e Desenvolvimento de Sistemas e alguém que acredita no poder da tecnologia para simplificar desafios e criar novas oportunidades.",
  "Minha trajetória foi construída através da busca constante por aprendizado, evolução e novos conhecimentos. Gosto de explorar ideias, desenvolver projetos e enfrentar desafios que me permitam crescer tanto profissionalmente quanto pessoalmente.",
  "Mais do que escrever código, meu objetivo é criar soluções úteis, funcionais e que gerem valor para as pessoas. Estou sempre em busca de novas experiências, tecnologias e oportunidades que contribuam para minha evolução na área de desenvolvimento de software."
];

export const techStack: TechItem[] = [
  { name: "React", abbr: "RE", category: "Frontend" },
  { name: "JavaScript", abbr: "JS", category: "Linguagem" },
  { name: "Node.js", abbr: "ND", category: "Backend" },
  { name: "Java", abbr: "JV", category: "Linguagem" },
  { name: "Python", abbr: "PY", category: "Linguagem" },
  { name: "MongoDB", abbr: "MG", category: "Banco" },
  { name: "TypeScript", abbr: "TS", category: "Linguagem" },
  { name: "Tailwind CSS", abbr: "TW", category: "Estilização" },
  { name: "HTML", abbr: "HT", category: "Linguagem" },
  { name: "CSS", abbr: "CS", category: "Estilização" },
  { name: "MySQL", abbr: "MY", category: "Banco" },
  { name: "React Native", abbr: "RN", category: "Mobile" },
];

export const experiences: Experience[] = [
  {
    role: "Assistente de Operações | Suporte em Hardware e IoT",
    company: "Scope Technology",
    period: "2025 — Atual",
    shortDescription: "Atuação na área operacional e técnica, realizando suporte em dispositivos IoT, configuração de rastreadores, logística tecnológica e preparação de equipamentos para clientes.",
    description: `Atuação na área operacional e técnica, realizando suporte em dispositivos IoT, configuração de rastreadores, logística tecnológica e preparação de equipamentos para clientes.\n\nPrincipais atividades:\n• Configuração e preparação de dispositivos de rastreamento e equipamentos IoT.\n• Atualização e instalação de firmwares em diferentes aparelhos.\n• Configuração de chips 4G multioperadora, incluindo operadoras como Algar.\n• Testes funcionais e validação de equipamentos antes do envio.\n• Emissão de notas fiscais para logística e expedição.\n• Organização e controle logístico de dispositivos e materiais.\n• Separação, embalagem e envio de equipamentos para clientes.\n• Suporte técnico operacional em diferentes modelos de rastreadores.\n• Configuração de diversos dispositivos com necessidades específicas.\n• Apoio aos processos internos de operações e tecnologia.\n\nTecnologias e conhecimentos utilizados:\nHardware e dispositivos IoT, Configuração de rastreadores, Firmware e atualização de dispositivos, Redes móveis e chips 4G, Logística operacional, Emissão de notas fiscais, Suporte técnico, Controle e organização de equipamentos.\n\nCompetências desenvolvidas:\nSuporte técnico em hardware, Operações e logística, IoT e rastreamento, Configuração de dispositivos, Organização operacional, Resolução de problemas, Atenção técnica e analítica.`,
  },
  {
    role: "Operador de Máquina | Conferente",
    company: "Gold Pan",
    period: "2021 — 2025",
    shortDescription: "Atuação em indústria de panificação, operando máquinas industriais, controlando a produção, conferindo produtos e dando suporte logístico interno.",
    description: `Atuação em indústria de panificação, trabalhando diretamente na operação de máquinas industriais, controle de produção, conferência de produtos e suporte logístico interno da fábrica.\n\nPrincipais atividades:\n• Operação de diversas máquinas industriais da linha de produção.\n• Monitoramento de processos produtivos e controle operacional.\n• Conferência de produtos, materiais e pedidos.\n• Atuação em câmara fria e ambientes de armazenamento refrigerado.\n• Organização do setor produtivo e apoio na logística interna.\n• Controle de qualidade e acompanhamento da produção.\n• Separação e movimentação de materiais e mercadorias.\n• Apoio às demandas gerais da fábrica e da produção.\n\nCompetências desenvolvidas:\nOperação de máquinas industriais, Controle de produção, Conferência e logística, Trabalho em ambiente industrial, Organização e atenção aos detalhes, Adaptabilidade operacional, Trabalho em equipe.`,
  },
  {
    role: "Atendente de Restaurante | Auxiliar de Recebimento",
    company: "McDonald's",
    period: "2019 — 2021",
    shortDescription: "Atuação multifuncional no ambiente operacional do restaurante, focando em atendimento ao público, organização, agilidade e trabalho em equipe em um ambiente de alta demanda.",
    description: `Atuação multifuncional no ambiente operacional do restaurante, desenvolvendo experiência em atendimento ao público, organização, agilidade e trabalho em equipe em um ambiente de alta demanda.\n\nPrincipais atividades:\n• Atendimento ao cliente no balcão e apoio nos pedidos.\n• Preparação de alimentos e suporte na cozinha.\n• Organização e limpeza do ambiente, seguindo padrões de higiene e qualidade.\n• Auxílio no recebimento e armazenamento de mercadorias.\n• Controle básico de estoque e reposição de produtos.\n• Trabalho em equipe com foco em rapidez, qualidade e atendimento eficiente.\n• Suporte geral às operações do restaurante durante horários de pico.\n\nCompetências desenvolvidas:\nAtendimento ao cliente, Organização operacional, Trabalho sob pressão, Agilidade e produtividade, Trabalho em equipe, Responsabilidade e disciplina operacional.`,
  },
];

export const education: Education[] = [
  {
    title: "Análise e Desenvolvimento de Sistemas",
    institution: "Cruzeiro do Sul",
    period: "2025 — 2026",
    type: "Tecnólogo",
    description: "Formação voltada para criação de sistemas, desenvolvimento web, banco de dados, programação e boas práticas de tecnologia utilizadas pelo mercado.",
    logo: cruzeirodosulLogo,
  },
  {
    title: "Eletricista Predial de Baixa Tensão",
    institution: "Obra Social Dom Bosco",
    period: "2015 — 2016",
    type: "Técnico",
    description: "Capacitação prática em instalações elétricas, interpretação de diagramas, manutenção preventiva e corretiva, com foco em segurança e qualidade dos serviços.",
    logo: obrasocialLogo,
  },
];

export const languages: Language[] = [
  { name: "Português", level: "Nativo" },
  { name: "Inglês", level: "Intermediário" },
  { name: "Espanhol", level: "Básico" },
];

export const certificates: Certificate[] = [
  {
    title: "Git e GitHub",
    issuer: "Fundação Bradesco",
    year: "2026",
    type: "certification",
    image: bradescoLogo,
    glowColor: "#CC092F",
    skills: ["Branch", "Commit", "Pull Request", "Open Source", "DevOps", "Version Control"],
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "AWS Skill Builder",
    year: "2026",
    type: "certification",
    image: awsLogo,
    glowColor: "#FF9900",
    skills: ["Cloud Computing", "EC2", "S3", "Infrastructure", "Cloud Services", "Security"],
  },
  {
    title: "SQL",
    issuer: "Fundação Bradesco",
    year: "2026",
    type: "certification",
    image: bradescoLogo,
    glowColor: "#CC092F",
    skills: ["PostgreSQL", "Relational Database", "MySQL"],
  },
  {
    title: "Power BI",
    issuer: "SENAI",
    year: "2024",
    type: "course",
    image: senaiLogo,
    glowColor: "#E3000F",
    url: "/certificado-powerbi.pdf",
    skills: ["Data Analysis", "Dashboards", "DAX", "Business Intelligence"],
  },
  {
    title: "Fundamentos para Desenvolvimento Web Interativo",
    issuer: "Instituto Federal do Rio Grande do Sul (IFRS)",
    year: "2024",
    type: "course",
    image: ifrsLogo,
    glowColor: "#32A041",
    url: "/certificado-javascript.pdf",
    skills: ["JavaScript", "Lógica de Programação", "Web Interativo"],
  },
  {
    title: "HTML e CSS na Prática",
    issuer: "Fundação Bradesco",
    year: "2024",
    type: "course",
    image: bradescoLogo,
    glowColor: "#CC092F",
    url: "/certificado-bradesco.pdf",
    skills: ["HTML5", "CSS3", "Web Design"],
  },
];

export const tools: Tool[] = [
  { name: "Figma", category: "Avançado", color: "#F24E1E" },
  { name: "Claude Code", category: "Avançado", color: "#D97757" },
  { name: "Antigravity", category: "Avançado", color: "#4285F4" },
  { name: "Expo", category: "Avançado", color: "#181717" },
  { name: "Git", category: "Intermediário", color: "#F05032" },
  { name: "GitHub", category: "Avançado", color: "#181717" },
  { name: "FastAPI", category: "Intermediário", color: "#009688" },
  { name: "Visual Studio Code", category: "Avançado", color: "#007ACC" },
  { name: "Canva", category: "Avançado", color: "#00C4CC" },
  { name: "Codex", category: "Avançado", color: "#10A37F" },
  { name: "Aceternity UI", category: "Intermediário", color: "#181717" },
  { name: "Windows", category: "Avançado", color: "#0078D4" },
  { name: "Microsoft Word", category: "Intermediário", color: "#2B579A" },
  { name: "Microsoft Excel", category: "Intermediário", color: "#217346" },
  { name: "Microsoft PowerPoint", category: "Intermediário", color: "#D24726" },
  { name: "Microsoft Teams", category: "Avançado", color: "#6264A7" },
  { name: "Power BI", category: "Intermediário", color: "#F2C811" },
  { name: "Cloudflare", category: "Intermediário", color: "#F38020" },
];

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/wallace-2105", icon: "Github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/wallace-coimbra2105/", icon: "Linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/wall_70_/", icon: "Instagram" },
  { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=wallace.wcs83@gmail.com", icon: "Mail" },
];
