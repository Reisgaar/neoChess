// REACT
import React, { JSX } from 'react';
import Svg, { G, Path } from 'react-native-svg';

// CONTEXTS
import { useAppTheme } from 'src/context/theme-context';

// MODELS
import { IIconProps } from 'src/models/interfaces/icon-props';

/**
 * Rook icon.
 */
export default function RookIcon({ size, isWhite }: IIconProps): JSX.Element {
    const { themeObject } = useAppTheme();
    
    return (
        <Svg width={size} height={size} viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet">
            {isWhite ? (
                <G
                    opacity={1}
                    fill={themeObject.whitePiece}
                    fill-opacity={1}
                    fill-rule="evenodd"
                    stroke={themeObject.blackPiece}
                    stroke-width={1.5}
                    stroke-linecap="round"
                    stroke-linejoin="round" transform="translate(0,0.3)"
                >
                    <Path
                        d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
                        stroke-linecap="butt"
                    />
                    <Path
                        d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
                        stroke-linecap="butt"
                    />
                    <Path
                        d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"
                        stroke-linecap="butt"
                    />
                    <Path d="M 34,14 L 31,17 L 14,17 L 11,14" />
                    <Path
                        d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                    />
                    <Path d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />
                    <Path
                        d="M 11,14 L 34,14"
                        fill="none"
                        stroke={themeObject.blackPiece}
                        stroke-width={1}
                        stroke-linejoin="miter"
                    />
                </G>
            ) : (
                <G
                    opacity={1}
                    fill="#000000"
                    fill-opacity={1}
                    fill-rule="evenodd"
                    stroke="#000000"
                    stroke-width={1.5}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit={4} transform="translate(0,0.3)"
                >
                    <Path
                        d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
                        stroke-linecap="butt"
                    />
                    <Path
                        d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "
                        stroke-linecap="butt"
                    />
                    <Path
                        d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
                        stroke-linecap="butt"
                    />
                    <Path
                        d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                    />
                    <Path
                        d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "
                        stroke-linecap="butt"
                    />
                    <Path
                        d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "
                        stroke-linecap="butt"
                    />
                    <Path
                        d="M 12,35.5 L 33,35.5 L 33,35.5"
                        fill="none"
                        stroke={themeObject.whitePiece}
                        stroke-width={1}
                        stroke-linejoin="miter"
                    />
                    <Path
                        d="M 13,31.5 L 32,31.5"
                        fill="none"
                        stroke={themeObject.whitePiece}
                        stroke-width={1}
                        stroke-linejoin="miter"
                    />
                    <Path
                        d="M 14,29.5 L 31,29.5"
                        fill="none"
                        stroke={themeObject.whitePiece}
                        stroke-width={1}
                        stroke-linejoin="miter"
                    />
                    <Path
                        d="M 14,16.5 L 31,16.5"
                        fill="none"
                        stroke={themeObject.whitePiece}
                        stroke-width={1}
                        stroke-linejoin="miter"
                    />
                    <Path
                        d="M 11,14 L 34,14"
                        fill="none"
                        stroke={themeObject.whitePiece}
                        stroke-width={1}
                        stroke-linejoin="miter"
                    />
                </G>
            )}
        </Svg>
    );
}
