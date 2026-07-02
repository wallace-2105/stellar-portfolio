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
  shortDescription?: string;
  description: string;
  bullets?: string[];
}

export interface Education {
  title: string;
  institution: string;
  period: string;
  description?: string;
  type?: string;
  logo?: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  skills?: string[];
  image?: string;
  type?: "certification" | "course";
}

export interface Tool {
  name: string;
  category: string;
  color?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
