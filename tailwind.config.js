import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./Public/**/*.html",
		"./Source/**/*.{astro,js,jsx,ts,tsx,vue,svelte}",
		"./src/**/*.{astro,js,jsx,ts,tsx}",
	],

	darkMode: "class",

	theme: {
		container: {
			center: true,
		},
		extend: {
			transitionTimingFunction: {
				Ease: "cubic-bezier(0.21, 0.1, 0.21, 1)",
			},
			fontFamily: {
				sans: ["Albert Sans", ...fontFamily.sans],
			},
			typography: {
				DEFAULT: {
					css: {
						a: {
							"font-weight": "400",
						},
					},
				},
			},
			borderRadius: {
				none: "0",
				full: "9999px",
			},
			borderColor: {
				DEFAULT: "var(--border)",
			},
			colors: {
				/* Design system tokens — maps Tailwind utilities to CSS custom properties in Base.css */
				background: "hsl(var(--background))",
				foreground: "var(--foreground)",
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
				},
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "var(--popover-foreground)",
				},
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)",
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

				// Existing tokens
				backgroundLight: "var(--background-light)",
				backgroundDark: "var(--background-dark)",

				// Bridge colors from Example/src/index.css
				"color-green-500": "var(--color-green-500)",
				"color-yellow-500": "var(--color-yellow-500)",
				"color-white": "var(--color-white)",

				// Extended technology badge palette - Protocol Spines
				"spine-grpc": "#22c55e",
				"spine-ipc": "#3b82f6",
				"spine-tcp": "#f97316",
				"spine-wasm": "#a855f7",

				// Extensions & Libraries
				"ext-rust": "#ea580c",
				"ext-tauri": "#eab308",
				"ext-effect-ts": "#06b6d4",
				"ext-react": "#60a5fa",
				"ext-vue": "#4ade80",
				"ext-svelte": "#fb923c",
				"ext-next": "#171717",
				"ext-nuxt": "#16a34a",
				"ext-solid": "#2563eb",
				"ext-astro": "#9333ea",

				// Platform indicators
				"platform-web": "#4f46e5",
				"platform-desktop": "#475569",
				"platform-mobile": "#ec4899",
			},
		},
	},

	variants: {},

	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/aspect-ratio"),
	],

	// TODO: Link that to the dynamic components inside ./Source/Function/Scroll/Layout.astro
	safelist: [
		"h-2",
		"w-2",
		// Include badge color utilities
		"bg-spine-grpc",
		"text-spine-grpc",
		"border-spine-grpc",
		"bg-spine-ipc",
		"text-spine-ipc",
		"border-spine-ipc",
		"bg-spine-tcp",
		"text-spine-tcp",
		"border-spine-tcp",
		"bg-spine-wasm",
		"text-spine-wasm",
		"border-spine-wasm",
		"bg-ext-rust",
		"text-ext-rust",
		"border-ext-rust",
		"bg-ext-tauri",
		"text-ext-tauri",
		"border-ext-tauri",
		"bg-ext-effect-ts",
		"text-ext-effect-ts",
		"border-ext-effect-ts",
		"bg-platform-web",
		"text-platform-web",
		"border-platform-web",
		"bg-platform-desktop",
		"text-platform-desktop",
		"border-platform-desktop",
		"bg-platform-mobile",
		"text-platform-mobile",
		"border-platform-mobile",
	],
};
