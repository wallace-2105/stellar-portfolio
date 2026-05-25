import { personal } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-border text-center">
      <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
        © {new Date().getFullYear()} {personal.name} · Todos os direitos reservados
      </p>
    </footer>
  );
}
