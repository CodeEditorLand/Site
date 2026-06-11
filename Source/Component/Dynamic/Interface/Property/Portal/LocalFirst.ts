import type LocalFirstContent from "../../Content/Portal/LocalFirst.js";

export default interface Property {
	Content: LocalFirstContent;

	OnConnect?: () => void;

	IsLoading?: boolean;

	DaemonStatus?: "Connected" | "Disconnected" | "Scanning";

	ClassName?: string;
}
