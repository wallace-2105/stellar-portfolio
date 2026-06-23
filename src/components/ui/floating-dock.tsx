"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

export function FloatingDock({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) {
  return (
    <div className="relative w-full flex justify-center py-4">
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </div>
  );
}

function FloatingDockDesktop({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) {
  // mouseX tracks cursor position in page coordinates
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-14 gap-3 items-end rounded-2xl bg-black/50 border border-white/[0.08] px-4 pb-3 backdrop-blur-xl shadow-2xl relative",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: any;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Distance from mouse centre to icon centre (in px)
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { left: 0, width: 0 };
    return val - bounds.left - bounds.width / 2;
  });

  // Tight proximity window: only grow when within ±60px of centre;
  // peak at 0 → full size, tapers off quickly so neighbours barely react
  const sizeTransform = useTransform(
    distance,
    [-80, -30, 0, 30, 80],
    [40, 44, 72, 44, 40]
  );

  const iconSizeTransform = useTransform(
    distance,
    [-80, -30, 0, 30, 80],
    [18, 20, 36, 20, 18]
  );

  // Lift (translateY) — only the hovered icon rises noticeably
  const yTransform = useTransform(
    distance,
    [-60, -20, 0, 20, 60],
    [0, -2, -14, -2, 0]
  );

  const springConfig = { mass: 0.08, stiffness: 200, damping: 14 };

  const size = useSpring(sizeTransform, springConfig);
  const iconSize = useSpring(iconSizeTransform, springConfig);
  const y = useSpring(yTransform, { mass: 0.08, stiffness: 220, damping: 16 });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} className="focus:outline-none flex items-end">
      <motion.div
        ref={ref}
        style={{ width: size, height: size, y }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center relative cursor-pointer hover:border-white/20 hover:bg-white/[0.08] transition-colors duration-150"
      >
        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 6, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 4, x: "-50%" }}
              transition={{ duration: 0.15 }}
              className="px-2.5 py-1 rounded-md bg-neutral-900/95 border border-neutral-700/60 text-white font-medium text-[11px] absolute left-1/2 -top-9 whitespace-nowrap shadow-xl z-50 pointer-events-none backdrop-blur-sm"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon */}
        <motion.div
          style={{ width: iconSize, height: iconSize }}
          className="flex items-center justify-center overflow-visible"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}

function FloatingDockMobile({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative block md:hidden z-40", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-3 inset-x-0 flex flex-col items-center gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.85,
                  transition: { delay: idx * 0.03 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.03 }}
              >
                <a
                  href={item.href}
                  className="h-10 w-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white shadow-xl hover:bg-neutral-800 transition-colors"
                >
                  <div className="h-5 w-5 flex items-center justify-center">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-12 w-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white shadow-2xl focus:outline-none hover:bg-neutral-800 transition-colors"
      >
        <span className="sr-only">Menu de Tecnologias</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={cn(
            "h-6 w-6 transition-transform duration-300",
            open ? "rotate-45" : "rotate-0"
          )}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
  );
}
