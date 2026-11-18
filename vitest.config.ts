import { resolve } from "node:path";

import { getViteConfig } from "astro/config";

/**
 * One config, two kinds of test.
 *
 * `getViteConfig` loads `astro.config.ts` itself, so the Astro compiler and the
 * `@astrojs/react` integration are both present: a `.tsx` test renders React the
 * way it always did, and a test that imports an `.astro` component gets the
 * compiled component instead of a parse error. The React plugin is not listed
 * separately because the integration already installs it.
 */
export default getViteConfig({
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./Source/Test/Setup.ts"],
		include: ["Source/**/*.test.{ts,tsx}"],
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./Source"),
			"@Function": resolve(__dirname, "./Source/Function"),
			"@Variable": resolve(__dirname, "./Source/Variable"),
			"@Library": resolve(__dirname, "./Source/Library"),
		},
	},
});
