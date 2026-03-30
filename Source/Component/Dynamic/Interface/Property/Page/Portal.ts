import type PortalContent from "../../Content/Page/Portal.js";

export default interface Property {
	Content: PortalContent;
	MetaTitle?: string;
	MetaDescription?: string;
	ClassName?: string;
	OnSignIn?: (Email: string, Password: string) => void;
	OnOAuth?: (Provider: string) => void;
	OnConnect?: () => void;
	OnNavigate?: (Path: string) => void;
}
