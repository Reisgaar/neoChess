// ZUSTAND
import { create } from 'zustand';

// MODELS
import { IPieces } from 'src/models/interfaces/pieces';
import { EGameStatus } from 'src/models/enums/game-status';
import { IPieceStatus } from 'src/models/interfaces/piece-status';

// SERVICES
import { getNewPieces } from 'src/services/pieces-service';

/**
 * Interface for the useSettingsStore.
 */
interface GameStatusState {
    pieces: IPieces;
    setPieces: (pieces: IPieces) => void;
    clearPieces: () => void;

    currentTurn: number;
    setCurrentTurn: (currentTurn: number) => void;
    clearCurrentTurn: () => void;

    gameStatus: EGameStatus;
    setGameStatus: (gameStatus: EGameStatus) => void;
    clearGameStatus: () => void;

    selectedPiece: IPieceStatus | null;
    setSelectedPiece: (selectedPiece: IPieceStatus | null) => void;
    clearSelectedPiece: () => void;

    moveDone: boolean;
    setMoveDone: (moveDone: boolean) => void;
    clearMoveDone: () => void;

    turnMovement: string | null;
    setTurnMovement: (turnMovement: string | null) => void;
    clearTurnMovement: () => void;

    resetAll: () => void;
}

/**
 * Store to manage game status.
 */
export const useGameStatusStore = create<GameStatusState>((set) => ({
    pieces: getNewPieces(),
    setPieces: (pieces: IPieces): void => set({ pieces: pieces }),
    clearPieces: (): void => set({ pieces: getNewPieces() }),

    currentTurn: 0,
    setCurrentTurn: (currentTurn: number): void => set({ currentTurn: currentTurn }),
    clearCurrentTurn: (): void => set({ currentTurn: 0 }),

    gameStatus: EGameStatus.Active,
    setGameStatus: (gameStatus: EGameStatus): void => set({ gameStatus: gameStatus }),
    clearGameStatus: (): void => set({ gameStatus: EGameStatus.Active }),

    selectedPiece: null,
    setSelectedPiece: (selectedPiece: IPieceStatus | null): void => set({ selectedPiece: selectedPiece }),
    clearSelectedPiece: (): void => set({ selectedPiece: null }),

    moveDone: false,
    setMoveDone: (moveDone: boolean): void => set({ moveDone: moveDone }),
    clearMoveDone: (): void => set({ moveDone: false }),

    turnMovement: null,
    setTurnMovement: (turnMovement: string | null): void => set({ turnMovement: turnMovement }),
    clearTurnMovement: (): void => set({ turnMovement: null }),

    resetAll: (): void => set({
        pieces: getNewPieces(),
        currentTurn: 0,
        gameStatus: EGameStatus.Active,
        selectedPiece: null,
        moveDone: false,
        turnMovement: null
    }),
}));
