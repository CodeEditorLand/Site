/**
 * content.config.ts - the entry point Astro loads.
 *
 * Astro resolves this file by name, so nothing in `Source/` imports it: it is the
 * framework's door, not a module. The collections themselves are defined in
 * `Content/Config.ts`, which carried an unused second copy of both until this
 * file started re-exporting it. Two definitions of one collection is a second
 * place for a schema to drift, and the drift was real - this file set
 * `generateId` (a blog entry's id is its filename) and the other did not.
 *
 * One definition, one door.
 */
export { collections } from "./Content/Config.js";
