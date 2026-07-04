import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Server, CheckCircle2 } from "lucide-react";
import { Github } from "@/components/icons";
import { projects } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import type { Project } from "@/types/portfolio";

const TECH_ICONS: Record<string, { icon: React.ReactNode; color: string }> = {
  HTML5: {
    icon: (
      <svg className="size-4" viewBox="0 0 452 520" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.4 460.7L0 0h452l-41.5 460.6L226 520" fill="#E34F26" />
        <path d="M226 482.8l149.3-41.4 35.4-396.4H226" fill="#EF652A" />
        <path d="M226 212.5h-75.2l-5.2-58.2H226v-56.9H85.1l1.4 15.5 14.3 160.5H226zm0 147.3l-.3.1-63-17-4-44.8H101l7.9 88.3 117 32.5.3-.1z" fill="#fff" />
        <path d="M226 212.5v56.9h70l-6.6 73.7-63.4 17v59.1l117.3-32.5.9-9.7 13.4-150.1 1.4-14.4H226zm0-155.1v56.9h137.8l1.1-12.2 2.5-28.2 1.4-16.5z" fill="#EBEBEB" />
      </svg>
    ),
    color: "#E34F26",
  },
  CSS3: {
    icon: (
      <svg className="size-4" viewBox="0 0 452 520" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.4 460.7L0 0h452l-41.5 460.6L226 520" fill="#1572B6" />
        <path d="M226 482.8l149.3-41.4 35.4-396.4H226" fill="#33A9DC" />
        <path d="M226 212.5H116.5l3.7 41.4H226v-41.4zm0-99.1H107.1l3.7 41.3H226v-41.3zm0 228.6-.3.1-74.8-20.2-5.2-58.5H104l10.3 115.3 111.4 30.9.3-.1v-67.5z" fill="#fff" />
        <path d="M226 212.5v41.4h104.8l-9.8 109.7-95 25.7V448l111.3-30.8.8-9.2 15.3-171.4 1.6-17.1H226zm0-99.1v41.3h121.8l1-10.8 2.2-24 1.5-16.5H226z" fill="#EBEBEB" />
      </svg>
    ),
    color: "#1572B6",
  },
  JavaScript: {
    icon: (
      <svg className="size-4" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" fill="#F7DF1E" rx="12" />
        <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.889-3.092 12.889-15.12v-81.798h24.058v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.979-36.086-21.994m88.56-3.244l19.588-11.374c5.157 8.421 11.859 14.607 23.715 14.607 9.964 0 16.321-4.984 16.321-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.395-28.871-16.673-28.871-36.26 0-18.044 13.748-31.792 35.229-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.731 12.029c-4.125-7.394-8.591-10.315-15.465-10.315-7.046 0-11.514 4.468-11.514 10.315 0 7.217 4.468 10.143 14.778 14.608l6.013 2.581c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.814-24.542" fill="#000" />
      </svg>
    ),
    color: "#F7DF1E",
  },
  TypeScript: {
    icon: (
      <svg className="size-4" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" rx="20" fill="#3178C6" />
        <path d="M150.5 166.5c3.5 5.8 8.2 10 16.8 10 7.1 0 11.6-3.5 11.6-8.4 0-5.8-4.6-7.8-12.4-11.2l-4.3-1.8c-12.3-5.3-20.5-11.9-20.5-25.9 0-12.9 9.8-22.7 25.1-22.7 10.9 0 18.7 3.8 24.3 13.8l-13.3 8.5c-2.9-5.3-6.1-7.4-11-7.4-5 0-8.2 3.2-8.2 7.4 0 5.2 3.2 7.2 10.6 10.4l4.3 1.8c14.5 6.2 22.7 12.6 22.7 26.9 0 15.4-12.1 23.9-28.3 23.9-15.9 0-26.1-7.5-31.1-17.4l13.7-8.8zm-56.4-51.4h-24.9v-14.6h66.4v14.6h-24.8v65.4h-16.7v-65.4z" fill="white" />
      </svg>
    ),
    color: "#3178C6",
  },
  "React Native": {
    icon: (
      <svg className="size-4" viewBox="-11.5 -10.232 23 20.463" xmlns="http://www.w3.org/2000/svg">
        <circle r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
    color: "#61DAFB",
  },
  "Node.js": {
    icon: (
      <svg className="size-4" viewBox="0 0 256 282" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ndg-proj" x1="68.188%" y1="17.487%" x2="27.823%" y2="89.755%">
            <stop stopColor="#41873F" offset="0%" />
            <stop stopColor="#418B3D" offset="32.88%" />
            <stop stopColor="#34A853" offset="63.52%" />
            <stop stopColor="#2EB156" offset="100%" />
          </linearGradient>
        </defs>
        <path d="M128 0L0 73.9v141.1L128 282l128-67v-141L128 0z" fill="url(#ndg-proj)" />
        <path d="M116 200v-80l-28 16v80l28-16z" fill="#fff" opacity="0.8" />
        <path d="M144 200v-80l28 16v80l-28-16z" fill="#fff" opacity="0.6" />
        <path d="M128 108l-28 16 28 16 28-16-28-16z" fill="#fff" />
      </svg>
    ),
    color: "#339933",
  },
  MongoDB: {
    icon: (
      <svg className="size-4" viewBox="0 0 256 549" xmlns="http://www.w3.org/2000/svg">
        <path d="M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 00-1.492 0c-4.048 5.759-23.863 33.487-46.873 60.788-197.507 251.896 31.108 421.852 31.108 421.852l1.917 1.28c1.172 26.08 5.227 59.372 5.227 59.372h8.737s4.055-33.292 5.227-59.372l1.917-1.28s228.615-169.956 31.105-421.852" fill="#00ED64" />
        <path d="M128 .32s-19.984 28.538-46.873 60.788C-116.38 313.004 112.235 482.96 112.235 482.96l1.917 1.28c1.172 26.08 5.227 59.372 5.227 59.372h8.621V.32z" fill="#00A550" opacity="0.5" />
      </svg>
    ),
    color: "#47A248",
  },
};

const getTechIcon = (tag: string) => {
  const normalized = tag.trim();
  return (
    TECH_ICONS[normalized] || {
      icon: (
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16V12" />
          <path d="M12 8h.01" />
        </svg>
      ),
      color: "#94a3b8",
    }
  );
};

const SLIDES = ["description", "features"] as const;
type Slide = (typeof SLIDES)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSlide, setActiveSlide] = useState<Slide>("description");
  const [slideDir, setSlideDir] = useState<1 | -1>(1);

  const goToSlide = (slide: Slide) => {
    const currentIdx = SLIDES.indexOf(activeSlide);
    const nextIdx = SLIDES.indexOf(slide);
    setSlideDir(nextIdx > currentIdx ? 1 : -1);
    setActiveSlide(slide);
  };

  const handleToggle = () => {
    if (!isExpanded) setActiveSlide("description");
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-card border border-border/60 shadow-soft transition-all duration-300"
      style={{
        boxShadow: isHovered
          ? `0 10px 30px -10px ${project.themeColor}30, 0 1px 3px 0 ${project.themeColor}15`
          : undefined,
        borderColor: isHovered ? `${project.themeColor}40` : undefined,
      }}
    >
      {/* Dynamic top line */}
      <div
        className="h-1 w-full transition-all duration-300 shrink-0"
        style={{
          backgroundColor: project.themeColor,
          opacity: isHovered ? 1 : 0.6,
        }}
      />

      {/* Image container */}
      <div className="relative overflow-hidden aspect-[16/10] shrink-0 bg-black/5 dark:bg-black/30">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Circular Tech Icons floating over image */}
        <div className="absolute bottom-3 right-3 flex -space-x-1.5 z-10">
          {project.tags.map((tag) => {
            const info = getTechIcon(tag);
            return (
              <div
                key={tag}
                className="size-8 rounded-full bg-background/95 backdrop-blur-xs border border-border flex items-center justify-center shadow-md hover:-translate-y-1 hover:scale-110 transition-all duration-200 cursor-pointer"
                style={{ color: info.color }}
                title={tag}
              >
                {info.icon}
              </div>
            );
          })}
        </div>
      </div>

      {/* Body content */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <h3
            className="text-lg font-display font-bold mb-2.5 transition-colors duration-300"
            style={{ color: isHovered ? project.themeColor : "inherit" }}
          >
            {project.title}
          </h3>

          {/* Highlights (Features preview) */}
          <div className="mb-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
              <Server className="size-3" style={{ color: project.themeColor }} />
              Destaques
            </h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground/90">
              {project.features?.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2
                    className="size-3.5 mt-0.5 shrink-0"
                    style={{ color: project.themeColor }}
                  />
                  <span className="line-clamp-1">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Expanded carousel section */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-border/50">
                {/* Carousel header: title + arrows */}
                <div className="flex items-center justify-between mb-3">
                  <h4
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: project.themeColor }}
                  >
                    {activeSlide === "description" ? "Sobre o Projeto" : "Funcionalidades"}
                  </h4>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => goToSlide("description")}
                      disabled={activeSlide === "description"}
                      className="size-6 rounded-full flex items-center justify-center border border-border/60 text-muted-foreground transition-all duration-200 disabled:opacity-30 hover:not-disabled:border-current cursor-pointer"
                      style={{ color: project.themeColor }}
                      title="Descrição"
                    >
                      <ChevronLeft className="size-3.5" />
                    </button>
                    {/* Dot indicators */}
                    <div className="flex gap-1">
                      {SLIDES.map((s) => (
                        <button
                          key={s}
                          onClick={() => goToSlide(s)}
                          className="rounded-full transition-all duration-300 cursor-pointer"
                          style={{
                            width: activeSlide === s ? "16px" : "6px",
                            height: "6px",
                            backgroundColor:
                              activeSlide === s ? project.themeColor : "oklch(0.7 0 0 / 0.3)",
                          }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => goToSlide("features")}
                      disabled={activeSlide === "features"}
                      className="size-6 rounded-full flex items-center justify-center border border-border/60 text-muted-foreground transition-all duration-200 disabled:opacity-30 cursor-pointer"
                      style={{ color: project.themeColor }}
                      title="Funcionalidades"
                    >
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Slide content */}
                <div className="relative overflow-hidden" style={{ minHeight: "80px" }}>
                  <AnimatePresence mode="wait" custom={slideDir}>
                    {activeSlide === "description" ? (
                      <motion.div
                        key="description"
                        custom={slideDir}
                        initial={{ opacity: 0, x: slideDir * 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: slideDir * -30 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <p className="text-xs text-muted-foreground/80 leading-relaxed">
                          {project.description}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.ul
                        key="features"
                        custom={slideDir}
                        initial={{ opacity: 0, x: slideDir * 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: slideDir * -30 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="space-y-1.5 text-xs text-muted-foreground/80"
                      >
                        {project.features?.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span
                              className="size-1.5 rounded-full mt-1.5 shrink-0"
                              style={{ backgroundColor: project.themeColor }}
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer controls & buttons */}
        <div className="pt-3 border-t border-border/40 flex flex-col gap-3">
          {/* Ver mais / Ver menos button */}
          <button
            onClick={handleToggle}
            className="flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors py-1 cursor-pointer w-full"
          >
            <span>{isExpanded ? "Ver menos" : "Ver mais"}</span>
            {isExpanded ? (
              <ChevronUp className="size-3.5" style={{ color: project.themeColor }} />
            ) : (
              <ChevronDown className="size-3.5" style={{ color: project.themeColor }} />
            )}
          </button>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer"
                style={{
                  borderColor: isHovered ? `${project.themeColor}50` : undefined,
                  color: isHovered ? project.themeColor : undefined,
                  backgroundColor: isHovered ? `${project.themeColor}0a` : undefined,
                }}
              >
                <Github className="size-4 shrink-0" />
                <span>Código</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl text-white transition-all duration-300 shadow-sm cursor-pointer"
                style={{
                  backgroundColor: project.themeColor,
                  boxShadow: isHovered ? `0 4px 12px -2px ${project.themeColor}40` : undefined,
                }}
              >
                <ExternalLink className="size-4 shrink-0" />
                <span>Prévia</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Trabalhos selecionados"
          title="Projetos em Destaque"
          description="Confira meus últimos trabalhos e projetos que desenvolvi ao longo do tempo."
        />

        <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

