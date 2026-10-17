/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F6F0',
        surface: '#EFEFE7',
        charcoal: '#172522',
        accent: '#176B52',
        'accent-light': '#4FB08C',
        border: '#DCDDD4',
        'text-muted': '#5C6662',
        // Backward-compatibility aliases
        paper: '#F7F6F0',
        ink: '#172522',
        hairline: '#DCDDD4',
      },
      fontFamily: {
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '2px',
        sm: '2px',
        md: '2px',
        lg: '2px',
      },
      maxWidth: {
        content: '1200px',
      },
      animation: {
        'orbit-slow': 'spin 120s linear infinite',
      },
    },
  },
  plugins: [],
}
