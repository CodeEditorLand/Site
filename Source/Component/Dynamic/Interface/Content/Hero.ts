import type FloatingCard from "../Card/Floating.js";

import type BadgeContent from "../Content/Badge.js";

import type ButtonContent from "../Content/Button.js";

export default interface Interface {
	Badge?: BadgeContent;

	Title: string;

	TitleHighlight?: string;

	Subtitle: string;

	PrimaryCta: ButtonContent;

	SecondaryCta?: ButtonContent;

	FloatingCards?: FloatingCard[];

	ShowConnectingLines?: boolean;

	ShowParticles?: boolean;

	RespectReducedMotion?: boolean;
}
