import { motion } from "framer-motion";
import { Target, Sparkles, Users } from "lucide-react";
import { aboutParagraphs, personal } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

const highlights = [
  { icon: Target, title: "Orientado a resultados", text: "Entregas focadas em impacto mensurável." },
  { icon: Sparkles, title: "Qualidade técnica", text: "Código limpo, testado e escalável." },
  { icon: Users, title: "Trabalho em equipe", text: "Colaboração e mentoria como pilares." },
];

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-16">
        <div className="md:col-span-5">
          <SectionHeading eyebrow="Sobre mim" title={`Olá, sou ${personal.name}.`} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="md:col-span-7 space-y-5 text-muted-foreground leading-relaxed"
        >
          {aboutParagraphs.map((p, i) => (
            <p key={i} className="text-base md:text-lg">
              {p}
            </p>
          ))}

          <div className="grid sm:grid-cols-3 gap-4 pt-8">
            {highlights.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
              >
                <Icon className="size-5 text-primary mb-3" />
                <h4 className="font-semibold text-foreground text-sm mb-1">{title}</h4>
                <p className="text-xs text-muted-foreground">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
