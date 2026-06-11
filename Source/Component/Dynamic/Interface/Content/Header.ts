import type { DynamicButtonProps } from "../../DynamicButton.js";

import type NavLink from "../Link/Navigation.js";

export default interface Interface {
	Logo: {
		Text: string;

		Icon?: string;
	};

	Navigation: NavLink[];

	Actions: (DynamicButtonProps | { Type: "mobile-menu" })[];

	Sticky?: boolean;

	ShowMobileMenu?: boolean;
}
