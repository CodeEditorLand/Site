/**
 * Lab - the build step that keeps the exploratory surfaces out of production.
 *
 * `Function/Configuration/Lab.mjs` decides whether this build carries the lab;
 * `Maintain/Script/RemoveLabRoutes.mjs` removes the emitted directories; this
 * file is only the wiring, and it is deliberately small. The interesting
 * decisions - which routes are lab routes, and what "development" means - are in
 * those two files, so a reader who wants to change the behaviour changes one of
 * them and not this one.
 *
 * ─── WHY THIS HOOK, AND WHY IT IS REGISTERED FIRST ────────────────────────
 * `astro:build:done` fires once the site is written to `Target/`, and the hooks
 * of every integration run in the order they are registered. Three integrations
 * that come after this one read the output directory:
 *
 *   - `@astrojs/sitemap` walks the emitted pages to write the sitemap;
 *   - `Route/Integration.ts` scans them for `RouteMap.json`, the service
 *     worker's route table and the Cloudflare `_redirects`;
 *   - `@playform/compress` / `@playform/inline` rewrite what remains.
 *
 * So this hook has to run before them: removing the directory first is what makes
 * the route absent from the sitemap, the redirect table and the worker, rather
 * than merely missing from the host's file tree while three generated files still
 * name it. `astro.config.ts` registers it first for exactly that reason.
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
