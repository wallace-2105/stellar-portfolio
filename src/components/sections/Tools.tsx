import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { tools } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

export function Tools() {
  return (
    <section id="tools" className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Workflow"
          title="Ferramentas que utilizo"
          description="Stack de ferramentas que potencializam meu fluxo de trabalho diário."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="p-5 rounded-xl border border-border bg-card flex items-center gap-3 hover:border-primary/40 transition-colors"
            >
              <div className="size-9 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                <Wrench className="size-4 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm truncate">{tool.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {tool.category}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
