import React, { createContext, useContext, useState } from "react";

interface ThemeContextValue {
    theme: string;
    setTheme: (thm: string) => void;
}

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
    const [theme, setTheme] = useState<string>('light');
    return (<ThemeContext.Provider value={{theme, setTheme}}>
        {props.children}
    </ThemeContext.Provider>)
}

export const useTheme = () => {
    return useContext(ThemeContext);
};

