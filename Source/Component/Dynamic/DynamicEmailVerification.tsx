import { useCallback, useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import { DynamicButton } from "./DynamicButton";

import { DynamicInput } from "./DynamicInput";

import { DynamicStateReport, StateLabel } from "./DynamicStateReport";

import type Property from "./Interface/Property/Verification/Email.js";

import type { default as VerificationState } from "./Type/State/Verification.js";

/**
 * Dynamic EmailVerification component with states: pending, verifying,
 * success, error. Auto-verifies if a token is present in the URL, otherwise
 * shows the pending state with resend.
 *
 * Each state is a report - a status line saying what the state is, one
 * sentence saying what happened, and the action that is available - rendered
 * inside the route's AuthShell, which owns the page frame.
 */
const DynamicEmailVerification = ({
	Content,
	Token: PropToken,
	UserEmail,
	OnVerify,
	OnResend,
	OnNavigate,
	ClassName,
}: Property) => {
	const { t: T } = useTranslation("verify");

	const [State, SetState] = useState<VerificationState>("pending");

	const [, SetToken] = useState<string>(PropToken || "");

	const [Email, SetEmail] = useState<string>(UserEmail || "");

	const [ErrorMessage, SetErrorMessage] = useState("");

	const [ResendSuccess, SetResendSuccess] = useState(false);

	const [ResendCooldown, SetResendCooldown] = useState(0);

	const CooldownInterval = useRef<ReturnType<typeof setInterval> | null>(
		null,
	);

	const HandleVerify = useCallback(
		async (VerifyToken: string) => {
			try {
				const Success = OnVerify ? await OnVerify(VerifyToken) : true; // Mock success for demo

				if (Success) {
					SetState("success");
				} else {
					SetState("error");

					SetErrorMessage(Content.Error.Description);
				}
			} catch {
				SetState("error");

				SetErrorMessage(
					T("errorGeneric", {
						defaultValue:
							"An error occurred during verification.\nPlease try again.",
					}),
				);
			}
		},

		[OnVerify, Content.Error.Description],
	);

	// Auto-verify if token in URL
	useEffect(() => {
		const UrlToken =
			PropToken ||
			new URLSearchParams(window.location.search).get("token");

		if (UrlToken) {
			SetToken(UrlToken);

			SetState("verifying");

			HandleVerify(UrlToken);
		}
	}, [PropToken, HandleVerify]);

	const StartCooldown = () => {
		SetResendCooldown(60);

		CooldownInterval.current = setInterval(() => {
			SetResendCooldown((Previous) => {
				if (Previous <= 1) {
					if (CooldownInterval.current) {
						clearInterval(CooldownInterval.current);

						CooldownInterval.current = null;
					}

					return 0;
				}

				return Previous - 1;
			});
		}, 1000);
	};

	useEffect(() => {
		return () => {
			if (CooldownInterval.current) {
				clearInterval(CooldownInterval.current);
			}
		};
	}, []);

	const HandleResend = async () => {
		if (!Email || ResendCooldown > 0) return;

		try {
			(await OnResend?.(Email)) || Promise.resolve(true);

			SetResendSuccess(true);

			StartCooldown();

			setTimeout(() => SetResendSuccess(false), 5000);
		} catch {
			SetErrorMessage(
				T("resendFailed", {
					defaultValue: "Failed to resend email.\nPlease try again.",
				}),
			);
		}
	};

	const PendingStatus = T("auth.pendingStatus", {
		defaultValue: StateLabel.Preparing,
	});

	const VerifyingStatus = T("auth.verifyingStatus", {
		defaultValue: StateLabel.Loading,
	});

	const VerifiedStatus = T("auth.verifiedStatus", {
		defaultValue: StateLabel.Verified,
	});

	const FailedStatus = T("auth.failedStatus", {
		defaultValue: StateLabel.Interrupted,
	});

	const RenderPending = () => (
		<DynamicStateReport
			Label={PendingStatus}
			Tone="quiet"
			Sentence={Content.Pending.Description}
			Action={
				<div className="auth-shell__field">
					<DynamicInput
						Content={{
							Label: T("emailLabel", { defaultValue: "Email" }),
							Placeholder: T("emailPlaceholder", {
								defaultValue: "Enter your email address",
							}),
							Type: "email",
							Value: Email,
							OnChange: SetEmail,
						}}
						Id="email"
					/>

					<DynamicButton
						Content={{
							...Content.Pending.ResendButton,
							Text:
								ResendCooldown > 0
									? T("resendCooldown", {
											defaultValue:
												"Resend in {{seconds}}s",
											seconds: ResendCooldown,
										})
									: (Content.Pending.ResendButton.Text ?? ""),
							FullWidth: true,
							Disabled: !Email || ResendCooldown > 0,
							Variant: "default",
							ClassName: "auth-shell__primary",
						}}
						OnAction={HandleResend}
					/>

					{ResendSuccess && (
						<p className="auth-shell__note" role="status">
							{Content.Pending.ResendSuccessMessage ||
								T("resendSuccess", {
									defaultValue: "Verification email resent!",
								})}
						</p>
					)}

					{Content.Pending.EmailSentMessage && (
						<p className="auth-shell__note">
							{Content.Pending.EmailSentMessage}
						</p>
					)}
				</div>
			}
		/>
	);

	const RenderVerifying = () => (
		<DynamicStateReport
			Label={VerifyingStatus}
			Tone="ink"
			Loading
			Sentence={
				Content.Verifying?.Description ||
				T("verifying.description", {
					defaultValue:
						"Please wait while we verify your email address...",
				})
			}
			Action={
				<a href="/" className="auth-shell__alternate">
					{T("backToEditor", { defaultValue: "Back to the editor" })}
				</a>
			}
		/>
	);

	const RenderSuccess = () => (
		<DynamicStateReport
			Label={VerifiedStatus}
			Tone="specimen"
			Sentence={Content.Success.Description}
			Action={
				<DynamicButton
					Content={{
						...Content.Success.ContinueButton,
						FullWidth: true,
						Variant: "default",
						ClassName: "auth-shell__primary",
					}}
					OnAction={() => OnNavigate?.("/Dashboard")}
				/>
			}
		/>
	);

	const RenderError = () => (
		<DynamicStateReport
			Role="alert"
			Label={FailedStatus}
			Tone="strong"
			Sentence={ErrorMessage || Content.Error.Description}
			Action={
				<DynamicButton
					Content={{
						...Content.Error.BackToSignInButton,
						FullWidth: true,
						Variant: "default",
						ClassName: "auth-shell__primary",
					}}
					OnAction={() => OnNavigate?.("/Account/SignIn")}
				/>
			}
		/>
	);

	return (
		<div className={`auth-shell__form ${ClassName || ""}`}>
			{State === "pending" && RenderPending()}
			{State === "verifying" && RenderVerifying()}
			{State === "success" && RenderSuccess()}
			{State === "error" && RenderError()}
		</div>
	);
};

export { DynamicEmailVerification };

export default DynamicEmailVerification;
