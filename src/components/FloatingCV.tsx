import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { personal } from "@/data/portfolio";

export function FloatingCV() {
  return (
    <motion.a
      href={personal.cvUrl}
      download
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-primary text-primary-foreground pl-5 pr-4 py-3.5 rounded-full shadow-elegant hover:bg-primary/90 transition-colors"
    >
      <span className="text-xs font-bold tracking-widest uppercase">Currículo</span>
      <Download className="size-4" />
    </motion.a>
  );
}
