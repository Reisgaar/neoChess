// REACT
import { JSX } from 'react';
import { Text, TextInput } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

// EXPO
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// CONTEXTS
import { useAppTheme, ThemeProvider as AppThemeProvider } from '@/context/theme-context';

// TRANSLATIONS (needed to allow translations)
import 'src/i18n';

// Global text size scaling control.
/* eslint-disable @typescript-eslint/no-explicit-any */
(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.allowFontScaling = false;
(TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
(TextInput as any).defaultProps.allowFontScaling = false;
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Unstable settings for the application.
 */
export const unstable_settings = {
    anchor: '(tabs)',
};

/**
 * Root layout of the application.
 */
export default function RootLayout(): JSX.Element {
    return (
        <AppThemeProvider>
            <AppWithTheme />
        </AppThemeProvider>
    );
}

/**
 * Returns the app with the colour theme.
 */
function AppWithTheme(): JSX.Element {
    const { theme } = useAppTheme();

    return (
        <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
