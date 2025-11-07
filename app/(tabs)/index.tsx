// REACT
import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';

// EXPO
import { router } from 'expo-router';

// CONTEXTS
import { useAppTheme } from 'src/context/theme-context';

// TRANSLATIONS
import { useTranslation } from 'react-i18next';

// STYLES
import { getCommonStyles } from 'src/styles';

// COMPONENTS
import ThemedText from 'src/components/ThemedText';
import ThemedButton from 'src/components/ThemedButton';
import { BishopIcon, QueenIcon, RookIcon, KnightIcon, KingIcon, PawnIcon } from 'src/components/pieces';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styleConstants } from '@/styles/style-constants';

/**
 * Home screen of the application.
 */
export default function HomeScreen() {
    const { t } = useTranslation();
    const { themeObject } = useAppTheme();
    const commonStyles = getCommonStyles(themeObject);
    const screenWidth = Dimensions.get('screen').width;

    const size = 35;
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (counter >= 5) {
                setCounter(0);
            }
            else {
                setCounter(counter + 1);
            }
        }, 500);
        return () => clearInterval(interval);
    });

    const getSquaredBanner = () => {
        return (
            <View style={[commonStyles.w_100]}>
                {[0, 1, 2, 3].map((row) => (
                    <View key={`row-${row}`} style={[commonStyles.w_100, commonStyles.row]}>
                        {Array.from({ length: Math.ceil(screenWidth / 20) }).map((_, index) => (
                            <View
                                key={`item-${index}`}
                                style={{
                                    height: 20,
                                    width: 20,
                                    backgroundColor: (index + row) % 2 === 0 ? themeObject.white : themeObject.black
                                }}
                            />
                        ))}
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <SafeAreaView edges={['top']}>
                {getSquaredBanner()}
            </SafeAreaView>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText style={[commonStyles.text_center, commonStyles.text_2xl, commonStyles.text_bold, commonStyles.mb_xl]}>
                    {t('welcome')}
                </ThemedText>
                <View style={[commonStyles.my_xl, { width: size * 6 }]}>
                    <View style={[commonStyles.w_100, commonStyles.ai_center, commonStyles.jc_center]}>
                        <View
                            style={{
                                backgroundColor: counter === 0 ? themeObject.black : themeObject.white,
                                borderColor: counter === 0 ? themeObject.white : themeObject.black,
                                borderWidth: 1,
                                borderRadius: styleConstants.borderRadiusMD
                            }}
                        >
                            <BishopIcon size={size} isWhite={counter === 0} />
                        </View>
                    </View>
                    <View style={[commonStyles.w_100, commonStyles.row, commonStyles.ai_center, commonStyles.jc_around, commonStyles.mb_md]}>
                        <View
                            style={{
                                backgroundColor: counter === 5 ? themeObject.black : themeObject.white,
                                borderColor: counter === 5 ? themeObject.white : themeObject.black,
                                borderWidth: 1,
                                borderRadius: styleConstants.borderRadiusMD
                            }}
                        >
                            <KnightIcon size={size} isWhite={counter === 5} />
                        </View>
                        <View
                            style={{
                                backgroundColor: counter === 1 ? themeObject.black : themeObject.white,
                                borderColor: counter === 1 ? themeObject.white : themeObject.black,
                                borderWidth: 1,
                                borderRadius: styleConstants.borderRadiusMD
                            }}
                        >
                            <RookIcon size={size} isWhite={counter === 1} />
                        </View>
                    </View>
                    <View style={[commonStyles.w_100, commonStyles.row, commonStyles.ai_center, commonStyles.jc_around]}>
                        <View
                            style={{
                                backgroundColor: counter === 4 ? themeObject.black : themeObject.white,
                                borderColor: counter === 4 ? themeObject.white : themeObject.black,
                                borderWidth: 1,
                                borderRadius: styleConstants.borderRadiusMD
                            }}
                        >
                            <QueenIcon size={size} isWhite={counter === 4} />
                        </View>
                        <View
                            style={{
                                backgroundColor: counter === 2 ? themeObject.black : themeObject.white,
                                borderColor: counter === 2 ? themeObject.white : themeObject.black,
                                borderWidth: 1,
                                borderRadius: styleConstants.borderRadiusMD
                            }}
                        >
                            <KingIcon size={size} isWhite={counter === 2} />
                        </View>
                    </View>
                    <View style={[commonStyles.w_100, commonStyles.ai_center, commonStyles.jc_center]}>
                        <View
                            style={{
                                backgroundColor: counter === 3 ? themeObject.black : themeObject.white,
                                borderColor: counter === 3 ? themeObject.white : themeObject.black,
                                borderWidth: 1,
                                borderRadius: styleConstants.borderRadiusMD
                            }}
                        >
                            <PawnIcon size={size} isWhite={counter === 3} />
                        </View>
                    </View>
                </View>
                <ThemedButton title={t('play')} onPress={() => router.push('/play')} />
            </View>

            {getSquaredBanner()}
        </View>
    );
}
