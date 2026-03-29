import { Environment } from "./Schema";
import On from "./On";

export default (() => {
	const Value = process.env["SITE_ENVIRONMENT"];

	if (Value) {
		const Result = Environment.safeParse(Value);

		if (Result.success) return Result.data;

		console.warn(
			`[Configuration] Invalid SITE_ENVIRONMENT="${Value}", expected Production|Preview|Development.`,
		);
	}

	return On ? "Development" : "Production";
})();
