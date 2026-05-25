import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { FloatingCV } from "@/components/FloatingCV";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Tools } from "@/components/sections/Tools";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { personal } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${personal.name} — ${personal.role}` },
      {
        name: "description",
        content:
          "Portfólio profissional de desenvolvedor full stack sênior. Projetos, experiência, tecnologias e contato.",
      },
      { property: "og:title", content: `${personal.name} — ${personal.role}` },
      {
        property: "og:description",
        content: "Portfólio profissional moderno com projetos, experiência e tecnologias.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700;800&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <TechStack />
        <Experience />
        <Education />
        <Certifications />
        <Tools />
        <Contact />
      </main>
      <Footer />
      <FloatingCV />
    </div>
  );
}
