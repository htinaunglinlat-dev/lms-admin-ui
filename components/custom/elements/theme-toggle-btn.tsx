"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const nav = [
  { to: "/", label: "Home" },
  { to: "/blogs", label: "Blogs" },
  { to: "/services", label: "Services" },
  // { to: "/about", label: "About Us" },
  // { to: "/contact", label: "Contact Us" },
] as const;

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  // const [mounted, setMounted] = useState(false);
  const mounted = useIsMounted();
  const isActive = (to: string) =>
    to === "/"
      ? pathname === to
      : pathname === to || pathname.startsWith(`${to}/`);
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="h-9 w-9 grid place-items-center rounded-lg border border-border hover:bg-accent transition-colors duration-300 overflow-hidden"
    >
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={resolvedTheme}
            initial={{ y: -12, opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: 12, opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </button>
  );
}
