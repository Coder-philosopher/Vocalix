import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Make sure the component is mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className="relative inline-flex h-10 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-violet-400/30 via-blue-400/30 to-purple-400/30 dark:from-violet-600/20 dark:via-blue-600/20 dark:to-purple-600/20 p-1 transition-all duration-300"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <div className="z-10 flex w-full items-center justify-between px-2">
        <IconSun size={16} className="text-yellow-500" />
        <IconMoon size={16} className="text-blue-500" />
      </div>
      <motion.div 
        className="absolute left-1 h-8 w-8 rounded-full bg-white shadow-md dark:bg-gray-800"
        animate={{ x: theme === "dark" ? "calc(100% - 2rem)" : "0rem" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </button>
  );
} 