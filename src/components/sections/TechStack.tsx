import { motion } from "framer-motion";
import { techStack } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

export function TechStack() {
  return (
    <section id="tech" className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Tecnologias"
          title="Stack Técnica"
          description="Ferramentas e linguagens que utilizo no dia a dia para entregar soluções modernas."
          align="center"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="p-6 border border-border bg-card rounded-xl hover:border-primary/40 hover:shadow-soft transition-all text-center"
            >
              <div className="text-2xl font-display font-bold text-primary mb-2">{tech.abbr}</div>
              <div className="text-sm font-semibold text-foreground">{tech.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                {tech.category}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
