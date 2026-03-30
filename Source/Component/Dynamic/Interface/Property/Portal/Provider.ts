import type ProviderContent from "../../Content/Portal/Provider.js";

export default interface Property {
	Content: ProviderContent;
	OnOAuth?: (Provider: string) => void;
	IsLoading?: boolean;
	ClassName?: string;
}
