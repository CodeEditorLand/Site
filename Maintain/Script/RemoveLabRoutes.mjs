#!/usr/bin/env node
/**
 * RemoveLabRoutes - take the lab surfaces out of the production output.
 *
 * A thin command line over `Source/Function/Route/LabOutput.mjs`, which holds the
 * removal and the reason for it. The site calls the same function from
 * `astro:build:done` (`Source/Function/Route/Lab.ts`), before the sitemap and the
 * route map read the output; this script is for a `Target/` produced without that
 * hook, or one built before this step existed:
 *
 *     node Maintain/Script/RemoveLabRoutes.mjs
 *     node Maintain/Script/RemoveLabRoutes.mjs --output ./Target
 *
 * It is idempotent: on a clean output it reports every route as already absent
 * and exits 0. It is a no-op when the build carries the lab on purpose
 * (`LAB=1`), and says so instead of silently keeping the routes.
 */
import { resolve } from "node:path";

import { LabRoute } from "../../Source/Function/Configuration/Lab.mjs";

import { RemoveLabOutput } from "../../Source/Function/Route/LabOutput.mjs";

const Flag = process.argv.indexOf("--output");

const Requested = Flag === -1 ? undefined : process.argv[Flag + 1];

if (Flag !== -1 && Requested === undefined) {
	console.error("[RemoveLabRoutes] --output needs a directory.");

	process.exit(1);
}

const Output =
	Requested === undefined
		? resolve(import.meta.dirname, "..", "..", "Target")
		: resolve(Requested);

const { Kept, Removed, Absent } = RemoveLabOutput(Output);

if (Kept) {
	console.log(
		`[RemoveLabRoutes] ${Output}: this build carries the lab (LAB=1), so ${LabRoute.join(", ")} is left in place.`,
	);
} else {
	console.log(
		`[RemoveLabRoutes] ${Output}: removed ${Removed.length > 0 ? Removed.join(", ") : "nothing"}; ` +
			`already absent ${Absent.length > 0 ? Absent.join(", ") : "nothing"}.`,
	);
}
