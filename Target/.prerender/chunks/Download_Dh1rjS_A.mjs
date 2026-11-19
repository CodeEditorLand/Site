// Source/Library/I18n/Locale/En/Download.json
var card = { "platform": {
	"linux": {
		"description": "DEB, RPM, AppImage",
		"title": "Linux"
	},
	"macos": {
		"title": "macOS",
		"universalBadge": "Universal Binary: Apple Silicon and Intel"
	},
	"windows": {
		"description": "64-bit (x64)",
		"title": "Windows"
	}
} };
var page = {
	"subtitle": "Source builds are active today. Public installers, signing and verification artifacts are still in preparation.",
	"title": "Download Land"
};
var state = {
	"active": "STATUS: SOURCE ACTIVE",
	"activeNote": "Builds from source today. The public installer, signature and checksum for this platform are in preparation.",
	"preparing": "STATUS: PREPARING",
	"preparingNote": "Builds from source today. The public installer, signature and checksum for this platform are in preparation.",
	"noArtifacts": "STATUS: NO PUBLIC ARTIFACTS",
	"noArtifactsNote": "Source builds are active for all three platforms. No installer, checksum or signature has been published yet, so a source build is the only way to run Land today.",
	"unavailable": "UNAVAILABLE"
};
var status = {
	"kicker": "SOURCE ACTIVE INSTALLERS IN PROGRESS",
	"heading": "Land builds from source today. No installer is available to download yet.",
	"standfirst": "macOS, Windows and Linux all build from the repository. None has a published installer, signature or checksum, so a source build is the only way to run Land today.",
	"footnote": "Source build: the two-step build in the Land repository's Documentation/GitHub/Building.md. Installer, signing and checksum status is quoted from this page's release manifest.",
	"sentence": "Nothing here is downloadable yet. Land builds from source on macOS, Windows and Linux; public installers, signing and verification artifacts are still in preparation.",
	"well": "BUILD FROM SOURCE"
};
var requirements = {
	"kicker": "/REQUIREMENTS",
	"heading": "What each platform needs before it builds.",
	"footnote": "Minimum requirements, with the recommended figure in the panel beside it. The processor notes read as a pair: at the minimum your code runs at native CPU speed; at the recommended your work spans every monitor.",
	"toolchain": "BUILD TOOLCHAIN (SOURCE)"
};
var previousReleases = {
	"description": "No public releases yet. Older versions appear here when they ship; until one does, the record prints EMPTY and keeps its address.",
	"title": "Previous Releases",
	"kicker": "/PREVIOUS RELEASES",
	"heading": "Nothing to go back to yet.",
	"state": "RECORD: EMPTY"
};
var subtitle = "Source builds are active today. Public installers, signing and verification artifacts are still in preparation; until they ship, the build from source is the only install path, and the method band above names the six stages that build it.";
var systemRequirements = {
	"minimum": "Minimum Requirements",
	"recommended": "Recommended for the Best Experience",
	"subtitle": "The floor each platform needs before a source build runs, and the figure the project recommends above it.",
	"supportedOS": "Supported Operating Systems",
	"title": "System Requirements"
};
var title = "Download Land";
var verification = {
	"description": "Release downloads publish checksums and signatures when public installers are available.",
	"downloadButton": "View Verification Plan",
	"title": "Verification Ships With Public Releases.",
	"verifyButton": "Verify Download"
};
var labels = {
	"version": "Version:",
	"size": "Size:",
	"requirements": "Requirements:",
	"loading": "Reading the release manifest",
	"errorTitle": "The release manifest did not load",
	"downloadFailed": "The download did not start: no artifact is published for this platform.",
	"downloadFor": "Download for {{platform}}",
	"copiedToClipboard": "{{label}} copied to clipboard.",
	"failedToCopy": "Could not copy {{label}}",
	"sha256Checksum": "SHA-256 Checksum",
	"pgpSignature": "PGP Signature",
	"verificationInstructions": "Verification Instructions",
	"downloadVerification": "Download Verification",
	"integrityCheck": "Integrity Check",
	"copy": "Copy",
	"signedWithKeyId": "Signed with key ID  {{keyId}}"
};
var manifest = {
	"title": "Release Manifest",
	"heading": "Release Manifest",
	"subtitle": "Source builds are active today. Public installers, signing and verification artifacts are still in preparation.",
	"kicker": "/RELEASE MANIFEST",
	"headline": "RELEASE_01 lists three platforms and publishes no artifact.",
	"footnote": "The manifest carries a release index, a channel and a per-platform status. It carries no version, no release date and no artifact size - those print UNAVAILABLE until a public installer publishes them.",
	"empty": "No release is published. The manifest prints the fields it cannot fill as UNAVAILABLE; the source build is the only path that exists."
};
var transparency = {
	"title": "Telemetry Is Compile-Gated in Land.",
	"subtitle": "Telemetry and tracing sit behind named Rust feature gates in the native layer. Nothing is emitted by default; each build profile explicitly lists which paths are compiled in.",
	"kicker": "/TRANSPARENCY"
};
var platform = {
	"field": {
		"arch": "ARCH:",
		"signing": "SIGNING:",
		"size": "SIZE:",
		"checksum": "CHECKSUM:"
	},
	"status": {
		"active": "STATUS: ACTIVE",
		"preparing": "STATUS: PREPARING"
	},
	"note": { "preparation": "STATUS: PREPARING" }
};
var Download_default = {
	card,
	page,
	state,
	status,
	requirements,
	previousReleases,
	subtitle,
	systemRequirements,
	title,
	verification,
	labels,
	manifest,
	transparency,
	platform
};
export { page as a, requirements as c, subtitle as d, systemRequirements as f, verification as h, manifest as i, state as l, transparency as m, card as n, platform as o, title as p, labels as r, previousReleases as s, Download_default as t, status as u };
