import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#eefff6",
					100: "#d7ffeb",
					200: "#b2ffd9",
					300: "#76ffbd",
					400: "#33f599",
					500: "#09de79", // Main Color
					600: "#00b560",
					700: "#049150",
					800: "#0a7142",
					900: "#0a5d38",
					950: "#00341d",
				},
				secondary: {
					50: "#f4f5f9",
					100: "#eaedf5",
					200: "#dde0ee", // Main Color
					300: "#c1c6e0",
					400: "#a8abd1",
					500: "#9192c3",
					600: "#7e7ab1",
					700: "#6d689a",
					800: "#59567d",
					900: "#4b4966",
					950: "#2c2b3b",
				},
				red: "#FF0000",
				gray: {
					light: "#D9D9D9",
					dark: "#737373",
					darker: "#2C2C2E",
				},
			},
			screens: {
				"3xl": "1920px",
				"4xl": "2560px",
			},
			container: {
				center: true,
				padding: {
					DEFAULT: "1rem",
				},
				screens: {
					"3xl": "1920px",
				},
			},
		},
	},
	plugins: [],
};

export default config;
