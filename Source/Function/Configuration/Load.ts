import type Interface from "./Interface/Load.js";

export default (async () => {
	const FilePath = (await import("node:path")).resolve(
		import.meta.dirname ?? process.cwd(),

		"../../../Configuration.json",
	);

	try {
		await (
			await import("node:fs/promises")
		).access(FilePath, (await import("node:fs/promises")).constants.R_OK);
	} catch (error) {
		return {};
	}

	const Result = (await import("./Schema.js")).default.partial().safeParse(
		JSON.parse(
			await (
				await import("node:fs/promises")
			).readFile(FilePath, {
				encoding: "utf-8",
			}),
		),
	);

	if (!Result.success) {
		console.warn(
			"[Configuration] Configuration.json validation failed:",

			Result.error.format(),
		);

		console.warn("[Configuration] Falling back to preset values.");

		return {};
	}

	return Object.fromEntries(
		Object.entries(Result.data).filter(([, Value]) => Value !== undefined),
	);
}) satisfies Interface as Interface;
