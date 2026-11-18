import { useCallback, useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import { AuthReport } from "../Auth/Report";

import { DynamicButton } from "./DynamicButton";

import { DynamicInput } from "./DynamicInput";

import { StateLabel } from "./DynamicStateReport";

import type Property from "./Interface/Property/Verification/Email.js";

import type { default as VerificationState } from "./Type/State/Verification.js";

/**
 * Dynamic EmailVerification component with states: pending, verifying,
 * success, error. Auto-verifies if a token is present in the URL, otherwise
 * shows the pending state with resend.
 *
 * Every state is a report in the card's own anatomy (`AuthReport`): the
 * state's coded label, the state's title as an `h2`, one sentence saying what
 * happened, and the action that is available. The pending state is the
 * baseline's - the mail tile, the `Verify Your Email Address` heading, the
 * four-sentence paragraph, the labelled email field and the full-width resend
 * button.
 *
 * **The label is the vocabulary, and it was missing.** `Verify.json` carried
 * `auth.pendingStatus`, `auth.verifyingStatus`, `auth.verifiedStatus` and
 * `auth.failedStatus` - `STATUS: PREPARING`, `LOADING`, `VERIFIED`,
 * `INTERRUPTED` - and this component read none of them, so /Verify printed its
 * states as prose and never printed the word. Each branch now passes its own
 * locale key, so the words in that file are the words this route prints, and
 * their tones come from `State.ts` rather than from a branch's opinion about
 * how bad the news is. (The file's fifth key, `auth.expiredStatus`, is the
 * failure route's - `pages/Verify.astro` prints it when the provider says the
 * link expired.)
 */
const DynamicEmailVerification = ({
	Content,
	Token: PropToken,
	UserEmail,
	OnVerify,
	OnResend,
	OnNavigate,
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
							"The check did not complete: the provider returned no answer for this token. Requesting a new link is the next step.",
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
					defaultValue:
						"The resend did not go out: the provider rejected the request. The existing link still works until it expires.",
				}),
			);
		}
	};

	const RenderPending = () => (
		<AuthReport
			State={T("auth.pendingStatus", {
				defaultValue: StateLabel.Preparing,
			})}
			Title={Content.Pending.Title}
			Sentence={Content.Pending.Description}
			Glyph="mail"
		>
			<div className="space-y-4">
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
										defaultValue: "Resend in {{seconds}}s",
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
		</AuthReport>
	);

	const RenderVerifying = () => (
		<AuthReport
			State={T("auth.verifyingStatus", {
				defaultValue: StateLabel.Loading,
			})}
			Title={
				Content.Verifying?.Title ||
				T("verifying.title", { defaultValue: "Verifying your email" })
			}
			Sentence={
				Content.Verifying?.Description ||
				T("verifying.description", {
					defaultValue:
						"Please wait while we verify your email address...",
				})
			}
			Glyph="loading"
			Role="status"
		>
			<a href="/" className="auth-shell__alternate">
				{T("backToEditor", { defaultValue: "Back to the editor" })}
			</a>
		</AuthReport>
	);

	const RenderSuccess = () => (
		<AuthReport
			State={T("auth.verifiedStatus", {
				defaultValue: StateLabel.Verified,
			})}
			Title={Content.Success.Title}
			Sentence={Content.Success.Description}
			Glyph="check"
		>
			<DynamicButton
				Content={{
					...Content.Success.ContinueButton,
					FullWidth: true,
					Variant: "default",
					ClassName: "auth-shell__primary",
				}}
				OnAction={() => OnNavigate?.("/Dashboard")}
			/>
		</AuthReport>
	);

	const RenderError = () => (
		<AuthReport
			State={T("auth.failedStatus", {
				defaultValue: StateLabel.Interrupted,
			})}
			Title={Content.Error.Title}
			Sentence={ErrorMessage || Content.Error.Description}
			Glyph="alert"
			Role="alert"
		>
			<DynamicButton
				Content={{
					...Content.Error.BackToSignInButton,
					FullWidth: true,
					Variant: "default",
					ClassName: "auth-shell__primary",
				}}
				OnAction={() => OnNavigate?.("/Account/SignIn")}
			/>
		</AuthReport>
	);

	return (
		<>
			{State === "pending" && RenderPending()}
			{State === "verifying" && RenderVerifying()}
			{State === "success" && RenderSuccess()}
			{State === "error" && RenderError()}
		</>
	);
};

export { DynamicEmailVerification };

export default DynamicEmailVerification;
