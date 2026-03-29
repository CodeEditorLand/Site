import type { Configuration } from "./Schema";

import Schema from "./Schema";
import Preset from "./Preset";
import Load from "./Load";
import Override from "./Override";

const Merged = {
	...Preset,
	...Load(),
	...Override(),
};

const Result = Schema.safeParse(Merged);

if (!Result.success) {
	console.error(
		"[Configuration] Final merged configuration is invalid:",
		Result.error.format(),
	);
	throw new Error(
		"[Configuration] Cannot start with invalid configuration. Check Configuration.json and environment variables.",
	);
}

export default Result.data satisfies Configuration;
