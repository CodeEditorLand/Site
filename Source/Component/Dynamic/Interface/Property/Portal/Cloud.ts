import type CloudContent from "../../Content/Portal/Cloud.js";

export default interface Property {
	Content: CloudContent;

	OnSubmit?: (Email: string, Password: string) => void;

	IsLoading?: boolean;

	ErrorMessage?: string;

	ClassName?: string;
}
