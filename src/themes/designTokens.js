// Design tokens (colors, spacing, typography) - initial draft
export default {
  colors: {
    background: '#0B0B0D', // primary app background (very dark)
    surface: '#0F0F10', // surfaces (sidebar, panels)
    elevated: '#242426', // elevated elements like composer
    composerAccent: '#E9642A', // voice active / accent (orange)
    badgeBg: '#5B3DF5', // purple-blue badge for Plus
    textPrimary: '#F3F3F3',
    textSecondary: '#A6A6A6',
    divider: 'rgba(255,255,255,0.04)',
    outline: 'rgba(255,255,255,0.06)',
    codeBlockBg: '#18181A',
    userBubble: '#1B1B1C',
    assistantBubble: '#111113',
    transparent: 'transparent',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 6,
    md: 12,
    pill: 999,
  },
  typography: {
    // Arabic-friendly stack + fallbacks for web/native
    fontFamily: "'Inter', 'Noto Kufi Arabic', 'Noto Sans Arabic', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    displayLarge: 40,
    headlineLarge: 32,
    titleLarge: 20,
    bodyLarge: 16,
    bodyMedium: 14,
    label: 12,
  },
  sizes: {
    sidebarWidth: 260,
    composerHeight: 56,
    composerMaxWidth: 760,
  },
  iconSizes: {
    small: 16,
    regular: 20,
    medium: 24,
    large: 32,
  },
  shadows: {
    heavy: 'rgba(0,0,0,0.6)',
  },
};
