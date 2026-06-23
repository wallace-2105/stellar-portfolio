import { FloatingDock, FloatingDockItem } from "@/components/ui/floating-dock";
import { techStack } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { useState } from "react";

// ─── Tech colour map for glow effects ───────────────────────────────────────
const TECH_COLORS: Record<string, string> = {
  TypeScript:  "#3178C6",
  React:       "#61DAFB",
  "Next.js":   "#ffffff",
  Tailwind:    "#06B6D4",
  "Node.js":   "#339933",
  PostgreSQL:  "#336791",
  GraphQL:     "#E10098",
  Docker:      "#2496ED",
  AWS:         "#FF9900",
  Redis:       "#D82C20",
  Python:      "#3776AB",
  Go:          "#00ADD8",
};

// ─── Corrected official SVG logos ────────────────────────────────────────────
const TECH_LOGOS: Record<string, React.ReactNode> = {
  TypeScript: (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="20" fill="#3178C6" />
      <path d="M150.5 166.5c3.5 5.8 8.2 10 16.8 10 7.1 0 11.6-3.5 11.6-8.4 0-5.8-4.6-7.8-12.4-11.2l-4.3-1.8c-12.3-5.3-20.5-11.9-20.5-25.9 0-12.9 9.8-22.7 25.1-22.7 10.9 0 18.7 3.8 24.3 13.8l-13.3 8.5c-2.9-5.3-6.1-7.4-11-7.4-5 0-8.2 3.2-8.2 7.4 0 5.2 3.2 7.2 10.6 10.4l4.3 1.8c14.5 6.2 22.7 12.6 22.7 26.9 0 15.4-12.1 23.9-28.3 23.9-15.9 0-26.1-7.5-31.1-17.4l13.7-8.8zm-56.4-51.4h-24.9v-14.6h66.4v14.6h-24.8v65.4h-16.7v-65.4z" fill="white" />
    </svg>
  ),
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
  "Next.js": (
    <svg className="w-full h-full" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="nm" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="white" />
      </mask>
      <g mask="url(#nm)">
        <circle cx="90" cy="90" r="90" fill="black" />
        <path d="M149.5 157.5L86 77V133h-11V51h11l53 67.5V51h11v106.5h-10.5z" fill="url(#ng)" />
        <path d="M115 51h11v55l-11-14V51z" fill="white" />
      </g>
      <defs>
        <linearGradient id="ng" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Tailwind: (
    <svg className="w-full h-full" viewBox="0 0 248 31" xmlns="http://www.w3.org/2000/svg">
      <path d="M124 0c-33.2 0-54 16.6-62 49.8 12.4-16.6 26.9-22.8 43.5-18.7 9.5 2.4 16.2 9.2 23.7 16.7 12.1 12.2 26.1 26.3 56.7 26.3 33.2 0 54-16.6 62-49.8-12.4 16.6-26.9 22.8-43.5 18.7-9.5-2.4-16.2-9.2-23.7-16.7C168.6 14.1 154.6 0 124 0zm-62 74c-33.2 0-54 16.6-62 49.8 12.4-16.6 26.9-22.8 43.5-18.7 9.5 2.4 16.2 9.2 23.7 16.7 12.1 12.2 26.1 26.2 56.8 26.2 33.2 0 54-16.6 62-49.8-12.4 16.6-26.9 22.8-43.5 18.7-9.5-2.4-16.2-9.2-23.7-16.7C106.6 88.1 92.6 74 62 74z" fill="#06B6D4" />
    </svg>
  ),
  "Node.js": (
    <svg className="w-full h-full" viewBox="0 0 256 289" xmlns="http://www.w3.org/2000/svg">
      <path d="M128 0l128 73.9v147.8L128 295.6 0 221.7V73.9L128 0z" fill="#3C873A" />
      <path d="M128 9.3L9.3 78.5v141.6L128 289l118.7-68.9V78.5L128 9.3z" fill="#3C873A" />
      <path d="M128 16l112 64.7v129.4L128 274.1 16 210.1V80.7L128 16z" fill="#599137" />
      <path d="M107.9 169.4c0 16.1 9.3 24.2 26.8 24.2 18 0 28.1-8.5 28.1-23.8v-95.6h-24.5v95.5c0 5.6-1.8 7.3-5.2 7.3-3.6 0-5.2-2.1-5.2-7.3v-5.6h-20zm-43.1-7.9c0-12.6 7.5-19.5 22.5-21.5l19.8-2.8v-7.6c0-6.9-4.2-9-10.3-9-6.5 0-10.1 3-10.4 8.8H64.3c.5-18.5 12.4-28.4 34-28.4 22 0 33 9.9 33 30.3v58.1c0 6.5 1.5 11.3 4.1 14.4h-22.3c-1.5-3.3-2.3-7.3-2.3-12.3-4.4 8.7-12.3 13.5-24.5 13.5-16.5 0-26.5-10.5-26.5-24.5zm41.3-4.9c-7.9 1.4-13.2 5.2-13.2 11.8 0 5.6 3.6 8.8 9.5 8.8 8.1 0 14.8-5.7 14.8-16.2v-6.1l-11.1 1.7z" fill="white" />
    </svg>
  ),
  PostgreSQL: (
    <svg className="w-full h-full" viewBox="0 0 424 440" xmlns="http://www.w3.org/2000/svg">
      <path d="M310.5 51.5c-11.7-2.7-23.9-3.6-35.5-2.7-14.8 1.1-29 5-41.7 11.5-5.2-3.7-10.8-6.9-16.8-9.4-17.9-7.7-38.3-9.4-57.2-4.9-18.8 4.5-35.6 15.2-47.9 30.1C86.4 96 79.2 120.2 80 145.5c.7 21.4 7 42.4 18.5 60.4-4 12-5.6 24.7-4.7 37.3 1.1 15.9 6.2 31.5 14.7 45 8.2 13.1 19.6 24 33 31.5 3.8 2.1 7.7 3.9 11.8 5.4-3.3 10.8-5 22-5 33.4 0 15.9 3.4 31.6 10 46.1 6.3 13.9 15.9 26.1 27.7 35.5 11.3 9.1 24.8 15 39.1 17.1 14.2 2.1 28.8.6 42.2-4.4 13.4-5 25.4-13.3 34.7-24.1 9.6-11.2 16.1-24.7 18.9-39.1 2.3-12.1 2-24.6-.9-36.5 6.4-1.5 12.6-3.8 18.4-6.7 14.7-7.5 26.9-19 35.3-33 8.3-13.8 12.5-29.8 12.1-45.9-.3-13.3-3.7-26.4-9.9-38.1 11-18.1 16.8-38.9 16.8-60.1-.1-25.3-8.4-49.9-23.8-69.9-12.6-16.3-29.5-28.8-48.9-35.9zm-114 280c-6.1-2.3-11.8-5.7-16.7-10.1-4.8-4.3-8.7-9.5-11.5-15.3-3-6.1-4.5-12.9-4.5-19.7 0-5.8.9-11.5 2.7-17 7.7 4 15.9 7.1 24.4 9.2-.3 6.2.4 12.5 2.1 18.5 1.6 5.7 4.1 11.1 7.5 15.9 3 4.3 6.7 8 11 11 .4.3.8.5 1.2.7-5.3 2.7-10.9 5.2-16.2 6.8zm89.9 14.7c-6.9 8.1-16.7 13.5-27.4 15.2-10.7 1.7-21.7-.3-31.1-5.6-9.1-5.1-16.4-13-20.6-22.7-4.4-10-5.2-21.3-2.5-31.9 1.6 0 3.2-.1 4.8-.2 7.4-.6 14.7-2 21.9-4 .8 5.2 2.6 10.2 5.3 14.8 3.3 5.6 8 10.2 13.6 13.4 5.6 3.2 12 4.8 18.4 4.6 6.4-.2 12.6-2.2 17.9-5.8l1.2 4.9c.5 2.1.3 4.4-.6 6.5-.4 1.7-1.2 3.4-2.2 4.9l1.3 6.2-.2-.3zM310 260.2c-6.1 10.2-15.2 18.3-26.1 23.1-5.4 2.3-11 3.9-16.8 4.5-4.6.5-9.3.6-14 .2-17.6-1.6-34.1-10.3-45.4-24.1a60.2 60.2 0 01-12.6-38.2c-.1-5.3.4-10.6 1.6-15.8 3.1.7 6.3 1.3 9.5 1.8 14.3 2.2 28.9 2.5 43.2.8 13.3-1.6 26.4-4.9 38.7-9.9 10.2-4.1 19.9-9.5 28.6-16l.2.2c5.8 7.6 9.2 16.9 9.6 26.5.5 9.7-2 19.4-6.8 28.3-.8 1.7-1.7 3.3-2.7 5.5l1.2 3.9-8.2 9.2z" fill="#336791" />
    </svg>
  ),
  GraphQL: (
    <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path fill="#E10098" d="M50 6.9L6.9 31.4v49.2L50 93.1l43.1-24.5V31.4L50 6.9z" opacity=".1" />
      <path stroke="#E10098" strokeWidth="6" fill="none" d="M50 6.9L6.9 31.4v49.2L50 93.1l43.1-24.5V31.4L50 6.9z" />
      <circle fill="#E10098" cx="50" cy="6.9" r="7" />
      <circle fill="#E10098" cx="93.1" cy="31.4" r="7" />
      <circle fill="#E10098" cx="93.1" cy="68.6" r="7" />
      <circle fill="#E10098" cx="50" cy="93.1" r="7" />
      <circle fill="#E10098" cx="6.9" cy="68.6" r="7" />
      <circle fill="#E10098" cx="6.9" cy="31.4" r="7" />
      <path stroke="#E10098" strokeWidth="6" fill="none" d="M50 6.9l43.1 61.7M93.1 31.4H6.9M50 6.9L6.9 68.6M6.9 31.4L93.1 68.6M6.9 68.6h86.2M50 93.1L93.1 31.4" />
    </svg>
  ),
  Docker: (
    <svg className="w-full h-full" viewBox="0 0 106 74" xmlns="http://www.w3.org/2000/svg">
      <path fill="#2496ED" d="M58.6 22H47.1v10h11.5V22zm-14 0H33.1v10h11.5V22zm-14 0H19.1v10h11.5V22zm14-13H33.1v10h11.5V9zm0 26H33.1v10h11.5V35zm-28.1 0H5v10h11.5V35zM30.6 9H19.1v10h11.5V9zm56.1 12.8c-.5-3.7-2.9-6.9-6.6-9.4l-2.2-1.5-1.5 2.2c-1.9 2.9-2.8 6.9-2.5 10.7.1 1.4.5 3.8 1.9 5.9-1.4.7-4 1.5-7.5 1.5H.5L.3 33c-.3 5.3.7 10.5 3.2 15.2 2.7 5.1 6.7 8.9 11.9 11.2 5.8 2.6 15.3 3.9 25.2 3.9 4.7 0 9.4-.4 13.8-1.3 6.4-1.3 12.5-3.7 17.6-7.1 4.5-3 8.3-6.9 11.3-11.6 5.4-8.3 6.9-17.1 6.9-20.7h-1.7c2.6-1.3 4.9-3.2 5.8-6.4l.5-1.9-1.7-.6zM44.6 35H33.1v10h11.5V35zm-28 0H5v10h11.5V35zm42 0H47.1v10h11.5V35z" />
    </svg>
  ),
  AWS: (
    <svg className="w-full h-full" viewBox="0 0 304 182" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FF9900" d="M86.4 66.4c0 3.7.4 6.7 1.1 8.8.8 2.1 1.8 4.4 3.2 6.8.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3l-6.3 4.2c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4-1.4-1.5-2.6-3.1-3.6-4.7-1-1.7-2-3.6-3.1-5.9-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2-4.9-4.8-7.4-11.2-7.4-19.2 0-8.5 3-15.4 9.1-20.6 6.1-5.2 14.2-7.8 24.5-7.8 3.4 0 6.9.3 10.6.8 3.7.5 7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3-3.7.9-7.3 2-10.8 3.4-1.6.7-2.8 1.1-3.5 1.3-.7.2-1.2.3-1.6.3-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5.5-.7 1.4-1.4 2.8-2.1 3.5-1.8 7.7-3.3 12.6-4.5 4.9-1.3 10.1-1.9 15.6-1.9 11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4zm-40.6 15.2c3.3 0 6.7-.6 10.3-1.8 3.6-1.2 6.8-3.4 9.5-6.4 1.6-1.9 2.8-4 3.4-6.4.6-2.4 1-5.3 1-8.7v-4.2c-2.9-.7-6-1.3-9.2-1.7-3.2-.4-6.3-.6-9.4-.6-6.7 0-11.6 1.3-14.9 4-3.3 2.7-4.9 6.5-4.9 11.5 0 4.7 1.2 8.2 3.7 10.6 2.4 2.5 5.9 3.7 10.5 3.7zm80.3 10.8c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L96.8 10.2c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9l18.5 73 17.2-73c.5-2 1.1-3.3 1.9-3.9.8-.6 2.2-1 4-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l17.4 73.9 19-73.9c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6-.1.6-.4 1.4-.8 2.5l-23.7 77.3c-.6 2-1.3 3.3-2.1 3.9-.8.6-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1-.8-.7-1.5-2-1.9-4l-17.1-71.5-17 71.4c-.5 2-1.1 3.3-1.9 4-.8.7-2.2 1-4 1h-8.6zm126.5 2.7c-5.2 0-10.4-.6-15.4-1.8-5-1.2-8.9-2.5-11.5-4-1.6-.9-2.7-1.9-3.1-2.8-.4-.9-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1.6 0 1.2.1 1.8.3.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3 3.4-2.2 5.2-5.4 5.2-9.5 0-2.8-.9-5.1-2.7-7-1.8-1.9-5.2-3.6-10.1-5.2l-14.5-4.5c-7.3-2.3-12.7-5.7-16-10.2-3.3-4.4-5-9.3-5-14.5 0-4.2.9-7.9 2.7-11.1 1.8-3.2 4.2-6 7.2-8.2 3-2.3 6.4-4 10.4-5.2 4-1.2 8.2-1.7 12.6-1.7 2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6 1.8.6 3.2 1.2 4.2 1.8 1.4.8 2.4 1.6 3 2.5.6.8.9 1.9.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2-5.7-2.6-12.1-3.9-19.2-3.9-5.7 0-10.2 .9-13.4 2.8-3.2 1.9-4.8 4.8-4.8 8.8 0 2.8 1 5.2 3 7.1 2 1.9 5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6 3.1 4.1 4.6 8.8 4.6 14 0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.4 8.8-3.2 2.5-7 4.4-11.4 5.7-4.6 1.5-9.5 2.2-14.7 2.2z" />
      <path fill="#FF9900" d="M273.5 143.7c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z" />
      <path fill="#FF9900" d="M287.2 128.1c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.1 8.7-37.5z" />
    </svg>
  ),
  Redis: (
    <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="162" rx="100" ry="20" fill="#D82C20" opacity=".4" />
      <ellipse cx="100" cy="150" rx="100" ry="20" fill="#D82C20" />
      <rect x="0" y="80" width="200" height="70" fill="#D82C20" />
      <ellipse cx="100" cy="80" rx="100" ry="20" fill="#FF5246" />
      <ellipse cx="100" cy="115" rx="100" ry="20" fill="#D82C20" opacity=".6" />
      <text x="40" y="60" fill="white" fontSize="48" fontWeight="bold" fontFamily="monospace">R</text>
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
  Go: (
    <svg className="w-full h-full" viewBox="0 0 256 96" xmlns="http://www.w3.org/2000/svg">
      <path fill="#00ACD7" d="M17.2 37.2c-.4 0-.5.2-.3.5l2 2.5c.2.3.7.5 1.1.5h38.5c.4 0 .5-.3.3-.6l-1.6-2.4c-.2-.3-.7-.6-1-.6zM1.1 47c-.4 0-.5.2-.3.5l2 2.5c.2.3.7.5 1.1.5h49c.4 0 .9-.3.9-.7l.7-2.3c.1-.5-.1-.5-.6-.5zM27.5 56.8c-.4 0-.5.3-.3.6l1.3 2.3c.2.3.6.6 1 .6h21.5c.4 0 .8-.3.9-.7l.4-2.3c.1-.4-.2-.5-.5-.5zm104.8-24.2c-6.5 1.8-11 3.2-17.4 5-1.6.5-1.6.5-2.9-1-1.5-1.7-2.6-2.8-4.7-3.8-6.3-3.1-12.4-2.2-18.1 1.5-6.8 4.4-10.3 10.9-10.2 19 .1 8 5.6 14.6 13.5 15.7 6.8.9 12.5-1.5 17-6.6.9-1.1 1.7-2.3 2.7-3.7h-19.3c-2.2 0-2.7-1.4-2-3.2 1.4-3.3 3.9-8.9 5.4-11.7.3-.6 1.1-1.6 2.7-1.6h39.6c-.2 3-.2 6-.6 9-1.4 10-5.1 19.1-11.6 27.1-10.7 12.9-24.5 19.5-41.4 19.4-14.2-.1-27-4.5-37.8-13.8C37.5 79.3 32.1 67 32.3 53.1c.2-15 5.6-28 16.2-38.8 11-11.1 24.6-17.3 40.1-17.7 13-.3 25 3.4 35.3 11.4 6.7 5.2 11.6 11.9 14.7 20 .6 1.6.1 2.5-1.3 2.8zm58.5 39.4c-10.5.2-20.2-1.4-28.7-7.8-7-5.2-11.4-12.2-12.1-20.9-1.1-12.4 2.8-23.1 11.2-32.4 8.7-9.7 19.3-14.9 32.2-16 10.7-.9 20.8 1.1 29.6 7.3 8.1 5.7 13 13.6 13.4 23.7.6 15.2-4.1 27.2-14.3 37.1-7.3 6.9-16.2 11-26.3 11m17.8-42.6c-.5-5.6-3.6-10-8.5-12.3-7-3.3-16.2-1.7-21.7 3.9-5.2 5.3-7 11.6-6 18.7 1.1 6.5 5.5 11 12.1 12.5 4.9 1.1 9.8.5 13.8-2.5 6.5-4.7 10.2-12.9 10.3-20.3z" />
    </svg>
  ),
};

// ─── Tech Card Grid Item with glow effect ────────────────────────────────────
function TechCard({ tech }: { tech: typeof techStack[number] }) {
  const [hovered, setHovered] = useState(false);
  const color = TECH_COLORS[tech.name] ?? "#ffffff";

  return (
    <motion.div
      id={`tech-${tech.name.toLowerCase().replace(".", "")}`}
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
      className="relative p-5 border border-white/[0.05] bg-card/40 backdrop-blur-sm rounded-xl transition-colors duration-300 text-center group cursor-default overflow-hidden"
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
        className="size-10 mx-auto mb-3 flex items-center justify-center"
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
    href: `#tech-${tech.name.toLowerCase().replace(".", "")}`,
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
