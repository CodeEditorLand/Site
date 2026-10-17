import { writeFileSync } from "node:fs";

import { LinkIndex } from "./Source/Library/LinkIndex";

import { Link } from "./Source/Library/Links";

const Compose = (Spec: any): string =>
	"External" in Spec
		? Spec.External
		: Link(Spec.Repo, Spec.Path) + (Spec.Line ? `#L${Spec.Line}` : "");

const All: Record<string, string> = {};

for (const [Term, Spec] of Object.entries(LinkIndex as any)) {
	All[Term] = Compose(Spec);
}

writeFileSync(
	"/Users/nikola/.hermes/cache/scratch/term_urls.json",
	JSON.stringify(All),
);

console.log("terms:", Object.keys(All).length);

console.log("Land ->", All["Land"]);

console.log("Rest ->", All["Rest"]);

console.log("Current ->", All["Current"]);

console.log("Shell? ->", All["Shell"] ?? "(absent)");

console.log("shell? ->", All["shell"] ?? "(absent)");
