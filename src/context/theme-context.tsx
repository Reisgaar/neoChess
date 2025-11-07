// REACT
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, JSX, ReactNode, useContext, useEffect, useState } from 'react';

// THEME
import { Themes } from 'src/theme/themes';

type ThemeContextType = {
    theme: ThemeName;
    themeObject: ThemeType;
    setTheme: (theme: ThemeName) => void;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export type ThemeName = 'light' | 'dark';

export type ThemeType = typeof Themes.light;

export const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [theme, setThemeState] = useState<ThemeName>('light');

    useEffect(() => {
        AsyncStorage.getItem('appTheme').then((stored) => {
            if (stored === 'light' || stored === 'dark')
                setThemeState(stored);
        });
    }, []);

    /**
     * Sets app theme.
     */
    const setTheme = (newTheme: ThemeName): void => {
        setThemeState(newTheme);
        AsyncStorage.setItem('appTheme', newTheme);
    };

    /**
     * Toggles app theme.
     */
    const toggleTheme = (): void => {
        setThemeState((prev) => {
            const next = prev === 'light' ? 'dark' : 'light';
            AsyncStorage.setItem('appTheme', next);
            return next;
        });
    };

    const themeObject = Themes[theme];

    return (
        <ThemeContext.Provider
            value={{ theme, themeObject, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useAppTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error('useAppTheme must be used within a ThemeProvider');

    return context;
};
