import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const PreserveFileName = ({ entry }: { entry: string }): string =>
	entry.replace(/\.md$/, "");

const Blog = defineCollection({
	loader: glob({
		pattern: "**/*.md",
		base: "Source/Content/blog",
		generateId: PreserveFileName,
	}),
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
	}),
});

export const collections = { blog: Blog, doc: Doc };
