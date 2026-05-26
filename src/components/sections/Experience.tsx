import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Trajetória" title="Experiência Profissional" />
        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative pl-8 pb-12 last:pb-0 border-l border-border"
            >
              <div
                className={`absolute -left-[5px] top-1 size-2.5 rounded-full ${
                  i === 0 ? "bg-primary" : "bg-muted-foreground/40"
                }`}
              />
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-3 gap-1">
                <div>
                  <h3 className="text-xl font-display font-bold">{exp.role}</h3>
                  <p className="text-primary font-medium text-sm">{exp.company}</p>
                </div>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed whitespace-pre-line">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
