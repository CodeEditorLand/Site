import type { FieldRecord } from "./FieldRecord";

export const SideCar: FieldRecord = {
	Id: "sidecar",

	Category: "Element",

	Title: "SIDECAR",

	Index: "# SIDECAR_01",

	Stamp: ["PREBUILT BINARY", "PER TARGET TRIPLE"],

	Route: ["/SOURCE:NODEJS.ORG", "CHECKSUM VERIFIED"],

	Status: {
		Label: "STATUS",

		Value: "ACTIVE",

		Tone: "specimen",
	},

	Metadata: [
		{ Label: "SELECT", Value: "COMPILE-TIME" },

		{ Label: "CHECKSUM", Value: "SHA-256" },

		{ Label: "HOST", Value: "COCOON" },

		{ Label: "CACHE", Value: "INCREMENTAL" },
	],

	Evidence: {
		Src: "/Evidence/SideCar/Track-01.webp",

		Alt: "Rail track in low light",

		Position: "center",
	},

	Seal: "SideCar",
};