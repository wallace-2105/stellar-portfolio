import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { certificates } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

export function Certifications() {
  return (
    <section id="certificates" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Credenciais" title="Certificados & Cursos" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-soft transition-all flex flex-col h-full"
            >
              <div className="size-10 rounded-lg bg-primary/10 grid place-items-center mb-4">
                <Award className="size-5 text-primary" />
              </div>
              <h4 className="font-display font-bold mb-2 leading-tight">{cert.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{cert.issuer}</p>
              <span className="mt-auto text-xs font-bold uppercase tracking-widest text-primary">
                {cert.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
