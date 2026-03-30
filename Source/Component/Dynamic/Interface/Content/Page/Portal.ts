import type CloudContent from "../Portal/Cloud.js";
import type ProviderContent from "../Portal/Provider.js";
import type LocalFirstContent from "../Portal/LocalFirst.js";
import type { HeaderContent } from "../../../../Layout/Header.js";

export default interface Interface {
	Cloud: CloudContent;
	Provider: ProviderContent;
	LocalFirst: LocalFirstContent;
	Header?: HeaderContent;
	Footer?: Record<string, unknown>;
}
