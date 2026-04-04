import type Interface from "../Interface/Parse/Number.js";

export default ((Value) => {
	if (Value === undefined) return undefined;

	const Parsed = Number.parseInt(Value, 10);

	return Number.isNaN(Parsed) ? undefined : Parsed;
}) satisfies Interface as Interface;
