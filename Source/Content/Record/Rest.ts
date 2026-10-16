import type { FieldRecord } from "./FieldRecord";

import { ElementRepos } from "../../Library/Links";

export const Rest: FieldRecord = {
	Id: "rest",

	Category: "Element",

	Title: "REST",

	Href: ElementRepos.Rest.Base,

	Index: "# REST_01",

	Stamp: ["OXC PIPELINE", "RUST-NATIVE"],

	Route: ["/COMPILE:OXC", "PARALLEL CORES"],

	Status: {
		Label: "STATUS",

		Value: "ACTIVE",

		Tone: "specimen",
	},

	Metadata: [
		{ Label: "ENGINE", Value: "OXC" },

		{ Label: "HOT-PATH", Value: "NO-NODE" },

		{ Label: "SYNTAX", Value: "DECORATORS+JSX" },

		{ Label: "CORES", Value: "PARALLEL" },
	],

	Evidence: {
		Src: "/Evidence/Rest/Parallel-01.webp",

		Alt: "Parallel tool paths in macro",

		Position: "center",
	},

	Seal: "Rest",
};
