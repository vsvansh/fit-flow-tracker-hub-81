
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      
      // Apply additional styles for dark mode
      if (systemTheme === "dark") {
        root.style.setProperty('--background-gradient', 'linear-gradient(to bottom, #1a1f2c, #0f172a)');
        document.body.style.background = 'var(--background-gradient)';
      } else {
        root.style.removeProperty('--background-gradient');
        document.body.style.background = '';
      }
      return;
    }

    root.classList.add(theme);
    
    // Apply additional styles for dark mode
    if (theme === "dark") {
      root.style.setProperty('--background-gradient', 'linear-gradient(to bottom, #1a1f2c, #0f172a)');
      document.body.style.background = 'var(--background-gradient)';
    } else {
      root.style.removeProperty('--background-gradient');
      document.body.style.background = '';
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    toggleTheme: () => {
      setTheme(prevTheme => {
        if (prevTheme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
          const newTheme = systemTheme === "dark" ? "light" : "dark";
          localStorage.setItem(storageKey, newTheme);
          return newTheme;
        }
        
        const newTheme = prevTheme === "dark" ? "light" : "dark";
        localStorage.setItem(storageKey, newTheme);
        return newTheme;
      });
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
