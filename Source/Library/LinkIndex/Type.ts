/**
 * The per-URL fragment shape (Phase 3d split): every generated file under
 * this directory (one per unique composed URL, nested by repo family)
 * exports a single LinkIndexData object. The aggregator merges ONLY the
 * terms maps into LinkIndex and exposes pages/tags as LinkIndexMeta.
 */
import type { LinkSpec } from "../Links";

/** One granular per-URL fragment: the composed URL, audit metadata, and every term resolving to it. */
export interface LinkIndexData {
	/** The composed URL every term in this fragment resolves to. */
	url: string;

	/** .md basenames (no extension) where this URL is linked, from LINK-CONTEXT-REVIEW.md. */
	pages: string[];

	/** [repo family, kind (file|symbol|api|external), review verdict (keep|change|remove)?]. */
	tags: string[];

	/** Every term resolving to this URL, as a composed spec. */
	terms: Readonly<Record<string, LinkSpec>>;
}
