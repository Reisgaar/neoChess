// REACT
import React, { JSX } from 'react';
import { Text, TextProps } from 'react-native';

// CONTEXTS
import { useAppTheme } from '@/context/theme-context';

/**
 * Themed text to use instead of Text element.
 */
export default function ThemedText({ style, ...props }: TextProps): JSX.Element {
    const { themeObject } = useAppTheme();

    return (
        <Text {...props} style={[{ color: themeObject.primaryText }, style]} />
    );
}
