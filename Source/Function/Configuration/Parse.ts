export function ParseBoolean(
	Value: string | undefined,
): boolean | undefined {
	if (Value === undefined) return undefined;

	const Normalized = Value.trim().toLowerCase();

	if (Normalized === "true" || Normalized === "1") return true;
	if (Normalized === "false" || Normalized === "0") return false;

	return undefined;
}

export function ParseNumber(
	Value: string | undefined,
): number | undefined {
	if (Value === undefined) return undefined;

	const Parsed = Number.parseInt(Value, 10);

	return Number.isNaN(Parsed) ? undefined : Parsed;
}
