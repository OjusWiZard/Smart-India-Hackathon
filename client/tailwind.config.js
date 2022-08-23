/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{html,js,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					dark: "#6C42C1",
					light: "#F5ECFF",
					bg: "#E5E5E5",
					grey: "#363636",
				},
				secondary: {
					dark: "#ED5B75",
					placeholder: "#4F4F4F",
					border: "#E8E8E8",
				},
			},
		},
	},
	plugins: [],
};
