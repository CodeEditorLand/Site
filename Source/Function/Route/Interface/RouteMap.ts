export interface RouteMap {
	Version: number;
	Generated: string;
	Canonical: string[];
	Variant: Record<string, string>;
}

export default RouteMap;
