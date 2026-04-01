import type Tier from "../Portal/Tier.js";

export default interface Interface {
	Title: string;
	Subtitle: string;
	Cloud: Tier;
	Provider: Tier;
	LocalFirst: Tier;
	Enterprise?: Tier;
	Labels?: {
		Included?: string;
		Capabilities?: string;
		Protocol?: string;
		SettingsManaged?: string;
		AllTiers?: string;
	};
}
