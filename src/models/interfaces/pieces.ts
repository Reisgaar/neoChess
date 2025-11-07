// MODELS
import { IPieceStatus } from "src/models/interfaces/piece-status";

/**
 * Interface for piece status.
 */
export interface IPieces {
    blackRookLeft: IPieceStatus;
    blackKnightLeft: IPieceStatus;
    blackBishopLeft: IPieceStatus;
    blackQueen: IPieceStatus;
    blackKing: IPieceStatus;
    blackBishopRight: IPieceStatus;
    blackKnightRight: IPieceStatus;
    blackRookRight: IPieceStatus;
    blackPawn1: IPieceStatus;
    blackPawn2: IPieceStatus;
    blackPawn3: IPieceStatus;
    blackPawn4: IPieceStatus;
    blackPawn5: IPieceStatus;
    blackPawn6: IPieceStatus;
    blackPawn7: IPieceStatus;
    blackPawn8: IPieceStatus;
    
    whiteRookLeft: IPieceStatus;
    whiteKnightLeft: IPieceStatus;
    whiteBishopLeft: IPieceStatus;
    whiteQueen: IPieceStatus;
    whiteKing: IPieceStatus;
    whiteBishopRight: IPieceStatus;
    whiteKnightRight: IPieceStatus;
    whiteRookRight: IPieceStatus;
    whitePawn1: IPieceStatus;
    whitePawn2: IPieceStatus;
    whitePawn3: IPieceStatus;
    whitePawn4: IPieceStatus;
    whitePawn5: IPieceStatus;
    whitePawn6: IPieceStatus;
    whitePawn7: IPieceStatus;
    whitePawn8: IPieceStatus;
}
