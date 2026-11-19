import { useEffect, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import * as lucide from "lucide-react";
// Source/Component/UI/RichText.tsx
var TermDictionary = /* @__PURE__ */ new Map([
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
	["ExtensionHostCocoon", "Feature"],
	["MistNative", "Feature"],
	["AirIntegration", "Feature"],
	["Telemetry", "Telemetry"],
	["MetricsCollection", "Telemetry"],
	["DistributedTracing", "Telemetry"],
	["CrashReport", "Telemetry"],
	["TelemetryService", "Telemetry"],
	["TelemetryMock", "Telemetry"],
	["gRPC", "Protocol"],
	["OTEL", "Protocol"],
	["OpenTelemetry", "Protocol"],
	["WebSocket", "Protocol"],
	["WASM", "Protocol"],
	["Rhai", "Protocol"],
	["Rust", "Tool"],
	["Tauri", "Tool"],
	["Effect-TS", "Tool"],
	["Cargo", "Tool"],
	["OXC", "Tool"],
	["SWC", "Tool"],
	["Electron", "Tool"],
	["TypeScript", "Tool"],
	["Astro", "Tool"],
	["Vite", "Tool"],
	["React", "Tool"],
	["Tailwind", "Tool"],
	["Node.js", "Tool"],
	["Biome", "Tool"],
	["Cloudflare", "Tool"],
	["Auth0", "Tool"],
	["pnpm", "Tool"],
	["esbuild", "Tool"],
	["CC0", "License"],
	["PGP", "License"],
	["NLnet", "License"],
	["NGI0", "License"]
]);
var CategoryStyle = {
	Architecture: "border-[var(--SpineIPC)] text-[color:var(--SpineIPCFore)]",
	Telemetry: "border-[var(--ExtensionTauri)] text-[color:var(--ExtensionTauriFore)]",
	Protocol: "border-[var(--SpineWASM)] text-[color:var(--SpineWASMFore)]",
	Feature: "border-[var(--SpineTCP)] text-[color:var(--SpineTCPFore)]",
	License: "border-[var(--SpinegRPC)] text-[color:var(--SpinegRPCFore)]",
	Tool: "border-[var(--ExtensionReact)] text-[color:var(--SpineIPCFore)]"
};
var CategoryBadgeStyle = {
	Architecture: "border-[var(--SpineIPC)] text-[color:var(--SpineIPCFore)]",
	Telemetry: "border-[var(--ExtensionTauri)] text-[color:var(--ExtensionTauriFore)]",
	Protocol: "border-[var(--SpineWASM)] text-[color:var(--SpineWASMFore)]",
	Feature: "border-[var(--SpineTCP)] text-[color:var(--SpineTCPFore)]",
	License: "border-[var(--SpinegRPC)] text-[color:var(--SpinegRPCFore)]",
	Tool: "border-[var(--ExtensionReact)] text-[color:var(--SpineIPCFore)]"
};
var CategoryFill = {
	Architecture: "var(--SpineIPCMute)",
	Telemetry: "var(--ExtensionTauriMute)",
	Protocol: "var(--SpineWASMMute)",
	Feature: "var(--SpineTCPMute)",
	License: "var(--SpinegRPCMute)",
	Tool: "var(--ExtensionReactMute)"
};
var CategoryLabel = {
	Architecture: "Architecture element",
	Telemetry: "Telemetry feature",
	Protocol: "Protocol",
	Feature: "Compile feature flag",
	License: "License / Security",
	Tool: "Build tool / Framework"
};
var TermLogo = {
	Rust: "/Image/Rust.svg",
	Tauri: "/Image/Tauri.svg",
	"Effect-TS": "/Image/EffectTS.svg",
	Cargo: "/Image/Cargo.svg",
	TypeScript: "/Image/TypeScript.svg",
	Astro: "/Image/Astro.svg",
	Vite: "/Image/Vite.svg",
	React: "/Image/React.svg",
	Tailwind: "/Image/Tailwind.svg",
	"Node.js": "/Image/NodeJS.svg",
	WASM: "/Image/WASM.svg",
	gRPC: "/Image/gRPC.svg",
	Biome: "/Image/Biome.svg",
	CC0: "/Image/CC0.svg",
	NLnet: "/Image/NLnet.svg",
	Cloudflare: "/Image/Cloudflare.svg",
	Auth0: "/Image/Auth0.svg",
	OXC: "/Image/OXC.svg",
	SWC: "/Image/SWC.svg",
	Electron: "/Image/Electron.svg",
	Rhai: "/Image/Rhai.svg",
	Telemetry: "/Image/OpenTelemetry.svg",
	OpenTelemetry: "/Image/OpenTelemetry.svg",
	OTEL: "/Image/OpenTelemetry.svg",
	pnpm: "/Image/pnpm.svg",
	esbuild: "/Image/esbuild.svg"
};
var BuildTermPattern = () => new RegExp(`\\b(${[...TermDictionary.keys()].join("|")})\\b`, "g");
var ParseInline = (Text, ShowTerms) => {
	const Segments = [];
	const Parts = Text.split(/(`[^`]+`|\*[^*]+\*)/g);
	for (const Part of Parts) {
		if (Part.startsWith("`") && Part.endsWith("`") && Part.length > 2) {
			Segments.push({
				Kind: "Code",
				Value: Part.slice(1, -1)
			});
			continue;
		}
		if (Part.startsWith("*") && Part.endsWith("*") && Part.length > 2) {
			Segments.push({
				Kind: "Em",
				Value: Part.slice(1, -1)
			});
			continue;
		}
		if (ShowTerms) {
			const Pattern = BuildTermPattern();
			let LastIndex = 0;
			let Match;
			while ((Match = Pattern.exec(Part)) !== null) {
				const TermName = Match[1];
				if (!TermName) continue;
				if (Match.index > LastIndex) Segments.push({
					Kind: "Text",
					Value: Part.slice(LastIndex, Match.index)
				});
				const Category = TermDictionary.get(TermName);
				Segments.push({
					Kind: "Term",
					Value: TermName,
					Category
				});
				LastIndex = Match.index + TermName.length;
			}
			if (LastIndex < Part.length) Segments.push({
				Kind: "Text",
				Value: Part.slice(LastIndex)
			});
		} else if (Part.length > 0) Segments.push({
			Kind: "Text",
			Value: Part
		});
	}
	return Segments;
};
var CopyInlineButton = ({ Code }) => {
	const [Copied, SetCopied] = useState(false);
	const HandleCopy = async () => {
		try {
			await navigator.clipboard.writeText(Code);
			SetCopied(true);
			setTimeout(() => SetCopied(false), 1800);
		} catch {}
	};
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick: HandleCopy,
		"aria-label": Copied ? "Copied" : "Copy to clipboard",
		title: Copied ? "Copied" : "Copy to clipboard",
		className: "RichTextCopyButton flat ml-1 inline-flex h-[1.1em] w-[1.1em] shrink-0 items-center justify-center opacity-50 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--Ring)]",
		children: Copied ? /* @__PURE__ */ jsx(lucide.Check, {
			className: "h-[0.65em] w-[0.65em] text-green-600",
			"aria-hidden": "true"
		}) : /* @__PURE__ */ jsx(lucide.Copy, {
			className: "h-[0.65em] w-[0.65em]",
			"aria-hidden": "true"
		})
	});
};
var SegmentNode = ({ Segment }) => {
	switch (Segment.Kind) {
		case "Code": return /* @__PURE__ */ jsxs("span", {
			className: "inline-flex items-baseline",
			children: [/* @__PURE__ */ jsx("code", {
				className: "flat bg-[color-mix(in_srgb,currentColor_10%,transparent)] px-1.5 py-0.5 font-mono",
				children: Segment.Value
			}), /* @__PURE__ */ jsx(CopyInlineButton, { Code: Segment.Value })]
		});
		case "Em": return /* @__PURE__ */ jsx("em", {
			className: "font-medium not-italic",
			children: Segment.Value
		});
		case "Term": {
			const Logo = TermLogo[Segment.Value];
			const Style = CategoryBadgeStyle[Segment.Category];
			const Fill = CategoryFill[Segment.Category];
			return /* @__PURE__ */ jsxs("jelly-badge", {
				shape: "square",
				className: Style,
				title: `${CategoryLabel[Segment.Category]}: ${Segment.Value}`,
				"aria-label": `${CategoryLabel[Segment.Category]} ${Segment.Value}`,
				style: {
					"--jelly-fill": Fill,
					"--jelly-label": "currentColor",
					"--jelly-badge-radius": "0px",
					"--jelly-badge-font-size": "0.78em"
				},
				children: [Segment.Value, Logo && /* @__PURE__ */ jsxs(Fragment$1, { children: [" ", /* @__PURE__ */ jsx("img", {
					src: Logo,
					alt: "",
					width: 12,
					height: 12,
					className: "inline-block align-middle opacity-60",
					"aria-hidden": "true"
				})] })]
			});
		}
		default: return /* @__PURE__ */ jsx(Fragment$1, { children: Segment.Value });
	}
};
var CommandPrefixes = [
	"cargo ",
	"bash ",
	"./",
	"sh ",
	"pnpm ",
	"npm run ",
	"npm ",
	"git "
];
var IsCommandString = (Text) => CommandPrefixes.some((Prefix) => Text.trimStart().startsWith(Prefix));
var InlineSegments = ({ Text, ShowTerms }) => /* @__PURE__ */ jsx(Fragment$1, { children: ParseInline(Text, ShowTerms).map((Segment, Index) => /* @__PURE__ */ jsx(SegmentNode, { Segment }, Index)) });
var LineNode = ({ Line, ShowTerms }) => {
	const Trimmed = Line.trimStart();
	const EnableMatch = Trimmed.match(/^(enable with:\s*)(cargo\s+[^.]+?)(\.\s*(.+))?$/i);
	if (EnableMatch) {
		const Command = (EnableMatch[2] ?? "").trim();
		const Remainder = EnableMatch[4]?.trim();
		return /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx("span", {
				className: "text-[color-mix(in_srgb,var(--MuteForeground)_80%,transparent)]",
				children: EnableMatch[1]
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "inline-flex items-baseline",
				children: [/* @__PURE__ */ jsx("code", {
					className: "flat bg-[color-mix(in_srgb,currentColor_10%,transparent)] px-1.5 py-0.5 font-mono",
					children: Command
				}), /* @__PURE__ */ jsx(CopyInlineButton, { Code: Command })]
			}),
			Remainder && /* @__PURE__ */ jsxs(Fragment$1, { children: [".", /* @__PURE__ */ jsx("span", {
				className: "ml-1",
				children: /* @__PURE__ */ jsx(InlineSegments, {
					Text: Remainder,
					ShowTerms
				})
			})] })
		] });
	}
	const SubFeaturesMatch = Trimmed.match(/^(sub-features?:\s*)(.+)$/i);
	if (SubFeaturesMatch) {
		const Items = (SubFeaturesMatch[2] ?? "").split(/,\s*/).map((Item) => Item.trim().replace(/\.$/, "")).filter(Boolean);
		return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
			className: "text-[color-mix(in_srgb,var(--MuteForeground)_80%,transparent)]",
			children: SubFeaturesMatch[1]
		}), Items.map((Item, Index) => /* @__PURE__ */ jsxs("span", {
			className: "inline-flex items-center",
			children: [Index > 0 && /* @__PURE__ */ jsx("span", {
				className: "mx-1 text-muted-foreground",
				children: ","
			}), ShowTerms && TermDictionary.has(Item) ? /* @__PURE__ */ jsx("span", {
				className: `flat inline-flex items-center border px-1.5 py-0.5 align-middle font-mono font-medium leading-normal ${CategoryStyle[TermDictionary.get(Item)]}`,
				title: `${CategoryLabel[TermDictionary.get(Item)]}: ${Item}`,
				children: Item
			}) : /* @__PURE__ */ jsx("em", {
				className: "font-medium not-italic",
				children: Item
			})]
		}, Item))] });
	}
	const DefaultFeaturesMatch = Trimmed.match(/^(default features?:\s*)(.+?)(\.\s*(.+))?$/i);
	if (DefaultFeaturesMatch) {
		const Items = (DefaultFeaturesMatch[2] ?? "").split(/,\s*/).map((Item) => Item.trim()).filter(Boolean);
		const Remainder = DefaultFeaturesMatch[4]?.trim();
		return /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx("span", {
				className: "text-[color-mix(in_srgb,var(--MuteForeground)_80%,transparent)]",
				children: DefaultFeaturesMatch[1]
			}),
			Items.map((Item, Index) => /* @__PURE__ */ jsxs("span", {
				className: "inline-flex items-center",
				children: [Index > 0 && /* @__PURE__ */ jsx("span", {
					className: "mx-1 text-muted-foreground",
					children: ","
				}), ShowTerms && TermDictionary.has(Item) ? /* @__PURE__ */ jsx("span", {
					className: `flat inline-flex items-center border px-1.5 py-0.5 align-middle font-mono font-medium leading-normal ${CategoryStyle[TermDictionary.get(Item)]}`,
					title: `${CategoryLabel[TermDictionary.get(Item)]}: ${Item}`,
					children: Item
				}) : /* @__PURE__ */ jsx("code", {
					className: "flat bg-[color-mix(in_srgb,currentColor_10%,transparent)] px-1.5 py-0.5 font-mono",
					children: Item
				})]
			}, Item)),
			Remainder && /* @__PURE__ */ jsx("span", {
				className: "ml-1",
				children: /* @__PURE__ */ jsx(InlineSegments, {
					Text: Remainder,
					ShowTerms
				})
			})
		] });
	}
	if (IsCommandString(Trimmed)) return /* @__PURE__ */ jsxs("span", {
		className: "inline-flex items-baseline",
		children: [/* @__PURE__ */ jsx("code", {
			className: "flat bg-[color-mix(in_srgb,currentColor_10%,transparent)] px-1.5 py-0.5 font-mono",
			children: Trimmed
		}), /* @__PURE__ */ jsx(CopyInlineButton, { Code: Trimmed })]
	});
	return /* @__PURE__ */ jsx(InlineSegments, {
		Text: Line,
		ShowTerms
	});
};
/**
* Read the current --StaccatoRaw value from the CSS custom property.
* Returns 0 when Staccato hasn't started yet (SSR / before first tick).
*
* Read at the rate the noise commits, not at the rate the typewriter frames.
*
* `getComputedStyle` on the document element resolves the whole cascade for the
* root, and a four-second reveal runs ~240 frames for a number that changes twice
* a second - 240 cascade resolutions to read 8 values. The noise layer commits on a
* 500 ms cadence (`Function/Noise/Staccato.ts`), so the value is cached for exactly
* that long: the reveal sees every state the noise actually has, and costs one read
* per commit instead of one per frame. On a page with no noise layer the property
* is the `0` its stylesheet declares (`Component/_Noise.scss`), and one read
* establishes that for the rest of the reveal.
*/
var NOISE_READ_INTERVAL = 500;
var CachedNoiseRaw = 0;
var NoiseReadAt = -Infinity;
var ReadStaccatoRaw = (Now) => {
	if (typeof document === "undefined") return 0;
	if (Now - NoiseReadAt < NOISE_READ_INTERVAL) return CachedNoiseRaw;
	NoiseReadAt = Now;
	CachedNoiseRaw = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--StaccatoRaw")) || 0;
	return CachedNoiseRaw;
};
/**
* Lerp a value toward a target by factor α (0-1).
* At α = 0.12, a step of ~0.3ms toward target gives organic character timing.
*/
var Lerp = (Current, Target, Alpha) => Current + (Target - Current) * Alpha;
var RichText = ({ Text, Terms = false, ClassName }) => {
	const [Revealed, SetRevealed] = useState(Text.length);
	const [IsAnimating, SetIsAnimating] = useState(false);
	const PreviousText = useRef(Text);
	const ContainerRef = useRef(null);
	const AnimRef = useRef(0);
	/** Lerped character delay in ms - starts at 20ms, noise modulates it. */
	const LerpedDelay = useRef(20);
	const LastTime = useRef(performance.now());
	useEffect(() => {
		if (Text === PreviousText.current) return;
		if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			PreviousText.current = Text;
			SetRevealed(Text.length);
			return;
		}
		if (ContainerRef.current) {
			const Rect = ContainerRef.current.getBoundingClientRect();
			if (Rect.width > 0) {
				ContainerRef.current.style.minWidth = `${Rect.width}px`;
				ContainerRef.current.style.minHeight = `${Rect.height}px`;
				ContainerRef.current.style.display = "inline-block";
			}
		}
		PreviousText.current = Text;
		LerpedDelay.current = 20;
		LastTime.current = performance.now();
		cancelAnimationFrame(AnimRef.current);
		SetIsAnimating(true);
		SetRevealed(0);
		let CharCount = 0;
		const Step = (Now) => {
			const TargetDelay = 18 + (ReadStaccatoRaw(Now) + 1) * .5 * 18;
			LerpedDelay.current = Lerp(LerpedDelay.current, TargetDelay, .12);
			if (Now - LastTime.current >= LerpedDelay.current) {
				CharCount++;
				SetRevealed(CharCount);
				LastTime.current = Now;
				if (CharCount >= Text.length) {
					SetIsAnimating(false);
					if (ContainerRef.current) {
						ContainerRef.current.style.minWidth = "";
						ContainerRef.current.style.minHeight = "";
						ContainerRef.current.style.display = "";
					}
					return;
				}
			}
			AnimRef.current = requestAnimationFrame(Step);
		};
		AnimRef.current = requestAnimationFrame(Step);
		return () => cancelAnimationFrame(AnimRef.current);
	}, [Text]);
	const DisplayText = IsAnimating ? Text.slice(0, Revealed) : Text;
	const Paragraphs = DisplayText.split("\n\n").filter(Boolean);
	const RenderParagraph = (Paragraph, ParagraphIndex, IsLast) => {
		const Lines = Paragraph.split("\n");
		return /* @__PURE__ */ jsx("span", {
			className: "block",
			children: Lines.map((Line, LineIndex) => {
				const IsLastLine = IsLast && LineIndex === Lines.length - 1;
				return /* @__PURE__ */ jsxs("span", { children: [
					LineIndex > 0 && /* @__PURE__ */ jsx("br", {}),
					/* @__PURE__ */ jsx(LineNode, {
						Line,
						ShowTerms: Terms
					}),
					IsAnimating && IsLastLine && /* @__PURE__ */ jsx("span", {
						className: "StaccatoCursor",
						"aria-hidden": "true"
					})
				] }, LineIndex);
			})
		}, ParagraphIndex);
	};
	if (Paragraphs.length <= 1) return /* @__PURE__ */ jsx("span", {
		ref: ContainerRef,
		className: ClassName,
		children: RenderParagraph(DisplayText, 0, true)
	});
	return /* @__PURE__ */ jsx("span", {
		ref: ContainerRef,
		className: `block space-y-3 ${ClassName ?? ""}`,
		children: Paragraphs.map((Paragraph, Index) => RenderParagraph(Paragraph, Index, Index === Paragraphs.length - 1))
	});
};
export { RichText as t };
