import { Download, Fingerprint, Shield } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

import { DynamicButton } from "./DynamicButton";
import type { ButtonContent } from "./types";

interface VerificationInfo {
	sha256?: string;
	pgpSignature?: string;
	signingKeyId?: string;
	verificationInstructions?: string;
}

interface VerificationInfoContent {
	title: string;
	description?: string;
	downloadVerification: VerificationInfo;
	integrityVerification: VerificationInfo;
	downloadButton?: ButtonContent;
	verifyButton?: ButtonContent;
}

interface DynamicVerificationInfoProps {
	content: VerificationInfoContent;
	onVerify?: (checksum: string) => void;
	onDownloadSignature?: () => void;
	className?: string;
}

/**
 * Dynamic VerificationInfo component for displaying binary verification info
 * Shows SHA-256 checksums and PGP signatures with copy functionality
 */
export function DynamicVerificationInfo({
	content,
	onVerify,
	onDownloadSignature,
	className,
}: DynamicVerificationInfoProps) {
	const { t } = useTranslation("download");
	const { title, description, downloadVerification, integrityVerification } =
		content;

	const copyToClipboard = (text: string, label: string) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				alert(
					t("labels.copiedToClipboard", {
						defaultValue: "{{label}} copied to clipboard!",
						label,
					}),
				);
			})
			.catch(() => {
				alert(
					t("labels.failedToCopy", {
						defaultValue: "Failed to copy {{label}}",
						label,
					}),
				);
			});
	};

	const renderVerificationBlock = (
		info: VerificationInfo,
		type: "download" | "integrity",
	) => (
		<div className="space-y-4">
			{info.sha256 && (
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<Fingerprint
							className="h-4 w-4 text-primary"
							aria-hidden="true"
						/>
						<span className="font-semibold">SHA-256 Checksum</span>
					</div>
					<div className="bg-muted/50 flex items-center gap-2 border border-[var(--border)] p-3">
						<code className="flex-1 truncate font-mono text-sm">
							{info.sha256}
						</code>
						<button
							type="button"
							className="border border-[var(--border)] px-3 py-1 text-xs transition-colors hover:bg-accent"
							aria-label="Copy SHA-256 checksum to clipboard"
							onClick={() =>
								copyToClipboard(
									info.sha256!,
									"SHA-256 checksum",
								)
							}>
							Copy
						</button>
					</div>
				</div>
			)}

			{info.pgpSignature && (
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<Shield
							className="h-4 w-4 text-primary"
							aria-hidden="true"
						/>
						<span className="font-semibold">PGP Signature</span>
					</div>
					<div className="bg-muted/50 flex items-center gap-2 border border-[var(--border)] p-3">
						<code className="flex-1 truncate font-mono text-sm">
							{info.pgpSignature}
						</code>
						<button
							type="button"
							className="border border-[var(--border)] px-3 py-1 text-xs transition-colors hover:bg-accent"
							aria-label="Copy PGP signature to clipboard"
							onClick={() =>
								copyToClipboard(
									info.pgpSignature,
									"PGP signature",
								)
							}>
							Copy
						</button>
					</div>
					{info.signingKeyId && (
						<p className="text-xs text-muted-foreground">
							Signed with key ID: {info.signingKeyId}
						</p>
					)}
				</div>
			)}

			{info.verificationInstructions && (
				<div className="border-t border-[var(--border)] pt-4">
					<h5 className="mb-2 font-semibold">
						Verification Instructions
					</h5>
					<p className="whitespace-pre-line text-sm text-muted-foreground">
						{info.verificationInstructions}
					</p>
				</div>
			)}

			{type === "download" && content.downloadButton && (
				<div className="pt-4">
					<DynamicButton
						content={{ ...content.downloadButton, fullWidth: true }}
					/>
				</div>
			)}

			{type === "integrity" && content.verifyButton && (
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
						<div className="bg-white/92 !rounded-none border border-[var(--border)] p-6">
							<h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
								<Download
									className="h-5 w-5"
									aria-hidden="true"
								/>
								Download Verification
							</h3>
							{renderVerificationBlock(
								downloadVerification,
								"download",
							)}
						</div>

						{/* Integrity Verification */}
						<div className="bg-white/92 !rounded-none border border-primary p-6">
							<h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
								<Shield
									className="h-5 w-5"
									aria-hidden="true"
								/>
								Integrity Check
							</h3>
							{renderVerificationBlock(
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

export type { VerificationInfo, VerificationInfoContent };
