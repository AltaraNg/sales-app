const {colors} = require('tailwindcss/defaultTheme')
module.exports = {

  purge: {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    options: {
      whitelist: ["bg-smoke-800"]
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "smoke-900": "rgba(0, 0, 0, 0.9)",
        "smoke-800": "rgba(0, 0, 0, 0.75)",
        "smoke-600": "rgba(0, 0, 0, 0.6)",
        smoke: "rgba(0, 0, 0, 0.5)",
        "smoke-400": "rgba(0, 0, 0, 0.4)",
        "smoke-200": "rgba(0, 0, 0, 0.25)",
        "smoke-100": "rgba(0, 0, 0, 0.1)",
        green: {
          ...colors.green,
          550: "#2A9D8F",
        },
        "persian-green": "#2A9D8F",
        "xiketic": "#1F0812",
        "queen-pink": "#EACBD2",
        "red-ryb": "#FF1D15"
      },
      keyframes: {
        note: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        }
      },
      animation: {
        note: "note 3s ease-in-out infinite"
      },
     
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/custom-forms")]
};
