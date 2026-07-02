import { motion } from "framer-motion";
import { tools } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { useState } from "react";

// ─── SVG logos for tools ────────────────────────────────────────────────────
const TOOL_LOGOS: Record<string, React.ReactNode> = {
  Figma: (
    <svg className="w-full h-full" viewBox="0 0 38 57" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  ),
  "Claude Code": (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="40" fill="#D97757" />
      <path d="M128 50c-43 0-78 35-78 78s35 78 78 78 78-35 78-78-35-78-78-78zm0 130c-28.7 0-52-23.3-52-52s23.3-52 52-52 52 23.3 52 52-23.3 52-52 52z" fill="white" opacity="0.9" />
      <circle cx="128" cy="128" r="20" fill="white" />
    </svg>
  ),
  "Antigravity Avançado": (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="40" fill="#4285F4" />
      <path d="M128 60l-60 100h40v36l60-100h-40V60z" fill="white" />
    </svg>
  ),
  "Expo Go": (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="40" fill="#000020" />
      <path d="M128 60c-6 0-11 3-14 8L68 148c-6 10 1 22 14 22h92c13 0 20-12 14-22l-46-80c-3-5-8-8-14-8z" fill="white" />
    </svg>
  ),
  Git: (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <path d="M251.17 116.6L139.4 4.82a16.49 16.49 0 00-23.31 0l-23.21 23.2 29.44 29.45a19.57 19.57 0 0124.8 24.96l28.37 28.38a19.61 19.61 0 11-11.75 11.06L137.28 95.4v69.64a19.62 19.62 0 11-16.13-.57V93.98a19.62 19.62 0 01-10.65-25.73L82.18 39.94 4.83 117.29a16.49 16.49 0 000 23.31L116.6 252.38a16.49 16.49 0 0023.32 0l111.25-111.25a16.5 16.5 0 000-23.32" fill="#F05032" />
    </svg>
  ),
  GitHub: (
    <svg className="w-full h-full" viewBox="0 0 256 250" xmlns="http://www.w3.org/2000/svg">
      <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.17 0-3.049-.115-13.111-.174-23.759-35.623 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5.008-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.04-4.311 10.88.053 21.837 1.475 32.066 4.311 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.395 8.793 6.14C219.37 232.5 256 184.537 256 128.001 256 57.307 198.691 0 128.001 0" fill="currentColor" />
    </svg>
  ),
  FastAPI: (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="40" fill="#009688" />
      <path d="M140 48l-52 80h40l-12 80 52-80h-40l12-80z" fill="white" />
    </svg>
  ),
  "Visual Studio Code": (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vscg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#2489CA" offset="0%" />
          <stop stopColor="#0065A9" offset="100%" />
        </linearGradient>
      </defs>
      <path d="M180.7 8.1l-121 93.5L25 72.7 0 85.8v84.4l25 13.1 34.7-28.9 121 93.5L256 225V31L180.7 8.1zM45.3 128l46.4-35.9v71.8L45.3 128zM180.7 196.6l-72.3-55.9h-.1L180.7 93V196.6z" fill="url(#vscg)" />
    </svg>
  ),
  Canva: (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="40" fill="#00C4CC" />
      <path d="M128 60c-37.6 0-68 30.4-68 68s30.4 68 68 68 68-30.4 68-68-30.4-68-68-68zm0 110c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42z" fill="white" />
      <circle cx="128" cy="128" r="16" fill="white" />
    </svg>
  ),
  Codex: (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="40" fill="#10A37F" />
      <path d="M128 56c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-20 96l-12-12 32-32-32-32 12-12 44 44-44 44z" fill="white" />
    </svg>
  ),
  Windows: (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 36.357L104.62 22.11l.045 100.914-104.57.595L0 36.357zm104.57 98.293l.076 101.064L.076 221.393l-.01-86.846 104.504.103zm12.754-114.09L255.97 0v123.49l-138.646 1.1V20.56zm138.7 105.245l-.046 123.19-138.7-19.578-.194-103.773 138.94.161z" fill="#00A4EF" />
    </svg>
  ),
  "Microsoft Word": (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="24" fill="#2B579A" />
      <path d="M78 80h20l18 60 18-60h20l18 60 18-60h20l-28 96h-20l-18-62-18 62h-20L78 80z" fill="white" />
    </svg>
  ),
  "Microsoft Excel": (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="24" fill="#217346" />
      <path d="M96 76l32 40-32 40h28l18-25 18 25h28l-32-40 32-40h-28l-18 25-18-25H96z" fill="white" />
    </svg>
  ),
  "Microsoft PowerPoint": (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="24" fill="#D24726" />
      <path d="M100 76v104h22v-36h24c22 0 38-14 38-34s-16-34-38-34h-46zm22 20h22c10 0 18 6 18 14s-8 14-18 14h-22V96z" fill="white" />
    </svg>
  ),
  "Microsoft Teams": (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="40" fill="#6264A7" />
      <path d="M172 88h-16c-2.2 0-4 1.8-4 4v60c0 17.7-14.3 32-32 32s-32-14.3-32-32V92c0-2.2-1.8-4-4-4H68c-2.2 0-4 1.8-4 4v60c0 35.3 28.7 64 64 64s64-28.7 64-64V92c0-2.2-1.8-4-4-4z" fill="white" />
      <circle cx="120" cy="56" r="20" fill="white" />
      <circle cx="176" cy="56" r="14" fill="white" opacity="0.7" />
    </svg>
  ),
};

// ─── Tool Card Component ─────────────────────────────────────────────────────
function ToolCard({ tool, index }: { tool: typeof tools[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const brandColor = tool.color || "#ffffff";

  return (
    <motion.div
      key={tool.name}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className="relative p-5 rounded-xl border border-border bg-card flex items-center gap-3 transition-all duration-300 cursor-default overflow-hidden group"
      style={{
        borderColor: hovered ? `${brandColor}40` : undefined,
        boxShadow: hovered
          ? `0 8px 30px -8px ${brandColor}25, 0 4px 12px -4px ${brandColor}15`
          : "0 2px 8px -4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${brandColor}12 0%, transparent 70%)`,
        }}
      />

      {/* Logo */}
      <motion.div
        className="size-9 rounded-lg shrink-0 flex items-center justify-center overflow-hidden relative z-10"
        animate={hovered ? { scale: 1.12 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        style={{
          backgroundColor: hovered ? `${brandColor}15` : `${brandColor}10`,
        }}
      >
        <div className="size-5">
          {TOOL_LOGOS[tool.name] ?? (
            <div
              className="size-full rounded flex items-center justify-center text-[8px] font-bold"
              style={{ color: brandColor }}
            >
              {tool.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      </motion.div>

      {/* Text */}
      <div className="min-w-0 relative z-10">
        <div className="font-semibold text-sm truncate">{tool.name}</div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {tool.category}
        </div>
      </div>
    </motion.div>
  );
}

export function Tools() {
  return (
    <section id="tools" className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Workflow"
          title="Ferramentas que utilizo"
          description="Stack de ferramentas que potencializam meu fluxo de trabalho diário."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tools.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
