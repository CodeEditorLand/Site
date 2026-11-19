// Source/Library/I18n/Locale/Es/Download.json
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
	"subtitle": "Source builds are active today. Public installers, signing, and verification artifacts are still being prepared.",
	"title": "Download Land"
};
var previousReleases = {
	"description": "No public releases yet. Older versions will appear here once public releases ship.",
	"title": "Previous Releases"
};
var subtitle = "Source builds are active today. Public installers, signing, and verification artifacts are still being prepared.";
var systemRequirements = {
	"minimum": "Minimum Requirements",
	"recommended": "Recommended for the Best Experience",
	"subtitle": "A quick check before you download saves a reinstall later.",
	"supportedOS": "Supported Operating Systems",
	"title": "System Requirements"
};
var title = "Download Land";
var verification = {
	"description": "Release downloads will publish checksum and signature material when public installers are available.",
	"downloadButton": "View Verification Plan",
	"title": "Verification Will Ship With Public Releases.",
	"verifyButton": "Verify Download"
};
var labels = {
	"version": "Version:",
	"size": "Size:",
	"requirements": "Requirements:",
	"loading": "Loading available downloads...",
	"errorTitle": "Could not load downloads",
	"downloadFailed": "Download failed. Please try again.",
	"downloadFor": "Download for {{platform}}",
	"copiedToClipboard": "{{label}} copied to clipboard.",
	"failedToCopy": "Could not copy {{label}}",
	"sha256Checksum": "SHA-256 Checksum",
	"pgpSignature": "PGP Signature",
	"verificationInstructions": "Verification Instructions",
	"downloadVerification": "Download Verification",
	"integrityCheck": "Integrity Check",
	"copy": "Copy",
	"signedWithKeyId": "Signed with key ID {{keyId}}"
};
var manifest = {
	"title": "Release Manifest",
	"heading": "Release Manifest",
	"subtitle": "Source builds are active today. Public installers, signing, and verification artifacts are still being prepared."
};
var transparency = {
	"title": "Telemetry Is Compile-Gated in Land.",
	"subtitle": "Telemetry and tracing are behind named Rust feature gates in the native layer. Nothing is emitted by default. Each build profile explicitly lists which paths are compiled in."
};
var Download_default = {
	card,
	page,
	previousReleases,
	subtitle,
	systemRequirements,
	title,
	verification,
	labels,
	manifest,
	transparency
};
export { page as a, systemRequirements as c, verification as d, manifest as i, title as l, card as n, previousReleases as o, labels as r, subtitle as s, Download_default as t, transparency as u };
