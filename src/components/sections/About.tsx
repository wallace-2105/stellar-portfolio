import { motion } from "framer-motion";
import { Zap, Laptop, Search } from "lucide-react";
import { aboutParagraphs, personal } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import Lanyard from "@/components/ui/Lanyard";
import profilePhoto from "@/assets/foto de perfil.jpeg";

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

          {/* Crachá 3D Interativo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full max-w-[360px] h-[390px] sm:h-[430px] self-center md:self-start rounded-2xl border border-border/60 bg-card/30 backdrop-blur-xs overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-primary/15 via-transparent to-blue-500/15"
            />
            <Lanyard
              frontImage={profilePhoto}
              orientation="portrait"
              imageFit="cover"
              finish="glossy"
              metal="silver"
              cardColor="#0f172a"
              strapColor="#0f172a"
              cornerRadius={0.25}
              size={0.62}
              strapLength={0.45}
              breeze={0.35}
              interactive={true}
              intro={true}
            />
            <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border/60 bg-background/75 px-3 py-1 text-[11px] text-muted-foreground backdrop-blur-md">
              Arraste ou clique no crachá
            </span>
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
