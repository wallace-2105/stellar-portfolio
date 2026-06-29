import { motion } from "framer-motion";
import { Zap, Laptop, Search } from "lucide-react";
import { aboutParagraphs, personal } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import avatarImg from "@/assets/wallace.jpg";

const highlights = [
  { icon: Zap, title: "Automação de Processos", text: "Redução de tarefas manuais e aumento da produtividade." },
  { icon: Laptop, title: "Desenvolvimento Web", text: "Criação de aplicações modernas, responsivas e funcionais." },
  { icon: Search, title: "Resolução de Problemas", text: "Foco em análise, diagnóstico e melhoria contínua." },
];

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-16">
        <div className="md:col-span-5 flex flex-col gap-8">
          <SectionHeading eyebrow="Sobre mim" title={`Olá, sou ${personal.name}.`} />
          
          {/* Foto de Perfil Premium */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group max-w-[320px] w-full aspect-square self-center md:self-start mt-4"
          >
            {/* Glowing back outline */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            
            {/* Frame border */}
            <div className="relative size-full rounded-2xl border border-white/10 bg-neutral-900 overflow-hidden p-2 shadow-2xl">
              <img
                src={avatarImg}
                alt={personal.name}
                className="size-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
              />
            </div>
          </motion.div>
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
                className="relative group p-5 rounded-xl border border-white/[0.05] bg-card hover:bg-white/[0.02] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/20 hover:border-primary/50 overflow-hidden"
              >
                {/* Subtle gradient glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <Icon className="size-6 text-primary mb-3 group-hover:scale-110 transition-transform duration-500" />
                <h4 className="font-semibold text-foreground text-sm mb-2 relative z-10">{title}</h4>
                <p className="text-xs text-muted-foreground relative z-10 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
