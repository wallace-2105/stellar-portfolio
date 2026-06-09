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
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.9 21.56L12 24l-8.6-2.44L1.5 0zm13.1 7.42h-5.2l-.18-2H19.5l-.2-2.3H5.38l.6 6.6h8.8l-.3 3.3-2.5.7-2.5-.7-.14-1.6H6.6l.3 3.4 5.1 1.4 5.1-1.4.7-7.7z" />
      </svg>
    ),
    color: "#e34f26",
  },
  CSS3: {
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.9 21.56L12 24l-8.6-2.44L1.5 0zm13.1 14.8l-2.6.7-2.6-.7-.17-1.9H6.6l.3 3.4 5.1 1.4 5.1-1.4.6-6.6H5.4l-.2-2.3h14.5l-.2 2.3H7.8l.2 2.3h10.9l-.6 6.6z" />
      </svg>
    ),
    color: "#1572b6",
  },
  CSS: {
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.9 21.56L12 24l-8.6-2.44L1.5 0zm13.1 14.8l-2.6.7-2.6-.7-.17-1.9H6.6l.3 3.4 5.1 1.4 5.1-1.4.6-6.6H5.4l-.2-2.3h14.5l-.2 2.3H7.8l.2 2.3h10.9l-.6 6.6z" />
      </svg>
    ),
    color: "#1572b6",
  },
  JavaScript: {
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm20.06 17.052c-.08-.752-.5-1.21-.767-1.485-.71-.242-1.5-.342-2.18-.463-.68-.122-1.363-.243-1.95-.443-.335-.112-.53-.284-.62-.574-.14-.422-.04-.844.28-1.074.24-.183.59-.22.9-.2.37.02.66.15.82.46.12.22.18.49.28.74l1.9-.73c-.15-.43-.3-.8-.57-1.12-.4-.48-.96-.75-1.63-.82-.8-.09-1.56.02-2.19.46-.67.48-.93 1.15-.83 1.95.09.8.63 1.28 1.29 1.57.57.25 1.19.35 1.77.47.58.12 1.17.23 1.72.42.34.12.56.32.6.72.05.59-.4 1.05-1.05 1.06-.63 0-1.06-.31-1.22-.9-.08-.29-.09-.59-.14-.89l-1.86.34c.07.64.27 1.18.68 1.62.49.53 1.11.81 1.83.84.99.04 1.8-.32 2.3-1.14.23-.38.32-.81.27-1.26zm-10.02-3.15h1.9v3.7c0 1.3-.8 2.1-2 2.1-.8 0-1.5-.4-1.8-1.1l1.7-1c.2.4.4.6.7.6.3 0 .5-.2.5-.6v-3.7z" />
      </svg>
    ),
    color: "#f7df1e",
  },
  TypeScript: {
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm20.06 17.052c-.08-.752-.5-1.21-.767-1.485-.71-.242-1.5-.342-2.18-.463-.68-.122-1.363-.243-1.95-.443-.335-.112-.53-.284-.62-.574-.14-.422-.04-.844.28-1.074.24-.183.59-.22.9-.2.37.02.66.15.82.46.12.22.18.49.28.74l1.9-.73c-.15-.43-.3-.8-.57-1.12-.4-.48-.96-.75-1.63-.82-.8-.09-1.56.02-2.19.46-.67.48-.93 1.15-.83 1.95.09.8.63 1.28 1.29 1.57.57.25 1.19.35 1.77.47.58.12 1.17.23 1.72.42.34.12.56.32.6.72.05.59-.4 1.05-1.05 1.06-.63 0-1.06-.31-1.22-.9-.08-.29-.09-.59-.14-.89l-1.86.34c.07.64.27 1.18.68 1.62.49.53 1.11.81 1.83.84.99.04 1.8-.32 2.3-1.14.23-.38.32-.81.27-1.26zm-10.02-6.15h6v1.9h-2.1v7.1h-1.9v-7.1h-2v-1.9z" />
      </svg>
    ),
    color: "#3178c6",
  },
  "React Native": {
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    color: "#61dafb",
  },
  "Node.js": {
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2z M17 15l-5 2.8L7 15V9.2L12 6.4l5 2.8V15z" />
      </svg>
    ),
    color: "#339933",
  },
  MongoDB: {
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.3 22s5.7-4.6 5.7-11.5c0-4.8-3.4-8.3-5.7-10.5-.2-.2-.5-.2-.7 0-2.3 2.2-5.7 5.7-5.7 10.5C5.9 17.4 11.6 22 11.6 22c.2.2.5.2.7 0zm-.3-19.1c1.3 1.7 3.5 4.3 3.5 7.6 0 4.7-3.5 7.8-3.5 7.8s-3.5-3.1-3.5-7.8c0-3.3 2.2-5.9 3.5-7.6z" />
      </svg>
    ),
    color: "#47a248",
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
      <div className="relative overflow-hidden aspect-[16/10] shrink-0">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

