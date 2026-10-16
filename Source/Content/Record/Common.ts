import type { FieldRecord } from "./FieldRecord";

export const Common: FieldRecord = {
	Id: "common",

	Category: "Element",

	Title: "COMMON",

	Index: "# COMMON_01",

	Stamp: ["PURE ABSTRACT", "CONTRACT CRATE"],

	Route: ["/TRANSPORT:ANY", "GRPC / IPC / WASM / MIST"],

	Status: {
		Label: "STATUS",

		Value: "ACTIVE",

		Tone: "specimen",
	},

	Metadata: [
		{ Label: "CONTRACT", Value: "PURE" },

		{ Label: "TRAIT", Value: "ASYNC" },

		{ Label: "EFFECT", Value: "DECLARATIVE" },

		{ Label: "TRANSPORT", Value: "AGNOSTIC" },
	],

	Evidence: {
		Src: "/Evidence/Common/Lexicon-01.webp",

		Alt: "Shared vocabulary across service boundaries",

		Position: "center",
	},

	Seal: "Common",
};
