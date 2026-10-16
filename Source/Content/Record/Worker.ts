import type { FieldRecord } from "./FieldRecord";

export const Worker: FieldRecord = {
	Id: "worker",

	Category: "Element",

	Title: "WORKER",

	Index: "# WORKER_01",

	Stamp: ["SERVICE WORKER", "OFFLINE SHELL"],

	Route: ["/NAVIGATION:FIRST", "CACHE-FIRST ASSETS"],

	Status: {
		Label: "STATUS",

		Value: "ACTIVE",

		Tone: "specimen",
	},

	Metadata: [
		{ Label: "NAVIGATION", Value: "NETWORK-FIRST" },

		{ Label: "ASSETS", Value: "CACHE-FIRST" },

		{ Label: "CSS", Value: "LINK-TAG" },

		{ Label: "VERSION", Value: "AUTO-RELOAD" },
	],

	Evidence: {
		Src: "/Evidence/Worker/Loom-01.webp",

		Alt: "Threads on a loom in macro",

		Position: "center",
	},

	Seal: "Worker",
};