'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  // Ajout du toggle via event
  const { theme, setTheme } = useTheme();
  React.useEffect(() => {
    const handler = () => setTheme(theme === "dark" ? "light" : "dark");
    window.addEventListener("toggle-theme", handler);
    return () => window.removeEventListener("toggle-theme", handler);
  }, [theme, setTheme]);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}