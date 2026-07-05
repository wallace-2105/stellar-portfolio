import { motion } from "framer-motion";
import { Award, Star, ChevronDown, BookOpen } from "lucide-react";
import { certificates } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { useState } from "react";

export function Certifications() {
  const [coursesOpen, setCoursesOpen] = useState(false);

  const certifications = certificates.filter((c) => c.type === "certification");
  const courses = certificates.filter((c) => c.type === "course");

  return (
    <section id="certificates" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Credenciais" title="Certificações & Cursos" />

        {/* ── Certifications — always visible ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => {
            const glowColor = cert.glowColor || "#ffffff";
            return (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="relative p-6 rounded-xl border bg-card transition-all duration-300 flex flex-col h-full group overflow-hidden"
              style={{
                borderColor: `${glowColor}35`,
                boxShadow: `0 0 24px -4px ${glowColor}25, 0 0 10px -2px ${glowColor}18, inset 0 0 14px -6px ${glowColor}12`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${glowColor}70`;
                e.currentTarget.style.boxShadow = `0 0 35px -4px ${glowColor}45, 0 4px 20px -4px ${glowColor}30, inset 0 0 20px -6px ${glowColor}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${glowColor}35`;
                e.currentTarget.style.boxShadow = `0 0 24px -4px ${glowColor}25, 0 0 10px -2px ${glowColor}18, inset 0 0 14px -6px ${glowColor}12`;
              }}
            >
              {/* Persistent brand glow — intensifies on hover */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-500 opacity-70 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse at 50% 100%, ${glowColor}22 0%, transparent 65%)`,
                }}
              />
              <div
                className="absolute -inset-px rounded-xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${glowColor}15 0%, transparent 60%)`,
                }}
              />

              {/* Star badge — top right */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Star className="size-4 text-amber-400 fill-amber-400" />
                </motion.div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  Destaque
                </span>
              </div>

              {/* Institution logo */}
              <div className="flex items-start gap-4 mb-4">
                {cert.image ? (
                  <div className="size-12 rounded-lg overflow-hidden border border-white/10 bg-white shrink-0 p-1.5 flex items-center justify-center">
                    <img
                      src={cert.image}
                      alt={cert.issuer}
                      className="size-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="size-10 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                    <Award className="size-5 text-primary" />
                  </div>
                )}
                <div className="min-w-0 pt-1">
                  <h4 className="font-display font-bold leading-tight relative z-10">{cert.title}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">{cert.issuer}</p>
                </div>
              </div>

              {/* Skills */}
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 relative z-10">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-medium uppercase tracking-wider text-primary/80 bg-primary/8 px-2 py-1 rounded-md border border-primary/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Year */}
              <span className="mt-4 text-xs font-bold uppercase tracking-widest text-primary relative z-10">
                {cert.year}
              </span>

              {/* Certificate URL Button with LED border effect */}
              {cert.url && (
                <div className="mt-5 relative z-20">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="relative inline-flex h-9 w-full overflow-hidden rounded-lg p-[1.5px] focus:outline-none hover:scale-[1.02] transition-transform active:scale-95"
                  >
                    <span
                      className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]"
                      style={{
                        background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${glowColor} 50%, transparent 100%)`,
                      }}
                    />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[6px] bg-card px-4 py-1 text-sm font-semibold text-foreground backdrop-blur-3xl transition-colors hover:bg-card/90">
                      Certificado
                    </span>
                  </a>
                </div>
              )}

              {/* Hover shimmer */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-xl"
                style={{
                  background: "linear-gradient(135deg, oklch(1 0 0 / 0.03) 0%, transparent 60%)",
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          );})}
        </div>

        {/* ── Courses — Accordion ── */}
        <div className="mt-10">
          <motion.button
            onClick={() => setCoursesOpen(!coursesOpen)}
            className="w-full flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group"
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-primary/10 grid place-items-center">
                <BookOpen className="size-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-display font-bold text-base">Cursos</h3>
                <p className="text-xs text-muted-foreground">
                  {courses.length > 0
                    ? `${courses.length} curso${courses.length > 1 ? "s" : ""} concluído${courses.length > 1 ? "s" : ""}`
                    : "Nenhum curso adicional cadastrado"}
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: coursesOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          </motion.button>

          <motion.div
            initial={false}
            animate={{
              height: coursesOpen ? "auto" : 0,
              opacity: coursesOpen ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {courses.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {courses.map((course, i) => (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="relative p-5 rounded-xl border border-border bg-card transition-all duration-300 group overflow-hidden"
                    onMouseEnter={(e) => {
                      if (course.glowColor) {
                        e.currentTarget.style.borderColor = `${course.glowColor}50`;
                        e.currentTarget.style.boxShadow = `0 10px 30px -10px ${course.glowColor}30, 0 0 15px -3px ${course.glowColor}20`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    {/* Hover background gradient */}
                    {course.glowColor && (
                      <div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at top right, ${course.glowColor}15 0%, transparent 70%)`
                        }}
                      />
                    )}

                    <div className="flex items-start gap-3 mb-2 relative z-10">
                      {course.image ? (
                        <div className="size-10 rounded-lg overflow-hidden border border-white/10 bg-white/5 shrink-0">
                          <img src={course.image} alt={course.issuer} className="size-full object-cover" />
                        </div>
                      ) : (
                        <div className="size-9 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                          <Award className="size-4 text-primary" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-sm">{course.title}</h4>
                        <p className="text-xs text-muted-foreground">{course.issuer}</p>
                      </div>
                    </div>
                    {course.skills && course.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {course.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded border border-white/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Course Certificate Button with LED border effect */}
                    {course.url && (
                      <div className="mt-4 flex justify-center relative z-20">
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noreferrer"
                          className="relative inline-flex h-8 w-full overflow-hidden rounded-md p-[1.5px] focus:outline-none hover:scale-[1.02] transition-transform active:scale-95"
                        >
                          <span
                            className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]"
                            style={{
                              background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${course.glowColor || "#ffffff"} 50%, transparent 100%)`,
                            }}
                          />
                          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[4.5px] bg-card px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-3xl transition-colors hover:bg-card/90">
                            Certificado
                          </span>
                        </a>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="pt-4 pb-2 text-sm text-muted-foreground text-center">
                Nenhum curso adicionado ainda.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
