import type Interface from "../Interface/Parse/Boolean.js";

export default ((Value) => {
	if (Value === undefined) return undefined;

	const Normalized = Value.trim().toLowerCase();

	if (Normalized === "true" || Normalized === "1") return true;
	if (Normalized === "false" || Normalized === "0") return false;

	return undefined;
}) satisfies Interface as Interface;
