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

		Value: "STABILIZING",

		Tone: "ink",
	},

	Metadata: [
		{ Label: "NODE", Value: "ACTIVE" },

		{ Label: "BRANCH", Value: "WASM" },

		{ Label: "SYNC", Value: "ASYNC" },

		{ Label: "DENSITY", Value: "LOW" },
	],

	Evidence: {
		Src: "/Evidence/Grove/RootNetwork-01.webp",

		Alt: "Root network in macro detail",

		Position: "center",
	},

	Seal: "Grove",
};
