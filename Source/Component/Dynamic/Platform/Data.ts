/**
 * Data - the columns, rows and source lines of the platform matrix.
 *
 * This band is the page's honesty test. The product is pre-release, so the
 * question a reader has is not "where do I click" but "what exists for my
 * machine today" - and the answer is not three identical download buttons, it
 * is a matrix in which the two right-hand columns are empty for every platform.
 *
 * The marks are derived from the platform data rather than written down, so the
 * matrix cannot keep saying "no installer" after one ships: a platform carries
 * a size and a checksum exactly when there is a file to download, and a
 * signature exactly when that file is signed.
 *
 * The three column inks are the ones the Download page's own availability
 * matrix uses (`Source/Component/Dynamic/Download/Data.ts`), so the two
 * surfaces read as one statement rather than two opinions.
 */
import type { MatrixColumn } from "../../Record/Type.js";

import type PlatformInformation from "../Interface/Information/Platform.js";

import type { PlatformRow } from "./Type.js";

/** The band's marker. Structure, not copy: it names the section. */
export const Kicker = "/PLATFORMS";

/**
 * The three columns: what is published, in the order a reader asks.
 *
 * A source build is the one thing that exists today for every platform;
 * an installer and a signature are the two that do not. `center` because a
 * short mark reads faster centred under its own head.
 */
export const Columns: readonly MatrixColumn[] = [
	{ label: "SOURCE BUILD", ink: "SpinegRPCFore", align: "center" },
	{ label: "INSTALLER", ink: "SpineTCPFore", align: "center" },
	{ label: "SIGNED", ink: "SpineWASMFore", align: "center" },
];

/**
 * What a cell prints when the answer is yes or no. These are the two values
 * `RecordMatrix` names a modifier for, which is why the mark is a word and not
 * an icon: a value is never translated into a symbol.
 */
const YES = "yes";
const NO = "no";

/**
 * Whether an installer is published for this platform.
 *
 * The platform data carries a file size and a checksum only when a file exists
 * to describe - today every platform says `Size: "Coming Soon"` and carries no
 * checksum, so every installer cell is empty. The comparison is against the
 * content's own qualifier, which is the only signal the data gives.
 */
const HasInstaller = (Platform: PlatformInformation): boolean =>
	Boolean(Platform.Checksum) ||
	(Platform.Size.trim().length > 0 && Platform.Size.trim() !== "Coming Soon");

/** Whether the published build is signed. A signature is the whole signal. */
const IsSigned = (Platform: PlatformInformation): boolean =>
	Boolean(Platform.Signature);

/**
 * One row per platform, in the content's order.
 *
 * The source-build column is `yes` for every platform because the content says
 * so in one sentence - "Source builds are active today" - and the caption names
 * the build it means. It is not derived per platform because there is nothing
 * per platform to derive it from.
 */
export const RowsOf = (
	Platforms: readonly PlatformInformation[],
): readonly PlatformRow[] =>
	Platforms.map((Platform) => ({
		label: Platform.Name,
		...(Platform.Description ? { note: Platform.Description } : {}),
		cells: [
			YES,
			HasInstaller(Platform) ? YES : NO,
			IsSigned(Platform) ? YES : NO,
		],
	}));

/**
 * The caption: what the three columns are measured against.
 *
 * A matrix of yes and no is worthless without it, because "no installer" could
 * mean "not for your platform" or "not yet for anyone".
 */
export const Caption =
	"Source build: the two-step build in the Land repository, available for " +
	"every platform. Installer and signing: the release status of the platform " +
	"itself, which carries a size and a signature only once a file is published.";

/**
 * The footnote: the qualifiers the columns cannot carry.
 *
 * Every platform reports `Version: Pre-release` and `Size: Coming Soon` in the
 * content, so the three rows say the same thing about release state and the
 * band says it once, here, instead of three times in the grid. Both qualifiers
 * keep their own label, because a status word without its key is a word a
 * reader has to guess at.
 */
export const Footnote =
	"Version: Pre-release. Size: Coming Soon. No checksum or signature is " +
	"published for any platform yet.";
