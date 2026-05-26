import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Trabalhos selecionados"
          title="Projetos em Destaque"
          description="Uma seleção de projetos recentes que demonstram minha experiência em arquitetura, design e engenharia."
        />

        <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 shadow-soft ring-1 ring-border">
                <img
                  src={project.image}
                  alt={project.title}
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-1 bg-primary/10 text-primary font-bold rounded uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
              <div className="flex gap-5">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary border-b border-primary pb-0.5 hover:opacity-80 transition-opacity"
                  >
                    <ExternalLink className="size-3.5" />
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground/70 border-b border-border pb-0.5 hover:text-foreground transition-colors"
                  >
                    <Github className="size-3.5" />
                    GitHub
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
