import type { ReactNode } from "react";

export default interface Interface<T = Record<string, unknown>> {
	Key: keyof T;

	Header: string;

	Render?: (Value: unknown, Row: T) => ReactNode;

	ClassName?: string;
}
