"use client";

import * as lucide from "lucide-react";
import { useState } from "react";

// ─── Term dictionary ──────────────────────────────────────────────────────────

type TermCategory =
	| "Architecture"
	| "Telemetry"
	| "Protocol"
	| "Feature"
	| "License";

const TermDictionary = new Map<string, TermCategory>([
	// Architecture elements
	["Mountain", "Architecture"],
	["Cocoon", "Architecture"],
	["Wind", "Architecture"],
	["Sky", "Architecture"],
	["Air", "Architecture"],
	["Echo", "Architecture"],
	["Vine", "Architecture"],
	["Common", "Architecture"],
	["Rest", "Architecture"],
	["Mist", "Architecture"],
	["Grove", "Architecture"],
	["Worker", "Architecture"],
	["Sidecar", "Architecture"],
	// Feature flags / compile features
	["ExtensionHostCocoon", "Feature"],
	["MistNative", "Feature"],
	["AirIntegration", "Feature"],
	// Telemetry
	["Telemetry", "Telemetry"],
	["MetricsCollection", "Telemetry"],
	["DistributedTracing", "Telemetry"],
	["CrashReport", "Telemetry"],
	["TelemetryService", "Telemetry"],
	["TelemetryMock", "Telemetry"],
	// Protocols
	["gRPC", "Protocol"],
	["OTEL", "Protocol"],
	["OpenTelemetry", "Protocol"],
	["WebSocket", "Protocol"],
	["WASM", "Protocol"],
	["Rhai", "Protocol"],
	// License
	["CC0", "License"],
	["PGP", "License"],
]);

const CategoryStyle: Record<TermCategory, string> = {
	Architecture: "border-blue-200 bg-blue-50 text-blue-700",
	Telemetry: "border-yellow-200 bg-yellow-50 text-yellow-700",
	Protocol: "border-purple-200 bg-purple-50 text-purple-700",
	Feature: "border-orange-200 bg-orange-50 text-orange-700",
	License: "border-green-200 bg-green-50 text-green-700",
};

const CategoryLabel: Record<TermCategory, string> = {
	Architecture: "Architecture element",
	Telemetry: "Telemetry feature",
	Protocol: "Protocol",
	Feature: "Compile feature flag",
	License: "License / Security",
};

// ─── Segment types ────────────────────────────────────────────────────────────

type Segment =
	| { Kind: "Text"; Value: string }
	| { Kind: "Code"; Value: string }
	| { Kind: "Em"; Value: string }
	| { Kind: "Term"; Value: string; Category: TermCategory };

// ─── Inline parser ────────────────────────────────────────────────────────────

const BuildTermPattern = () =>
	new RegExp(`\\b(${[...TermDictionary.keys()].join("|")})\\b`, "g");

