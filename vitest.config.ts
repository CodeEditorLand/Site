export default (await import("vitest/config")).defineConfig({
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
			"@": (await import("path")).default.resolve(__dirname, "./Source"),
		},
	},
});
