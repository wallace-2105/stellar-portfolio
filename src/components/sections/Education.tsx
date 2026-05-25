import { motion } from "framer-motion";
import { GraduationCap, Languages } from "lucide-react";
import { education, languages } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

export function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Background" title="Formação & Idiomas" />
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="size-5 text-primary" />
              <h3 className="font-display font-bold text-lg">Formação Acadêmica</h3>
            </div>
            <div className="space-y-4">
              {education.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h4 className="font-semibold">{item.title}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-primary text-sm font-medium mb-2">{item.institution}</p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <Languages className="size-5 text-primary" />
              <h3 className="font-display font-bold text-lg">Idiomas</h3>
            </div>
            <div className="space-y-4">
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 rounded-xl border border-border bg-card flex justify-between items-center hover:border-primary/30 transition-colors"
                >
                  <span className="font-semibold">{lang.name}</span>
                  <span className="text-xs text-primary font-bold uppercase tracking-widest">
                    {lang.level}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
