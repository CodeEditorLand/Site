import type ButtonContent from "../Content/Button.js";

export default interface Interface {
	content: ButtonContent;
	onAction?: () => void;
	isLoading?: boolean;
}
