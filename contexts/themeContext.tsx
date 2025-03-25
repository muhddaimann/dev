import React, { createContext, useContext, useState, useMemo } from 'react';
import { CustomLightTheme, CustomDarkTheme } from '@/constants/theme';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: typeof CustomLightTheme;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
  theme: CustomDarkTheme,
});

export const useToggle = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = useMemo(() => (isDarkMode ? CustomDarkTheme : CustomLightTheme), [isDarkMode]);

  const value = {
    isDarkMode,
    toggleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
