import type { FieldRecord } from "./FieldRecord";

import { ElementRepos } from "../../Library/Links";

export const Vine: FieldRecord = {
	Id: "vine",

	Category: "Element",

	Title: "VINE",

	Href: ElementRepos.Vine.Base,

	Index: "# VINE_01",

	Stamp: ["GRPC BACKBONE", "CONTRACT-FIRST"],

	Route: ["/PROTO:VINE.PROTO", "TONIC / PROST"],

	Status: {
		Label: "STATUS",

		Value: "ACTIVE",

		Tone: "specimen",
	},

	Metadata: [
		{ Label: "PROTO", Value: "CANONICAL" },

		{ Label: "BIND", Value: "TYPE-SAFE" },

		{ Label: "MIRROR", Value: "TYPESCRIPT" },

		{ Label: "MULTIPLEX", Value: "EXPANDING" },
	],

	Evidence: {
		Src: "/Evidence/Vine/Trellis-01.webp",

		Alt: "Trellis lattice in soft focus",

		Position: "center",
	},

	Seal: "Vine",
};
