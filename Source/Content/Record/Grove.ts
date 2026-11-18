import type { FieldRecord } from "./FieldRecord";

import { ElementRepos } from "../../Library/Links";

export const Grove: FieldRecord = {
	Id: "grove",

	Category: "Element",

	Title: "GROVE",

	Href: ElementRepos.Grove.Base,

	Index: "# GROVE_01",

	Stamp: ["WASM SANDBOX", "CAPABILITY HOST"],

	Route: ["/NODE:GROVE", "WASM RUNTIME"],

	Status: {
		Label: "STATUS",

		Value: "ACTIVE",

		Tone: "ink",
	},

	Metadata: [
		{ Label: "NODE", Value: "ACTIVE" },

		{ Label: "BRANCH", Value: "WASM" },

		{ Label: "SYNC", Value: "ASYNC" },

		{ Label: "DENSITY", Value: "LOW" },

		/*
		 * `STABILIZING` was this record's status word, and it is not one of the
		 * eight (`ACTIVE`, `PREPARING`, `LOADING`, `READY`, `VERIFIED`,
		 * `INTERRUPTED`, `UNAVAILABLE`, `ARCHIVED`), so every printer that asked
		 * the state table for its tone fell back to ink and no reader could
		 * compare Grove with the other fourteen elements. The word is not lost:
		 * it is a phase, which is a declaration, so it prints as one - exactly
		 * the way the portal's tiers state `STATUS: PREPARING` and print
		 * `PLAN: PLANNED` beneath it.
		 */
		{ Label: "PHASE", Value: "STABILIZING" },
	],

	Evidence: {
		Src: "/Evidence/Grove/RootNetwork-01.webp",

		Alt: "Root network in macro detail",

		Position: "center",
	},

	Seal: "Grove",
};
