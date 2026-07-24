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

				"jelly-badge": DetailedHTMLProps<
					HTMLAttributes<HTMLElement> & {
						variant?:
							| "white"
							| "rose"
							| "amber"
							| "azure"
							| "mint"
							| "platinum"
							| "graphite";
						size?: "sm" | "small" | "md" | "medium" | "lg" | "large";
						outline?: boolean;
						instant?: boolean;
						live?: boolean;
						shape?: "pill" | "square";
					},
					HTMLElement
				>;

				"jelly-chip": DetailedHTMLProps<
					HTMLAttributes<HTMLElement> & {
						variant?:
							| "white"
							| "rose"
							| "amber"
							| "azure"
							| "mint"
							| "platinum"
							| "graphite";
						size?: "sm" | "small" | "md" | "medium" | "lg" | "large";
						selectable?: boolean;
						selected?: boolean;
						removable?: boolean;
						disabled?: boolean;
						shape?: "pill" | "square";
					},
					HTMLElement
				>;

				"jelly-kbd": DetailedHTMLProps<
					HTMLAttributes<HTMLElement> & {
						key?: string;
						size?: "sm" | "small" | "md" | "medium" | "lg" | "large";
					},
					HTMLElement
				>;

				"jelly-checkbox": DetailedHTMLProps<
					HTMLAttributes<HTMLElement> & {
						checked?: boolean;
						indeterminate?: boolean;
						disabled?: boolean;
						label?: string;
						value?: string;
						name?: string;
						size?: "sm" | "small" | "md" | "medium" | "lg" | "large";
						variant?:
							| "white"
							| "rose"
							| "amber"
							| "azure"
							| "mint"
							| "platinum"
							| "graphite";
					},
					HTMLElement
				>;

				"jelly-radio": DetailedHTMLProps<
					HTMLAttributes<HTMLElement> & {
						checked?: boolean;
						disabled?: boolean;
						name?: string;
						label?: string;
						value?: string;
						size?: "sm" | "small" | "md" | "medium" | "lg" | "large";
						variant?:
							| "white"
							| "rose"
							| "amber"
							| "azure"
							| "mint"
							| "platinum"
							| "graphite";
					},
					HTMLElement
				>;

				"jelly-switch": DetailedHTMLProps<
					HTMLAttributes<HTMLElement> & {
						checked?: boolean;
						disabled?: boolean;
						label?: string;
						value?: string;
						name?: string;
						size?: "sm" | "small" | "md" | "medium" | "lg" | "large";
						variant?:
							| "white"
							| "rose"
							| "amber"
							| "azure"
							| "mint"
							| "platinum"
							| "graphite";
					},
					HTMLElement
				>;

				"jelly-slider": DetailedHTMLProps<
					HTMLAttributes<HTMLElement> & {
						value?: number;
						min?: number;
						max?: number;
						step?: number;
						label?: string;
						name?: string;
						disabled?: boolean;
						size?: "sm" | "small" | "md" | "medium" | "lg" | "large";
						variant?:
							| "white"
							| "rose"
							| "amber"
							| "azure"
							| "mint"
							| "platinum"
							| "graphite";
					},
					HTMLElement
				>;

				"jelly-segmented": DetailedHTMLProps<
					HTMLAttributes<HTMLElement> & {
						value?: string;
						disabled?: boolean;
						roles?: "radiogroup" | "tablist";
						label?: string;
						name?: string;
						size?: "sm" | "small" | "md" | "medium" | "lg" | "large";
					},
					HTMLElement
				>;

				"jelly-tabs": DetailedHTMLProps<
					HTMLAttributes<HTMLElement> & {
						value?: string;
						size?: "sm" | "small" | "md" | "medium" | "lg" | "large";
					},
					HTMLElement
				>;
			}
			}
			}
}

export {};
