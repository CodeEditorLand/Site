const RE = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i;

export default function remarkCallout() {
	return (tree: { type: string; children?: object[] }) => {
		Walk(tree);
	};
}

function Walk(Node: { type: string; children?: object[] }) {
	if (!Node.children) return;

	for (const Child of Node.children) {
		const C = Child as { type: string; children?: object[] };

		if (C.type === "blockquote") Transform(C as Blockquote);

		Walk(C);
	}
}

interface Blockquote {
	type: string;

	children: Paragraph[];

	data?: object;
}

interface Paragraph {
	type: string;

	children?: Text[];

	data?: object;
}

interface Text {
	type: string;

	value: string;
}

function Transform(Node: Blockquote) {
	const First = Node.children[0];

	if (!First || First.type !== "paragraph") return;

	const FirstText = First.children?.[0];

	if (!FirstText || FirstText.type !== "text") return;

	const Match = FirstText.value.match(RE);

	if (!Match) return;

	const Type = Match[1].toLowerCase();

	const Label = Type.charAt(0).toUpperCase() + Type.slice(1);

	FirstText.value = FirstText.value.slice(Match[0].length).trimStart();

	const Body =
		FirstText.value === "" && First.children?.length === 1
			? Node.children.slice(1)
			: Node.children;

	Node.data = {
		hName: "div",

		hProperties: { class: `markdown-alert markdown-alert-${Type}` },
	};

	Node.children = [
		{
			type: "paragraph",

			data: {
				hName: "p",

				hProperties: { class: "markdown-alert-title" },
			},

			children: [{ type: "text", value: Label }],
		} as Paragraph,
		...Body,
	];
}
