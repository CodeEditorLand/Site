import type { ReactNode } from "react";

export default interface Interface<T = Record<string, unknown>> {
	key: keyof T;
	header: string;
	render?: (value: unknown, row: T) => ReactNode;
	className?: string;
}
