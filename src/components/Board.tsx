// REACT
import React, { JSX, useEffect, useState } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';

// CONTEXTS
import { useAppTheme } from 'src/context/theme-context';

// STORES
import { useGameStatusStore } from 'src/stores/game-status-store';

// STYLES
import { getCommonStyles } from 'src/styles';

// COMPONENTS
import ThemedText from 'src/components/ThemedText';

// SERVICES
import { getPieceStatusOnPosition, getPossibleMoves } from 'src/services/pieces-service';
import { getCurrentTurnColor, movePiece } from 'src/services/game-service';

// MODELS
import { EPieceType } from 'src/models/enums/piece-type';
import { EPieceColor } from 'src/models/enums/piece-color';
import { IPieceStatus } from 'src/models/interfaces/piece-status';

// COMPONENTS
import { BishopIcon, KingIcon, KnightIcon, PawnIcon, QueenIcon, RookIcon } from 'src/components/pieces';

/**
 * Board component to display the chess board.
 */
export default function Board(): JSX.Element {
    const { themeObject } = useAppTheme();
    const commonStyles = getCommonStyles(themeObject);

    const { currentTurn, moveDone, pieces, selectedPiece, setCurrentTurn, setPieces, setSelectedPiece, turnMovement } = useGameStatusStore();

    const [cellSize, setCellSize] = useState<number>(0);
    const [possibleMoves, setPossibleMoves] = useState<string[]>([]);

    const cellStyle: ViewStyle = { width: '12.5%' as const, aspectRatio: 1 };
    const whiteCellStyle: ViewStyle = { ...cellStyle, backgroundColor: themeObject.whiteCell };
    const blackCellStyle: ViewStyle = { ...cellStyle, backgroundColor: themeObject.blackCell };

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

    // Update the possible moves when the selected piece changes.
    useEffect(() => {
        setPossibleMoves(selectedPiece ? getPossibleMoves() : []);
    }, [selectedPiece]);

    /**
     * Get the style of the cell.
     */
    const getCellStyle = (index: number, number: number): ViewStyle => {
        return index % 2 === 0 ? (number % 2 === 0 ? whiteCellStyle : blackCellStyle) : (number % 2 === 0 ? blackCellStyle : whiteCellStyle);
    };

    /**
     * Get the piece icon by piece type.
     */
    const getPieceIconByPieceType = (type: EPieceType, color: EPieceColor, isSelected: boolean): JSX.Element => {
        switch (type) {
            case EPieceType.Pawn:
                return <PawnIcon size={cellSize - 4} isWhite={color === EPieceColor.White} />;
            case EPieceType.Knight:
                return <KnightIcon size={cellSize - 4} isWhite={color === EPieceColor.White} />;
            case EPieceType.Bishop:
                return <BishopIcon size={cellSize - 4} isWhite={color === EPieceColor.White} />;
            case EPieceType.Rook:
                return <RookIcon size={cellSize - 4} isWhite={color === EPieceColor.White} />;
            case EPieceType.Queen:
                return <QueenIcon size={cellSize - 4} isWhite={color === EPieceColor.White} />;
            case EPieceType.King:
                return <KingIcon size={cellSize - 4} isWhite={color === EPieceColor.White} />;
        }
    };

    /**
     * Get the piece component on a position.
     */
    const getPieceComponentOnPosition = (position: string): JSX.Element | null => {
        const piece = getPieceStatusOnPosition(position);
        const currentTurnColor = getCurrentTurnColor();
        return piece ? (
            <Pressable
                disabled={currentTurnColor !== piece.color}
                pointerEvents={currentTurnColor !== piece.color ? 'none' : 'auto'}
                onPress={() => handlePiecePress(piece)}
                style={{
                    borderColor: selectedPiece?.id === piece.id ? 'green' : 'transparent',
                    borderWidth: 2,
                }}
            >
                {getPieceIconByPieceType(piece.type, piece.color, selectedPiece?.id === piece.id)}
            </Pressable>
        ) : null;
    }

    /**
     * Handle the piece press.
     */
    const handlePiecePress = (piece: IPieceStatus): void => {
        if (piece.color !== getCurrentTurnColor() || moveDone)
            return;

        setSelectedPiece(selectedPiece?.id === piece.id ? null : piece)
    };

    return (
        <View style={[commonStyles.w_100, commonStyles.br_md, { padding: '5%', aspectRatio: 1, backgroundColor: themeObject.boardColor }]}>
            {/* LETTERS */}
            {['top', 'bottom'].map(side => (
                <View key={`${side}-letters`} style={[commonStyles.row, commonStyles.absolute, commonStyles.w_100, commonStyles.h_5, commonStyles.ai_center, { [side]: 0, left: '5%' }]}>
                    {letters.map((letter) => (
                        <ThemedText
                            key={`${side}-${letter}`}
                            style={[commonStyles.text_center, commonStyles.text_xs, { width: '12.5%', color: themeObject.white }]}
                        >{letter.toUpperCase()}</ThemedText>
                    ))}
                </View>
            ))}
            {/* END OF LETTERS */}


            {['left', 'right'].map(side => (
                <View key={`${side}-numbers`} style={[commonStyles.absolute, commonStyles.h_100, { [side === 'left' ? 'top' : 'bottom']: '5%', [side]: 0, width: '5%' }]}>
                    {numbers.map((number) => (
                        <View key={`${side}-${number}`} style={[commonStyles.jc_center, commonStyles.h_12_5]}>
                            <ThemedText style={[commonStyles.text_center, commonStyles.text_xs, { color: themeObject.white }]}>{number.toString()}</ThemedText>
                        </View>
                    ))}
                </View>
            ))}
            {/* END OF NUMBERS */}

            {/* BOARD */}
            <View style={[commonStyles.w_100, commonStyles.br_sm, { aspectRatio: 1 }]}>
                {numbers.map((number) => (
                    <View style={commonStyles.row} key={`row-${number}`}>
                        {letters.map((letter, index) => (
                            <View
                                style={getCellStyle(index, number)}
                                key={`cell-${letter}-${number}`}
                                onLayout={(event) => setCellSize(event.nativeEvent.layout.width)}
                            >
                                {/* POSSIBLE MOVES HIGHLIGHT */}
                                {possibleMoves.includes(letter + number.toString()) && (
                                    <Pressable
                                        onPress={() => movePiece(letter + number.toString())}
                                        style={[
                                            commonStyles.absolute,
                                            commonStyles.w_100,
                                            commonStyles.h_100,
                                            { backgroundColor: '#00FF0050' },
                                        ]}
                                    />
                                )}
                                {/* END OF POSSIBLE MOVES HIGHLIGHT */}

                                {/* PIECE */}
                                <View style={{ opacity: turnMovement && selectedPiece?.currentPosition === letter + number.toString() ? 0.2 : 1 }}>
                                    {getPieceComponentOnPosition(letter + number.toString())}
                                </View>
                                {/* END OF PIECE */}

                                {/* TURN MOVEMENT */}
                                {selectedPiece && turnMovement && letter + number.toString() === turnMovement && (
                                    <View style={{ position: 'absolute', top: 0, left: 0, padding: 2, zIndex: 2 }} >
                                        {getPieceIconByPieceType(selectedPiece.type, selectedPiece.color, false)}
                                    </View>
                                )}
                                {/* END OF TURN MOVEMENT */}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
            {/* END OF BOARD */}
        </View>
    );
}
