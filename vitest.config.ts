import { resolve } from "node:path";

import React from "@vitejs/plugin-react";

import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [React()],
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
