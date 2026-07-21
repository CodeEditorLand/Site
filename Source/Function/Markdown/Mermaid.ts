import { readFileSync, existsSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

/**
 * Remark plugin that replaces ```mermaid code blocks with inline SVG
 * pre-rendered into Source/Content/Mermaid/<hash>.svg.
 *
 * The SVGs are vendored inside this repo (not read from a sibling
 * directory) so a standalone clone/deploy of WebSite renders diagrams
 * without depending on anything outside this repository. Regenerate them
 * with `.hermes/scripts/extract-mermaid.py` in the monorepo checkout, then
 * copy the referenced hashes into Source/Content/Mermaid/.
 */
export default function remarkMermaid() {
	const SvgDir = resolve(process.cwd(), "Source/Content/Mermaid");

	let AvailableHashes: Set<string> | null = null;

	function LoadAvailableHashes() {
		if (AvailableHashes) return;

		if (!existsSync(SvgDir)) {
			process.stderr.write(
				`[remarkMermaid] SVG directory not found at ${SvgDir}\n`,
			);
			AvailableHashes = new Set();
			return;
		}

		AvailableHashes = new Set(
			readdirSync(SvgDir)
				.filter((File) => File.endsWith(".svg"))
				.map((File) => File.slice(0, -4)),
		);

		process.stderr.write(
			`[remarkMermaid] Found ${AvailableHashes.size} pre-rendered diagrams in ${SvgDir}\n`,
		);
	}

	return (Tree: { type: string; children?: any[] }) => {
		LoadAvailableHashes();
		if (!AvailableHashes || AvailableHashes.size === 0) return;
		Walk(Tree, AvailableHashes, SvgDir);
	};
}

function Walk(
	Node: { type: string; children?: any[]; [key: string]: any },
	AvailableHashes: Set<string>,
	SvgDir: string,
) {
	if (!Node.children) return;

	for (let I = 0; I < Node.children.length; I++) {
		const Child = Node.children[I];

		if (Child.type === "code" && Child.lang === "mermaid") {
			const Svg = RenderMermaidBlock(Child, AvailableHashes, SvgDir);
			if (Svg) {
				Node.children[I] = Svg;
			}
		}

		Walk(Child, AvailableHashes, SvgDir);
	}
}

function RenderMermaidBlock(
	Node: { value?: string; [key: string]: any },
	AvailableHashes: Set<string>,
	SvgDir: string,
): any | null {
	const Code = (Node.value || "").trim();
	if (!Code) return null;

	const Hash = createHash("sha256").update(Code).digest("hex").slice(0, 16);

	if (!AvailableHashes.has(Hash)) {
		process.stderr.write(
			`[remarkMermaid] No rendered SVG found for hash ${Hash}\n`,
		);
		return null;
	}

	const SvgPath = resolve(SvgDir, `${Hash}.svg`);

	try {
		const SvgContent = readFileSync(SvgPath, "utf-8").trim();
		const SvgMatch = SvgContent.match(/<svg[\s\S]*?<\/svg>/i);
		if (!SvgMatch) {
			process.stderr.write(
				`[remarkMermaid] No SVG element in ${SvgPath}\n`,
			);
			return null;
		}

		const CleanSvg = SvgMatch[0]
			.replace(/\s+width="[^"]*"/, "")
			.replace(/\s+height="[^"]*"/, "")
			.replace("<svg", '<svg class="mermaid-diagram"');

		return {
			type: "html",
			value: CleanSvg,
		};
	} catch (Err) {
		process.stderr.write(
			`[remarkMermaid] Failed to read SVG ${SvgPath}: ${Err}\n`,
		);
		return null;
	}
}
