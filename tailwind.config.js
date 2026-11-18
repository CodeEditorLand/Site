import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./Public/**/*.html",

		"./Source/**/*.{astro,js,jsx,ts,tsx,vue,svelte}",

		"./src/**/*.{astro,js,jsx,ts,tsx}",
	],

	theme: {
		container: {
			center: true,
		},

		extend: {
			transitionTimingFunction: {
				Ease: "cubic-bezier(0.21, 0.1, 0.21, 1)",
			},

			/* The tracking registers (`_Token.scss`). `tracking-join|set|name|row|
			 * rule` are the five values the system has; the three names the kit
			 * already used are aliased onto them so a component written against
			 * Tailwind's scale resolves to a register instead of to Tailwind's
			 * own number (tight -0.025em, wider 0.05em, widest 0.1em). One law,
			 * five values, no sixth - including in markup. */
			letterSpacing: {
				join: "var(--track-join)",
				set: "var(--track-set)",
				name: "var(--track-name)",
				row: "var(--track-row)",
				rule: "var(--track-rule)",
				tight: "var(--track-join)",
				wider: "var(--track-row)",
				widest: "var(--track-rule)",
			},

			fontFamily: {
				sans: ["var(--FontSans)", ...fontFamily.sans],

				mono: ["var(--FontMono)", ...fontFamily.mono],

				serif: ["var(--FontSans)", ...fontFamily.serif],
			},

			/* Composition foundation (Source/Stylesheet/UtilityClasses.css).
			 * Seven type roles, each carrying its own line-height so a utility
			 * never needs a second `leading-*` class. `section` also carries the
			 * band-heading tracking. Names are API: sibling cards compose with
			 * `text-display` ... `text-code`. */
			fontSize: {
				display: [
					"var(--type-display)",
					{ lineHeight: "var(--type-display-line)" },
				],

				section: [
					"var(--type-section)",
					{
						lineHeight: "var(--type-section-line)",

						letterSpacing: "-0.02em",
					},
				],

				sub: [
					"var(--type-sub)",
					{ lineHeight: "var(--type-sub-line)" },
				],

				body: [
					"var(--type-body)",
					{ lineHeight: "var(--type-body-line)" },
				],

				caption: [
					"var(--type-caption)",
					{ lineHeight: "var(--type-caption-line)" },
				],

				meta: [
					"var(--type-meta)",
					{ lineHeight: "var(--type-meta-line)" },
				],

				code: [
					"var(--type-code)",
					{ lineHeight: "var(--type-code-line)" },
				],
			},

			typography: {
				DEFAULT: {
					css: {
						a: {
							"font-weight": "400",
						},

						// ── THE LADDER, AT THE PROSE LAYER ──
						// The typography plugin's own scale is a fourth-tier
						// generator: h1 2.25em (36px), h2 1.5em (24px), h3 1.25em
						// (20px) - and 20-24px is neither S (<=18) nor L (>=32).
						// A markdown body must set the same ladder the rest of the
						// site does, or every Doc and Blog article reintroduces the
						// tier the identity forbids. h1/h2 are L (a section head),
						// h3 is the S heading (18px, 500), h4 is a run-in at body
						// size. Nothing here is a new value: each reads a token.
						h1: {
							"font-size": "var(--type-section)",
							"line-height": "var(--type-section-line)",
							"letter-spacing": "var(--track-join)",
							"font-weight": "500",
							strong: { "font-weight": "500" },
						},

						h2: {
							"font-size": "var(--type-section)",
							"line-height": "var(--type-section-line)",
							"letter-spacing": "var(--track-join)",
							"font-weight": "500",
							strong: { "font-weight": "500" },
						},

						h3: {
							"font-size": "var(--type-heading)",
							"line-height": "var(--type-heading-line)",
							"letter-spacing": "var(--track-set)",
							"font-weight": "500",
							strong: { "font-weight": "500" },
						},

						h4: {
							"font-size": "var(--type-sub)",
							"line-height": "var(--type-sub-line)",
							"letter-spacing": "var(--track-set)",
							"font-weight": "500",
							strong: { "font-weight": "500" },
						},

						// The weight ceiling, at the prose layer: the plugin's
						// defaults are 600-900 (strong 600, dt 600, code 600, and
						// 700-900 on a heading's own strong), and the identity's
						// ceiling is 500 (DesignSystem.md §5; System/_Type.scss).
						// The elements keep their semantic emphasis - the emphasis
						// is the element's, the weight is the system's.
						//
						// One residue this API cannot reach: the plugin emits its
						// own `h1 strong`…`h4 strong` (700-900) AFTER the nested
						// `strong` above, at the same specificity, so its value
						// wins inside `.prose`. It is inert - no element on the
						// site carries the `prose` class; the markdown surfaces are
						// `doc-prose` and `blog-article__body`, and they read the
						// roles in `_Type.scss`. Recorded rather than silenced with
						// an `!important` that would outrank a keeper's weight.
						strong: {
							"font-weight": "500",
						},

						b: {
							"font-weight": "500",
						},

						dt: {
							"font-weight": "500",
						},

						code: {
							"font-weight": "400",
						},

						// Tables: block + overflow-x-auto so they scroll on mobile
						// instead of blowing out the layout.
						table: {
							display: "block",

							"overflow-x": "auto",

							"-webkit-overflow-scrolling": "touch",
						},

						// Tables: design-system hairline rows. --Border is the sitewide
						// hairline token (rgba(7,7,7,0.08) on the daylight canvas).
						thead: {
							"border-bottom-width": "1px",

							"border-bottom-color": "var(--Border)",
						},

						// Headers: mono, uppercase, tracked, muted. The size is
						// the meta role, not a literal: 0.75rem (12px) sat below
						// the site's 13px floor, and a table head is the one
						// place the floor was broken outside the token layer
						// (D2-TOKENS §7.7).
						"thead th": {
							color: "var(--MuteForeground)",

							"font-family": "var(--FontMono)",

							"font-size": "var(--type-meta)",

							"font-weight": "500",

							"letter-spacing": "var(--track-row)",

							"text-transform": "uppercase",

							"text-align": "left",

							"vertical-align": "bottom",

							"padding-inline-end": "0.75em",

							"padding-top": "0.75em",

							"padding-bottom": "0.75em",

							"padding-inline-start": "0.75em",
						},

						"tbody tr": {
							"border-bottom-width": "1px",

							"border-bottom-color": "var(--Border)",
						},

						// Body cells: ink text (valid on the creme canvas and white cards).
						td: {
							color: "var(--Foreground)",

							"vertical-align": "baseline",

							"padding-inline-end": "0.75em",

							"padding-top": "0.75em",

							"padding-bottom": "0.75em",

							"padding-inline-start": "0.75em",
						},

						// Pre / code blocks: prevent overflow blowout
						pre: {
							"overflow-x": "auto",
						},

						// Headings: no ligatures, tighter tracking
						"h1, h2, h3, h4": {
							"letter-spacing": "-0.02em",
						},
					},
				},
			},

			borderColor: {
				DEFAULT: "var(--Border)",
			},

			colors: {
				/* Design system tokens - maps Tailwind utilities to CSS custom properties in Base.css */
				background: "var(--Background)",

				foreground: "var(--Foreground)",

				card: {
					DEFAULT: "var(--Card)",

					foreground: "var(--CardForeground)",
				},

				popover: {
					DEFAULT: "var(--Popover)",

					foreground: "var(--PopoverForeground)",
				},

				primary: {
					DEFAULT: "var(--Primary)",

					foreground: "var(--PrimaryForeground)",
				},

				secondary: {
					DEFAULT: "var(--Secondary)",

					foreground: "var(--SecondaryForeground)",
				},

				muted: {
					DEFAULT: "var(--Mute)",

					foreground: "var(--MuteForeground)",
				},

				accent: {
					DEFAULT: "var(--Accent)",

					foreground: "var(--AccentForeground)",
				},

				destructive: {
					DEFAULT: "var(--Destruct)",

					foreground: "var(--DestructForeground)",
				},

				border: "var(--Border)",

				input: "var(--Input)",

				ring: "var(--Ring)",

				// Sidebar
				sidebar: {
					DEFAULT: "var(--Background)",

					foreground: "var(--Foreground)",

					primary: "var(--Primary)",

					"primary-foreground": "var(--PrimaryForeground)",

					accent: "var(--Accent)",

					"accent-foreground": "var(--AccentForeground)",

					border: "var(--Border)",

					ring: "var(--Ring)",
				},

				// Bridge colors from Example/src/index.css
				"color-green-500": "var(--ColorGreen500)",

				"color-yellow-500": "var(--ColorYellow500)",

				// Extended technology badge palette - Protocol Spines
				"spine-grpc": "var(--SpinegRPC)",

				"spine-ipc": "var(--SpineIPC)",

				"spine-tcp": "var(--SpineTCP)",

				"spine-wasm": "var(--SpineWASM)",

				// Extensions & Libraries
				"ext-rust": "var(--ExtensionRust)",

				"ext-tauri": "var(--ExtensionTauri)",

				"ext-effect-ts": "var(--ExtensionEffectTypeScript)",

				"ext-react": "var(--ExtensionReact)",

				"ext-vue": "var(--ExtensionVue)",

				"ext-svelte": "var(--ExtensionSvelte)",

				"ext-next": "var(--ExtensionNext)",

				"ext-nuxt": "var(--ExtensionNuxt)",

				"ext-solid": "var(--ExtensionSolid)",

				"ext-astro": "var(--ExtensionAstro)",

				// Platform indicators
				"platform-web": "var(--PlatformWeb)",

				"platform-desktop": "var(--PlatformDesktop)",

				"platform-mobile": "var(--PlatformMobile)",
			},
		},
	},

	variants: {},

	plugins: [
		require("@tailwindcss/forms"),

		require("@tailwindcss/typography"),

		require("@tailwindcss/aspect-ratio"),

		/* `aria-invalid:` - the state a control carries once its value has been
		   rejected. Tailwind 3.4 ships `aria-checked`, `aria-disabled`,
		   `aria-expanded`, `aria-hidden`, `aria-pressed`, `aria-readonly`,
		   `aria-required` and `aria-selected` as variants and no other `aria-*`
		   name, so every `aria-invalid:*` utility in `Source/Component/UI/`
		   (`Checkbox`, `Textarea`, `RadioGroup`, `Select`, `InputOTP`) emitted
		   no rule at all - measured in the compiled sheet, 0 selectors matching
		   `aria-invalid`. The invalid state is therefore a state that never
		   renders: the control looks exactly like a valid one while the form
		   refuses it. One variant here generates all of them, which is the
		   single decision rather than a class rename per component.
		   The selector is the one Tailwind's own arbitrary form
		   (`aria-[invalid=true]:`) expands to, so the two spellings agree. */
		function ({ addVariant }) {
			addVariant("aria-invalid", '&[aria-invalid="true"]');
		},
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
