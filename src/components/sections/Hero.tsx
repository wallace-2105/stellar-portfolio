"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { personal } from "@/data/portfolio";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { useEffect, useRef } from "react";

/* ── Stagger container ── */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

/* ── Animated grid overlay ── */
function GridOverlay() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, oklch(1 0 0 / 4%) 1px, transparent 1px),
          linear-gradient(to bottom, oklch(1 0 0 / 4%) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
      }}
    />
  );
}

/* ── Subtle Floating Particles ── */
function BackgroundParticles() {
  const particles = Array.from({ length: 15 });
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 3 + 1;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 15;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
              background: i % 2 === 0 ? "oklch(0.78 0.15 255 / 0.35)" : "oklch(1 0 0 / 0.25)",
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.1, 0.7, 0.1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Horizontal scrolling skill ticker ── */
const SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Next.js",
  "AWS",
  "Docker",
  "PostgreSQL",
  "GraphQL",
  "React Native",
  "Python",
  "MongoDB",
  "Redis",
];

function SkillsTicker() {
  return (
    <div className="relative w-full overflow-hidden" aria-hidden>
      <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-[oklch(0.145_0_0)] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-[oklch(0.145_0_0)] to-transparent" />
      <motion.div
        className="flex gap-10 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[...SKILLS, ...SKILLS].map((s, i) => (
          <span
            key={i}
            className="text-xs font-semibold tracking-widest uppercase text-white/20 whitespace-nowrap select-none"
          >
            {s}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */
export function Hero() {
  /* subtle cursor-tracking blue glow */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springX = useSpring(mx, { stiffness: 60, damping: 20 });
  const springY = useSpring(my, { stiffness: 60, damping: 20 });
  const glowX = useTransform(springX, [0, 1], ["20%", "80%"]);
  const glowY = useTransform(springY, [0, 1], ["10%", "60%"]);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handler = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width);
      my.set((e.clientY - rect.top) / rect.height);
    };
    section.addEventListener("mousemove", handler);
    return () => section.removeEventListener("mousemove", handler);
  }, [mx, my]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[oklch(0.145_0_0)]"
    >
      {/* ── Background atmosphere ── */}
      <GridOverlay />
      <BackgroundParticles />

      {/* blue glow — follows cursor */}
      <motion.div
        aria-hidden
        className="absolute size-[700px] rounded-full pointer-events-none"
        style={{
          left: glowX,
          top: glowY,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, oklch(0.55 0.18 258 / 0.16) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* static top-right soft white/blue glow */}
      <div
        aria-hidden
        className="absolute size-[500px] top-[-100px] right-[-80px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.15 255 / 0.14) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* bottom-left system blue glow */}
      <div
        aria-hidden
        className="absolute size-[350px] bottom-20 left-[8%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.18 258 / 0.10) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col flex-1 justify-center px-6 pt-32 pb-12 max-w-7xl mx-auto w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-8 max-w-5xl"
        >

          {/* ── Status badge ── */}
          <motion.div variants={item}>
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm w-fit">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-emerald-400" />
              </span>
              <span className="text-xs text-white/55 font-medium tracking-wide">
                Disponível para projetos
              </span>
              <span className="w-px h-3 bg-white/15" />
              <MapPin className="size-3 text-white/30" />
              <span className="text-xs text-white/30">{personal.location}</span>
            </div>
          </motion.div>

          {/* ── Headline — mixed serif/sans typography ── */}
          <motion.div variants={item}>
            <h1 className="leading-none tracking-tight text-white font-display">
              {/* line 1 — bold sans */}
              <span
                className="block font-bold text-[clamp(3.2rem,8.5vw,7.8rem)] leading-[0.96]"
              >
                Desenvolvedor
              </span>
              {/* line 2 — italic serif with system blue gradient */}
              <span
                className="block font-bold italic text-[clamp(3rem,8vw,7.4rem)] leading-[0.96]"
                style={{
                  background:
                    "linear-gradient(120deg, oklch(0.98 0 0) 0%, oklch(0.78 0.15 255) 50%, oklch(0.55 0.18 258) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Full Stack.
              </span>
            </h1>
          </motion.div>

          {/* ── LayoutTextFlip row ── */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <LayoutTextFlip
              text="que constrói"
              words={[
                "interfaces rápidas",
                "APIs escaláveis",
                "apps mobile",
                "sistemas inteligentes",
              ]}
              duration={2800}
            />
          </motion.div>

          {/* ── Description ── */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-white/45 leading-relaxed max-w-xl font-light"
          >
            {personal.description}
          </motion.p>

          {/* ── CTA buttons ── */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-4 pt-1"
          >
            {/* primary system blue button */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-sm overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.18 258) 0%, oklch(0.40 0.20 260) 100%)",
                color: "oklch(0.98 0 0)",
                boxShadow:
                  "0 8px 32px oklch(0.55 0.18 258 / 0.30), inset 0 1px 0 oklch(1 0 0 / 0.15)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Ver Projetos
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
              {/* shimmer on hover */}
              <motion.span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(1 0 0 / 0.12) 0%, transparent 60%)",
                  borderRadius: "inherit",
                }}
              />
            </motion.a>

            {/* ghost button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, backgroundColor: "oklch(1 0 0 / 0.08)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-sm border border-white/10 bg-white/4 backdrop-blur-sm text-white/70 hover:text-white transition-colors"
            >
              <Mail className="size-4" />
              Entrar em contato
            </motion.a>
          </motion.div>

          {/* ── Scroll hint ── */}
          <motion.div
            variants={item}
            className="flex items-center gap-3 pt-2 select-none"
          >
            <motion.div
              className="w-px h-10 rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, oklch(1 0 0 / 0.30), transparent)",
              }}
              animate={{ scaleY: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/20 font-medium">
              Scroll para explorar
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Skill ticker strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="relative z-10 py-5 border-t border-white/[0.06]"
      >
        <SkillsTicker />
      </motion.div>
    </section>
  );
}
