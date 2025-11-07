// REACT
import { Alert } from "react-native";

// TRANSLATIONS
import i18next from "i18next";

// STORES
import { useGameStatusStore } from "src/stores/game-status-store";

// SERVICES
import { getPieceStatusOnPosition } from "src/services/pieces-service";

// MODELS
import { EPieceColor } from "src/models/enums/piece-color";

/**
 * Get the current turn color.
 */
export const getCurrentTurnColor = (): EPieceColor => {
    const { currentTurn } = useGameStatusStore.getState();
    return currentTurn === 0 || currentTurn % 2 === 0 ? EPieceColor.White : EPieceColor.Black;
};

/**
 * Handle the possible move press.
 */
export const movePiece = (move: string): void => {
    const { selectedPiece, setMoveDone, setTurnMovement } = useGameStatusStore.getState();

    if (!selectedPiece)
        return;

    setMoveDone(true);
    setTurnMovement(move);
};

/**
 * Cancel move.
 */
export const cancelMove = (): void => {
    const { setMoveDone, setTurnMovement } = useGameStatusStore.getState();
    setMoveDone(false);
    setTurnMovement(null);
};
/**
 * End turn.
 */
export const endTurn = (): void => {
    const {
        currentTurn,
        moveDone,
        turnMovement,
        pieces,
        selectedPiece,
        setCurrentTurn,
        setMoveDone,
        setPieces,
        setSelectedPiece,
        setTurnMovement,
    } = useGameStatusStore.getState();

    const t = i18next.t.bind(i18next);

    if (!selectedPiece || !turnMovement) {
        Alert.alert(t('noMove'), t('pleaseMakeMove'));
        return;
    }

    const eatenPiece = getPieceStatusOnPosition(turnMovement);

    setPieces({
        ...pieces,
        [selectedPiece.id]: {
            ...selectedPiece,
            currentPosition: turnMovement,
        },
        ...(eatenPiece ? {[eatenPiece.id]: {
            ...eatenPiece,
            currentPosition: '',
            isEaten: true,
        }} : {}),
    });

    setCurrentTurn(currentTurn + 1);
    setSelectedPiece(null);
    setMoveDone(false);
    setTurnMovement(null);
    for (const piece of Object.values(pieces)) {
        if (piece.id === selectedPiece.id)
            piece.possitionTracking.push(turnMovement);
        else
            piece.possitionTracking.push(piece.currentPosition);
    }
};

/**
 * Handles the reset game action.
 */
export const resetGame = (): void => {
    const { resetAll } = useGameStatusStore.getState();
    resetAll();
};

/**
 * Handles the undo action.
 */
export const undoMove = (): void => {
    const { currentTurn, pieces, setPieces, setCurrentTurn } = useGameStatusStore.getState();

    if (currentTurn === 0) return;

    const allPieces = { ...pieces };

    for (const piece of Object.values(allPieces)) {
        if (piece.possitionTracking.length > 1) {
            piece.currentPosition = piece.possitionTracking[piece.possitionTracking.length - 2];
            piece.possitionTracking.pop();
        }
    }

    setPieces(allPieces);
    setCurrentTurn(currentTurn - 1);
};

/**
 * Handles the surrender action.
 */
export const surrender = (): void => {
    const t = i18next.t.bind(i18next);
    Alert.alert(t('surrender'), t('surrenderQuestion'), [
        { text: t('no'), style: 'cancel' },
        { text: t('yes'), onPress: () => {
            Alert.alert(t('gameEnd'), t(getCurrentTurnColor() + 'Wins'));
            resetGame();
        }},
    ]);
};