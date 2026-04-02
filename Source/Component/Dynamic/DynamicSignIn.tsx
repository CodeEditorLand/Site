import React, { useState } from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../UI/Card";
import { DynamicButton } from "./DynamicButton";
import { DynamicInput } from "./DynamicInput";
import type Property from "./Interface/Property/SignIn.js";

/**
 * Dynamic SignIn component that accepts form schema
 * Renders email/password form with optional OAuth and footer links
 */
const DynamicSignIn = ({
	Content,
	OnSubmit,
	OnOAuth,
	OnNavigate,
	ClassName,
	IsLoading = false,
	ErrorMessage,
}: Property) => {
	const {
		Title,
		Description,
		EmailField,
		PasswordField,
		SubmitButton,
		OauthButton,
		ShowDivider = true,
		FooterLinks,
	} = Content;
	const [Email, SetEmail] = useState("");
	const [Password, SetPassword] = useState("");
	const [, SetErrors] = useState<{ email?: string; password?: string }>({});

	const Validate = () => {
		const NewErrors: { email?: string; password?: string } = {};

		if (!Email) {
			NewErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(Email)) {
			NewErrors.email = "Please enter a valid email";
		}

		if (!Password) {
			NewErrors.password = "Password is required";
		}

		SetErrors(NewErrors);
		return Object.keys(NewErrors).length === 0;
	};

	const HandleSubmit = (Event: React.FormEvent) => {
		Event.preventDefault();
		if (!IsLoading && Validate()) {
			OnSubmit?.(Email, Password);
		}
	};

	return (
		<section className="py-20" aria-label="Sign in">
			<div className="container mx-auto px-4">
				<div className={`mx-auto max-w-md ${ClassName}`}>
					<Card className="StaccatoCard StaccatoBorderShimmer StaccatoShadowLift">
						<CardHeader className="space-y-1 text-center">
							<CardTitle className="text-2xl">{Title}</CardTitle>
							<CardDescription>{Description}</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								className="space-y-4"
								onSubmit={HandleSubmit}
								aria-label="Sign in form">
								<div aria-live="polite" aria-atomic="true">
									{ErrorMessage && (
										<div
											className="bg-destructive/10 rounded-none p-3 text-sm text-destructive"
											role="alert">
											{ErrorMessage}
										</div>
									)}
								</div>

								<DynamicInput
									Content={{
										...EmailField,
										OnChange: SetEmail,
									}}
									Id="email"
								/>

								<DynamicInput
									Content={{
										...PasswordField,
										Type: "password",
										OnChange: SetPassword,
									}}
									Id="password"
								/>

								<DynamicButton
									Content={{
										...SubmitButton,
										Type: "submit",
										FullWidth: true,
									}}
									IsLoading={IsLoading}
								/>
							</form>

							{ShowDivider && (
								<div className="relative my-6">
									<div className="absolute inset-0 flex items-center">
										<span className="StaccatoSeparator w-full border-t" />
									</div>
									<div className="relative flex justify-center text-xs uppercase">
										<span className="bg-background px-2 text-muted-foreground">
											{"Or"}
										</span>
									</div>
								</div>
							)}

							{OauthButton && (
								<DynamicButton
									Content={{
										...OauthButton,
										FullWidth: true,
									}}
									{...(OnOAuth ? { OnAction: OnOAuth } : {})}
								/>
							)}
						</CardContent>
						<CardFooter className="flex flex-col gap-3 text-center text-sm">
							{FooterLinks?.SignUp && (
								<div>
									<button
										type="button"
										className="font-medium text-primary hover:underline"
										onClick={() =>
											FooterLinks.SignUp &&
											OnNavigate?.(
												FooterLinks.SignUp.Href,
											)
										}>
										{FooterLinks.SignUp.Label}
									</button>
									<p className="mt-1 text-xs text-muted-foreground">
										Don't have an account?
									</p>
								</div>
							)}
							{FooterLinks?.ForgotPassword && (
								<div>
									<button
										type="button"
										className="font-medium text-primary hover:underline"
										onClick={() =>
											FooterLinks.ForgotPassword &&
											OnNavigate?.(
												FooterLinks.ForgotPassword.Href,
											)
										}>
										{FooterLinks.ForgotPassword.Label}
									</button>
									<p className="mt-1 text-xs text-muted-foreground">
										Forgot your password?
									</p>
								</div>
							)}
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
};

export { DynamicSignIn };

export default DynamicSignIn;
