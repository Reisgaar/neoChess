// REACT
import { View } from 'react-native';

// CONTEXTS
import { useAppTheme } from 'src/context/theme-context';

// STYLES
import { getCommonStyles } from 'src/styles';

// COMPONENTS
import ThemedText from '@/components/ThemedText';

/**
 * Home screen of the application.
 */
export default function HomeScreen() {
    const { themeObject } = useAppTheme();
    const commonStyles = getCommonStyles(themeObject);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>Hello</ThemedText>
        </View>
    );
}
