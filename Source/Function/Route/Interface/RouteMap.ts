export interface RouteMap {
	Version: number;

	Generated: string;

	Canonical: string[];

	Variant: Record<string, string>;
}

export type { RouteMap as default };
