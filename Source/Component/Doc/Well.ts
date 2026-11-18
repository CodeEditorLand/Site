/**
 * Well - turn the document's fenced blocks into the site's own wells.
 *
 * A documentation page is where a reader meets commands, configs and source, and
 * a fenced block on it printed as a scroll box with no name, no language and no
 * frame. The site already floats a copy control over every Shiki block
 * (`Function/Utility/CopyCommand`), but a control with no label over an unnamed
 * block is a button, not an object: nothing on the page says whether the reader is
 * looking at something to run, something to edit or something to read.
 *
 * So the block is not re-implemented here. `RecordWell` already owns this artifact
 * - `figure.record-well`, a title bar with a label, a language tag and the design
 * system's `jelly-icon-button`, a recessed mono body, and `WireWells` for the
 * behaviour - and `System/Record/_Well.scss` already owns its surface. This module
 * *composes*: it wraps each `pre.astro-code` in that anatomy, so a command in an
 * article is the same object as a command in the Download masthead.
 *
 * Five rules, each of which is a way this could go wrong:
 *
 * - **The wrapper is added, never swapped.** The `<pre>` element itself is moved,
 *   not rebuilt: its `<code>`, its token spans, its `tabindex` and its text are
 *   the ones shiki wrote. With JavaScript off nothing runs and the block stays the
 *   framed mono it is today.
 * - **One control, never two.** `CopyCommand` may have run before this module and
 *   floated its own control over the block; if it has, that control is adopted
 *   into the well's bar rather than a second one being built beside it. The block
 *   is then flagged `data-copy-wired`, which is the handshake `CopyCommand` checks,
 *   so a block this module already served is skipped however the two scripts are
 *   ordered.
 * - **The label is derived from the fence, not guessed from the text.** A block
 *   whose language is not in the table below gets no kind label at all and prints
 *   its language tag alone - `plaintext` is an honest caption, and `TRANSCRIPT`
 *   over an ASCII diagram would be an invented claim.
 * - **Mermaid blocks are left alone.** `MermaidFallback` owns any diagram it can
 *   render, and a well around a block it replaces would leave an empty frame.
 * - **The recess is the stylesheet's.** shiki writes its theme's background inline
 *   on the `<pre>`; that one declaration is cleared so the well's body (`--Mute`,
 *   the same recess every other well on the site uses) can show through. The token
 *   inks are untouched.
 */

/** The kinds a fenced block can be, by the language its fence declares. */
const Kind = new Map<string, string>([
	// A shell: something a reader runs.
	...[
		"bash",

		"sh",

		"shell",

		"zsh",

		"fish",

		"console",

		"terminal",

		"powershell",

		"ps",

		"ps1",

		"cmd",

		"bat",

		"make",

		"makefile",
	].map((Language) => [Language, "COMMAND"] as const),

	// A data format: something a reader edits.
	...[
		"json",

		"jsonc",

		"json5",

		"toml",

		"yaml",

		"yml",

		"ini",

		"dotenv",

		"env",

		"conf",

		"properties",
	].map((Language) => [Language, "CONFIG"] as const),

	// A language: something a reader reads.
	...[
		"rust",

		"rs",

		"typescript",

		"ts",

		"tsx",

		"javascript",

		"js",

		"jsx",

		"mjs",

		"cjs",

		"python",

		"py",

		"go",

		"c",

		"h",

		"cpp",

		"hpp",

		"java",

		"kotlin",

		"swift",

		"sql",

		"html",

		"css",

		"scss",

		"sass",

		"less",

		"vue",

		"svelte",

		"astro",

		"proto",

		"protobuf",

		"graphql",

		"gql",

		"nix",

		"dockerfile",

		"diff",

		"patch",
	].map((Language) => [Language, "SOURCE"] as const),
]);

/** The copy control's glyph - the clipboard `RecordWell` prints, unchanged. */
const Glyph = `<svg
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	style="color: var(--jelly-label)"
	aria-hidden="true"
><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>`;

/** The four `--jelly-*` properties every well's control carries. */
const Skin =
	"--jelly-fill: var(--Mute); --jelly-label: var(--Foreground); --jelly-icon-button-radius: 0px; --jelly-ring: var(--Accent);";

/**
 * Whether this context can copy at all - the same test `WireWells` binds on.
 * When it cannot, the control keeps `hidden` and never becomes an affordance.
 */
const CanCopy = (): boolean =>
	typeof navigator !== "undefined" && !!navigator.clipboard?.writeText;

/**
 * The bar's copy control, built the way `RecordWell` builds it: the design
 * system's element, rendered `hidden` until `WireWells` binds it, carrying the
 * payload on `data-copy-payload` (see `Library/Document/WireWells` for why that
 * attribute and not `data-copy`).
 *
 * `Reveal` is true when the clipboard is available, and then the control is
 * revealed *before* it is inserted. That order is the point: a Jelly element
 * upgraded inside `display: none` has no box, so it builds no physics body and
 * is parked; it would only be handed back to the loop on the first resize
 * after the reveal, which never comes for a control that is revealed once and
 * then hovered. Revealed first, it upgrades with the box it will keep, and its
 * hover jelly is there on the first pointerenter.
 */
