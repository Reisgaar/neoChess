// REACT
import React, { JSX } from 'react';
import { Linking, ScrollView, Switch, View } from 'react-native';

// EXPO
import { Ionicons } from '@expo/vector-icons';

// CONTEXTS
import { useAppTheme } from 'src/context/theme-context';

// TRANSLATIONS
import { useTranslation } from 'react-i18next';

// STYLES
import { getCommonStyles } from 'src/styles';

// COMPONENTS
import ThemedButton from 'src/components/ThemedButton';
import ThemedText from 'src/components/ThemedText';

/**
 * Settings screen of the application.
 */
export default function SettingsScreen(): JSX.Element {
    const { t, i18n } = useTranslation();
    const { theme, themeObject, toggleTheme } = useAppTheme();
    const commonStyles = getCommonStyles(themeObject);


    /**
     * Switches the language.
     */
    const switchLanguage = (): void => {
        i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={[commonStyles.ai_center, commonStyles.jc_center, { flex: 1 }]}>
                {/* TITLE */}
                <ThemedText style={[commonStyles.text_center, commonStyles.text_lg, commonStyles.mb_xl]}>
                    {t('settings')}
                </ThemedText>
                {/* END OF TITLE */}

                {/* THEME TOGGLE */}
                <View style={[commonStyles.pt_xs, commonStyles.w_90, { alignSelf: 'center' }]}>
                    <View style={[commonStyles.row, commonStyles.jc_between, commonStyles.ai_center, commonStyles.mb_xl, commonStyles.w_100]}>
                        <ThemedText>{t(theme + 'Theme')}</ThemedText>
                        <View style={[commonStyles.row, commonStyles.ai_center]}>
                            <Ionicons
                                name="sunny"
                                size={28}
                                color={theme === 'dark' ? themeObject.disabledThemeIcon : themeObject.sunOrange}
                            />
                            <Switch
                                value={theme === 'dark'}
                                onValueChange={toggleTheme}
                                style={[commonStyles.mx_md, { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }]}
                            />
                            <Ionicons
                                name="moon"
                                size={28}
                                color={theme === 'dark' ? themeObject.moonYellow : themeObject.disabledThemeIcon}
                            />
                        </View>
                    </View>
                    {/* END OF THEME TOGGLE */}

                    {/* LANGUAGE SWITCHER */}
                    <View style={[commonStyles.row, commonStyles.jc_between, commonStyles.ai_center, commonStyles.mb_xl, commonStyles.w_100]}>
                        <ThemedText>{t('changeLanguage')}</ThemedText>
                        <ThemedButton title={i18n.language === 'en' ? 'English' : 'Español'} onPress={switchLanguage} />
                    </View>
                    {/* END OF LANGUAGE SWITCHER */}

                    {/* OPEN APP SETTINGS */}
                    <ThemedButton title={t('openAppSettings')} onPress={() => Linking.openSettings()} />
                    {/* END OF OPEN APP SETTINGS */}
                </View>
            </ScrollView>
        </View>
    );
}