/**
 * The download band: three platform records, one card each.
 *
 * Each card is the release record for one platform - its marker, the platform's
 * name in that platform's own ink, the architecture it ships for, the channel,
 * the version, the size, the signing state, its action and its status.
 *
 * `vPre-release` is the version every card prints: no installer is published
 * yet, and the baseline said so on the card rather than leaving the row out.
 * The three architecture lines are the platform's own - a universal binary on
 * macOS, x64 on Windows, the three Linux package formats.
 *
 * `STATUS: PREPARING` is `DESIGN-COMPLETE.md` §1.5's word for this condition
 * (`quiet`), and §1.5's vocabulary is closed at eight values. The row printed
 * `RELEASE PREPARATION` - two words, no state among them - so the state table
 * (`Component/Surface/State.ts`) could not read it and any printer that asked
 * for its tone fell back to `ink`. "Release" is not lost: the card's own marker
 * is `# RELEASE_01` and the band it sits in is the release band.
 */
import type { PlatformCard } from "./Type.js";

/** The three platform cards, in the order the band prints them. */
export const PlatformCards: readonly PlatformCard[] = [
	{
		Index: "# RELEASE_01",
		Name: "macOS",
		Ink: "var(--OSMacOS)",
		Icon: "Apple",
		Architecture: "Universal Binary: Apple Silicon and Intel",
		Channel: "PUBLIC",
		Version: "vPre-release",
		Size: "Coming Soon",
		Signing: "IN PREPARATION",
		Action: { Label: "Download for macOS", Href: "/Download" },
		Status: { Label: "STATUS:", Value: "PREPARING" },
	},
	{
		Index: "# RELEASE_01",
		Name: "Windows",
		Ink: "var(--OSWindows)",
		Icon: "Monitor",
		Architecture: "64-bit (x64)",
		Channel: "PUBLIC",
		Version: "vPre-release",
		Size: "Coming Soon",
		Signing: "IN PREPARATION",
		Action: { Label: "Download for Windows", Href: "/Download" },
		Status: { Label: "STATUS:", Value: "PREPARING" },
	},
	{
		Index: "# RELEASE_01",
		Name: "Linux",
		Ink: "var(--OSLinux)",
		Icon: "Terminal",
		Architecture: "64-bit (DEB, RPM, AppImage)",
		Channel: "PUBLIC",
		Version: "vPre-release",
		Size: "Coming Soon",
		Signing: "IN PREPARATION",
		Action: { Label: "Download for Linux", Href: "/Download" },
		Status: { Label: "STATUS:", Value: "PREPARING" },
	},
];
