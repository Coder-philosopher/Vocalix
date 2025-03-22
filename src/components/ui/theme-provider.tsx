import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";


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
        {children}
    </NextThemesProvider>
  );
} 