import { resolve } from "node:path";

import { defineConfig } from "astro/config";

import BuildConcurrency from "./Source/Function/Configuration/BuildConcurrency";
import ClientPrerender from "./Source/Function/Configuration/ClientPrerender";
import Compress from "./Source/Function/Configuration/Compress";
import CompressHTML from "./Source/Function/Configuration/CompressHTML";
import ContentIntellisense from "./Source/Function/Configuration/ContentIntellisense";
import CSSMinify from "./Source/Function/Configuration/CSSMinify";
import CSSTransformer from "./Source/Function/Configuration/CSSTransformer";
import DevToolbar from "./Source/Function/Configuration/DevToolbar";
import Environment from "./Source/Function/Configuration/Environment";
import InlineCSS from "./Source/Function/Configuration/InlineCSS";
import Manifest from "./Source/Function/Configuration/Manifest";
import Minify from "./Source/Function/Configuration/Minify";
import On from "./Source/Function/Configuration/On";
import Port from "./Source/Function/Configuration/Port";
import PrefetchAll from "./Source/Function/Configuration/PrefetchAll";
import PrefetchStrategy from "./Source/Function/Configuration/PrefetchStrategy";
import PreserveSymlinks from "./Source/Function/Configuration/PreserveSymlinks";
import ServiceWorker from "./Source/Function/Configuration/ServiceWorker";
import Site from "./Source/Function/Configuration/Site";
import Sourcemap from "./Source/Function/Configuration/Sourcemap";

export const __INCREMENT__ = `${Environment}-${(await import("ulid")).ulid()}`;

export default defineConfig({
	srcDir: "./Source",

	publicDir: "./Public",

	outDir: "./Target",

	site: Site,

	compressHTML: CompressHTML,

	devToolbar: {
		enabled: DevToolbar,
	},

	prefetch: {
		defaultStrategy: PrefetchStrategy,

		prefetchAll: PrefetchAll,
	},

	server: {
		port: Port,
	},

	build: {
		concurrency: BuildConcurrency,
	},

	integrations: [
		(await import("@astrojs/react")).default({
			// @ts-ignore
			devtools: On,
		}),

		// @ts-ignore
		ServiceWorker
			? (await import("astrojs-service-worker")).default()
			: null,

		(await import("@astrojs/sitemap")).default(),

		InlineCSS
			? (await import("@playform/inline")).default({
					Logger: 1,
					Beasties: {
						pruneSource: false,
					},
				})
			: null,

		Compress
			? (await import("@playform/compress")).default({
					Logger: 1,
					HTML: {
						"html-minifier-terser": {
							minifyCSS: false,
						},
					},
					CSS: {
						csso: false,
					},
				})
			: null,
	],

	experimental: {
		clientPrerender: ClientPrerender,

		contentIntellisense: ContentIntellisense,
	},

	vite: {
		build: {
			sourcemap: Sourcemap,

			manifest: Manifest,

			minify: Minify,

			cssMinify: CSSMinify,

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
				"@": resolve("./Source"),
				"@Stylesheet": resolve("./Source/Stylesheet"),
				"@Function": resolve("./Source/Function"),
				"@Layout": resolve("./Source/Layout"),
				"@Script": resolve("./Source/Script"),
				"@Variable": resolve("./Source/Variable"),
			},

			preserveSymlinks: PreserveSymlinks,
		},

		css: {
			devSourcemap: Sourcemap,

			transformer: CSSTransformer,
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
