import { useEffect, useState } from "react";

import { toast } from "sonner";

import { useTranslation } from "react-i18next";

import { AuthAPI as AuthAPIClass } from "../../Library/API/Authentication";

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
 * AuthShell: what the state is, what happened, and the action available.
 */
const VerifyPage = ({
	Content,
	Route,
	Token,
	Reason,
	ClassName,
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

	const VerifiedStatus = T("auth.verifiedStatus", {
		defaultValue: "EMAIL VERIFIED",
	});

	const ExpiredStatus = T("auth.expiredStatus", {
		defaultValue: "LINK EXPIRED",
	});

	return (
		<div className={`auth-shell__form ${ClassName || ""}`}>
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
				<div className="auth-shell__report" role="status">
					<p className="auth-shell__status auth-shell__status--success">
						{VerifiedStatus}
					</p>

					<p className="auth-shell__report-sentence">
						{
							"Your email has been successfully verified. You can now sign in to your account and start using Code Editor Land."
						}
					</p>

					<button
						type="button"
						className="auth-shell__primary emphasis-expressive"
						onClick={() => Navigate("/")}
					>
						{"Continue to Homepage"}
					</button>
				</div>
			)}

			{Route === "failure" && (
				<div className="auth-shell__report" role="alert">
					<p className="auth-shell__status auth-shell__status--failure">
						{ExpiredStatus}
					</p>

					<p className="auth-shell__report-sentence">
						{Reason
							? `Error: ${Reason}`
							: "This verification link is invalid or has expired."}
					</p>

					<p className="auth-shell__report-sentence">
						{
							"Please request a new verification email or contact support if the problem persists."
						}
					</p>

					<div className="auth-shell__actions">
						<button
							type="button"
							className="auth-shell__primary emphasis-expressive"
							onClick={() => Navigate("/Verify")}
						>
							{"Send New Verification Email"}
						</button>

						<button
							type="button"
							className="auth-shell__alternate"
							onClick={() => Navigate("/Account/SignIn")}
						>
							{"Sign In"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export { VerifyPage };

export default VerifyPage;
