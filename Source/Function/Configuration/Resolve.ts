import type { default as Configuration } from "./Type/Configuration.js";

const Result = (await import("./Schema.js")).default.safeParse({
	...(await import("./Preset.js")).default,
	...(await (await import("./Load.js")).default()),
	...(await (await import("./Override.js")).default()),
});

if (!Result.success) {
	console.error(
		"[Configuration] Final merged configuration is invalid:",

		Result.error.format(),
	);

	throw new Error(
		"[Configuration] Cannot start with invalid configuration. Check Configuration.json and environment variables.",
	);
}

const Resolved = Result.data satisfies Configuration;

export default Resolved as Configuration;
