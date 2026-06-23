import { motion } from "framer-motion";
import { Target, Sparkles, Users } from "lucide-react";
import { aboutParagraphs, personal } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import avatarImg from "@/assets/avatar.png";

const highlights = [
  { icon: Target, title: "Orientado a resultados", text: "Entregas focadas em impacto mensurável." },
  { icon: Sparkles, title: "Qualidade técnica", text: "Código limpo, testado e escalável." },
  { icon: Users, title: "Trabalho em equipe", text: "Colaboração e mentoria como pilares." },
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
              
              {/* Overlay with info on how to replace */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-primary mb-2 animate-bounce"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  />
                </svg>
                <p className="text-white text-xs font-semibold">Substitua por sua foto</p>
                <p className="text-white/60 text-[10px] mt-1 max-w-[200px]">
                  Basta substituir o arquivo em <code className="bg-white/10 px-1 py-0.5 rounded">src/assets/avatar.png</code>
                </p>
              </div>
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
