import { createContext, useEffect, ReactNode, useState } from "react";

export type ThemeType = {
  primary: string | null;
  secondary: string | null;
  text: string | null;
  "light-text": string | null;
  background: string | null;
  correct: string | null;
  incorrect: string | null;
};

type ThemeContextType = {
  theme: ThemeType;
  resetTheme: () => void;
  updateVariable: (variable: string, value: string) => void;
};

const defaultTheme = {
  primary: "#f4f4f2",
  secondary: "#e8e8e8",
  background: "#fff",
  "light-text": "#97a1ae",
  text: "#495464",
  correct: "#a3ff71",
  incorrect: "#fa9494",
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  resetTheme: () => console.log("theme reset"),
  updateVariable: (variable: string, value: string) =>
    console.log(`set ${variable} as ${value}`),
});

type ThemeProviderPropsType = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderPropsType) => {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme-config");
    const newTheme = storedTheme ? JSON.parse(storedTheme) : null;
    if (newTheme) {
      localStorage.setItem("theme-config", JSON.stringify(newTheme));
      setTheme(newTheme);
    } else {
      localStorage.setItem("theme-config", JSON.stringify(defaultTheme));
      setTheme(defaultTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme-config", JSON.stringify(theme));

    if (theme) {
      Object.keys(theme).forEach((key) => {
        const value = theme[key as keyof ThemeType];
        if (value) {
          document.body.style.setProperty(`--color-${key}`, value);
        }
      });
    }
  }, [theme]);

  const updateVariable = (variable: string, value: string) => {
    console.log({ ...theme, [variable]: value });
    setTheme({ ...theme, [variable]: value });
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateVariable, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
