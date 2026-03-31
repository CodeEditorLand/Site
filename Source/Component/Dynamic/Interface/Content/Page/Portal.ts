import type Tier from "../Portal/Tier.js";

export default interface Interface {
	Title: string;
	Subtitle: string;
	Cloud: Tier;
	Provider: Tier;
	LocalFirst: Tier;
}
