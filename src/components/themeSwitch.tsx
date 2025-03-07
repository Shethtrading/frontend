// app/components/ThemeSwitch.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <></>;

  if (resolvedTheme == "dark") {
    return <Sun size={16} onClick={() => setTheme("light")} />;
  }

  if (resolvedTheme == "light") {
    return <Moon size={16} onClick={() => setTheme("dark")} />;
  }
}