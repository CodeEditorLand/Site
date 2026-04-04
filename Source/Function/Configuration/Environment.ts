import type { default as Environment } from "./Type/Environment.js";

export default (await (async () => {
	const Value = process.env["SITE_ENVIRONMENT"];

	if (Value) {
		const Result = (
			await import("./Schema/Environment.js")
		).default.safeParse(Value);

		if (Result.success) return Result.data;

		console.warn(
			`[Configuration] Invalid SITE_ENVIRONMENT="${Value}", expected Production|Preview|Development.`,
		);
	}

	return (await import("./On.js")).default ? "Development" : "Production";
})()) satisfies Environment as Environment;
