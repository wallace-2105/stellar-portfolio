import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Send } from "lucide-react";
import { personal, socials } from "@/data/portfolio";

const iconMap = { Github, Linkedin, Twitter, Mail };

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 lg:p-16 grid lg:grid-cols-2 gap-12"
        >
          <div>
            <span className="text-primary-foreground/70 font-semibold tracking-widest text-xs uppercase mb-4 block">
              Contato
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Vamos criar algo incrível juntos?
            </h2>
            <p className="text-primary-foreground/70 text-base md:text-lg mb-8 max-w-md leading-relaxed">
              Estou aberto a novos projetos, colaborações e oportunidades. Envie uma mensagem.
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => {
                const Icon = iconMap[s.icon as keyof typeof iconMap] ?? Mail;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="size-11 rounded-full border border-primary-foreground/20 grid place-items-center hover:bg-primary-foreground/10 transition-colors"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
            <p className="text-primary-foreground/60 text-sm mt-8">
              {personal.email} · {personal.location}
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                required
                type="text"
                placeholder="Nome"
                className="bg-primary-foreground/10 border border-primary-foreground/15 rounded-xl px-4 py-3.5 text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40 transition-colors"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="bg-primary-foreground/10 border border-primary-foreground/15 rounded-xl px-4 py-3.5 text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40 transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="Assunto"
              className="bg-primary-foreground/10 border border-primary-foreground/15 rounded-xl px-4 py-3.5 text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40 transition-colors"
            />
            <textarea
              required
              rows={5}
              placeholder="Mensagem"
              className="bg-primary-foreground/10 border border-primary-foreground/15 rounded-xl px-4 py-3.5 text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40 transition-colors resize-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-6 py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
            >
              {sent ? "Mensagem enviada" : "Enviar mensagem"}
              <Send className="size-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
