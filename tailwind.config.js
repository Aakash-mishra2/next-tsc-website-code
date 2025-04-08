/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				xsm: "260px",
				xsss: "320px",
				xss: "384px",
				xs: "540px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
			},
			fontFamily: {
				hanken: ["var(--font-hanken)"],
				copperbt: ["var(--font-copperbt)"],
				sofiapro: ["var(--font-sofiapro)"]
			},
			colors: {
				primary: "#66baf9",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			boxShadow: {
				"3xl": "0px 0px 10px 0px rgba(0,0,0,0.3);",
			},
			rotate: {
				100: "100deg",
				260: "260deg",
			},
		},
		container: {
			padding: {
				DEFAULT: "1rem",
				sm: "2rem",
				lg: "4rem",
				xl: "5rem",
				"2xl": "6rem",
			},
		},
		borderRadius: {
			none: "0",
			sm: "0.125rem",
			DEFAULT: "0.25rem",
			md: "0.375rem",
			lg: "0.5rem",
			xl: "2rem",
			"2lg": "1.5rem",
			"2xl": "3.5rem",
			full: "9999px",
		},
	},
	plugins: [],
};
