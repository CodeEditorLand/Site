export default (Value: string | undefined): number | undefined => {
	if (Value === undefined) return undefined;

	const Parsed = Number.parseInt(Value, 10);

	return Number.isNaN(Parsed) ? undefined : Parsed;
};
