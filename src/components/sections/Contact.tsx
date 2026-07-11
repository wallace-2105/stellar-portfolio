import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/icons";
import { personal, socials } from "@/data/portfolio";

const iconMap = { Github, Linkedin, Instagram, Mail };

/* ── WhatsApp SVG Icon ── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 259" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M67.663 221.823l4.185 2.093c17.44 10.463 36.971 15.346 56.503 15.346 61.385 0 111.609-50.224 111.609-111.609 0-29.297-11.51-57.547-32.18-78.218-20.672-20.67-48.922-32.18-78.22-32.18-61.385 0-111.609 50.224-111.609 111.61 0 20.577 5.93 40.107 16.393 57.546l3.14 4.186-12.555 45.828 45.828-14.602z" />
      <path d="M219.033 37.668C195.316 13.95 162.531 0 129.048 0 57.898 0 .698 57.2.698 128.35c0 22.67 5.93 44.294 17.44 63.477L0 259l68.71-18.487c18.138 10.463 39.761 15.346 60.339 15.346 71.15 0 128.35-57.2 128.35-128.35 0-33.482-13.95-66.268-37.667-89.841zM129.048 234.38c-18.14 0-36.278-4.884-51.624-14.3l-3.14-2.093-37.014 9.416 9.416-35.92-3.14-4.186c-10.463-16.44-15.346-35.92-15.346-55.453 0-58.246 47.59-105.836 106.882-105.836 28.25 0 54.408 10.464 74.034 31.135 19.627 19.627 31.135 46.832 31.135 74.034-.046 59.292-48.636 107.203-111.203 107.203z" fill="currentColor" opacity="0.4" />
      <path d="M190.372 155.604c-3.14-1.047-18.487-9.416-21.627-10.463-3.14-1.047-5.233-1.047-7.326 1.047-2.093 2.093-8.373 10.463-10.463 12.556-2.093 2.093-4.186 2.093-7.326 1.047-3.14-1.048-14.6-5.233-27.156-16.744-10.463-9.416-16.744-20.925-18.837-24.065-2.093-3.14 0-5.233 1.047-6.28l4.186-4.186c1.047-1.047 2.093-3.14 3.14-4.186 1.047-1.048 1.047-2.094 2.093-3.14 1.047-1.048 0-2.094-.523-3.14-.524-1.048-7.326-17.441-10.463-23.721-3.14-6.28-5.233-5.233-7.326-5.233h-6.28c-2.093 0-5.233 1.047-8.373 4.186-3.14 3.14-11.51 11.51-11.51 27.903 0 16.394 11.51 31.74 13.603 33.833 2.093 2.093 23.72 36.974 57.547 51.32 8.373 3.14 14.6 5.233 19.627 6.28 8.373 2.093 15.7 2.093 21.627 1.047 6.28-1.047 18.487-7.326 21.627-14.6 2.093-7.326 2.093-13.603 1.047-14.6-1.047-2.14-3.14-3.14-6.28-4.186z" fill="white" />
    </svg>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col items-center text-center"
        >
          <span className="text-primary-foreground/70 font-semibold tracking-widest text-xs uppercase mb-4 block">
            Contato
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight max-w-2xl">
            Vamos criar algo incrível juntos?
          </h2>
          <p className="text-primary-foreground/70 text-base md:text-lg mb-10 max-w-md leading-relaxed">
            Estou aberto a novos projetos, colaborações e oportunidades. Envie uma mensagem pelo WhatsApp.
          </p>

          {/* WhatsApp Button */}
          <motion.a
            href="https://wa.me/5511948947933"
            target="_blank"
            rel="noreferrer"
            aria-label="Enviar mensagem via WhatsApp"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center gap-3 px-8 py-5 rounded-2xl font-bold text-base transition-all duration-300 overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              color: "#ffffff",
              boxShadow: "0 8px 32px rgba(37, 211, 102, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            {/* Pulse ring animation */}
            <motion.span
              className="absolute inset-0 rounded-2xl border-2 border-white/20 pointer-events-none"
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Hover shimmer */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
              }}
            />

            <motion.span
              className="relative z-10 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <WhatsAppIcon className="size-6" />
            </motion.span>
            <span className="relative z-10">Conversar no WhatsApp</span>
          </motion.a>

          {/* Social links */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
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
        </motion.div>
      </div>
    </section>
  );
}
