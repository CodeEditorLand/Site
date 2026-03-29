import { Download, Fingerprint, Shield } from "lucide-react";
import React from "react";

interface VerificationInfoProps {
	title: string;
	description: string;
	downloadVerification: {
		sha256: string;
		pgpSignature: string;
		signingKeyId: string;
	};
	integrityVerification: {
		sha256: string;
		pgpSignature: string;
		verificationInstructions: string;
	};
	onDownloadSignature: () => void;
	onVerify: (checksum: string) => void;
	className?: string;
}

/**
 * VerificationInfo component for displaying binary verification information
 * Shows SHA-256 checksums and PGP signatures with copy functionality
 */
export function VerificationInfo({
	title,
	description,
	downloadVerification,
	integrityVerification,
	onDownloadSignature,
	onVerify,
	className,
}: VerificationInfoProps) {
	const copyToClipboard = (text: string): void => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				alert("Copied to clipboard!");
			})
			.catch(() => {
				alert("Failed to copy");
			});
	};

	return (
		<section className={`py-20 ${className || ""}`}>
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-4xl">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
							{title}
						</h2>
						<p className="text-muted-foreground mx-auto max-w-2xl text-lg">
							{description}
						</p>
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						{/* Download Verification */}
						<div className="border-border rounded-none border-[3px] p-6 shadow-lg">
							<h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
								<Download className="h-5 w-5" />
								Download Verification
							</h3>
							<div className="space-y-4">
								{downloadVerification.sha256 && (
									<div className="space-y-2">
										<div className="flex items-center gap-2">
											<Fingerprint className="text-primary h-4 w-4" />
											<span className="font-semibold">
												SHA-256 Checksum
											</span>
										</div>
										<div className="bg-muted/50 border-border flex items-center gap-2 border p-3">
											<code className="flex-1 truncate font-mono text-sm">
												{downloadVerification.sha256}
											</code>
											<button
												type="button"
												className="border-border hover:bg-accent border px-3 py-1 text-xs transition-colors"
												onClick={() =>
													copyToClipboard(
														downloadVerification.sha256,
													)
												}>
												Copy
											</button>
										</div>
									</div>
								)}

								{downloadVerification.pgpSignature && (
									<div className="space-y-2">
										<div className="flex items-center gap-2">
											<Shield className="text-primary h-4 w-4" />
											<span className="font-semibold">
												PGP Signature
											</span>
										</div>
										<div className="bg-muted/50 border-border flex items-center gap-2 border p-3">
											<code className="flex-1 truncate font-mono text-sm">
												{
													downloadVerification.pgpSignature
												}
											</code>
											<button
												type="button"
												className="border-border hover:bg-accent border px-3 py-1 text-xs transition-colors"
												onClick={() =>
													copyToClipboard(
														downloadVerification.pgpSignature,
													)
												}>
												Copy
											</button>
										</div>
										{downloadVerification.signingKeyId && (
											<p className="text-muted-foreground text-xs">
												Signed with key ID:{" "}
												{
													downloadVerification.signingKeyId
												}
											</p>
										)}
									</div>
								)}

								<button
									type="button"
									className="border-border bg-muted hover:bg-muted/80 text-foreground mt-4 inline-flex h-10 items-center justify-center gap-2 border-[3px] px-4 py-2 text-sm font-medium transition-colors"
									onClick={onDownloadSignature}>
									<Download className="h-4 w-4" />
									Download PGP Public Key
								</button>
							</div>
						</div>

						{/* Integrity Verification */}
						<div className="border-primary rounded-none border-[3px] p-6 shadow-xl">
							<h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
								<Shield className="h-5 w-5" />
								Integrity Check
							</h3>
							<div className="space-y-4">
								{integrityVerification.sha256 && (
									<div className="space-y-2">
										<div className="flex items-center gap-2">
											<Fingerprint className="text-primary h-4 w-4" />
											<span className="font-semibold">
												SHA-256 Checksum
											</span>
										</div>
										<div className="bg-muted/50 border-border flex items-center gap-2 border p-3">
											<input
												type="text"
												placeholder={
													integrityVerification.sha256
												}
												className="flex-1 bg-transparent font-mono text-sm outline-none"
											/>
											<button
												type="button"
												className="border-border hover:bg-accent border px-3 py-1 text-xs transition-colors"
												onClick={() =>
													onVerify(
														integrityVerification.sha256,
													)
												}>
												Verify
											</button>
										</div>
									</div>
								)}

								{integrityVerification.pgpSignature && (
									<div className="space-y-2">
										<div className="flex items-center gap-2">
											<Shield className="text-primary h-4 w-4" />
											<span className="font-semibold">
												PGP Signature
											</span>
										</div>
										<div className="bg-muted/50 border-border flex items-center gap-2 border p-3">
											<code className="flex-1 truncate font-mono text-sm">
												{
													integrityVerification.pgpSignature
												}
											</code>
											<button
												type="button"
												className="border-border hover:bg-accent border px-3 py-1 text-xs transition-colors"
												onClick={() =>
													copyToClipboard(
														integrityVerification.pgpSignature,
													)
												}>
												Copy
											</button>
										</div>
									</div>
								)}

								{integrityVerification.verificationInstructions && (
									<div className="border-border border-t pt-4">
										<h5 className="mb-2 font-semibold">
											Verification Instructions
										</h5>
										<p className="text-muted-foreground whitespace-pre-line text-sm">
											{
												integrityVerification.verificationInstructions
											}
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default VerificationInfo;
