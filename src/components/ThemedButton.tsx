// REACT
import React, { JSX } from 'react';
import { Pressable, Text } from 'react-native';

// CONTEXTS
import { useAppTheme } from 'src/context/theme-context';

// STYLES
import { getCommonStyles } from 'src/styles';

type Props = {
    title: string;
    disabled?: boolean;
    textColor?: string;
    backgroundColor?: string;
    textSize?: number;
    alignSelf?: 'auto' | 'baseline' | 'flex-start' | 'center' | 'flex-end' | 'stretch';
    onPress: () => void;
}

/**
 * Themed button to use instead of Button element.
 */
export default function ThemedButton({ title, disabled = false, textColor, backgroundColor, textSize = 18, alignSelf = 'auto', onPress }: Props): JSX.Element {
    const { themeObject } = useAppTheme();
    const commonStyles = getCommonStyles(themeObject);

    return (
        <Pressable onPress={onPress}
            style={[
                { alignSelf: alignSelf },
                disabled && { opacity: 0.4 }
            ]}
            disabled={disabled}
        >
            <Text
                style={
                    {
                        textAlign: 'center',
                        color: disabled ? themeObject.secondaryText : textColor ?? themeObject.clickableBlueText,
                        fontSize: textSize,
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 4,
                        backgroundColor: backgroundColor ?? 'transparent'
                    }
                }
            >
                {title}
            </Text>
        </Pressable>
    );
}