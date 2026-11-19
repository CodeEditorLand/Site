/**
 * The download band: three platform records, one card each.
 *
 * Each card is the release record for one platform - its marker, the platform's
 * name in that platform's own ink, the architecture it ships for, the channel,
 * the version, the size, the signing state, its action and its status.
 *
 * ─── THE VERSION AND SIZE ROWS ────────────────────────────────────────────
 * Both print `UNAVAILABLE`: a version string that names no published release and
 * a marketing phrase where a measurement belongs are claims the build cannot
 * back. The Download page's own release register prints `VERSION: UNAVAILABLE`
 * for the same release, and two surfaces must not contradict each other about
 * the same fact.
 *
 * `UNAVAILABLE` is the vocabulary's word for a fact that exists and is empty, and
 * the note under the three rows says why: nothing has been published to version,
 * measure or digest. A zero would be a measurement; "Coming Soon" is a promise.
 *
 * `STATUS: PREPARING` is `DESIGN-COMPLETE.md` §1.5's word for this condition
 * (`quiet`), and §1.5's vocabulary is closed at eight values. A two-word phrase
 * such as `RELEASE PREPARATION` carries no state the table
 * (`Component/Surface/State.ts`) can read, so a printer that asked it for a tone
 * would fall back to `ink`. The word "release" still prints: the card's own marker
 * is `# RELEASE_01` and the band it sits in is the release band.
 *
 * ─── THE FOUR FACTS THE LEDGER ALSO PRINTS ────────────────────────────────
 * The five facts the release record holds - architecture, channel, version, size,
 * signing - are joined by four a reader choosing where to build would otherwise
 * have to assemble from other pages, so they are printed here, in the same
 * ledger:
 *
 * - `WEBVIEW:` is the one runtime fact that actually differs between the three
 *   rows - `WKWebView` on macOS, `WebView2` on Windows, `WebKitGTK` on Linux
 *   (`Content/blog/TauriDesktopIntegration.md`). The editor is the same binary
 *   in three different browsers, and that is worth one row.
 * - `MINIMUM:` is the OS floor the Download page's own supported-OS strip prints
 *   (`Dynamic/Download/Data.ts` § OperatingSystems) - the same words, not a
 *   second phrasing of them.
 * - `CHECKSUM:` is `UNAVAILABLE` because there is no published artifact to
 *   digest. It is printed rather than omitted: a manifest that leaves the row
 *   out says the fact does not exist, and this one exists and is empty.
 * - `TOOLCHAIN:` is the Rust MSRV from that page's build-toolchain list. It is
 *   not a runtime requirement; it is what a reader needs before the source-build
 *   commands can run.
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

		Version: "UNAVAILABLE",

		Size: "UNAVAILABLE",

		Signing: "IN PREPARATION",

		Webview: "WKWEBVIEW",

		Minimum: "MACOS 10.15+",

		Checksum: "UNAVAILABLE",

		Toolchain: "RUST 1.95.0+",

		Note: "NO PUBLIC ARTIFACT: NOTHING TO VERSION, SIZE OR DIGEST.",

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

		Version: "UNAVAILABLE",

		Size: "UNAVAILABLE",

		Signing: "IN PREPARATION",

		Webview: "WEBVIEW2",

		Minimum: "WINDOWS 10+",

		Checksum: "UNAVAILABLE",

		Toolchain: "RUST 1.95.0+",

		Note: "NO PUBLIC ARTIFACT: NOTHING TO VERSION, SIZE OR DIGEST.",

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

		Version: "UNAVAILABLE",

		Size: "UNAVAILABLE",

		Signing: "IN PREPARATION",

		Webview: "WEBKITGTK",

		Minimum: "UBUNTU / DEBIAN / FEDORA",

		Checksum: "UNAVAILABLE",

		Toolchain: "RUST 1.95.0+",

		Note: "NO PUBLIC ARTIFACT: NOTHING TO VERSION, SIZE OR DIGEST.",

		Action: { Label: "Download for Linux", Href: "/Download" },

		Status: { Label: "STATUS:", Value: "PREPARING" },
	},
];
