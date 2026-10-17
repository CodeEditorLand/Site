/**
 * The runtime link index for the markdown pass - the full term -> URL map,
 * split (Phase 3d) into one granular file per unique composed URL under
 * ./LinkIndex/, NESTED by repo family and keyed by a deterministic slug of
 * the final URL. Each fragment exports LinkIndexData { url, pages, tags,
 * terms }; this module merges ONLY the terms maps back into LinkIndex and
 * exposes the audit metadata as LinkIndexMeta.
 *
 * Every entry is a COMPOSED SPEC, never a URL literal:
 *   { Repo: <repo from Links.ts>, Path: "...", Line: N }  (repo deep-link)
 *   { External: "https://..." }                           (literal canonical home)
 * The matcher (LinkMatcher.ts) precomposes each spec into its URL string
 * ONCE at module load; renders never touch a hardcoded URL.
 *
 * THIS MODULE IS A THIN AGGREGATOR ONLY: import.meta.glob (eager) over the
 * nested per-URL fragments (one directory deep under ./LinkIndex/) merges
 * the per-URL terms maps (the curated registry maps
 * MentionMap/TechnicalMentions/Protected from ./LinkIndex/Mentions.ts
 * and the per-page overrides LinkIndexOverrides from ./LinkIndex/Overrides.ts
 * are re-exported unchanged). A correction edits one tiny URL file, never
 * this aggregator.
 */
import type { LinkSpec } from "./Links";

import type { LinkIndexData } from "./LinkIndex/Type";

export { LinkIndexOverrides } from "./LinkIndex/Overrides";

export { MentionMap, Protected, TechnicalMentions } from "./LinkIndex/Mentions";

const UrlModules = import.meta.glob("./LinkIndex/*/*.ts", {
	eager: true,
}) as Record<string, { LinkIndexData: LinkIndexData }>;

const Merged: Record<string, LinkSpec> = {};

const Meta: Record<string, { pages: string[]; tags: string[] }> = {};

for (const Module of Object.values(UrlModules)) {
	Object.assign(Merged, Module.LinkIndexData.terms);

	Meta[Module.LinkIndexData.url] = {
		pages: Module.LinkIndexData.pages,

		tags: Module.LinkIndexData.tags,
	};
}

/**
 * The full runtime index: every resolved term the markdown pass can link,
 * merged from the per-URL fragments (including the curated registry maps as
 * External specs, exactly as the pre-split index spread them).
 */
export const LinkIndex: Readonly<Record<string, LinkSpec>> = Merged;

/**
 * Per-URL audit metadata (pages where the URL is linked + tags), for
 * tooling that needs the review context without re-parsing fragments.
 */
export const LinkIndexMeta: Readonly<
	Record<string, { pages: string[]; tags: string[] }>
> = Meta;
