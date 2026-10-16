import type { FieldRecord } from "./FieldRecord";

export const Mist: FieldRecord = {
	Id: "mist",

	Category: "Element",

	Title: "MIST",

	Index: "# MIST_01",

	Stamp: ["LOCAL AUTHORITY", "DNS SANDBOX"],

	Route: ["/ZONE:EDITOR.LAND", "ALLOWLIST FORWARD"],

	Status: {
		Label: "STATUS",

		Value: "ACTIVE",

		Tone: "specimen",
	},

	Metadata: [
		{ Label: "ZONE", Value: "LOOPBACK" },

		{ Label: "SOCKET", Value: "SHARED-SECRET" },

		{ Label: "FORWARD", Value: "ALLOWLIST" },

		{ Label: "DNSSEC", Value: "PLANNED" },
	],

	Evidence: {
		Src: "/Evidence/Mist/Veil-01.webp",

		Alt: "Low fog bank in soft light",

		Position: "center",
	},

	Seal: "Mist",
};
