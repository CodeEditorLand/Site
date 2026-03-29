export default (Value: string | undefined): boolean | undefined => {
	if (Value === undefined) return undefined;

	const Normalized = Value.trim().toLowerCase();

	if (Normalized === "true" || Normalized === "1") return true;
	if (Normalized === "false" || Normalized === "0") return false;

	return undefined;
};
