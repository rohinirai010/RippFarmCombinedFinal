import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  currentTheme: 'dark',
  changeCurrentTheme: () => {},
});

export default function ThemeProvider({children}) {  
  const persistedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(persistedTheme || 'light');

  const changeCurrentTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.add('**:transition-none!');
    if (theme === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    }

    const transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove('**:transition-none!');
    }, 1);
    
    return () => clearTimeout(transitionTimeout);
  }, [theme]);

  return <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>{children}</ThemeContext.Provider>;
}

export const useThemeProvider = () => useContext(ThemeContext);