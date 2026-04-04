import { defineCollection, z } from "astro:content";

const Blog = defineCollection({
	type: "content",
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
	type: "content",
	schema: z.object({
		title: z.string(),
		section: z.string(),
		order: z.number(),
		description: z.string(),
	}),
});

export const collections = { blog: Blog, doc: Doc };
