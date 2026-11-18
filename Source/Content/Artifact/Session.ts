/**
 * Session - the two transcripts the document can honestly print.
 *
 * A transcript is the one block that cannot be invented. Every command below is
 * quoted from `Source/Content/doc/getting-started.md`, and every `↳` turn is the
 * manual's own "What you should see" sentence rather than a captured console: the
 * build records no session log, so the page prints the documented session and
 * says so in the transcript's own note.
 *
 * That distinction is the whole design. A transcript that invented plausible
 * output would be the most convincing lie on the site - a reader cannot tell
 * invented output from recorded output by looking - so this module prints the
 * manual's words, marks them as the manual's, and names the file.
 *
 * ─── THE TWO SESSIONS ─────────────────────────────────────────────────────
 * - **`BuildSession`** (`/Download`, `/INSTALL`) - the two-step build: the VS
 *   Code source in the Editor submodule, then Land itself. Sixteen turns; the
 *   region prints twelve and names the four it did not print, because a region
 *   that printed the whole flow would be the manual.
 * - **`SetupSession`** (`/Doc/getting-started`) - the toolchain: Node 24, Rust
 *   stable and its targets, and the two skip flags without which `npm install`
 *   stalls. Twelve turns, all of them.
 *
 * The marks are the grammar's: `→` what the reader typed, `↳` what answered, `#`
 * the manual's own note. The speaker column names who is talking, so a reader can
 * follow one voice down the page.
 */

import type { Transcript } from "../../Component/Record/Type.js";

/** The field-record separator: U+2001, never U+00B7. */
const Quad = "\u2001";

/** The file both sessions are quoted from. */
const Manual = `SOURCE/CONTENT/DOC/GETTING-STARTED.MD${Quad}SECTIONS: BUILD OVERVIEW, STEP 1, STEP 2`;

/**
 * The build session: sixteen turns, twelve printed.
 *
 * The window is not a limitation of the block - it is the region's editorial
 * decision. `/INSTALL` is where a reader decides whether to start; the whole flow
 * (including the production profile and the two re-sign steps) belongs to the
 * manual, and the foot says which page has it.
 */
export const BuildSession: Transcript = {
	index: "TRANSCRIPT_01",
	label: "BUILD",
	turns: [
		{
			mark: "#",
			speaker: "MANUAL",
			line: "THE BUILD IS TWO STEPS: THE VS CODE SOURCE FIRST, THEN LAND ITSELF. EACH STEP CONSUMES WHAT THE ONE BEFORE IT PRODUCED.",
			stamp: "00",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "cd Dependency/Microsoft/Dependency/Editor",
			stamp: "01",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "nvm use 24",
			stamp: "02",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "export NODE_ENV=development",
			stamp: "03",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "git fetch --all",
			stamp: "04",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "git reset --hard Parent/main",
			stamp: "05",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "git clean -dfx",
			stamp: "06",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "npm install",
			stamp: "07",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "npm run compile",
			stamp: "08",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "npm run compile-extensions-build",
			stamp: "09",
		},
		{
			mark: "↳",
			speaker: "BUILD",
			line: "The out-<platform> directories exist inside the Editor submodule. Without them Cocoon cannot locate the VS Code platform code at runtime.",
			stamp: "10",
		},
		{
			mark: "#",
			speaker: "MANUAL",
			line: "THE EDITOR SUBMODULE USES NPM, NOT PNPM. DO NOT SUBSTITUTE `pnpm install` HERE - ITS LOCKFILE AND .NPMRC ARE NPM-NATIVE.",
			stamp: "11",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "cd Land",
			stamp: "12",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "export Trace=all Record=1 Disable=false",
			stamp: "13",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "./Maintain/Debug/Build.sh --profile debug-electron-bundled",
			stamp: "14",
		},
		{
			mark: "↳",
			speaker: "BUILD",
			line: "Build.sh echoes the resolved tier set, finishes, and writes the artifacts under Element/Mountain/Target/. On macOS the debug bundle is re-signed during the same run; a signing failure appears here, not at launch.",
			stamp: "15",
		},
	],
	source: Manual,
	state: "rest",
	window: { showing: 12, total: "16" },
	note: `THE MANUAL'S SESSION, NOT A RECORDED RUN. THE FOUR TURNS NOT PRINTED ARE THE PRODUCTION PROFILE AND ITS TWO RE-SIGN STEPS; THE WHOLE FLOW IS ON /DOC/GETTING-STARTED.`,
};

/**
 * The toolchain session: twelve turns, all of them.
 *
 * This is the one place the site prints the two skip flags, which are the reason
 * a first build either finishes or appears to hang. A session is the right shape
 * for it: the flags are typed, they are order-sensitive with respect to the
 * install, and the note that follows explains what happens without them.
 */
export const SetupSession: Transcript = {
	index: "TRANSCRIPT_02",
	label: "TOOLCHAIN",
	turns: [
		{
			mark: "#",
			speaker: "MANUAL",
			line: "THREE TOOLCHAINS: NODE 24 FOR THE EDITOR SUBMODULE, RUST STABLE FOR THE NATIVE ELEMENTS, AND TWO SKIP FLAGS FOR THE TEST BINARIES THE BUILD DOES NOT NEED.",
			stamp: "00",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "nvm install 24",
			stamp: "01",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "nvm use 24",
			stamp: "02",
		},
		{
			mark: "#",
			speaker: "MANUAL",
			line: "NODE 24 IS REQUIRED SPECIFICALLY TO COMPILE THE EDITOR SUBMODULE. THE PINNED VERSION IS TRACKED IN DEPENDENCY/MICROSOFT/DEPENDENCY/EDITOR/.NVMRC.",
			stamp: "03",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "rustup install stable",
			stamp: "04",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "rustup default stable",
			stamp: "05",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "rustup target add aarch64-apple-darwin",
			stamp: "06",
		},
		{
			mark: "#",
			speaker: "MANUAL",
			line: "ON APPLE SILICON THAT IS THE ONLY TARGET NEEDED. X86_64-APPLE-DARWIN IS FOR INTEL HARDWARE OR A UNIVERSAL BINARY VIA LIPO, AND THE TWO LINUX TARGETS ARE FOR CROSS-COMPILATION.",
			stamp: "07",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "export ELECTRON_SKIP_BINARY_DOWNLOAD=1",
			stamp: "08",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1",
			stamp: "09",
		},
		{
			mark: "#",
			speaker: "MANUAL",
			line: "WITHOUT THESE TWO FLAGS `npm install` STALLS ON THE PLATFORM BINARIES ITS TEST INFRASTRUCTURE WANTS - ELECTRON AT ROUGHLY 200 MB AND PLAYWRIGHT CHROMIUM AT ROUGHLY 300 MB. NEITHER IS NEEDED TO COMPILE.",
			stamp: "10",
		},
		{
			mark: "→",
			speaker: "READER",
			line: "source ~/.zshrc",
			stamp: "11",
		},
	],
	source: Manual,
	state: "rest",
	note: "EVERY COMMAND AND NOTE ABOVE IS QUOTED FROM THE MANUAL'S OWN SHELL ENVIRONMENT SECTION; THE BUILD RECORDS NO SESSION LOG, SO NOTHING HERE IS PRESENTED AS CAPTURED OUTPUT.",
};
