import type FloatingCard from "../Card/Floating.js";
import type BadgeContent from "../Content/Badge.js";
import type ButtonContent from "../Content/Button.js";

export default interface Interface {
	badge?: BadgeContent;
	title: string;
	titleHighlight?: string;
	subtitle: string;
	primaryCta: ButtonContent;
	secondaryCta?: ButtonContent;
	floatingCards?: FloatingCard[];
	showConnectingLines?: boolean;
	showParticles?: boolean;
	respectReducedMotion?: boolean;
}
