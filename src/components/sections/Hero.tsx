import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { personal } from "@/data/portfolio";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section id="top" className="pt-40 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <motion.span
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="text-primary font-semibold tracking-widest text-xs uppercase mb-6 block"
          >
            {personal.role}
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8"
          >
            Construindo o{" "}
            <span className="text-gradient-brand">futuro digital</span> com precisão.
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl"
          >
            {personal.description}
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-xl font-semibold hover:shadow-elegant transition-all"
            >
              Ver Projetos
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-border px-7 py-4 rounded-xl font-semibold hover:bg-muted transition-colors"
            >
              <Mail className="size-4" />
              Entrar em contato
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
