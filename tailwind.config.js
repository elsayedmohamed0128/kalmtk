module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6200EE',
        onPrimary: '#FFFFFF',
        primaryContainer: '#EADDFF',
        onPrimaryContainer: '#21005D',
        secondary: '#625B71',
        onSecondary: '#FFFFFF',
        secondaryContainer: '#E8DEF8',
        onSecondaryContainer: '#1D192B',
        tertiary: '#7D5260',
        onTertiary: '#FFFFFF',
        tertiaryContainer: '#FFD8E4',
        onTertiaryContainer: '#31111D',
        error: '#B3261E',
        onError: '#FFFFFF',
        errorContainer: '#F9DEDC',
        onErrorContainer: '#410E0B',
        background: '#F5F5F5',
        onBackground: '#1C1B1F',
        surface: '#FFFFFF',
        onSurface: '#1C1B1F',
        surfaceVariant: '#E7E0EC',
        onSurfaceVariant: '#49454F',
        outline: '#79747E',
        shadow: '#000000',
        scrim: '#000000',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // or 'media' for system preference
}