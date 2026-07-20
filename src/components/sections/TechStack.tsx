import { FloatingDock, FloatingDockItem } from "@/components/ui/floating-dock";
import { techStack } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { useState } from "react";

// ─── Tech colour map for glow effects ───────────────────────────────────────
const TECH_COLORS: Record<string, string> = {
  React:          "#61DAFB",
  JavaScript:     "#F7DF1E",
  "Node.js":      "#339933",
  Java:           "#ED8B00",
  Python:         "#3776AB",
  PHP:            "#777BB4",
  MongoDB:        "#47A248",
  TypeScript:     "#3178C6",
  "Tailwind CSS": "#06B6D4",
  HTML:           "#E34F26",
  CSS:            "#1572B6",
  MySQL:          "#4479A1",
  "React Native": "#61DAFB",
};

// ─── Official SVG logos ─────────────────────────────────────────────────────
const TECH_LOGOS: Record<string, React.ReactNode> = {
  React: (
    <svg className="w-full h-full animate-[spin_20s_linear_infinite]" viewBox="-11.5 -10.232 23 20.463" xmlns="http://www.w3.org/2000/svg">
      <circle r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  JavaScript: (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" fill="#F7DF1E" rx="12" />
      <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.889-3.092 12.889-15.12v-81.798h24.058v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.979-36.086-21.994m88.56-3.244l19.588-11.374c5.157 8.421 11.859 14.607 23.715 14.607 9.964 0 16.321-4.984 16.321-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.395-28.871-16.673-28.871-36.26 0-18.044 13.748-31.792 35.229-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.731 12.029c-4.125-7.394-8.591-10.315-15.465-10.315-7.046 0-11.514 4.468-11.514 10.315 0 7.217 4.468 10.143 14.778 14.608l6.013 2.581c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.814-24.542" fill="#000" />
    </svg>
  ),
  "Node.js": (
    <svg className="w-full h-full" viewBox="0 0 256 282" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ndg1" x1="68.188%" y1="17.487%" x2="27.823%" y2="89.755%">
          <stop stopColor="#41873F" offset="0%" />
          <stop stopColor="#418B3D" offset="32.88%" />
          <stop stopColor="#34A853" offset="63.52%" />
          <stop stopColor="#2EB156" offset="100%" />
        </linearGradient>
      </defs>
      <path d="M128 0L0 73.9v141.1L128 282l128-67v-141L128 0z" fill="url(#ndg1)" />
      <path d="M116 200v-80l-28 16v80l28-16z" fill="#fff" opacity="0.8" />
      <path d="M144 200v-80l28 16v80l-28-16z" fill="#fff" opacity="0.6" />
      <path d="M128 108l-28 16 28 16 28-16-28-16z" fill="#fff" />
    </svg>
  ),
  Java: (
    <svg className="w-full h-full" viewBox="0 0 256 346" xmlns="http://www.w3.org/2000/svg">
      <path d="M82.554 267.473s-13.198 7.675 9.393 10.272c27.369 3.122 41.356 2.675 71.517-3.034 0 0 7.93 4.972 19.003 9.279-67.611 28.977-153.019-1.679-99.913-16.517M74.292 229.659s-14.803 10.958 7.805 13.296c29.236 3.016 52.324 3.263 92.276-4.43 0 0 5.526 5.602 14.215 8.666-81.747 23.904-172.842 1.885-114.296-17.532" fill="#5382A1" />
      <path d="M143.942 165.515c16.66 19.18-4.377 36.44-4.377 36.44s42.301-21.837 22.874-49.183c-18.144-25.5-32.059-38.172 43.268-81.858 0 0-118.238 29.53-61.765 94.601" fill="#E76F00" />
      <path d="M233.364 295.442s9.767 8.047-10.757 14.273c-39.026 11.823-162.432 15.393-196.714.471-12.323-5.36 10.787-12.8 18.056-14.362 7.581-1.644 11.914-1.337 11.914-1.337-13.705-9.655-88.583 18.957-38.034 27.15 137.853 22.356 251.292-10.066 215.535-26.195M88.9 190.48s-62.771 14.907-22.228 20.323c17.118 2.292 51.243 1.774 83.03-.89 25.978-2.19 52.063-6.85 52.063-6.85s-9.16 3.923-15.787 8.448c-63.744 16.765-186.886 8.966-151.435-8.183 29.981-14.492 54.357-12.848 54.357-12.848M201.506 253.422c64.8-33.672 34.839-66.03 13.927-61.67-5.126 1.066-7.411 1.991-7.411 1.991s1.903-2.98 5.537-4.27c41.37-14.545 73.187 42.897-13.355 65.647 0 0 1.003-.895 1.302-1.698" fill="#5382A1" />
      <path d="M162.439 0s35.887 35.89-34.037 91.101c-56.071 44.282-12.786 69.53-.023 98.377-32.73-29.53-56.75-55.526-40.635-79.72C111.395 74.612 176.918 57.393 162.439 0" fill="#E76F00" />
      <path d="M95.268 344.665c62.199 3.982 157.712-2.209 159.974-31.64 0 0-4.348 11.158-51.404 20.018-53.088 9.99-118.564 8.824-157.399 2.421 0 0 7.953 6.58 48.829 9.201" fill="#5382A1" />
    </svg>
  ),
  Python: (
    <svg className="w-full h-full" viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pyb" x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%">
          <stop stopColor="#387EB8" offset="0%" />
          <stop stopColor="#366994" offset="100%" />
        </linearGradient>
        <linearGradient id="pyy" x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%">
          <stop stopColor="#FFE052" offset="0%" />
          <stop stopColor="#FFC331" offset="100%" />
        </linearGradient>
      </defs>
      <path d="M126.9 0c-64.1 0-60.1 27.8-60.1 27.8l.1 28.8h61.2v8.7H41.8S0 60.5 0 125.1c0 64.7 35.8 62.5 35.8 62.5h21.4v-30s-1.2-35.8 35.2-35.8h60.7s34.1.6 34.1-33v-55.5S193.4 0 126.9 0zm-33.9 19.8c6.1 0 11 5 11 11.1s-4.9 11.1-11 11.1-11-5-11-11.1 4.9-11.1 11-11.1z" fill="url(#pyb)" />
      <path d="M129.1 255c64.1 0 60.1-27.8 60.1-27.8l-.1-28.8h-61.2v-8.7h86.3s41.8 4.8 41.8-59.9c0-64.7-35.8-62.5-35.8-62.5h-21.4v30s1.2 35.8-35.2 35.8H103s-34.1-.6-34.1 33V211s-5.2 44 60.2 44zm33.9-19.8c-6.1 0-11-5-11-11.1s4.9-11.1 11-11.1 11 5 11 11.1-4.9 11.1-11 11.1z" fill="url(#pyy)" />
    </svg>
  ),
  MongoDB: (
    <svg className="w-full h-full" viewBox="0 0 256 549" xmlns="http://www.w3.org/2000/svg">
      <path d="M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 00-1.492 0c-4.048 5.759-23.863 33.487-46.873 60.788-197.507 251.896 31.108 421.852 31.108 421.852l1.917 1.28c1.172 26.08 5.227 59.372 5.227 59.372h8.737s4.055-33.292 5.227-59.372l1.917-1.28s228.615-169.956 31.105-421.852" fill="#00ED64" />
      <path d="M128 .32s-19.984 28.538-46.873 60.788C-116.38 313.004 112.235 482.96 112.235 482.96l1.917 1.28c1.172 26.08 5.227 59.372 5.227 59.372h8.621V.32z" fill="#00A550" opacity="0.5" />
      <path d="M135.385 484.24l-1.917-1.28s228.615-169.956 31.105-421.852C141.563 33.807 128 .32 128 .32v543.292h8.158s4.055-33.292 5.227-59.372" fill="#00ED64" />
    </svg>
  ),
  TypeScript: (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="20" fill="#3178C6" />
      <path d="M150.5 166.5c3.5 5.8 8.2 10 16.8 10 7.1 0 11.6-3.5 11.6-8.4 0-5.8-4.6-7.8-12.4-11.2l-4.3-1.8c-12.3-5.3-20.5-11.9-20.5-25.9 0-12.9 9.8-22.7 25.1-22.7 10.9 0 18.7 3.8 24.3 13.8l-13.3 8.5c-2.9-5.3-6.1-7.4-11-7.4-5 0-8.2 3.2-8.2 7.4 0 5.2 3.2 7.2 10.6 10.4l4.3 1.8c14.5 6.2 22.7 12.6 22.7 26.9 0 15.4-12.1 23.9-28.3 23.9-15.9 0-26.1-7.5-31.1-17.4l13.7-8.8zm-56.4-51.4h-24.9v-14.6h66.4v14.6h-24.8v65.4h-16.7v-65.4z" fill="white" />
    </svg>
  ),
  "Tailwind CSS": (
    <svg className="w-full h-full" viewBox="0 0 256 154" xmlns="http://www.w3.org/2000/svg">
      <path d="M128 0C93.8 0 72.5 17.1 64 51.2c12.8-17.1 27.7-23.5 44.8-19.2 9.8 2.5 16.7 9.5 24.5 17.5C146 62.3 160.5 77 192 77c34.2 0 55.5-17.1 64-51.2-12.8 17.1-27.7 23.5-44.8 19.2-9.8-2.5-16.7-9.5-24.5-17.5C174 14.7 159.5 0 128 0zM64 77C29.8 77 8.5 94.1 0 128.2c12.8-17.1 27.7-23.5 44.8-19.2 9.8 2.5 16.7 9.5 24.5 17.5C82 139.3 96.5 154 128 154c34.2 0 55.5-17.1 64-51.2-12.8 17.1-27.7 23.5-44.8 19.2-9.8-2.5-16.7-9.5-24.5-17.5C110 91.7 95.5 77 64 77z" fill="#06B6D4" />
    </svg>
  ),
  HTML: (
    <svg className="w-full h-full" viewBox="0 0 452 520" xmlns="http://www.w3.org/2000/svg">
      <path d="M41.4 460.7L0 0h452l-41.5 460.6L226 520" fill="#E34F26" />
      <path d="M226 482.8l149.3-41.4 35.4-396.4H226" fill="#EF652A" />
      <path d="M226 212.5h-75.2l-5.2-58.2H226v-56.9H85.1l1.4 15.5 14.3 160.5H226zm0 147.3l-.3.1-63-17-4-44.8H101l7.9 88.3 117 32.5.3-.1z" fill="#fff" />
      <path d="M226 212.5v56.9h70l-6.6 73.7-63.4 17v59.1l117.3-32.5.9-9.7 13.4-150.1 1.4-14.4H226zm0-155.1v56.9h137.8l1.1-12.2 2.5-28.2 1.4-16.5z" fill="#EBEBEB" />
    </svg>
  ),
  CSS: (
    <svg className="w-full h-full" viewBox="0 0 452 520" xmlns="http://www.w3.org/2000/svg">
      <path d="M41.4 460.7L0 0h452l-41.5 460.6L226 520" fill="#1572B6" />
      <path d="M226 482.8l149.3-41.4 35.4-396.4H226" fill="#33A9DC" />
      <path d="M226 212.5H116.5l3.7 41.4H226v-41.4zm0-99.1H107.1l3.7 41.3H226v-41.3zm0 228.6-.3.1-74.8-20.2-5.2-58.5H104l10.3 115.3 111.4 30.9.3-.1v-67.5zm0-228.6" fill="#fff" />
      <path d="M226 212.5v41.4h104.8l-9.8 109.7-95 25.7V448l111.3-30.8 .8-9.2 15.3-171.4 1.6-17.1H226zm0-99.1v41.3h121.8l1-10.8 2.2-24 1.5-16.5H226z" fill="#EBEBEB" />
    </svg>
  ),
  MySQL: (
    <svg className="w-full h-full" viewBox="0 0 256 252" xmlns="http://www.w3.org/2000/svg">
      <path d="M236.1 194.3c-12.6-.3-22.4 1-30.7 4.6-2.4 1-6.1 1-6.5 4 1.3 1.3 1.5 3.3 2.6 5 2.1 3.2 5.6 7.4 8.7 9.6 3.4 2.4 6.9 5 10.4 7.2 6.3 4 13.3 6.2 19.3 10.2 3.5 2.3 7 5.3 10.5 7.9 1.7 1.3 2.9 3.3 5 4.3v-.5c-1.2-1.5-1.5-3.5-2.6-5.2l-4.8-4.6c-4.7-6.3-10.5-11.8-16.9-16.2-5-3.5-16.3-8.2-18.4-14l-.3-.3c3.5-.4 7.7-1.7 11-2.6 5.5-1.5 10.4-1.2 16.1-2.6 2.6-.8 5.2-1.6 7.8-2.4v-1.5c-2.9-3-5-7-8.1-9.8-8.1-7.2-17-14.3-26.1-20.3-4.8-3.2-10.8-5.2-16-7.9-1.7-1-4.7-1.4-5.8-2.9-2.6-3.3-4.1-7.5-6.1-11.3-4.2-8-8.3-16.7-12-25.2-2.5-5.8-4.1-11.5-7.2-16.9-14.7-25.3-30.6-40.7-55.2-55.7-5.2-3.2-11.5-4.5-18.1-6.2-3.5-.2-7-.4-10.5-.6-2.1-1-4.4-3.6-6.2-4.9C53.5 20 24.2.2 17.8 12.7c-4 7.9 6 15.7 9.4 19.7 2.5 2.9 5.6 6.2 7.6 9.4 1.3 2.1 1.5 4.3 2.6 6.6 2.6 5.6 4.8 11.8 8 17 1.7 2.7 3.5 5.5 5.6 7.9 1.3 1.5 3.4 2.1 3.9 4.5-2.2 3.1-2.3 7.8-3.5 11.6-5.4 17.3-3.4 38.7 4.4 51.5 2.4 3.9 8.1 12.4 15.8 9.1 6.7-2.9 5.3-11.8 7.2-19.7.4-1.8.2-3.1 1-4.4v.3c2 4 4 7.9 5.8 11.9 4.3 7 11.9 14.2 18.3 19.1 3.3 2.5 5.9 6.9 10.1 8.5v-.5h-.3c-.8-1.3-2.1-1.8-3.2-2.9-2.5-2.5-5.2-5.6-7.2-8.4-5.7-7.9-10.8-16.5-15.3-25.5-2.2-4.3-4-9.1-5.8-13.4-1-1.6-1-4-2.6-4.8-2.4 3.6-5.9 6.6-7.6 11.2-2.8 7.2-3.1 16.1-4.2 25.1l-.6.2c-4.7-1.2-6.4-6-8.2-10.1-4.5-10.4-5.3-27.1-1.4-39 1-3.1 5.6-12.8 3.8-15.8-1-3-3.8-4.7-5.4-7.1-2-3-4-6.8-5.4-10.2-3.6-8.7-5.3-18.4-9.2-27.1-1.8-4-5-8.1-7.6-11.8-2.9-4.1-6.1-7.1-8.4-11.8-.8-1.7-1.9-4.3-.6-6.1.4-1.2.8-1.7 2-2.1 1.9-1.5 7.3.5 9.2 1.3 5.2 2 9.5 3.9 13.9 6.6 2 1.3 4.1 3.7 6.6 4.3h2.9c4.5 1 9.6.3 13.8 1.5 7.4 2.2 14 5.5 20 9.1 18.3 11 33.3 26.6 43.4 45.4 1.6 3.1 2.4 5.9 3.8 9.1 2.9 6.5 6.5 13.2 9.4 19.5 2.9 6.3 5.8 12.7 10 18 2.2 2.8 10.7 4.3 14.5 5.9 2.7 1.1 7.1 2.3 9.6 3.7 4.7 2.7 9.3 5.8 13.6 8.8 2.2 1.5 8.9 4.8 9.3 7.6z" fill="#00546B" />
      <path d="M58.2 26.7c-2.3 0-3.9.3-5.6.7v.3h.3c1.1 2.2 3 3.7 4.4 5.6l3.2 6.6.3-.3c2-1.4 2.9-3.6 2.9-6.9-.8-.9-.9-1.9-1.6-2.9-1-1.3-2.8-2-3.9-3.1z" fill="#00546B" />
    </svg>
  ),
  "React Native": (
    <svg className="w-full h-full" viewBox="-11.5 -10.232 23 20.463" xmlns="http://www.w3.org/2000/svg">
      <circle r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  PHP: (
    <svg className="w-full h-full" viewBox="0 0 256 134" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="128" cy="67" rx="128" ry="67" fill="#777BB4" />
      <path d="M35.945 106.082l14.028-71.014H88.06c16.14 0 27.94 3.155 35.376 9.465 7.437 6.31 9.67 15.605 6.701 27.884-1.004 5.09-2.836 9.87-5.497 14.34-2.661 4.47-6.113 8.391-10.357 11.764-5.324 4.34-11.1 7.39-17.327 9.146-6.227 1.757-13.785 2.636-22.673 2.636H59.21l-4.803 24.32h-18.46zm23.74-39.76h12.572c6.783 0 11.773-.877 14.969-2.63 3.196-1.754 5.46-4.9 6.794-9.44.977-3.537.73-6.144-.742-7.82-1.473-1.676-4.815-2.515-10.029-2.515H70.48l-10.794 22.406z" fill="#fff" />
      <path d="M120.975 28.068h18.372l-4.7 23.82h13.636c7.628.127 13.236 1.573 16.822 4.34 3.587 2.766 4.754 7.735 3.502 14.907l-7.063 35.027h-18.546l6.688-33.17c.636-3.453.396-5.79-.72-7.01-1.115-1.22-3.593-1.83-7.434-1.83l-12.046-.042-8.786 42.052h-18.372l18.647-78.094z" fill="#fff" />
      <path d="M176.07 106.082l14.028-71.014h38.088c16.14 0 27.94 3.155 35.375 9.465 7.437 6.31 9.67 15.605 6.702 27.884-1.004 5.09-2.836 9.87-5.497 14.34-2.662 4.47-6.114 8.391-10.357 11.764-5.325 4.34-11.1 7.39-17.328 9.146-6.226 1.757-13.784 2.636-22.672 2.636h-15.074l-4.803 24.32h-18.461zm23.74-39.76h12.572c6.782 0 11.772-.877 14.968-2.63 3.196-1.754 5.46-4.9 6.794-9.44.977-3.537.73-6.144-.742-7.82-1.473-1.676-4.815-2.515-10.028-2.515h-12.796l-10.768 22.406z" fill="#fff" />
    </svg>
  ),
};

// ─── Tech Card Grid Item with glow effect ────────────────────────────────────
function TechCard({ tech }: { tech: typeof techStack[number] }) {
  const [hovered, setHovered] = useState(false);
  const color = TECH_COLORS[tech.name] ?? "#ffffff";

  return (
    <motion.div
      id={`tech-${tech.name.toLowerCase().replace(/[\s.]/g, "")}`}
      key={tech.name}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? { y: -8 } : { y: 0 }}
      // @ts-ignore — transition inside animate
      style={{ transition: "box-shadow 0.3s" }}
      className="relative p-6 border border-white/[0.06] bg-card/40 backdrop-blur-sm rounded-2xl transition-colors duration-300 text-center group cursor-default overflow-hidden"
    >
      {/* Glow layer behind — colour from tech brand */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={
          hovered
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.85 }
        }
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(ellipse at 50% 120%, ${color}40 0%, transparent 70%)`,
          filter: "blur(12px)",
        }}
      />

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{ boxShadow: `0 0 18px 2px ${color}55, inset 0 0 12px 0 ${color}22` }}
      />

      {/* Icon */}
      <motion.div
        className="size-12 mx-auto mb-4 flex items-center justify-center"
        animate={hovered ? { scale: 1.18 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {TECH_LOGOS[tech.name] ?? (
          <div className="size-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
            {tech.abbr}
          </div>
        )}
      </motion.div>

      {/* Name */}
      <div className="text-sm font-semibold text-foreground relative z-10">{tech.name}</div>

      {/* Category */}
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1 relative z-10">
        {tech.category}
      </div>

      {/* Subtle corner sparkle dots */}
      <motion.div
        className="absolute top-2 right-2 size-1.5 rounded-full pointer-events-none"
        animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.2 }}
        style={{ backgroundColor: color }}
      />
      <motion.div
        className="absolute bottom-2 left-2 size-1 rounded-full pointer-events-none"
        animate={hovered ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}

export function TechStack() {
  const dockItems: FloatingDockItem[] = techStack.map((tech) => ({
    title: tech.name,
    icon: TECH_LOGOS[tech.name] ?? (
      <span className="text-xs font-bold text-white uppercase tracking-wider">{tech.abbr}</span>
    ),
    href: `#tech-${tech.name.toLowerCase().replace(/[\s.]/g, "")}`,
  }));

  return (
    <section id="tech" className="py-24 px-6 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Tecnologias"
          title="Stack Técnica"
          description="Ferramentas e linguagens que utilizo no dia a dia para entregar soluções modernas e de alta performance."
          align="center"
        />

        {/* Floating Dock Shelf */}
        <div className="flex flex-col items-center justify-center mt-14 py-10 px-6 rounded-3xl border border-white/[0.05] bg-neutral-950/30 backdrop-blur-md relative overflow-hidden shadow-2xl">
          <div className="absolute -left-20 -top-20 size-72 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 size-72 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

          <FloatingDock items={dockItems} />

          <p className="mt-5 text-xs text-white/30 text-center max-w-sm pointer-events-none select-none">
            Passe o cursor sobre os ícones para ampliar — mobile: botão flutuante
          </p>
        </div>

        {/* Tech card grid with glow + lift effects */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techStack.map((tech) => (
            <TechCard key={tech.name} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
