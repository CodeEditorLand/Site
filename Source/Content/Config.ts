import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const Blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "Source/Content/blog" }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		publishedAt: z.string(),
		tags: z.array(z.string()),
		author: z.string(),
		readTime: z.number(),
	}),
});

const Doc = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "Source/Content/doc" }),
	schema: z.object({
		title: z.string(),
		section: z.string(),
		order: z.number(),
		description: z.string(),
		// Short label shown in the sidebar instead of the full title
		// (e.g. "User Dotfile" instead of "Filesystem Footprint - User Dotfile").
		navTitle: z.string().optional(),
		// Mid-level sidebar heading nesting entries within the same section
		// (e.g. every "Filesystem Footprint - *" page shares group "Filesystem Footprint").
		group: z.string().optional(),
	}),
});

export const collections = { blog: Blog, doc: Doc };
