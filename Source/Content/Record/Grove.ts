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
		 * `STABILIZING` is not one of the eight status words (`READY`, `ACTIVE`,
		 * `LOADING`, `PREPARING`, `VERIFIED`, `UNAVAILABLE`, `INTERRUPTED`,
		 * `ARCHIVED`), so a printer that asked the state table for its tone
		 * would fall back to ink and no reader could compare Grove with the
		 * other fourteen elements. It is a phase, which is a declaration, so it
		 * prints as one - exactly the way the portal's tiers state
		 * `STATUS: PREPARING` and print `PLAN: PLANNED` beneath it.
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