const ParseInline = (Text: string, ShowTerms: boolean): Segment[] => {
	const Segments: Segment[] = [];
	const Parts = Text.split(/(`[^`]+`|\*[^*]+\*)/g);

	for (const Part of Parts) {
		if (Part.startsWith("`") && Part.endsWith("`") && Part.length > 2) {
			Segments.push({ Kind: "Code", Value: Part.slice(1, -1) });
			continue;
		}
		if (Part.startsWith("*") && Part.endsWith("*") && Part.length > 2) {
			Segments.push({ Kind: "Em", Value: Part.slice(1, -1) });
			continue;
		}
		if (ShowTerms) {
			const Pattern = BuildTermPattern();
			let LastIndex = 0;
			let Match: RegExpExecArray | null;
			while ((Match = Pattern.exec(Part)) !== null) {
				const TermName = Match[1];
				if (!TermName) continue;
				if (Match.index > LastIndex) {
					Segments.push({
						Kind: "Text",
						Value: Part.slice(LastIndex, Match.index),
					});
				}
				const Category = TermDictionary.get(TermName)!;
				Segments.push({ Kind: "Term", Value: TermName, Category });
				LastIndex = Match.index + TermName.length;
			}
			if (LastIndex < Part.length) {
				Segments.push({ Kind: "Text", Value: Part.slice(LastIndex) });
			}
		} else {
			if (Part.length > 0) Segments.push({ Kind: "Text", Value: Part });
		}
	}

	return Segments;
};

// ─── Copy button ─────────────────────────────────────────────────────────────

const CopyInlineButton = ({ Code }: { Code: string }) => {
	const [Copied, SetCopied] = useState(false);

	const HandleCopy = async () => {
		try {
			await navigator.clipboard.writeText(Code);
			SetCopied(true);
			setTimeout(() => SetCopied(false), 1800);
		} catch {
			// clipboard unavailable
		}
	};

	return (
		<button
			type="button"
			onClick={HandleCopy}
			aria-label={Copied ? "Copied" : "Copy to clipboard"}
			title={Copied ? "Copied" : "Copy to clipboard"}
			className="ml-1 inline-flex h-[1.1em] w-[1.1em] shrink-0 items-center justify-center rounded-none border border-[var(--Border)] bg-[var(--Mute)] opacity-50 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--Ring)]">
			{Copied ? (
				<lucide.Check
					className="h-[0.65em] w-[0.65em] text-green-600"
					aria-hidden="true"
				/>
			) : (
				<lucide.Copy
					className="h-[0.65em] w-[0.65em]"
					aria-hidden="true"
				/>
			)}
		</button>
	);
};

// ─── Segment renderer ─────────────────────────────────────────────────────────

const SegmentNode = ({ Segment }: { Segment: Segment }) => {
	switch (Segment.Kind) {
		case "Code":
			return (
				<span className="inline-flex items-baseline">
					<code className="rounded-none border border-[var(--Border)] bg-[var(--Mute)] px-1.5 py-0.5 font-mono text-[0.82em]">
						{Segment.Value}
					</code>
					<CopyInlineButton Code={Segment.Value} />
				</span>
			);
		case "Em":
			return (
				<em className="font-medium not-italic text-foreground">
					{Segment.Value}
				</em>
			);
		case "Term":
			return (
				<span
					className={`inline-flex items-center rounded-none border px-1.5 py-0.5 font-mono text-[0.78em] font-medium ${CategoryStyle[Segment.Category]}`}
					title={`${CategoryLabel[Segment.Category]}: ${Segment.Value}`}
					aria-label={`${CategoryLabel[Segment.Category]} ${Segment.Value}`}>
					{Segment.Value}
				</span>
			);
		default:
			return <>{Segment.Value}</>;
	}
};

// ─── Line renderer ────────────────────────────────────────────────────────────

const CommandPrefixes = [
	"cargo ",
	"bash ",
	"./",
	"sh ",
	"pnpm ",
	"npm run ",
	"npm ",
	"git ",
];

const IsCommandString = (Text: string) =>
	CommandPrefixes.some((Prefix) => Text.trimStart().startsWith(Prefix));

const InlineSegments = ({
	Text,
	ShowTerms,
}: {
	Text: string;
	ShowTerms: boolean;
}) => (
	<>
		{ParseInline(Text, ShowTerms).map((Segment, Index) => (
			<SegmentNode key={Index} Segment={Segment} />
		))}
	</>
);

const LineNode = ({
	Line,
	ShowTerms,
}: {
	Line: string;
	ShowTerms: boolean;
}) => {
	const Trimmed = Line.trimStart();

	// "Enable with: cargo build ..." → label + copyable code + optional remainder
	const EnableMatch = Trimmed.match(
		/^(enable with:\s*)(cargo\s+[^.]+?)(\.\s*(.+))?$/i,
	);
	if (EnableMatch) {
		const Command = (EnableMatch[2] ?? "").trim();
		const Remainder = EnableMatch[4]?.trim();
		return (
			<>
				<span className="text-muted-foreground/80">
					{EnableMatch[1]}
				</span>
				<span className="inline-flex items-baseline">
					<code className="rounded-none border border-[var(--Border)] bg-[var(--Mute)] px-1.5 py-0.5 font-mono text-[0.82em]">
						{Command}
					</code>
					<CopyInlineButton Code={Command} />
				</span>
				{Remainder && (
					<>
						{"."}
						<span className="ml-1">
							<InlineSegments
								Text={Remainder}
								ShowTerms={ShowTerms}
							/>
						</span>
					</>
				)}
			</>
		);
	}

	// "Sub-features: A, B, C" → label + comma-separated items as em
	const SubFeaturesMatch = Trimmed.match(/^(sub-features?:\s*)(.+)$/i);
	if (SubFeaturesMatch) {
		const Items = (SubFeaturesMatch[2] ?? "")
			.split(/,\s*/)
			.map((Item) => Item.trim().replace(/\.$/, ""))
			.filter(Boolean);
		return (
			<>
				<span className="text-muted-foreground/80">
					{SubFeaturesMatch[1]}
				</span>
				{Items.map((Item, Index) => (
					<span key={Item} className="inline-flex items-center">
						{Index > 0 && (
							<span className="mx-1 text-muted-foreground">
								,
							</span>
						)}
						{ShowTerms && TermDictionary.has(Item) ? (
							<span
								className={`inline-flex items-center rounded-none border px-1.5 py-0.5 font-mono text-[0.78em] font-medium ${CategoryStyle[TermDictionary.get(Item)!]}`}
								title={`${CategoryLabel[TermDictionary.get(Item)!]}: ${Item}`}>
								{Item}
							</span>
						) : (
							<em className="font-medium not-italic text-foreground">
								{Item}
							</em>
						)}
					</span>
				))}
			</>
		);
	}

	// "Default features: X, Y, Z" → label + badged feature names
	const DefaultFeaturesMatch = Trimmed.match(
		/^(default features?:\s*)(.+?)(\.\s*(.+))?$/i,
	);
	if (DefaultFeaturesMatch) {
		const Items = (DefaultFeaturesMatch[2] ?? "")
			.split(/,\s*/)
			.map((Item) => Item.trim())
			.filter(Boolean);
		const Remainder = DefaultFeaturesMatch[4]?.trim();
		return (
			<>
				<span className="text-muted-foreground/80">
					{DefaultFeaturesMatch[1]}
				</span>
				{Items.map((Item, Index) => (
					<span key={Item} className="inline-flex items-center">
						{Index > 0 && (
							<span className="mx-1 text-muted-foreground">
								,
							</span>
						)}
						{ShowTerms && TermDictionary.has(Item) ? (
							<span
								className={`inline-flex items-center rounded-none border px-1.5 py-0.5 font-mono text-[0.78em] font-medium ${CategoryStyle[TermDictionary.get(Item)!]}`}
								title={`${CategoryLabel[TermDictionary.get(Item)!]}: ${Item}`}>
								{Item}
							</span>
						) : (
							<code className="rounded-none border border-[var(--Border)] bg-[var(--Mute)] px-1.5 py-0.5 font-mono text-[0.82em]">
								{Item}
							</code>
						)}
					</span>
				))}
				{Remainder && (
					<span className="ml-1">
						<InlineSegments
							Text={Remainder}
							ShowTerms={ShowTerms}
						/>
					</span>
				)}
			</>
		);
	}

	// Full command line (whole line is a shell command)
	if (IsCommandString(Trimmed)) {
		return (
			<span className="inline-flex items-baseline">
				<code className="rounded-none border border-[var(--Border)] bg-[var(--Mute)] px-1.5 py-0.5 font-mono text-[0.82em]">
					{Trimmed}
				</code>
				<CopyInlineButton Code={Trimmed} />
			</span>
		);
	}

	// Plain line: parse inline segments (backtick code, *em*, term badges)
	return <InlineSegments Text={Line} ShowTerms={ShowTerms} />;
};

// ─── Main component ───────────────────────────────────────────────────────────

export interface RichTextProps {
	readonly Text: string;
	/** Enable auto-badging of tech terms from the dictionary. Default: false. */
	readonly Terms?: boolean;
	readonly ClassName?: string;
}

const RichText = ({ Text, Terms = false, ClassName }: RichTextProps) => {
	const Paragraphs = Text.split("\n\n").filter(Boolean);

	const RenderParagraph = (Paragraph: string, ParagraphIndex: number) => {
		const Lines = Paragraph.split("\n");
		return (
			<span key={ParagraphIndex} className="block">
				{Lines.map((Line, LineIndex) => (
					<span key={LineIndex}>
						{LineIndex > 0 && <br />}
						<LineNode Line={Line} ShowTerms={Terms} />
					</span>
				))}
			</span>
		);
	};

	if (Paragraphs.length <= 1) {
		return <span className={ClassName}>{RenderParagraph(Text, 0)}</span>;
	}

	return (
		<span className={`block space-y-3 ${ClassName ?? ""}`}>
			{Paragraphs.map((Paragraph, Index) =>
				RenderParagraph(Paragraph, Index),
			)}
		</span>
	);
};

export { RichText };
export default RichText;
