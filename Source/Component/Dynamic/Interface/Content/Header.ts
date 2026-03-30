import type { DynamicButtonProps } from "../../DynamicButton.js";
import type NavLink from "../Link/Navigation.js";

export default interface Interface {
	logo: {
		text: string;
		icon?: string;
	};
	navigation: NavLink[];
	actions: (DynamicButtonProps | { type: "mobile-menu" })[];
	sticky?: boolean;
	showMobileMenu?: boolean;
}
