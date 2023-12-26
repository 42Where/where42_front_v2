/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["GmarketSans", "sans-serif"],
      },
      fontWeight: {
        light: 300,
        normal: 500,
        bold: 700,
      },
      fontSize: {
        h1: "3.5rem",
        h2: "3rem",
        h3: "2.5rem",
        h4: "2rem",
        h5: "1.5rem",
        h6: "1.25rem",
        b1: "2rem",
        b2: "1.75rem",
        b3: "1.5rem",
        b4: "1.25rem",
        b5: "1rem",
        b6: "0.75rem",
        l1: "1.25rem",
        l2: "1rem",
        l3: "0.75rem",
        l4: "0.5rem",
        l5: "0.375rem",
      },
      colors: {
        primary: {
          0: "#132743",
          1: "#4a6282",
          2: "#88a0c3",
        },
        secondary: {
          0: "#ffb5b5",
          1: "#ffc6c6",
          2: "#ffdddd",
        },
        white: "#fcfdff",
        red: "#b20000",
        green: "#00621b",
        grey: {
          0: "#3f4135",
          1: "#7f848d",
          2: "#d9d9d9",
          3: "#f0f0f0",
        },
      },
    },
  },
  plugins: [],
};
