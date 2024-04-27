const defaultConfig = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors:{
        prBg:'#F5F7FB',
        prBlue:'#218DFA',
      },
      fontSize: {
        '2xs': '.625rem',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
      },
      screens: {
        '2xl': {'max': '1535px'},
        '3xl': {'max':'1791px'},
      },
      borderWidth: {
        '3': '3px',
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, .25)',
      },
      lineHeight: {
        // Agrega tus propias alturas de línea
        'extra-loose': '2.2',
      },
      opacity: {
        // Agrega tus propias opacidades
        '80': '0.8',
      },
      zIndex: {
        // Agrega tus propios z-indices
        '9999': 9999,
      },
    },
    variants: {
      extend: {},
    },
  },
  plugins:[]
};

module.exports = defaultConfig;