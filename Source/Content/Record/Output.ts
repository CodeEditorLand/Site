import type { FieldRecord } from "./FieldRecord";

import { ElementRepos } from "../../Library/Links";

export const Output: FieldRecord = {
	Id: "output",

	Category: "Element",

	Title: "OUTPUT",

	Href: ElementRepos.Output.Base,

	Index: "# OUTPUT_01",

	Stamp: ["ESBUILD PRIMARY", "REST SELECTABLE"],

	Route: ["/PIPELINE:PLUGIN", "NODE POLYFILLS"],

	Status: {
		Label: "STATUS",

		Value: "ACTIVE",

		Tone: "specimen",
	},

	Metadata: [
		{ Label: "ENGINE", Value: "DUAL" },

		{ Label: "PLUGIN", Value: "ROUTED" },

		{ Label: "ARTIFACT", Value: "SHARED" },

		{ Label: "BUILD", Value: "DETERMINISTIC" },
	],

	Evidence: {
		Src: "/Evidence/Output/Forge-01.webp",

		Alt: "Forged metal surface in macro",

		Position: "center",
	},

	Seal: "Output",
};
