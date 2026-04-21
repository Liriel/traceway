"use client";

import { useLayoutEffect } from "react";

export function ThemeController({ theme }: { theme: "light" | "dark" }) {
  useLayoutEffect(() => {
    const prev = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", theme);
    return () => {
      document.documentElement.setAttribute("data-theme", prev ?? "dark");
    };
  }, [theme]);
  return null;
}
