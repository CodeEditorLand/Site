import { resolve } from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
	esbuild: {
		jsx: "automatic",
		jsxImportSource: "react",
	},
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
		},
	},
});
