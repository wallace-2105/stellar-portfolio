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
                  className="p-6 rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/25 hover:shadow-[0_2px_16px_-4px] hover:shadow-primary/10 hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-4 mb-3">
                    {/* Institution Logo */}
                    {item.logo && (
                      <div className="size-14 rounded-xl overflow-hidden border border-white/10 bg-white shrink-0 flex items-center justify-center p-1.5">
                        <img
                          src={item.logo}
                          alt={item.institution}
                          className="size-full object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4 mb-1">
                        <h4 className="font-semibold">{item.title}</h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-primary text-sm font-medium">{item.institution}</p>
                      {item.type && (
                        <span className="inline-block mt-1 text-[10px] uppercase tracking-widest text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                          {item.type}
                        </span>
                      )}
                    </div>
                  </div>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
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
                  className="p-6 rounded-xl border border-border bg-card flex justify-between items-center transition-all duration-300 hover:border-primary/25 hover:shadow-[0_2px_16px_-4px] hover:shadow-primary/10 hover:-translate-y-0.5"
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
