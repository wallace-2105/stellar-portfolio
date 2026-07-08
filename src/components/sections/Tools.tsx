import { motion } from "framer-motion";
import { tools } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { useState, useMemo } from "react";
import imgAceternity from "@/assets/aceternity.png";
import imgAntigravity from "@/assets/antigravity.png";
import imgCanva from "@/assets/canva.png";
import imgClaude from "@/assets/claudeAI.png";
import imgCodex from "@/assets/codex.png";
import imgExcel from "@/assets/excel.png";
import imgExpo from "@/assets/expogo.png";
import imgFastapi from "@/assets/fastapi.png";
import imgPowerbi from "@/assets/powerbi.png";
import imgPowerpoint from "@/assets/powerpoint.png";
import imgVscode from "@/assets/vscode.png";
import imgWord from "@/assets/word.png";
import imgTeams from "@/assets/teams.png";
import imgCloudflare from "@/assets/cloudflare.png";

// ─── Official SVG Logos for all tools ────────────────────────────────────────
const TOOL_LOGOS: Record<string, React.ReactNode> = {
  React: (
    <svg className="w-full h-full" viewBox="-11.5 -10.232 23 20.463" xmlns="http://www.w3.org/2000/svg">
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
  TypeScript: (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="20" fill="#3178C6" />
      <path d="M150.5 166.5c3.5 5.8 8.2 10 16.8 10 7.1 0 11.6-3.5 11.6-8.4 0-5.8-4.6-7.8-12.4-11.2l-4.3-1.8c-12.3-5.3-20.5-11.9-20.5-25.9 0-12.9 9.8-22.7 25.1-22.7 10.9 0 18.7 3.8 24.3 13.8l-13.3 8.5c-2.9-5.3-6.1-7.4-11-7.4-5 0-8.2 3.2-8.2 7.4 0 5.2 3.2 7.2 10.6 10.4l4.3 1.8c14.5 6.2 22.7 12.6 22.7 26.9 0 15.4-12.1 23.9-28.3 23.9-15.9 0-26.1-7.5-31.1-17.4l13.7-8.8zm-56.4-51.4h-24.9v-14.6h66.4v14.6h-24.8v65.4h-16.7v-65.4z" fill="white" />
    </svg>
  ),
  "Node.js": (
    <svg className="w-full h-full" viewBox="0 0 256 282" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ndg-tools" x1="68.188%" y1="17.487%" x2="27.823%" y2="89.755%">
          <stop stopColor="#41873F" offset="0%" />
          <stop stopColor="#418B3D" offset="32.88%" />
          <stop stopColor="#34A853" offset="63.52%" />
          <stop stopColor="#2EB156" offset="100%" />
        </linearGradient>
      </defs>
      <path d="M128 0L0 73.9v141.1L128 282l128-67v-141L128 0z" fill="url(#ndg-tools)" />
      <path d="M116 200v-80l-28 16v80l28-16z" fill="#fff" opacity="0.8" />
      <path d="M144 200v-80l28 16v80l-28-16z" fill="#fff" opacity="0.6" />
      <path d="M128 108l-28 16 28 16 28-16-28-16z" fill="#fff" />
    </svg>
  ),
  Python: (
    <svg className="w-full h-full" viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pyb-tools" x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%">
          <stop stopColor="#387EB8" offset="0%" />
          <stop stopColor="#366994" offset="100%" />
        </linearGradient>
        <linearGradient id="pyy-tools" x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%">
          <stop stopColor="#FFE052" offset="0%" />
          <stop stopColor="#FFC331" offset="100%" />
        </linearGradient>
      </defs>
      <path d="M126.9 0c-64.1 0-60.1 27.8-60.1 27.8l.1 28.8h61.2v8.7H41.8S0 60.5 0 125.1c0 64.7 35.8 62.5 35.8 62.5h21.4v-30s-1.2-35.8 35.2-35.8h60.7s34.1.6 34.1-33v-55.5S193.4 0 126.9 0zm-33.9 19.8c6.1 0 11 5 11 11.1s-4.9 11.1-11 11.1-11-5-11-11.1 4.9-11.1 11-11.1z" fill="url(#pyb-tools)" />
      <path d="M129.1 255c64.1 0 60.1-27.8 60.1-27.8l-.1-28.8h-61.2v-8.7h86.3s41.8 4.8 41.8-59.9c0-64.7-35.8-62.5-35.8-62.5h-21.4v30s1.2 35.8-35.2 35.8H103s-34.1-.6-34.1 33V211s-5.2 44 60.2 44zm33.9-19.8c-6.1 0-11-5-11-11.1s4.9-11.1 11-11.1 11 5 11 11.1-4.9 11.1-11 11.1z" fill="url(#pyy-tools)" />
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
  MongoDB: (
    <svg className="w-full h-full" viewBox="0 0 256 549" xmlns="http://www.w3.org/2000/svg">
      <path d="M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 00-1.492 0c-4.048 5.759-23.863 33.487-46.873 60.788-197.507 251.896 31.108 421.852 31.108 421.852l1.917 1.28c1.172 26.08 5.227 59.372 5.227 59.372h8.737s4.055-33.292 5.227-59.372l1.917-1.28s228.615-169.956 31.105-421.852" fill="#00ED64" />
      <path d="M128 .32s-19.984 28.538-46.873 60.788C-116.38 313.004 112.235 482.96 112.235 482.96l1.917 1.28c1.172 26.08 5.227 59.372 5.227 59.372h8.621V.32z" fill="#00A550" opacity="0.5" />
      <path d="M135.385 484.24l-1.917-1.28s228.615-169.956 31.105-421.852C141.563 33.807 128 .32 128 .32v543.292h8.158s4.055-33.292 5.227-59.372" fill="#00ED64" />
    </svg>
  ),
  MySQL: (
    <svg className="w-full h-full" viewBox="0 0 256 252" xmlns="http://www.w3.org/2000/svg">
      <path d="M236.1 194.3c-12.6-.3-22.4 1-30.7 4.6-2.4 1-6.1 1-6.5 4 1.3 1.3 1.5 3.3 2.6 5 2.1 3.2 5.6 7.4 8.7 9.6 3.4 2.4 6.9 5 10.4 7.2 6.3 4 13.3 6.2 19.3 10.2 3.5 2.3 7 5.3 10.5 7.9 1.7 1.3 2.9 3.3 5 4.3v-.5c-1.2-1.5-1.5-3.5-2.6-5.2l-4.8-4.6c-4.7-6.3-10.5-11.8-16.9-16.2-5-3.5-16.3-8.2-18.4-14l-.3-.3c3.5-.4 7.7-1.7 11-2.6 5.5-1.5 10.4-1.2 16.1-2.6 2.6-.8 5.2-1.6 7.8-2.4v-1.5c-2.9-3-5-7-8.1-9.8-8.1-7.2-17-14.3-26.1-20.3-4.8-3.2-10.8-5.2-16-7.9-1.7-1-4.7-1.4-5.8-2.9-2.6-3.3-4.1-7.5-6.1-11.3-4.2-8-8.3-16.7-12-25.2-2.5-5.8-4.1-11.5-7.2-16.9-14.7-25.3-30.6-40.7-55.2-55.7-5.2-3.2-11.5-4.5-18.1-6.2-3.5-.2-7-.4-10.5-.6-2.1-1-4.4-3.6-6.2-4.9C53.5 20 24.2.2 17.8 12.7c-4 7.9 6 15.7 9.4 19.7 2.5 2.9 5.6 6.2 7.6 9.4 1.3 2.1 1.5 4.3 2.6 6.6 2.6 5.6 4.8 11.8 8 17 1.7 2.7 3.5 5.5 5.6 7.9 1.3 1.5 3.4 2.1 3.9 4.5-2.2 3.1-2.3 7.8-3.5 11.6-5.4 17.3-3.4 38.7 4.4 51.5 2.4 3.9 8.1 12.4 15.8 9.1 6.7-2.9 5.3-11.8 7.2-19.7.4-1.8.2-3.1 1-4.4v.3c2 4 4 7.9 5.8 11.9 4.3 7 11.9 14.2 18.3 19.1 3.3 2.5 5.9 6.9 10.1 8.5v-.5h-.3c-.8-1.3-2.1-1.8-3.2-2.9-2.5-2.5-5.2-5.6-7.2-8.4-5.7-7.9-10.8-16.5-15.3-25.5-2.2-4.3-4-9.1-5.8-13.4-1-1.6-1-4-2.6-4.8-2.4 3.6-5.9 6.6-7.6 11.2-2.8 7.2-3.1 16.1-4.2 25.1l-.6.2c-4.7-1.2-6.4-6-8.2-10.1-4.5-10.4-5.3-27.1-1.4-39 1-3.1 5.6-12.8 3.8-15.8-1-3-3.8-4.7-5.4-7.1-2-3-4-6.8-5.4-10.2-3.6-8.7-5.3-18.4-9.2-27.1-1.8-4-5-8.1-7.6-11.8-2.9-4.1-6.1-7.1-8.4-11.8-.8-1.7-1.9-4.3-.6-6.1.4-1.2.8-1.7 2-2.1 1.9-1.5 7.3.5 9.2 1.3 5.2 2 9.5 3.9 13.9 6.6 2 1.3 4.1 3.7 6.6 4.3h2.9c4.5 1 9.6.3 13.8 1.5 7.4 2.2 14 5.5 20 9.1 18.3 11 33.3 26.6 43.4 45.4 1.6 3.1 2.4 5.9 3.8 9.1 2.9 6.5 6.5 13.2 9.4 19.5 2.9 6.3 5.8 12.7 10 18 2.2 2.8 10.7 4.3 14.5 5.9 2.7 1.1 7.1 2.3 9.6 3.7 4.7 2.7 9.3 5.8 13.6 8.8 2.2 1.5 8.9 4.8 9.3 7.6z" fill="#00546B" />
      <path d="M58.2 26.7c-2.3 0-3.9.3-5.6.7v.3h.3c1.1 2.2 3 3.7 4.4 5.6l3.2 6.6.3-.3c2-1.4 2.9-3.6 2.9-6.9-.8-.9-.9-1.9-1.6-2.9-1-1.3-2.8-2-3.9-3.1z" fill="#00546B" />
    </svg>
  ),
  HTML5: (
    <svg className="w-full h-full" viewBox="0 0 452 520" xmlns="http://www.w3.org/2000/svg">
      <path d="M41.4 460.7L0 0h452l-41.5 460.6L226 520" fill="#E34F26" />
      <path d="M226 482.8l149.3-41.4 35.4-396.4H226" fill="#EF652A" />
      <path d="M226 212.5h-75.2l-5.2-58.2H226v-56.9H85.1l1.4 15.5 14.3 160.5H226zm0 147.3l-.3.1-63-17-4-44.8H101l7.9 88.3 117 32.5.3-.1z" fill="#fff" />
      <path d="M226 212.5v56.9h70l-6.6 73.7-63.4 17v59.1l117.3-32.5.9-9.7 13.4-150.1 1.4-14.4H226zm0-155.1v56.9h137.8l1.1-12.2 2.5-28.2 1.4-16.5z" fill="#EBEBEB" />
    </svg>
  ),
  CSS3: (
    <svg className="w-full h-full" viewBox="0 0 452 520" xmlns="http://www.w3.org/2000/svg">
      <path d="M41.4 460.7L0 0h452l-41.5 460.6L226 520" fill="#1572B6" />
      <path d="M226 482.8l149.3-41.4 35.4-396.4H226" fill="#33A9DC" />
      <path d="M226 212.5H116.5l3.7 41.4H226v-41.4zm0-99.1H107.1l3.7 41.3H226v-41.3zm0 228.6-.3.1-74.8-20.2-5.2-58.5H104l10.3 115.3 111.4 30.9.3-.1v-67.5zm0-228.6" fill="#fff" />
      <path d="M226 212.5v41.4h104.8l-9.8 109.7-95 25.7V448l111.3-30.8 .8-9.2 15.3-171.4 1.6-17.1H226zm0-99.1v41.3h121.8l1-10.8 2.2-24 1.5-16.5H226z" fill="#EBEBEB" />
    </svg>
  ),
  "Tailwind CSS": (
    <svg className="w-full h-full" viewBox="0 0 256 154" xmlns="http://www.w3.org/2000/svg">
      <path d="M128 0C93.8 0 72.5 17.1 64 51.2c12.8-17.1 27.7-23.5 44.8-19.2 9.8 2.5 16.7 9.5 24.5 17.5C146 62.3 160.5 77 192 77c34.2 0 55.5-17.1 64-51.2-12.8 17.1-27.7 23.5-44.8 19.2-9.8-2.5-16.7-9.5-24.5-17.5C174 14.7 159.5 0 128 0zM64 77C29.8 77 8.5 94.1 0 128.2c12.8-17.1 27.7-23.5 44.8-19.2 9.8 2.5 16.7 9.5 24.5 17.5C82 139.3 96.5 154 128 154c34.2 0 55.5-17.1 64-51.2-12.8 17.1-27.7 23.5-44.8 19.2-9.8-2.5-16.7-9.5-24.5-17.5C110 91.7 95.5 77 64 77z" fill="#06B6D4" />
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
  Git: (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <path d="M251.17 116.6L139.4 4.82a16.49 16.49 0 00-23.31 0l-23.21 23.2 29.44 29.45a19.57 19.57 0 0124.8 24.96l28.37 28.38a19.61 19.61 0 11-11.75 11.06L137.28 95.4v69.64a19.62 19.62 0 11-16.13-.57V93.98a19.62 19.62 0 01-10.65-25.73L82.18 39.94 4.83 117.29a16.49 16.49 0 000 23.31L116.6 252.38a16.49 16.49 0 0023.32 0l111.25-111.25a16.5 16.5 0 000-23.32" fill="#F05032" />
    </svg>
  ),
  GitHub: (
    <svg className="w-full h-full" viewBox="0 0 256 250" xmlns="http://www.w3.org/2000/svg">
      <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.17 0-3.049-.115-13.111-.174-23.759-35.623 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5.008-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.04-4.311 10.88.053 21.837 1.475 32.066 4.311 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.395 8.793 6.14C219.37 232.5 256 184.537 256 128.001 256 57.307 198.691 0 128.001 0" fill="currentColor" />
    </svg>
  ),
  "Visual Studio Code": <img src={imgVscode} alt="VS Code" />,
  Figma: (
    <svg className="w-full h-full" viewBox="0 0 38 57" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  ),
  Canva: <img src={imgCanva} alt="Canva" className="w-full h-full object-contain" />,
  "Microsoft Word": <img src={imgWord} alt="Microsoft Word" className="w-full h-full object-contain" />,
  "Microsoft Excel": <img src={imgExcel} alt="Microsoft Excel" className="w-full h-full object-contain" />,
  "Microsoft PowerPoint": <img src={imgPowerpoint} alt="Microsoft PowerPoint" className="w-full h-full object-contain" />,
  "Microsoft Teams": <img src={imgTeams} alt="Microsoft Teams" className="w-full h-full object-contain" />,
  Windows: (
    <svg className="w-full h-full" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 36.357L104.62 22.11l.045 100.914-104.57.595L0 36.357zm104.57 98.293l.076 101.064L.076 221.393l-.01-86.846 104.504.103zm12.754-114.09L255.97 0v123.49l-138.646 1.1V20.56zm138.7 105.245l-.046 123.19-138.7-19.578-.194-103.773 138.94.161z" fill="#00A4EF" />
    </svg>
  ),
  Antigravity: <img src={imgAntigravity} alt="Antigravity" className="w-full h-full object-contain" />,
  "Claude Code": <img src={imgClaude} alt="Claude Code" className="w-full h-full object-contain" />,
  Expo: <img src={imgExpo} alt="Expo" className="w-full h-full object-contain" />,
  FastAPI: <img src={imgFastapi} alt="FastAPI" className="w-full h-full object-contain" />,
  Codex: <img src={imgCodex} alt="Codex" className="w-full h-full object-contain" />,
  "Aceternity UI": <img src={imgAceternity} alt="Aceternity UI" className="w-full h-full object-contain" />,
  "Power BI": <img src={imgPowerbi} alt="Power BI" className="w-full h-full object-contain" />,
  Cloudflare: <img src={imgCloudflare} alt="Cloudflare" className="w-full h-full object-contain" />,
};

// ─── Premium Tool Card Component ─────────────────────────────────────────────
function ToolCard({ tool, index }: { tool: typeof tools[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const brandColor = tool.color || "#ffffff";

  // Each card gets a unique animation offset for organic staggered movement
  const floatDuration = useMemo(() => 4 + (index % 5) * 0.8, [index]);
  const floatDelay = useMemo(() => (index * 0.3) % floatDuration, [index, floatDuration]);
  const glowDuration = useMemo(() => 5 + (index % 4) * 0.7, [index]);

  // For GitHub in dark mode, use white as the visible color
  const visibleColor = tool.name === "GitHub" ? "#8b949e" : brandColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group cursor-default"
    >
      {/* Continuous floating animation wrapper */}
      <motion.div
        animate={{
          y: hovered ? -10 : [0, -4, 0],
        }}
        transition={
          hovered
            ? { type: "spring", stiffness: 300, damping: 20 }
            : {
                y: {
                  duration: floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelay,
                },
              }
        }
        className="relative"
      >
        {/* Card container */}
        <div
          className="relative rounded-2xl overflow-hidden transition-all duration-500 bg-card/80 dark:bg-card/40 border border-border"
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: `1px solid ${hovered ? `${visibleColor}40` : ""}`,
            boxShadow: hovered
              ? `0 20px 40px -12px ${visibleColor}30, 0 8px 20px -8px rgba(0,0,0,0.15), 0 0 24px -4px ${visibleColor}20`
              : `0 2px 12px -4px rgba(0,0,0,0.08)`,
          }}
        >
          {/* Pulsing glow layer — continuous, very subtle */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              opacity: hovered ? [0.4, 0.6, 0.4] : [0, 0.08, 0],
            }}
            transition={{
              duration: glowDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: floatDelay,
            }}
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${visibleColor}25 0%, transparent 70%)`,
            }}
          />

          {/* Hover intensified glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: `radial-gradient(ellipse at 50% 30%, ${visibleColor}18 0%, transparent 65%)`,
            }}
          />

          {/* Top shine line */}
          <div
            className="absolute top-0 left-4 right-4 h-px pointer-events-none transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, transparent, ${hovered ? `${visibleColor}50` : "rgba(255,255,255,0.1)"}, transparent)`,
            }}
          />

          {/* Card content */}
          <div className="relative z-10 flex flex-col items-center text-center p-3.5 sm:p-4">
            {/* Logo container */}
            <motion.div
              className="relative mb-3"
              animate={{
                scale: hovered ? 1.15 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              {/* Logo background ring */}
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-500"
                style={{
                  background: hovered
                    ? `linear-gradient(135deg, ${visibleColor}20, ${visibleColor}08)`
                    : `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
                  border: `1px solid ${hovered ? `${visibleColor}30` : "rgba(255,255,255,0.06)"}`,
                }}
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7">
                  {TOOL_LOGOS[tool.name] ?? (
                    <div
                      className="w-full h-full rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ color: visibleColor }}
                    >
                      {tool.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Subtle sparkle dot */}
              <motion.div
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full pointer-events-none"
                animate={{
                  opacity: hovered ? [0.6, 1, 0.6] : [0, 0.3, 0],
                  scale: hovered ? [0.8, 1.2, 0.8] : [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelay,
                }}
                style={{ backgroundColor: visibleColor }}
              />
            </motion.div>

            {/* Tool name */}
            <h3
              className="font-semibold text-xs sm:text-sm leading-tight mb-0.5 transition-colors duration-300"
              style={{
                color: hovered ? visibleColor : undefined,
              }}
            >
              {tool.name}
            </h3>

            {/* Category */}
            <span
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground transition-colors duration-300"
              style={{
                color: hovered ? `${visibleColor}99` : undefined,
              }}
            >
              {tool.category}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Tools Section ───────────────────────────────────────────────────────────
export function Tools() {
  return (
    <section id="tools" className="py-24 px-6 bg-surface relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -left-32 top-1/4 w-96 h-96 rounded-full opacity-[0.03] blur-[120px]"
          style={{ background: "linear-gradient(135deg, #61DAFB, #3178C6)" }}
        />
        <div
          className="absolute -right-32 bottom-1/4 w-96 h-96 rounded-full opacity-[0.03] blur-[120px]"
          style={{ background: "linear-gradient(135deg, #F05032, #F24E1E)" }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[600px] rounded-full opacity-[0.02] blur-[150px]"
          style={{ background: "linear-gradient(180deg, #06B6D4, #3776AB)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Workflow"
          title="Ferramentas Conhecidas"
          description="Stack completa de tecnologias e ferramentas que potencializam meu fluxo de trabalho diário e garantem entregas de alta qualidade."
        />

        {/* Premium responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {tools.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
