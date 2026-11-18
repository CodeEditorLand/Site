import { useEffect, useState } from "react";

import { toast } from "sonner";

import { useTranslation } from "react-i18next";

import { AuthAPI as AuthAPIClass } from "../../Library/API/Authentication";

import { AuthReport } from "../Auth/Report";

import { DynamicButton } from "./DynamicButton";

import { DynamicEmailVerification } from "./DynamicEmailVerification";

import type Property from "./Interface/Property/Page/Verify.js";

const Authentication = new AuthAPIClass();

const NavigateToPath = (Path: string): void => {
	window.location.href = Path;
};

/**
 * VerifyPage - the state machine behind /Verify.
 *
 * Three entry modes: `verify` (a token is in the URL), `pending` (no token,
 * no reason - the email is still waiting to be clicked) and `failure` (the
 * provider sent a reason). Each mode renders a report inside the route's
 * card (`AuthReport`): what the state is, what happened, and the action
 * available. The pending mode is the baseline's own card.
 */
const VerifyPage = ({
	Content,
	Route,
	Token,
	Reason,
	OnVerify,
	OnResend,
	OnNavigate,
}: Property) => {
	const { t: T } = useTranslation("verify");

	const { Verification } = Content;

	const Navigate = OnNavigate || NavigateToPath;

	const [UserEmail, SetUserEmail] = useState<string>("");

	// Extract email from localStorage if available
	useEffect(() => {
		try {
			const UserData = localStorage.getItem("current_user");

			if (UserData) {
				const ParsedUser = JSON.parse(UserData);

				SetUserEmail(ParsedUser.email || "");
			}
		} catch {
			// Not available during SSR
		}
	}, []);

	const HandleVerify = async (VerifyToken: string): Promise<boolean> => {
		try {
			await Authentication.VerifyEmail(VerifyToken);

			toast.success("Email verified successfully!");

			return true;
		} catch (ErrorInstance) {
			const ErrorMessage =
				ErrorInstance instanceof Error
					? ErrorInstance.message
					: "Verification failed";

			toast.error(ErrorMessage);

			return false;
		}
	};

	const HandleResend = async (_Email: string): Promise<boolean> => {
		try {
			await Authentication.ResendVerification();

			toast.success("Verification email sent!");

			return true;
		} catch (ErrorInstance) {
			const ErrorMessage =
				ErrorInstance instanceof Error
					? ErrorInstance.message
					: "Failed to resend email";

			toast.error(ErrorMessage);

			return false;
		}
	};

	return (
		<>
			{(Route === "verify" || Route === "pending") && (
				<DynamicEmailVerification
					Content={Verification}

					{...(Token ? { Token } : {})}

					UserEmail={UserEmail}

					OnVerify={OnVerify || HandleVerify}

					OnResend={OnResend || HandleResend}

					OnNavigate={Navigate}
				/>
			)}

			{Route === "success" && (
				<AuthReport
					Title={T("success.title", {
						defaultValue: "Email verified!",
					})}

					Sentence={
						"Your email has been successfully verified. You can now sign in to your account and start using Code Editor Land."
					}

					Glyph="check"
				>
					<DynamicButton
						Content={{
							Text: "Continue to Homepage",
							Variant: "default",
							ClassName: "auth-shell__primary",
						}}

						OnAction={() => Navigate("/")}
					/>
				</AuthReport>
			)}

			{Route === "failure" && (
				<AuthReport
					Title={T("error.title", {
						defaultValue: "Verification failed",
					})}

					Sentence={
						<>
							{
								"This verification link is invalid or has expired."
							}
							{Reason ? ` Reason: ${Reason}` : null}{" "}
							{
								"Please request a new verification email or contact support if the problem persists."
							}
						</>
					}

					Glyph="alert"
					Role="alert"
				>
					<div className="auth-shell__actions">
						<DynamicButton
							Content={{
								Text: "Send New Verification Email",
								Variant: "default",
								ClassName: "auth-shell__primary",
							}}

							OnAction={() => Navigate("/Verify")}
						/>

						<button
							type="button"
							className="auth-shell__alternate"
							onClick={() => Navigate("/Account/SignIn")}
						>
							{"Sign In"}
						</button>
					</div>
				</AuthReport>
			)}
		</>
	);
};

export { VerifyPage };

export default VerifyPage;
