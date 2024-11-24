import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7749F8",
        "primary-dark": "#663cda",
        background: "var(--background)",
        foreground: "var(--foreground)",
        "dark-bg": "#1a1a1a",
        "dark-header": "#434343",
        "dark-card": "#343333",
        "dark-button": "#3a3a3a",
        "dark-hover": "#4a4a4a",
      },
      borderColor: {
        "dark-custom": "#343333",
      },
      borderRadius: {
        custom: "4px", // Define un border-radius personalizado
      },
      backgroundImage: {
        "gradient-orange-alpha":
          "linear-gradient(to bottom, rgba(255, 92, 0, 0), rgba(255, 92, 0, 0.2))",
        "gradient-purple-alpha":
          "linear-gradient(to bottom, rgba(119, 73, 248, 0), rgba(119, 73, 248, 0.2))",
      },
      boxShadow: {
        "card-modal": "0 10px 30px rgba(0, 0, 0, 0.9)",
        "card-player": "0 3px 9.2px 2px #29004273",
      },
      fontWeight: {
        thin: "var(--font-weight-thin)",
        extralight: "var(--font-weight-extralight)",
        light: "var(--font-weight-light)",
        regular: "var(--font-weight-regular)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
        extrabold: "var(--font-weight-extrabold)",
        black: "var(--font-weight-black)",
      },
      fontSize: {
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      borderWidth: {
        "5": "5px",
      },
    },
  },
  corePlugins: {},
  plugins: [],
} satisfies Config;
