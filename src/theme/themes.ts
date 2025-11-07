// Grey palette.
const colorPalette = {
    white: '#FFFFFF',
    cp00: '#FAFAFA',
    cp10: '#F5F5F5',
    cp20: '#EEEEEE',
    cp30: '#E0E0E0',
    cp40: '#BDBDBD',
    cp50: '#9E9E9E',
    cp60: '#757575',
    cp70: '#616161',
    cp80: '#424242',
    cp90: '#212121',
    black: '#000000'
};

// Common colors on both themes.
const commonColors = {
    black: '#000000',
    white: '#FFFFFF',
    blackPiece: '#000000',
    whitePiece: '#FFFFFF',
    boardColor: '#573b14',
    blackCell: '#ab886c',
    whiteCell: '#F0DECA',
    deleteRed: '#D32F2F',
    moonYellow: '#FFD700',
    sunOrange: '#FFA500',
    disabledThemeIcon: '#888888',
};

// App themes.
export const Themes = {
    light: {
        ...commonColors,
        ...colorPalette,

        // CONTAINERS
        mainBackground: colorPalette.cp30,
        containerBackground: colorPalette.cp00,

        // BUTTONS
        squaredButton: colorPalette.white,

        // BORDERS
        greyBorder: colorPalette.cp50,

        // TEXTS
        primaryText: colorPalette.black,
        secondaryText: colorPalette.cp70,
        clickableBlueText: '#007AFF',
    },
    dark: {
        ...commonColors,
        ...colorPalette,

        // CONTAINERS
        mainBackground: colorPalette.cp90,
        containerBackground: colorPalette.cp80,
        
        // BUTTONS
        squaredButton: colorPalette.cp80,

        // BORDERS
        greyBorder: colorPalette.cp50,

        // TEXTS
        primaryText: colorPalette.white,
        secondaryText: colorPalette.cp20,
        clickableBlueText: '#2cb0ff',
    },
};

export type ThemeType = typeof Themes.light;