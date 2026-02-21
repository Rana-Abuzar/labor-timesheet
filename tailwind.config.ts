import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'timesheet-border': '#c8a055',
        'timesheet-bg': '#fffacd',
        'friday-highlight': '#ffcc00',
        'header-bg': '#e8762b94',
      },
      fontSize: {
        'xxs': '7px',
        'xs-plus': '8px',
        'sm-minus': '9px',
      },
      width: {
        'a4': '210mm',
      },
      minHeight: {
        'a4': '297mm',
      },
    },
  },
  plugins: [],
};

export default config;
