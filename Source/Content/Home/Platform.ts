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
		Status: { Label: "STATUS:", Value: "RELEASE PREPARATION" },
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
		Status: { Label: "STATUS:", Value: "RELEASE PREPARATION" },
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
		Status: { Label: "STATUS:", Value: "RELEASE PREPARATION" },
	},
];
