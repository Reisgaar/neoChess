// REACT
import { useGameStatusStore } from "src/stores/game-status-store";

// MODELS
import { EPieceColor } from "src/models/enums/piece-color";
import { EPieceType } from "src/models/enums/piece-type";
import { IPieceStatus } from "src/models/interfaces/piece-status";
import { IPieces } from "src/models/interfaces/pieces";

/**
 * Get new piece status.
 */
export const getNewPiece = (id: string, position: string, color: EPieceColor, type: EPieceType): IPieceStatus => {
    return {
        id: id,
        currentPosition: position,
        initialPosition: position,
        possitionTracking: [position],
        color: color,
        type: type,
        isCaptured: false,
    };
};

/**
 * Get pieces status for a new game.
 */
export const getNewPieces = (): IPieces => {
    return {
        blackRookLeft: getNewPiece('blackRookLeft', 'a8', EPieceColor.Black, EPieceType.Rook),
        blackKnightLeft: getNewPiece('blackKnightLeft', 'b8', EPieceColor.Black, EPieceType.Knight),
        blackBishopLeft: getNewPiece('blackBishopLeft', 'c8', EPieceColor.Black, EPieceType.Bishop),
        blackQueen: getNewPiece('blackQueen', 'd8', EPieceColor.Black, EPieceType.Queen),
        blackKing: getNewPiece('blackKing', 'e8', EPieceColor.Black, EPieceType.King),
        blackBishopRight: getNewPiece('blackBishopRight', 'f8', EPieceColor.Black, EPieceType.Bishop),
        blackKnightRight: getNewPiece('blackKnightRight', 'g8', EPieceColor.Black, EPieceType.Knight),
        blackRookRight: getNewPiece('blackRookRight', 'h8', EPieceColor.Black, EPieceType.Rook),
        blackPawn1: getNewPiece('blackPawn1', 'a7', EPieceColor.Black, EPieceType.Pawn),
        blackPawn2: getNewPiece('blackPawn2', 'b7', EPieceColor.Black, EPieceType.Pawn),
        blackPawn3: getNewPiece('blackPawn3', 'c7', EPieceColor.Black, EPieceType.Pawn),
        blackPawn4: getNewPiece('blackPawn4', 'd7', EPieceColor.Black, EPieceType.Pawn),
        blackPawn5: getNewPiece('blackPawn5', 'e7', EPieceColor.Black, EPieceType.Pawn),
        blackPawn6: getNewPiece('blackPawn6', 'f7', EPieceColor.Black, EPieceType.Pawn),
        blackPawn7: getNewPiece('blackPawn7', 'g7', EPieceColor.Black, EPieceType.Pawn),
        blackPawn8: getNewPiece('blackPawn8', 'h7', EPieceColor.Black, EPieceType.Pawn),
        whiteRookLeft: getNewPiece('whiteRookLeft', 'a1', EPieceColor.White, EPieceType.Rook),
        whiteKnightLeft: getNewPiece('whiteKnightLeft', 'b1', EPieceColor.White, EPieceType.Knight),
        whiteBishopLeft: getNewPiece('whiteBishopLeft', 'c1', EPieceColor.White, EPieceType.Bishop),
        whiteQueen: getNewPiece('whiteQueen', 'd1', EPieceColor.White, EPieceType.Queen),
        whiteKing: getNewPiece('whiteKing', 'e1', EPieceColor.White, EPieceType.King),
        whiteBishopRight: getNewPiece('whiteBishopRight', 'f1', EPieceColor.White, EPieceType.Bishop),
        whiteKnightRight: getNewPiece('whiteKnightRight', 'g1', EPieceColor.White, EPieceType.Knight),
        whiteRookRight: getNewPiece('whiteRookRight', 'h1', EPieceColor.White, EPieceType.Rook),
        whitePawn1: getNewPiece('whitePawn1', 'a2', EPieceColor.White, EPieceType.Pawn),
        whitePawn2: getNewPiece('whitePawn2', 'b2', EPieceColor.White, EPieceType.Pawn),
        whitePawn3: getNewPiece('whitePawn3', 'c2', EPieceColor.White, EPieceType.Pawn),
        whitePawn4: getNewPiece('whitePawn4', 'd2', EPieceColor.White, EPieceType.Pawn),
        whitePawn5: getNewPiece('whitePawn5', 'e2', EPieceColor.White, EPieceType.Pawn),
        whitePawn6: getNewPiece('whitePawn6', 'f2', EPieceColor.White, EPieceType.Pawn),
        whitePawn7: getNewPiece('whitePawn7', 'g2', EPieceColor.White, EPieceType.Pawn),
        whitePawn8: getNewPiece('whitePawn8', 'h2', EPieceColor.White, EPieceType.Pawn),
    };
};

