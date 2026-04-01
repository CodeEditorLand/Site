import { Download, Fingerprint, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

import { DynamicButton } from "./DynamicButton";
import type VerificationInfo from "./Interface/Information/Verification.js";
import type Property from "./Interface/Property/Information/Verification.js";

/**
 * Dynamic VerificationInfo component for displaying binary verification info
 * Shows SHA-256 checksums and PGP signatures with copy functionality
 */
export function DynamicVerificationInfo({
	content,
	onVerify,
	_onDownloadSignature,
	className,
}: Property) {
	const { t: T } = useTranslation("download");
	const { title, description, downloadVerification, integrityVerification } =
		content;

	const CopyToClipboard = (Text: string, Label: string) => {
		navigator.clipboard
			.writeText(Text)
			.then(() => {
				alert(
					T("labels.copiedToClipboard", {
						defaultValue: "{{label}} copied to clipboard!",
						label: Label,
					}),
				);
			})
			.catch(() => {
				alert(
					T("labels.failedToCopy", {
						defaultValue: "Failed to copy {{label}}",
						label: Label,
					}),
				);
			});
	};

	const RenderVerificationBlock = (
		Information: VerificationInfo,
		Type: "download" | "integrity",
	) => (
		<div className="space-y-4">
			{Information.sha256 && (
				<div className="space-y-2">
					<div className="flex items-center">
						<span className="font-semibold">SHA-256 Checksum</span>
						{"\u2001"}
						<Fingerprint
							className="h-4 w-4 shrink-0 text-primary"
							aria-hidden="true"
						/>
					</div>
					<div className="bg-muted/50 flex items-center gap-2 border border-[var(--Border)] p-3">
						<code className="flex-1 truncate font-mono text-sm">
							{Information.sha256}
						</code>
						<button
							type="button"
							className="border border-[var(--Border)] px-3 py-1 text-xs transition-colors hover:bg-accent"
							aria-label="Copy SHA-256 checksum to clipboard"
							onClick={() =>
								CopyToClipboard(
									Information.sha256!,
									"SHA-256 checksum",
								)
							}>
							Copy
						</button>
					</div>
				</div>
			)}

			{Information.pgpSignature && (
				<div className="space-y-2">
					<div className="flex items-center">
						<span className="font-semibold">PGP Signature</span>
						{"\u2001"}
						<Shield
							className="h-4 w-4 shrink-0 text-primary"
							aria-hidden="true"
						/>
					</div>
					<div className="bg-muted/50 flex items-center gap-2 border border-[var(--Border)] p-3">
						<code className="flex-1 truncate font-mono text-sm">
							{Information.pgpSignature}
						</code>
						<button
							type="button"
							className="border border-[var(--Border)] px-3 py-1 text-xs transition-colors hover:bg-accent"
							aria-label="Copy PGP signature to clipboard"
							onClick={() =>
								CopyToClipboard(
									Information.pgpSignature,
									"PGP signature",
								)
							}>
							Copy
						</button>
					</div>
					{Information.signingKeyId && (
						<p className="text-xs text-muted-foreground">
							Signed with key ID: {Information.signingKeyId}
						</p>
					)}
				</div>
			)}

			{Information.verificationInstructions && (
				<div className="border-t border-[var(--Border)] pt-4">
					<h5 className="mb-2 font-semibold">
						Verification Instructions
					</h5>
					<p className="whitespace-pre-line text-sm text-muted-foreground">
						{Information.verificationInstructions}
					</p>
				</div>
			)}

			{Type === "download" && content.downloadButton && (
				<div className="pt-4">
					<DynamicButton
						content={{ ...content.downloadButton, fullWidth: true }}
					/>
				</div>
			)}

			{Type === "integrity" && content.verifyButton && (
				<div className="pt-4">
					<DynamicButton
						content={{ ...content.verifyButton, fullWidth: true }}
						onAction={() =>
							onVerify?.(integrityVerification.sha256 || "")
						}
					/>
				</div>
			)}
		</div>
	);

	return (
		<section
			className={`py-20 ${className || ""}`}
			aria-label="Download verification">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-4xl">
					{(title || description) && (
						<div className="mb-12 text-center">
							{title && (
								<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
									{title}
								</h2>
							)}
							{description && (
								<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
									{description}
								</p>
							)}
						</div>
					)}

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						{/* Download Verification */}
						<div className="StaccatoCard StaccatoBorderShimmer rounded-none border border-[var(--Border)] bg-white p-6">
							<h3 className="mb-4 flex items-center text-xl font-semibold">
								Download Verification
								{"\u2001"}
								<Download
									className="h-5 w-5 shrink-0"
									aria-hidden="true"
								/>
							</h3>
							{RenderVerificationBlock(
								downloadVerification,
								"download",
							)}
						</div>

						{/* Integrity Verification */}
						<div className="StaccatoCard StaccatoBorderShimmer rounded-none border border-primary bg-white p-6">
							<h3 className="mb-4 flex items-center text-xl font-semibold">
								Integrity Check
								{"\u2001"}
								<Shield
									className="h-5 w-5 shrink-0"
									aria-hidden="true"
								/>
							</h3>
							{RenderVerificationBlock(
								integrityVerification,
								"integrity",
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
