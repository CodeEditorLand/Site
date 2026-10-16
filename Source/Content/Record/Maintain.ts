import type { FieldRecord } from "./FieldRecord";

export const Maintain: FieldRecord = {
	Id: "maintain",

	Category: "Element",

	Title: "MAINTAIN",

	Index: "# MAINTAIN_01",

	Stamp: ["DETERMINISTIC", "BUILD ORCHESTRATOR"],

	Route: ["/PROFILE:DUAL", "CARGO / JSON5 / PLIST"],

	Status: {
		Label: "STATUS",

		Value: "ACTIVE",

		Tone: "specimen",
	},

	Metadata: [
		{ Label: "CONFIG", Value: "RHAI" },

		{ Label: "CARGO", Value: "TYPE-SAFE" },

		{ Label: "PROFILE", Value: "DUAL" },

		{ Label: "OUTPUT", Value: "REPRODUCIBLE" },
	],

	Evidence: {
		Src: "/Evidence/Maintain/Blueprint-01.webp",

		Alt: "Blueprint in high contrast line work",

		Position: "center",
	},

	Seal: "Maintain",
};
