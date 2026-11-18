/**
 * The working band - the mechanism, its release, and what stops it.
 *
 * Three artifacts, one subject: *how the claim on this page is checked*. The
 * trace is the build's six stages, each one a path or a command the manual
 * names; the register is what that build produces, row by row, with the rows
 * that cannot be answered printed as `UNAVAILABLE` rather than left out; the
 * failures are the three ways a reader's first run goes wrong, each one quoted
 * from the manual's own troubleshooting page with its cause and its fix.
 *
 * WHY A BAND AND NOT A SENTENCE. The page states `SOURCE ACTIVE` and
 * `STATUS: PREPARING` and then, until now, showed neither the source nor what is
 * being prepared. A reader deciding whether the thing is real needs the stages,
 * the facts and the failure modes in one place - the manual's working, on the
 * page that makes the claim.
 *
 * THE SIX STAGES ARE THE MANUAL'S SIX STAGES, in the manual's order and with the
 * manual's own paths (`Content/doc/build-pipeline.md` § Pipeline Overview). None
 * of them is a step this card invented, and none is a command this site runs: the
 * band is a reading of the pipeline, not a runner.
 *
 * THE THREE FAILURES ARE DOCUMENTED FAILURES. `Content/doc/troubleshooting.md`
 * files each one as symptom, cause and fix; the band prints the same three
 * fields in the record grammar and cites the page. `STATUS: INTERRUPTED` is the
 * vocabulary's word for a failed action - not a word this module chose.
 *
 * Every string is upper case and compact because it is a record, and every
 * separator is U+2001. Nothing here is a marketing sentence: the standfirst and
 * the footnote are the only two prose lines, and both count what the band shows.
 */
import type { WorkingStep } from "../Element/Working.js";

/** One failure mode: what the reader sees, why, and the next step. */
export interface FailureNote {
	/** `FAILURE_01` - printed after the `#`. */
	readonly Index: string;

	/** The failure's name, printed after the `/`: `BLANK WORKBENCH`. */
	readonly Name: string;

	/** What the reader sees. */
	readonly Symptom: string;

	/** Why it happens. */
	readonly Cause: string;

	/** The fix, as the manual gives it. */
	readonly Next: string;

	/** The state word, from the fixed eight-word vocabulary. */
	readonly State: "INTERRUPTED";

	/** Where the failure is documented. */
	readonly Source: string;
}

/**
 * The build's six stages, from `Content/doc/build-pipeline.md`.
 *
 * The `Path` is what the manual gives for the stage: a submodule path, a
 * command, a generated file, a script. It is printed in the mono register
 * because every one of them is a literal.
 */
export const BuildTrace: readonly WorkingStep[] = [
	{
		Index: "01",
		Path: "Dependency/Microsoft/Dependency/Editor",
		Note: "VS CODE PLATFORM COMPILE",
	},
	{
		Index: "02",
		Path: "pnpm prepublishOnly",
		Note: "WIND\u2001COCOON\u2001OUTPUT\u2001SKY\u2001WORKER",
	},
	{
		Index: "03",
		Path: "extensions.manifest.json",
		Note: "PREBAKE WRITES THE EXTENSION INDEX",
	},
	{
		Index: "04",
		Path: "cargo build -p Mountain",
		Note: "THE NATIVE BACKEND",
	},
	{
		Index: "05",
		Path: "pnpm tauri build",
		Note: "THE APPLICATION BUNDLE",
	},
	{
		Index: "06",
		Path: "Maintain/Script/SignBundle.sh",
		Note: "QUARANTINE STRIPPED\u2001ENTITLEMENTS RE-APPLIED",
	},
];

/**
 * What the build produces, as twelve facts.
 *
 * Seven of the twelve cannot be answered today and print `UNAVAILABLE` with the
 * reason under them. That is the band's honest centre: the source builds, and no
 * release artifact exists to describe. A register that dropped those seven rows
 * would be a shorter lie.
 */
