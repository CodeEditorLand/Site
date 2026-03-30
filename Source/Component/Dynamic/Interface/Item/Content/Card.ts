import type { ReactNode } from "react";

export default interface Interface {
	id?: string;
	title?: string;
	description?: string;
	content?: ReactNode;
	footer?: ReactNode;
	className?: string;
}
