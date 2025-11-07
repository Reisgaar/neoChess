// REACT
import React from 'react';

// EXPO
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// CONTEXTS
import { useAppTheme } from 'src/context/theme-context';

// TRANSLATIONS
import { useTranslation } from 'react-i18next';

// STYLES
import { getCommonStyles } from 'src/styles';

/**
 * Tab layout of the application.
 */
export default function TabLayout() {
    const { t } = useTranslation();
    const { themeObject } = useAppTheme();
    const commonStyles = getCommonStyles(themeObject);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: themeObject.primaryText,
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: t('home'),
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="play"
                options={{
                    title: t('play'),
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="game-controller" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: t('settings'),
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="settings" color={color} />,
                }}
            />
        </Tabs>
    );
}
