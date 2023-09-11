import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#F9F9F9',
          text: '#333333',
          primary: '#87CEEB',
          secondary: '#f0ece1',
          accent: '#ba3b50',
        },
        dark: {
          background: '#333333',
          text: '#F9F9F9',
          primary: '#87CEEB',
          secondary: '#262113',
          accent: '#e4aab4',
        },
      },
      fontFamily: {
        body: ['Ubuntu', 'sans'],
        headings: ['Concert One', 'cursive'],
      },
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px (default)
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
      },
      extend: {
        screens: {
          dark: { raw: '(prefers-color-scheme: dark)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
