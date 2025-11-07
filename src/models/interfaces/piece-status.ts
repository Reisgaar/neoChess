// MODELS
import { EPieceColor } from "src/models/enums/piece-color";
import { EPieceType } from "src/models/enums/piece-type";

/**
 * Interface for piece status.
 */
export interface IPieceStatus {
    id: string;
    currentPosition: string;
    initialPosition: string;
    possitionTracking: string[];
    color: EPieceColor;
    type: EPieceType;
    isCaptured: boolean;
}
