/**
 * Config - the two content collections, defined once.
 *
 * `Source/content.config.ts` is the file Astro loads (the framework reads it by
 * name, not by import), and it is now a re-export of this module. Before that it
 * carried a second, subtly different copy of both collections: the same two
 * `glob` loaders, the same two schemas, and one difference that mattered - the
 * live copy set `generateId` so a blog entry's id is its filename, while this one
 * did not. Two definitions of one collection is the drift this programme exists
 * to end, and the fix is not to delete either file: one owns the definition, the
 * other owns the framework's entry point.
 *
 * The rule the schemas encode:
 *
 * - **Blog** - `title`, `summary`, `publishedAt`, `tags`, `author`, `readTime`.
 *   Every field is required: a blog row prints all six, so an entry missing one
 *   would print a blank cell the archive has no shape for.
 * - **Doc** - `title`, `section`, `order`, `description`, and two optional
 *   fields the sidebar uses: `navTitle` (a short label, e.g. "User Dotfile" for
 *   "Filesystem Footprint - User Dotfile") and `group` (a mid-level heading, so
 *   the seven `Filesystem Footprint - *` pages nest under one entry).
 *
 * `generateId` is the one function here, and it is the one that cannot move: it
 * strips `.md`, so `/Blog/BuildSystemDesign` is the slug the page was written
 * with and not a lower-cased re-derivation of it.
 */
import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

/** A blog entry's id is its filename without the extension. */
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
		// Short label shown in the sidebar instead of the full title
		// (e.g. "User Dotfile" instead of "Filesystem Footprint - User Dotfile").
		navTitle: z.string().optional(),
		// Mid-level sidebar heading nesting entries within the same section
		// (e.g. every "Filesystem Footprint - *" page shares group "Filesystem Footprint").
		group: z.string().optional(),
	}),
});

export const collections = { blog: Blog, doc: Doc };
