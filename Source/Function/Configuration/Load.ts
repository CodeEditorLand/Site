import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import Schema from "./Schema";

function Strip(
	Source: Record<string, unknown>,
): Record<string, unknown> {
	const Result: Record<string, unknown> = {};

	for (const [Key, Value] of Object.entries(Source)) {
		if (Value !== undefined) {
			Result[Key] = Value;
		}
	}

	return Result;
}

export default function Load(): Record<string, unknown> {
	const FilePath = resolve(
		import.meta.dirname ?? process.cwd(),
		"../../../Configuration.json",
	);

	if (!existsSync(FilePath)) {
		return {};
	}

	const Content = readFileSync(FilePath, "utf-8");
	const Parsed = JSON.parse(Content);

	const Result = Schema.partial().safeParse(Parsed);

	if (!Result.success) {
		console.warn(
			"[Configuration] Configuration.json validation failed:",
			Result.error.format(),
		);
		console.warn("[Configuration] Falling back to preset values.");
		return {};
	}

	return Strip(Result.data);
}
