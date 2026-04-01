export const __INCREMENT__ = `${(await import("./Source/Function/Configuration/Environment.js")).default}-${(await import("ulid")).ulid()}`;

const On = (await import("./Source/Function/Configuration/On.js")).default;
const Sourcemap = (await import("./Source/Function/Configuration/Sourcemap.js"))
	.default;
const { resolve: Resolve } = await import("node:path");

export default (await import("astro/config")).defineConfig({
	srcDir: "./Source",

	publicDir: "./Public",

	outDir: "./Target",

	site: (await import("./Source/Function/Configuration/Site.js")).default,

	compressHTML: (
		await import("./Source/Function/Configuration/CompressHTML.js")
	).default,

	devToolbar: {
		enabled: (await import("./Source/Function/Configuration/DevToolbar.js"))
			.default,
	},

	prefetch: {
		defaultStrategy: (
			await import("./Source/Function/Configuration/PrefetchStrategy.js")
		).default,

		prefetchAll: (
			await import("./Source/Function/Configuration/PrefetchAll.js")
		).default,
	},

	server: {
		port: (await import("./Source/Function/Configuration/Port.js")).default,

		// Strict port prevents Vite from auto-selecting a different port
		// when 9999 is occupied — avoids Auth0 callback URL mismatches
		strictPort: true,
	},

	build: {
		concurrency: (
			await import("./Source/Function/Configuration/BuildConcurrency.js")
		).default,
	},

	integrations: [
		(await import("@astrojs/react")).default({
			// @ts-ignore
			devtools: On,
		}),

		// @ts-ignore
		...((await import("./Source/Function/Configuration/ServiceWorker.js"))
			.default
			? [(await import("astrojs-service-worker")).default()]
			: []),

		(await import("@astrojs/sitemap")).default(),

		...((await import("./Source/Function/Configuration/InlineCSS.js"))
			.default
			? [
					(await import("@playform/inline")).default({
						Logger: 1,
						Beasties: {
							pruneSource: false,
						},
					}),
				]
			: []),

		...((await import("./Source/Function/Configuration/Compress.js"))
			.default
			? [
					(await import("@playform/compress")).default({
						Logger: 1,
						HTML: {
							"html-minifier-terser": {
								minifyCSS: false,
							},
						},
						CSS: {
							csso: false,
						},
					}),
				]
			: []),
	],

	experimental: {
		clientPrerender: (
			await import("./Source/Function/Configuration/ClientPrerender.js")
		).default,

		contentIntellisense: (
			await import("./Source/Function/Configuration/ContentIntellisense.js")
		).default,
	},

	vite: {
		build: {
			sourcemap: Sourcemap,

			manifest: (
				await import("./Source/Function/Configuration/Manifest.js")
			).default,

			minify: (await import("./Source/Function/Configuration/Minify.js"))
				.default,

			cssMinify: (
				await import("./Source/Function/Configuration/CSSMinify.js")
			).default,

			terserOptions: On
				? {
						compress: false,

						ecma: 2020,

						enclose: false,

						format: {
							ascii_only: false,

							braces: false,

							comments: false,

							ie8: false,

							indent_level: 4,

							indent_start: 0,

							inline_script: false,

							keep_numbers: true,

							keep_quoted_props: true,

							max_line_len: 80,

							preamble: "",

							ecma: 5,

							preserve_annotations: true,

							quote_keys: false,

							quote_style: 3,

							safari10: true,

							semicolons: true,

							shebang: false,

							shorthand: false,

							webkit: true,

							wrap_func_args: true,

							wrap_iife: true,
						},

						sourceMap: true,

						ie8: true,

						keep_classnames: true,

						keep_fnames: true,

						mangle: false,

						module: true,

						toplevel: true,
					}
				: {},
		},

		resolve: {
			alias: {
				"@": Resolve("./Source"),
				"@Stylesheet": Resolve("./Source/Stylesheet"),
				"@Function": Resolve("./Source/Function"),
				"@Layout": Resolve("./Source/Layout"),
				"@Script": Resolve("./Source/Script"),
				"@Variable": Resolve("./Source/Variable"),
			},

			preserveSymlinks: (
				await import("./Source/Function/Configuration/PreserveSymlinks.js")
			).default,
		},

		css: {
			devSourcemap: Sourcemap,

			transformer: (
				await import("./Source/Function/Configuration/CSSTransformer.js")
			).default,
		},

		plugins: [
			{
				name: "CrossOrigin",

				transform(Code, Identifier, _) {
					const CrossOrigin =
						Identifier.includes(".mjs") ||
						Identifier.includes(".js") ||
						Identifier.includes(".astro")
							? `crossorigin=\\"anonymous\\"`
							: 'crossorigin="anonymous"';

					return Code.replace(/<script/g, `<script ${CrossOrigin}`)
						.replace(
							/<link[^>]*(?=.*rel="preload")(?=.*href="[^"]*\.js")(?=.*as="script")[^>]*/g,

							`$& ${CrossOrigin}`,
						)
						.replace(
							/<link[^>]*(?=.*rel="preload")(?=.*as="font")[^>]*/g,

							`$& ${CrossOrigin}`,
						)
						.replace(
							/<link[^>]*(?=.*rel="stylesheet")(?=.*href="https?:\/\/[^"]*")[^>]*/g,

							`$& ${CrossOrigin}`,
						);
				},
			},
		],
	},
});
