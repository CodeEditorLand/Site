const { z } = await import("zod");

export default z.object({
	Site: z.string().url(),
	Port: z.number().int().min(1).max(65535),
	CompressHTML: z.boolean(),
	DevToolbar: z.boolean(),
	PrefetchStrategy: (await import("./Schema/Prefetch.js")).default,
	PrefetchAll: z.boolean(),
	BuildConcurrency: z.number().int().min(1),
	Sourcemap: z.boolean(),
	Manifest: z.boolean(),
	Minify: (await import("./Schema/Minification.js")).default,
	CSSMinify: (await import("./Schema/CSSMinification.js")).default,
	ClientPrerender: z.boolean(),
	ContentIntellisense: z.boolean(),
	CSSTransformer: (await import("./Schema/CSSTransformation.js")).default,
	PreserveSymlinks: z.boolean(),
	ServiceWorker: z.boolean(),
	InlineCSS: z.boolean(),
	Compress: z.boolean(),
});