export const ReleaseRegister = [
	{
		Label: "VERSION",
		Value: "UNAVAILABLE",
		Note: "NO PUBLISHED RELEASE",
	},
	{ Label: "CHANNEL", Value: "PUBLIC" },
	{
		Label: "ARTIFACTS",
		Value: "0",
		Note: "NOTHING TO DOWNLOAD",
	},
	{ Label: "SIGNATURE", Value: "UNAVAILABLE", Note: "NOTHING TO SIGN" },
	{ Label: "CHECKSUM", Value: "UNAVAILABLE", Note: "NOTHING TO DIGEST" },
	{ Label: "SIZE", Value: "UNAVAILABLE", Note: "NOTHING TO MEASURE" },
	{
		Label: "TARGETS",
		Value: "3",
		Note: "MACOS\u2001WINDOWS\u2001LINUX",
	},
	{
		Label: "TOOLCHAIN",
		Value: "RUST\u2001TAURI\u2001NODE 24",
	},
	{ Label: "STAGES", Value: "6", Note: "/DOC/BUILD-PIPELINE" },
	{
		Label: "BUILT BY",
		Value: "Maintain/Debug/Build.sh",
		Code: true,
	},
	{
		Label: "VERIFIED BY",
		Value: "UNAVAILABLE",
		Note: "NO PUBLISHED DIGEST",
	},
	{
		Label: "AS OF",
		Value: "c0ebf97fc",
		Code: true,
		Note: "THE BASELINE THIS PAGE DESCRIBES",
	},
];

/**
 * The three documented failures, in the order a first run meets them: the window
 * opens blank, the bundle crashes on a missing field, the signed app is refused.
 */
export const Failures: readonly FailureNote[] = [
	{
		Index: "FAILURE_01",
		Name: "BLANK WORKBENCH",
		Symptom:
			"THE WINDOW OPENS AND THE WORKBENCH STAYS BLANK\u2001THE EXTENSION HOST NEVER ACTIVATES",
		Cause: "COCOON DID NOT CONNECT WITHIN THE 30 SECOND GRPC BUDGET\u2001PORT 50051 OR 50052 ALREADY IN USE",
		Next: "lsof -i :50051 -i :50052\u2001KILL THE ORPHAN\u2001OR CHANGE THE PORTS IN .env.Land",
		State: "INTERRUPTED",
		Source: "/DOC/TROUBLESHOOTING",
	},
	{
		Index: "FAILURE_02",
		Name: "PATH ARGUMENT",
		Symptom:
			"THE BUNDLED WORKBENCH CRASHES AT STARTUP WITH THE path ARGUMENT MUST BE OF TYPE STRING",
		Cause: "ISandboxConfiguration.profiles WAS MISSING IN MOUNTAIN'S ConstructSandboxConfiguration",
		Next: "REBUILD MOUNTAIN AFTER ANY CHANGE TO InitializationData.rs\u2001THEN WIPE THE VITE CACHE",
		State: "INTERRUPTED",
		Source: "/DOC/TROUBLESHOOTING",
	},
	{
		Index: "FAILURE_03",
		Name: "DAMAGED BUNDLE",
		Symptom:
			"GATEKEEPER REFUSES THE APP AS DAMAGED OR INCOMPLETE\u2001codesign --verify REPORTS not signed",
		Cause: "TAURI DOES NOT RE-SIGN THE BUNDLE AFTER IT COPIES THE COCOON NODE BINARY INTO THE .app",
		Next: "BundleLevel=debug sh Maintain/Script/SignBundle.sh\u2001AFTER EVERY BUILD",
		State: "INTERRUPTED",
		Source: "/DOC/TROUBLESHOOTING",
	},
];

/**
 * The band's own labels.
 *
 * The head - kicker, heading, standfirst - is `Content/Home/Band.ts`'s, like
 * every other band's: a second copy here would be two places to change the
 * sentence the band opens on. What lives here is what belongs to the artifacts:
 * the trace's label, the register's name and the band's provenance line.
 */
export const WorkingBandCopy = {
	Footnote:
		"SOURCE: /DOC/BUILD-PIPELINE\u2001/DOC/TROUBLESHOOTING\u2001EVERY FIGURE ON THIS BAND IS READ FROM THE MANUAL, NOT MEASURED AT RUNTIME",
	TraceLabel: "BUILD",
	RegisterLabel: "WORKING_01",
} as const;
