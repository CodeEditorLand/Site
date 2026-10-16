import type { FieldRecord } from "./FieldRecord";

import { ElementRepos } from "../../Library/Links";

export const Cocoon: FieldRecord = {
	Id: "cocoon",

	Category: "Element",

	Title: "COCOON",

	Href: ElementRepos.Cocoon.Base,

	Index: "# COCOON_01",

	Stamp: ["EXTENSION HOST", "DUAL-TRACK"],

	Route: ["/HOST:COCOON", "EFFECT-TS"],

	Status: {
		Label: "STATUS",

		Value: "ACTIVE",

		Tone: "specimen",
	},

	Metadata: [
		{ Label: "ROLE", Value: "SHELL" },

		{ Label: "STATE", Value: "RUNNING" },

		{ Label: "COMPAT", Value: "VS CODE" },

		{ Label: "TRACKS", Value: "A + B" },
	],

	Evidence: {
		Src: "/Evidence/Cocoon/FiberShell-01.webp",

		Alt: "Woven fiber in macro detail",

		Position: "center",
	},

	Seal: "Cocoon",
};
