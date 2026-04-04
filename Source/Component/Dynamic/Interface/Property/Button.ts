import type ButtonContent from "../Content/Button.js";

export default interface Interface {
	Content: ButtonContent;
	OnAction?: () => void;
	IsLoading?: boolean;
}
