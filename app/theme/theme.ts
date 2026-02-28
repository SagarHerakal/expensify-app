import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

// ──────────────────────────────────────────
//  Color Palette
// ──────────────────────────────────────────
export const Colors = {
    primary: '#1DB954',         // Vibrant green (main brand color)
    primaryDark: '#17A349',
    primaryLight: '#4DCF76',
    secondary: '#F59E0B',       // Amber accent
    danger: '#EF4444',          // Red for "you owe"
    success: '#10B981',         // Green for "owed to you"
    background: '#0F1117',      // Near-black background
    surface: '#1A1F2E',         // Card / surface color
    surfaceVariant: '#252B3B',  // Slightly lighter surface
    border: '#2E3650',
    textPrimary: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    white: '#FFFFFF',
    black: '#000000',
};

// ──────────────────────────────────────────
//  Typography scale
// ──────────────────────────────────────────
export const Typography = {
    fontFamily: 'System',
    sizes: {
        xs: 11,
        sm: 13,
        md: 15,
        lg: 17,
        xl: 20,
        xxl: 24,
        xxxl: 32,
    },
    weights: {
        regular: '400' as const,
        medium: '500' as const,
        semiBold: '600' as const,
        bold: '700' as const,
        extraBold: '800' as const,
    },
};

// ──────────────────────────────────────────
//  Spacing
// ──────────────────────────────────────────
export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

// ──────────────────────────────────────────
//  Border Radius
// ──────────────────────────────────────────
export const Radius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 999,
};

// ──────────────────────────────────────────
//  React Native Paper Theme
// ──────────────────────────────────────────
export const AppTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: Colors.primary,
        secondary: Colors.secondary,
        background: Colors.background,
        surface: Colors.surface,
        surfaceVariant: Colors.surfaceVariant,
        onPrimary: Colors.white,
        onBackground: Colors.textPrimary,
        onSurface: Colors.textPrimary,
        outline: Colors.border,
        error: Colors.danger,
    },
};
