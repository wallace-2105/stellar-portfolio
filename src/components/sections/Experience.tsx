import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { X, Cpu, Croissant, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

import scopeLogo from "@/assets/scope.png";
import goldpanLogo from "@/assets/goldpan.png";
import mecLogo from "@/assets/mec.png";

// ─── Company Logos ────────────────────────────────────────────────────────
function CompanyLogo({ src, alt, fallback }: { src: string, alt: string, fallback: React.ReactNode }) {
  const [error, setError] = useState(false);
  
  if (error) return <>{fallback}</>;
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className="size-12 object-contain rounded-lg shadow-sm"
      onError={() => setError(true)}
    />
  );
}

const COMPANY_LOGOS: Record<string, React.ReactNode> = {
  "Scope Technology": <CompanyLogo src={scopeLogo} alt="Scope Technology" fallback={<Cpu className="size-8 text-blue-500" strokeWidth={1.5} />} />,
  "Gold Pan": <CompanyLogo src={goldpanLogo} alt="Gold Pan" fallback={<Croissant className="size-8 text-yellow-500" strokeWidth={1.5} />} />,
  "McDonald's": (
    <CompanyLogo 
      src={mecLogo} 
      alt="McDonald's" 
      fallback={
        <svg className="size-8" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 40C10 15 20 10 25 25C30 10 40 15 40 40" stroke="#FFC72C" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      } 
    />
  ),
};

export function Experience() {
  const [selectedExp, setSelectedExp] = useState<typeof experiences[number] | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedExp]);

  return (
    <section id="experience" className="py-24 px-6 bg-surface relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Trajetória" title="Experiência Profissional" />
        
        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              onClick={() => setSelectedExp(exp)}
              className="relative p-6 border border-white/[0.08] bg-card/40 backdrop-blur-sm rounded-2xl cursor-pointer group hover:bg-card/60 transition-colors duration-300 flex flex-col h-full overflow-hidden"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Logo & Company */}
              <div className="flex items-center gap-4 mb-5">
                <div className="size-14 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors">
                  {COMPANY_LOGOS[exp.company] ?? <Cpu className="size-6 text-muted-foreground" />}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground leading-tight">{exp.company}</h4>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{exp.period}</span>
                </div>
              </div>
              
              {/* Role */}
              <h3 className="text-base font-semibold text-primary/90 mb-3 leading-snug">
                {exp.role}
              </h3>
              
              {/* Short Description */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                {exp.shortDescription || exp.description.substring(0, 150) + "..."}
              </p>

              {/* Click indicator */}
              <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center text-xs text-primary/70 font-medium group-hover:text-primary transition-colors">
                Ver detalhes <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / Expanded View */}
      <AnimatePresence>
        {selectedExp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 pb-6 border-b border-white/[0.05] flex justify-between items-start gap-4 shrink-0 bg-muted/30">
                <div className="flex items-center gap-5">
                  <div className="size-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                    {COMPANY_LOGOS[selectedExp.company] ?? <Cpu className="size-8 text-muted-foreground" />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                      {selectedExp.company}
                    </h3>
                    <p className="text-primary font-medium">{selectedExp.role}</p>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">{selectedExp.period}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedExp(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-colors focus:outline-none"
                >
                  <X className="size-5" />
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-grow">
                <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-muted-foreground">
                  {selectedExp.description.split('\n\n').map((paragraph, idx) => (
                    <div key={idx} className="mb-4 last:mb-0">
                      {paragraph.startsWith('•') ? (
                        <ul className="list-disc pl-5 space-y-2 marker:text-primary/50">
                          {paragraph.split('\n').map((item, i) => (
                            <li key={i} className="leading-relaxed">
                              {item.replace('• ', '')}
                            </li>
                          ))}
                        </ul>
                      ) : paragraph.includes(':') && paragraph.split(':')[0].length < 50 ? (
                        <div>
                          <strong className="text-foreground block mb-2">{paragraph.split(':')[0]}:</strong>
                          <p className="leading-relaxed">{paragraph.substring(paragraph.indexOf(':') + 1).trim()}</p>
                        </div>
                      ) : (
                        <p className="leading-relaxed">{paragraph}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
