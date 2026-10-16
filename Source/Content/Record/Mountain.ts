import type { FieldRecord } from "./FieldRecord";

import { ElementRepos } from "../../Library/Links";

export const Mountain: FieldRecord = {
	Id: "mountain",

	Category: "Element",

	Title: "MOUNTAIN",

	Href: ElementRepos.Mountain.Base,

	Index: "# MOUNTAIN_01",

	Stamp: ["NATIVE BACKEND", "RUST + TAURI"],

	Route: ["/HOST:MOUNTAIN", "RUST SERVICES"],

	Status: {
		Label: "STATUS",

		Value: "ACTIVE",

		Tone: "specimen",
	},

	Metadata: [
		{ Label: "ROLE", Value: "FOUNDATION" },

		{ Label: "BOUNDARY", Value: "SYSTEM" },

		{ Label: "LOAD", Value: "HEAVY" },

		{ Label: "PHASE", Value: "CORE" },
	],

	Evidence: {
		Src: "/Evidence/Mountain/StoneTrace-01.webp",

		Alt: "Stone strata in low light",

		Position: "center",
	},

	Seal: "Mountain",
};
