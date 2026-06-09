export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  themeColor?: string;
  features?: string[];
}

export interface TechItem {
  name: string;
  abbr: string;
  category: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  bullets?: string[];
}

export interface Education {
  title: string;
  institution: string;
  period: string;
  description?: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
}

export interface Tool {
  name: string;
  category: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
