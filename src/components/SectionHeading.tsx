import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: Props) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${isCenter ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}
    >
      {eyebrow && (
        <span className="text-primary font-semibold tracking-widest text-xs uppercase mb-4 block">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <div
        className={`h-1 w-16 bg-primary rounded-full ${isCenter ? "mx-auto" : ""}`}
      />
      {description && (
        <p className="text-muted-foreground mt-6 leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
