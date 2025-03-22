import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) {
  return (
    <NextThemesProvider defaultTheme={defaultTheme} attribute="class">
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </NextThemesProvider>
  );
} 