/**
 * Get the piece on a position.
 */
export const getPieceOnPosition = (position: string): IPieceStatus | null => {
    const pieces = useGameStatusStore.getState().pieces;
    return Object.values(pieces).find((piece) => piece.currentPosition === position) || null;
};

/**
 * Get the piece on a position.
 */
export const getPieceStatusOnPosition = (position: string): IPieceStatus | null => {
    const pieces = useGameStatusStore.getState().pieces;
    return Object.values(pieces).find((piece) => piece.currentPosition === position) || null;
};

/**
 * Get the possible moves for a piece.
 */
export const getPossibleMoves = (): string[] => {
    const { selectedPiece } = useGameStatusStore.getState();
    if (!selectedPiece) return [];

    switch (selectedPiece.type) {
        case EPieceType.Pawn:
            return getPawnMoves(selectedPiece);
        case EPieceType.Knight:
            return getKnightMoves(selectedPiece);
        case EPieceType.Bishop:
            return getBishopMoves(selectedPiece);
        case EPieceType.Rook:
            return getRookMoves(selectedPiece);
        case EPieceType.Queen:
            return getQueenMoves(selectedPiece);
        case EPieceType.King:
            return getKingMoves(selectedPiece);
        default:
            return [];
    }
};

/**
 * Get the possible moves for a pawn.
 */
export const getPawnMoves = (selectedPiece: IPieceStatus): string[] => {
    const moves: string[] = [];
    const direction = selectedPiece.color === EPieceColor.White ? 1 : -1;
    const possibleEatMoves= [
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) -1 )}${parseInt(selectedPiece.currentPosition[1]) + direction}`,
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) +1 )}${parseInt(selectedPiece.currentPosition[1]) + direction}`,
    ];
    const possibleRegularMoves = [
        `${selectedPiece.currentPosition[0]}${parseInt(selectedPiece.currentPosition[1]) + direction}`,
        ...(selectedPiece.currentPosition === selectedPiece.initialPosition ? [`${selectedPiece.currentPosition[0]}${parseInt(selectedPiece.currentPosition[1]) + (2 * direction)}`] : []),

    ];
    for (const move of possibleEatMoves) {
        const pieceOnPosition = getPieceStatusOnPosition(move);
        if (pieceOnPosition && pieceOnPosition.color !== selectedPiece.color)
            moves.push(move);
    }
    for (const move of possibleRegularMoves) {
        const pieceOnPosition = getPieceStatusOnPosition(move);
        if (!pieceOnPosition)
            moves.push(move);
    }
    return moves;
};

/**
 * Get the possible moves for a knight.
 */
export const getKnightMoves = (selectedPiece: IPieceStatus): string[] => {
    const moves: string[] = [];
    const possibleMoves: string[] = [
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + 2)}${parseInt(selectedPiece.currentPosition[1]) + 1}`,
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + 2)}${parseInt(selectedPiece.currentPosition[1]) - 1}`,
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - 2)}${parseInt(selectedPiece.currentPosition[1]) + 1}`,
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - 2)}${parseInt(selectedPiece.currentPosition[1]) - 1}`,
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + 1)}${parseInt(selectedPiece.currentPosition[1]) + 2}`,
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + 1)}${parseInt(selectedPiece.currentPosition[1]) - 2}`,
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - 1)}${parseInt(selectedPiece.currentPosition[1]) + 2}`,
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - 1)}${parseInt(selectedPiece.currentPosition[1]) - 2}`,
    ];
    for (const move of possibleMoves) {
        const pieceOnPosition = getPieceStatusOnPosition(move);
        if (!pieceOnPosition || pieceOnPosition.color !== selectedPiece.color)
            moves.push(move);
    }
    return moves;
};

