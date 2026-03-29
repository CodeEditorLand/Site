import { z } from "zod";

export const Environment = z.enum(["Production", "Preview", "Development"]);

export const Prefetch = z.enum(["hover", "tap", "viewport", "load"]);

export const Minification = z.union([
	z.enum(["terser", "esbuild"]),
	z.literal(false),
]);

export const CSSMinification = z.union([
	z.enum(["esbuild", "lightningcss"]),
	z.literal(false),
]);

export const CSSTransformation = z.enum(["postcss", "lightningcss"]);

const Schema = z.object({
	Site: z.string().url(),
	Port: z.number().int().min(1).max(65535),
	CompressHTML: z.boolean(),
	DevToolbar: z.boolean(),
	PrefetchStrategy: Prefetch,
	PrefetchAll: z.boolean(),
	BuildConcurrency: z.number().int().min(1),
	Sourcemap: z.boolean(),
	Manifest: z.boolean(),
	Minify: Minification,
	CSSMinify: CSSMinification,
	ClientPrerender: z.boolean(),
	ContentIntellisense: z.boolean(),
	CSSTransformer: CSSTransformation,
	PreserveSymlinks: z.boolean(),
	ServiceWorker: z.boolean(),
	InlineCSS: z.boolean(),
	Compress: z.boolean(),
});

export type Configuration = z.infer<typeof Schema>;

export default Schema;