const Control = (Payload: string, Label: string, Reveal: boolean): HTMLElement => {
	const Button = document.createElement("jelly-icon-button");

	Button.className = "record-well__copy";

	Button.setAttribute("data-record-well-copy", "");

	Button.setAttribute("data-copy-payload", Payload);

	Button.setAttribute("size", "small");

	Button.setAttribute("shape", "square");

	Button.setAttribute("label", Label);

	Button.setAttribute("aria-label", Label);

	Button.setAttribute("title", Label);

	Button.setAttribute("style", Skin);

	Button.innerHTML = Glyph;

	Button.hidden = !Reveal;

	return Button;
};

/**
 * A control `CopyCommand` already floated over this block, if it is there: the
 * sitewide wiring wraps the `<pre>` in a `position: relative` div and appends its
 * button as the div's second child. Adopting it keeps one affordance per command
 * and keeps the handler it already has.
 */
const Floated = (Block: HTMLPreElement): HTMLElement | null => {
	const Shell = Block.parentElement;

	if (!Shell || Shell.classList.contains("doc-article__body")) return null;

	const Button = Shell.querySelector<HTMLElement>(
		":scope > jelly-icon-button[data-copy]",
	);

	return Button && Shell.firstElementChild === Block ? Button : null;
};

/** One fenced block, as the well the rest of the site uses. */
const Wrap = (Block: HTMLPreElement): void => {
	if (Block.closest(".record-well, .mermaid-diagram")) return;

	const Language = (Block.dataset["language"] ?? "").toLowerCase();

	if (Language === "mermaid") return;

	const KindLabel = Kind.get(Language);

	const FloatedButton = Floated(Block);

	/* The element the figure replaces: the sitewide script's relative wrapper when
	   it exists, so that wrapper does not survive as an empty shell. */
	const Host: Element = FloatedButton
		? (Block.parentElement as Element)
		: Block;

	const Payload = (Block.textContent ?? "").replace(/\s+$/, "");

	const Figure = document.createElement("figure");

	Figure.className = "record-well doc-well";

	const Bar = document.createElement("figcaption");

	Bar.className = "record-well__bar";

	const Label = document.createElement("span");

	Label.className = "record-well__label";

	/*
	 * With a kind, the bar reads `COMMAND   bash`; without one, the language
	 * alone takes the label slot, so the bar is never empty and never claims a
	 * kind the fence did not declare.
	 */
	if (KindLabel) {
		Label.textContent = KindLabel;

		const Tag = document.createElement("span");

		Tag.className = "record-well__lang";

		Tag.textContent = Language;

		Bar.append(Label, Tag);
	} else {
		Label.textContent = Language || "BLOCK";

		Bar.append(Label);
	}

	if (FloatedButton) {
		/* The adopted control keeps its handler and its label; only its placement
		   changes - it was floating over the block, it now sits in the bar. */
		FloatedButton.style.removeProperty("position");

		FloatedButton.style.removeProperty("top");

		FloatedButton.style.removeProperty("right");

		FloatedButton.classList.add("record-well__copy");

		Bar.append(FloatedButton);
	} else {
		Bar.append(
			Control(
				Payload,

				`Copy ${KindLabel ?? (Language || "block")} to the clipboard`,

				CanCopy(),
			),
		);
	}

	/*
	 * The recess belongs to `.record-well__body`; shiki's theme background is
	 * written inline on this element and would win over the class. Only that
	 * declaration is dropped - the colour and the token spans stay.
	 */
	Block.style.removeProperty("background-color");

	Block.style.removeProperty("background");

	Block.classList.add("record-well__body");

	/* The figure takes the host's place first, then the block moves into it: with
	   the sitewide wrapper as host, replacing it detaches the block along with it,
	   and appending afterwards is what puts the block inside the figure. */
	Host.replaceWith(Figure);

	Figure.append(Bar, Block);

	/* The handshake with `Function/Utility/CopyCommand`: a block this module has
	   served carries its control already, and must not be given a second one. */
	Block.dataset["copyWired"] = "true";
};

/**
 * Wrap every fenced block in the reading column, then wire the controls this
 * module built itself.
 *
 * `WireWells` is called after the wrapping and is idempotent per control
 * (`data-copy-wired`), so an adopted control is left to the handler it already
 * has, and a page that also renders a `RecordWell` binds nothing twice.
 */
export const WireDocument = async (): Promise<void> => {
	const Blocks = Array.from(
		document.querySelectorAll<HTMLPreElement>(
			".doc-article__body pre.astro-code",
		),
	);

	if (!Blocks.length) return;

	for (const Block of Blocks) Wrap(Block);

	const { WireWells } = await import("../../Library/Document/WireWells");

	WireWells();
};

export default WireDocument;