/**
 * Get the possible moves for a bishop.
 */
export const getBishopMoves = (selectedPiece: IPieceStatus): string[] => {
    return getFullDiagonalMoves(selectedPiece);
};

/**
 * Get the possible moves for a rook.
 */
export const getRookMoves = (selectedPiece: IPieceStatus): string[] => {
    return getFullStraightMoves(selectedPiece);
};

/**
 * Get the possible moves for a queen.
 */
export const getQueenMoves = (selectedPiece: IPieceStatus): string[] => {
    return [...getFullDiagonalMoves(selectedPiece), ...getFullStraightMoves(selectedPiece)];
};

/**
 * Get the possible moves for a king.
 */
export const getKingMoves = (selectedPiece: IPieceStatus): string[] => {
    const moves: string[] = [];
    const possibleMoves: string[] = [
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - 1)}${parseInt(selectedPiece.currentPosition[1]) - 1}`,
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - 1)}${parseInt(selectedPiece.currentPosition[1])}`,
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - 1)}${parseInt(selectedPiece.currentPosition[1]) + 1}`,
        `${selectedPiece.currentPosition[0]}${parseInt(selectedPiece.currentPosition[1]) - 1}`,
        `${selectedPiece.currentPosition[0]}${parseInt(selectedPiece.currentPosition[1]) + 1}`,
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + 1)}${parseInt(selectedPiece.currentPosition[1]) - 1}`,
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + 1)}${parseInt(selectedPiece.currentPosition[1])}`,
        `${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + 1)}${parseInt(selectedPiece.currentPosition[1]) + 1}`,
    ];
    for (const move of possibleMoves) {
        const pieceOnPosition = getPieceStatusOnPosition(move);
        if (!pieceOnPosition || pieceOnPosition.color !== selectedPiece.color)
            moves.push(move);
    }
    return moves;
};

/**
 * Get all possible diagonal moves for a piece.
 */
export const getFullDiagonalMoves = (selectedPiece: IPieceStatus): string[] => {
    const moves: string[] = [];
    // To top right
    for (let i = 1; i <= 8; i++) {
        const pieceOnPosition = getPieceStatusOnPosition(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + i)}${parseInt(selectedPiece.currentPosition[1]) + i}`);
        if (pieceOnPosition && pieceOnPosition.color === selectedPiece.color) {
            break;
        }
        else if (pieceOnPosition && pieceOnPosition.color !== selectedPiece.color) {
            moves.push(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + i)}${parseInt(selectedPiece.currentPosition[1]) + i}`);
            break;
        }
        else {
            moves.push(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + i)}${parseInt(selectedPiece.currentPosition[1]) + i}`);
        }
    }
    // To top left
    for (let i = 1; i <= 8; i++) {
        const pieceOnPosition = getPieceStatusOnPosition(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - i)}${parseInt(selectedPiece.currentPosition[1]) + i}`);
        if (pieceOnPosition && pieceOnPosition.color === selectedPiece.color) {
            break;
        }
        else if (pieceOnPosition && pieceOnPosition.color !== selectedPiece.color) {
            moves.push(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - i)}${parseInt(selectedPiece.currentPosition[1]) + i}`);
            break;
        }
        else {
            moves.push(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - i)}${parseInt(selectedPiece.currentPosition[1]) + i}`);
        }
    }
    // To bottom right
    for (let i = 1; i <= 8; i++) {
        const pieceOnPosition = getPieceStatusOnPosition(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + i)}${parseInt(selectedPiece.currentPosition[1]) - i}`);
        if (pieceOnPosition && pieceOnPosition.color === selectedPiece.color) {
            break;
        }
        else if (pieceOnPosition && pieceOnPosition.color !== selectedPiece.color) {
            moves.push(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + i)}${parseInt(selectedPiece.currentPosition[1]) - i}`);
            break;
        }
        else {
            moves.push(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + i)}${parseInt(selectedPiece.currentPosition[1]) - i}`);
        }
    }
    // To bottom left
    for (let i = 1; i <= 8; i++) {
        const pieceOnPosition = getPieceStatusOnPosition(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - i)}${parseInt(selectedPiece.currentPosition[1]) - i}`);
        if (pieceOnPosition && pieceOnPosition.color === selectedPiece.color) {
            break;
        }
        else if (pieceOnPosition && pieceOnPosition.color !== selectedPiece.color) {
            moves.push(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - i)}${parseInt(selectedPiece.currentPosition[1]) - i}`);
            break;
        }
        else {
            moves.push(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - i)}${parseInt(selectedPiece.currentPosition[1]) - i}`);
        }
    }

    return moves;
};

/**
 * Get all possible horizontal moves for a piece.
 */
export const getFullStraightMoves = (selectedPiece: IPieceStatus): string[] => {
    const moves: string[] = [];
    // To right
    for (let i = 1; i <= 8; i++) {
        const pieceOnPosition = getPieceStatusOnPosition(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + i)}${parseInt(selectedPiece.currentPosition[1])}`);
        if (pieceOnPosition && pieceOnPosition.color === selectedPiece.color) {
            break;
        }
        else if (pieceOnPosition && pieceOnPosition.color !== selectedPiece.color) {
            moves.push(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + i)}${parseInt(selectedPiece.currentPosition[1])}`);
            break;
        }
        else {
            moves.push(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) + i)}${parseInt(selectedPiece.currentPosition[1])}`);
        }
    }
    // To left
    for (let i = 1; i <= 8; i++) {
        const pieceOnPosition = getPieceStatusOnPosition(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - i)}${parseInt(selectedPiece.currentPosition[1])}`);
        if (pieceOnPosition && pieceOnPosition.color === selectedPiece.color) {
            break;
        }
        else if (pieceOnPosition && pieceOnPosition.color !== selectedPiece.color) {
            moves.push(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - i)}${parseInt(selectedPiece.currentPosition[1])}`);
            break;
        }
        else {
            moves.push(`${String.fromCharCode(selectedPiece.currentPosition[0].charCodeAt(0) - i)}${parseInt(selectedPiece.currentPosition[1])}`);
        }
    }
    // To up
    for (let i = 1; i <= 8; i++) {
        const pieceOnPosition = getPieceStatusOnPosition(`${selectedPiece.currentPosition[0]}${parseInt(selectedPiece.currentPosition[1]) + i}`);
        if (pieceOnPosition && pieceOnPosition.color === selectedPiece.color) {
            break;
        }
        else if (pieceOnPosition && pieceOnPosition.color !== selectedPiece.color) {
            moves.push(`${selectedPiece.currentPosition[0]}${parseInt(selectedPiece.currentPosition[1]) + i}`);
            break;
        }
        else {
            moves.push(`${selectedPiece.currentPosition[0]}${parseInt(selectedPiece.currentPosition[1]) + i}`);
        }
    }
    // To down
    for (let i = 1; i <= 8; i++) {
        const pieceOnPosition = getPieceStatusOnPosition(`${selectedPiece.currentPosition[0]}${parseInt(selectedPiece.currentPosition[1]) - i}`);
        if (pieceOnPosition && pieceOnPosition.color === selectedPiece.color) {
            break;
        }
        else if (pieceOnPosition && pieceOnPosition.color !== selectedPiece.color) {
            moves.push(`${selectedPiece.currentPosition[0]}${parseInt(selectedPiece.currentPosition[1]) - i}`);
            break;
        }
        else {
            moves.push(`${selectedPiece.currentPosition[0]}${parseInt(selectedPiece.currentPosition[1]) - i}`);
        }
    }
    return moves;
};