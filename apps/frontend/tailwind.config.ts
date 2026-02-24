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
        primary: {
          DEFAULT: '#228b22', // Forest Green
          foreground: '#ffffff',
          50: '#f2fcf2',
          100: '#e6f9e6',
          200: '#cceccc',
          300: '#a3d9a3',
          400: '#70bf70',
          500: '#228b22',
          600: '#1b6f1b',
          700: '#155715',
          800: '#124512',
          900: '#0f390f',
          950: '#082008',
        },
        mint: {
          DEFAULT: '#98FB98', // Mint Green
          foreground: '#1e3a1e',
          50: '#f4fdf4',
          100: '#e5fae5',
          200: '#cbf6cb',
          300: '#a0eda0',
          400: '#6ce06c',
          500: '#3ac33a',
          600: '#29a029',
          700: '#237f23',
          800: '#206520',
          900: '#1b531b',
          950: '#0b2e0b',
        },
        turquoise: {
          DEFAULT: '#40E0D0', // Turquoise
          foreground: '#0f3532',
          50: '#f0fdfc',
          100: '#ccfbf7',
          200: '#99f6ef',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        medical: {
          DEFAULT: '#40E0D0', // Using Turquoise as the new medical accent base
          foreground: '#ffffff',
        },
        gold: {
          DEFAULT: '#DAA520', // GoldenRod
          foreground: '#ffffff',
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        playfair: ['Playfair Display', 'serif']
      },
      backgroundImage: {
        'organic-gradient': 'radial-gradient(circle at top left, var(--tw-gradient-stops))',
      }
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
