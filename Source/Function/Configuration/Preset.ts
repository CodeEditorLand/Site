import type { default as Configuration } from "./Type/Configuration.js";

export default {
	Site: "https://land.playform.cloud",
	Port: 9999,
	CompressHTML: true,
	DevToolbar: false,
	PrefetchStrategy: "hover",
	PrefetchAll: true,
	BuildConcurrency: 9999,
	Sourcemap: false,
	Manifest: true,
	Minify: "terser",
	CSSMinify: "esbuild",
	ClientPrerender: true,
	ContentIntellisense: true,
	CSSTransformer: "postcss",
	PreserveSymlinks: false,
	ServiceWorker: true,
	InlineCSS: true,
	Compress: true,
} satisfies Configuration as Configuration;
