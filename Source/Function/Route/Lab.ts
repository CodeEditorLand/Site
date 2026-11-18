/**
 * Lab - the build step that keeps the exploratory surfaces out of production.
 *
 * `Function/Configuration/Lab.mjs` decides whether this build carries the lab;
 * `Function/Route/LabOutput.mjs` removes the emitted directories (and
 * `Maintain/Script/RemoveLabRoutes.mjs` is the same removal from the command
 * line); this file is only the wiring, and it is deliberately small. The
 * interesting decisions - which routes are lab routes, and what "development"
 * means - are in the first of those, so a reader who wants to change the
 * behaviour changes it and not this file.
 *
 * ─── WHY THIS HOOK, AND WHY IT IS REGISTERED FIRST ────────────────────────
 * `astro:build:done` fires once the site is written to `Target/`, and the hooks
 * of every integration run in the order they are registered. `Route/Integration.ts`
 * scans that directory in its own `astro:build:done` to build `RouteMap.json`, the
 * service worker's route table and the Cloudflare `_redirects` - so the lab's
 * directories have to be gone before it runs, or a removed route leaves a
 * `301 /specimen → /Specimen` rule pointing at a page that is no longer there.
 *
 * The sitemap is a different case: `@astrojs/sitemap` writes its list from the
 * `pages` array Astro hands the hook rather than from a directory scan, so
 * deleting the directory cannot keep a route out of it. `astro.config.ts` filters
 * it with the same predicate (`Served`), and the two together are why a lab route
 * appears in neither the host's file tree nor its sitemap.
 *
 * Nothing here touches development: `astro:build:done` does not fire on a dev
 * server, so `dum Run` serves the lab exactly as it did before this file existed.
 */
import type { AstroIntegration } from "astro";

// Pre-imported while Vite is alive: `astro:build:done` fires after the module
// runner is closed, so a dynamic import of a local module inside the hook fails
// with "module runner has been closed" - the same constraint `Route/Integration.ts`
// records for its own imports.
const { LabRoute } = await import("../Configuration/Lab.mjs");

const { RemoveLabOutput } = await import("./LabOutput.mjs");

const { fileURLToPath: FileURLToPath } = await import("node:url");

/**
 * The integration.
 *
 * It reports what it did in both directions, because a build that quietly keeps a
 * lab route and a build that quietly removes one are equally hard to audit from
 * the terminal.
 */
const LabIntegration = (): AstroIntegration => ({
	name: "Lab",

	hooks: {
		"astro:build:done": ({ dir, logger }) => {
			const { Kept, Removed, Absent } = RemoveLabOutput(
				FileURLToPath(dir),
			);

			if (Kept) {
				logger.warn(
					`The lab is on (LAB=1): ${LabRoute.join(", ")} stays in this build.`,
				);

				return;
			}

			logger.info(
				Removed.length > 0
					? `Removed the lab from the build: ${Removed.join(", ")}.`
					: `No lab route in the output (${Absent.join(", ")} already absent).`,
			);
		},
	},
});

export default LabIntegration;
