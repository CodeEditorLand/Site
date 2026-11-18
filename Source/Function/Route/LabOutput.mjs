/**
 * LabOutput - remove the lab surfaces from a built site.
 *
 * ─── WHY REMOVAL AND NOT A 404 ────────────────────────────────────────────
 * `/Specimen` is a tool for the owner and the agents, not a page for a reader
 * (`Function/Configuration/Lab.mjs` says what a lab route is and how the switch
 * is decided). Hiding it is not a status code, a `noindex`, a stylesheet or a
 * client-side redirect: in every one of those the page is still deployed, still
 * crawlable, and still an address somebody can link to. The honest mechanism for
 * a static site is to remove the emitted directory, so the route is not in
 * `Target/` at all and the host has nothing to serve.
 *
 * ─── ONE IMPLEMENTATION, TWO CALLERS ──────────────────────────────────────
 * `Function/Route/Lab.ts` calls `RemoveLabOutput` from its `astro:build:done`
 * hook, and `Maintain/Script/RemoveLabRoutes.mjs` is the same call from the
 * command line, for a `Target/` built without the integration. The removal lives
 * here, in `Source/`, because a `.ts` integration may not import a file outside
 * `rootDir`; the script stays beside `SyncPublicMermaid.mjs` where a build step
 * is looked for.
 *
 * ─── WHEN IT RUNS, AND WHY THE ORDER MATTERS ──────────────────────────────
 * The hook fires before `@astrojs/sitemap` writes the sitemap and before
 * `Route/Map.ts` scans the output for `RouteMap.json`, the service worker's route
 * table and the Cloudflare `_redirects`. Removing the directory first is what
 * keeps a removed route out of all three; removing it afterwards would leave a
 * `301 /specimen → /Specimen` rule pointing at a page that is no longer there -
 * a hidden route that still announces itself.
 *
 * Plain ESM rather than TypeScript for the same reason `Configuration/Lab.mjs`
 * is: the command-line script has to read it under Node with no bundler.
 */
import { existsSync, rmSync } from "node:fs";

import { join, resolve } from "node:path";

import { Lab, LabRoute } from "../Configuration/Lab.mjs";

/**
 * The directories one route occupies in a built site.
 *
 * A page is emitted as `<Segment>/index.html`, so the route's directory is the
 * page. Astro preserves the file's case (`Specimen/`), while the redirect layer
 * also publishes the lower-case form of a hand-listed canonical - both are
 * removed when both exist, because either one is the page.
 *
 * @param {string} Output
 * @param {string} Route
 * @returns {string[]}
 */
const DirectoriesOf = (Output, Route) => {
	const Segments = Route.split("/").filter((Segment) => Segment.length > 0);

	return [
		...new Set([
			join(Output, ...Segments),
			join(Output, ...Segments.map((Segment) => Segment.toLowerCase())),
		]),
	];
};

/**
 * Remove every lab route's directory from a built site.
 *
 * Answers what it did rather than assuming it worked: `Removed` is what existed
 * and is gone, `Absent` is what was already not there, and `Kept` is true when
 * the build carries the lab on purpose (`LAB=1`), in which case nothing is
 * touched.
 *
 * @param {string} Output
 * @returns {{ Kept: boolean; Removed: string[]; Absent: string[] }}
 */
export const RemoveLabOutput = (Output) => {
	if (Lab) {
		return { Kept: true, Removed: [], Absent: [...LabRoute] };
	}

	const Root = resolve(Output);

	/** @type {string[]} */
	const Removed = [];

	/** @type {string[]} */
	const Absent = [];

	for (const Route of LabRoute) {
		let Existed = false;

		for (const Directory of DirectoriesOf(Root, Route)) {
			// A guard, not a formality: the switch is data, and a route that
			// resolved outside the output tree would delete the source.
			if (!Directory.startsWith(Root + "/")) {
				throw new Error(
					`[LabOutput] Refusing to remove ${Directory}: outside ${Root}.`,
				);
			}

			if (!existsSync(Directory)) continue;

			rmSync(Directory, { recursive: true, force: true });

			Existed = true;
		}

		(Existed ? Removed : Absent).push(Route);
	}

	return { Kept: false, Removed, Absent };
};
