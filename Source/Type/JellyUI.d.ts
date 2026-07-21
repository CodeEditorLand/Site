import type {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	HTMLAttributes,
} from "react";

// Type-only shapes for https://jelly-ui.com's custom elements so JSX/TSX can
// reference them directly (<jelly-button>, etc). The elements themselves are
// registered client-side by the Jelly UI script tag in Source/Layout/Base.astro
// - nothing here loads or bundles the library.
declare global {
	namespace JSX {
		interface IntrinsicElements {
			"jelly-theme": DetailedHTMLProps<
				HTMLAttributes<HTMLElement> & {
					mode?: "light" | "dark" | "auto";
					accent?: string;
				},
				HTMLElement
			>;

			"jelly-button": DetailedHTMLProps<
				ButtonHTMLAttributes<HTMLElement> & {
					variant?:
						| "white"
						| "rose"
						| "amber"
						| "azure"
						| "mint"
						| "platinum"
						| "graphite";
					size?: "sm" | "small" | "md" | "medium" | "lg" | "large";
					shape?: "square" | "capsule";
					block?: boolean;
					label?: string;
				},
				HTMLElement
			>;

			"jelly-icon-button": DetailedHTMLProps<
				ButtonHTMLAttributes<HTMLElement> & {
					variant?:
						| "white"
						| "rose"
						| "amber"
						| "azure"
						| "mint"
						| "platinum"
						| "graphite";
					size?: "sm" | "small" | "md" | "medium" | "lg" | "large";
					shape?: "circle" | "square";
					label?: string;
				},
				HTMLElement
			>;
		}
	}
}

export {};
