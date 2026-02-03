import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  prefix: "te-",
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        "primary-light": "var(--te-primary-light)",
        "primary-text": "var(--te-primary-text)",
        editor: {
          primary: "var(--te-primary)",
          "primary-focus": "var(--te-primary-focus)",
          border: "var(--te-border)",
          "border-focus": "var(--te-border-focus)",
          bg: "var(--te-bg-editor)",
          toolbar: "var(--te-bg-toolbar)",
          "toolbar-hover": "var(--te-bg-toolbar-hover)",
          text: "var(--te-text-primary)",
          "text-secondary": "var(--te-text-secondary)",
          "text-muted": "var(--te-text-muted)",
          "text-inverse": "var(--te-text-inverse)",
        }
      },
      borderRadius: {
        DEFAULT: "var(--te-radius)",
      },
      boxShadow: {
        sm: "var(--te-shadow-sm)",
        DEFAULT: "var(--te-shadow)",
      }
    },
  },
  plugins: [typography],
};
