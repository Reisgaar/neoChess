// REACT
import { JSX, useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

// EXPO
import { Ionicons } from '@expo/vector-icons';

// STORES
import { useGameStatusStore } from 'src/stores/game-status-store';

// TRANSLATIONS
import { useTranslation } from 'react-i18next';

// STYLES
import { getCommonStyles } from 'src/styles';

// CONTEXTS
import { useAppTheme } from 'src/context/theme-context';

// COMPONENTS
import Board from 'src/components/Board';
import ThemedText from 'src/components/ThemedText';

// MODELS
import { EPieceColor } from 'src/models/enums/piece-color';

// SERVICES
import { cancelMove, endTurn, getCurrentTurnColor, resetGame, surrender, undoMove } from 'src/services/game-service';

/**
 * Play screen of the application.
 */
export default function PlayScreen(): JSX.Element {
    const { t } = useTranslation();
    const { themeObject } = useAppTheme();
    const commonStyles = getCommonStyles(themeObject);

    const { currentTurn } = useGameStatusStore();

    const [currentTurnColor, setCurrentTurnColor] = useState<EPieceColor>(getCurrentTurnColor());

    useEffect(() => {
        setCurrentTurnColor(getCurrentTurnColor());
    }, [currentTurn]);
    
    //Buttons to display in the screen.
    const buttons = [
        { icon: 'skull-outline', label: 'surrender', onPress: surrender },
        { icon: 'refresh-circle-outline', label: 'reset', onPress: resetGame },
        { icon: 'arrow-back-circle-outline', label: 'undo', onPress: undoMove },
        { icon: 'close-circle-outline', label: 'cancel', onPress: cancelMove },
        { icon: 'checkmark-circle-outline', label: 'confirm', onPress: endTurn },
    ];
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <ThemedText style={[commonStyles.text_center, commonStyles.text_2xl]}>
                    {t('moving')} {t(currentTurnColor)}
                </ThemedText>
                <ThemedText style={[commonStyles.text_center, commonStyles.text_md, commonStyles.mt_xs]}>
                    {t('turn')}: {currentTurn + 1}
                </ThemedText>
            </View>
            <View style={[commonStyles.w_100, commonStyles.p_md]}>
                <Board />
            </View>
            <View style={[commonStyles.row, commonStyles.ai_center, commonStyles.jc_between, commonStyles.w_100, commonStyles.p_xl]}>
                {buttons.map((button) => (
                    <Pressable key={button.label} onPress={button.onPress} style={[commonStyles.ai_center, commonStyles.jc_center]}>
                        <Ionicons name={button.icon as any} size={25} color={themeObject.primaryText} />
                        <ThemedText>{t(button.label)}</ThemedText>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}