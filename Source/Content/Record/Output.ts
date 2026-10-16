import type { FieldRecord } from "./FieldRecord";

export const Output: FieldRecord = {
	Id: "output",

	Category: "Element",

	Title: "OUTPUT",

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