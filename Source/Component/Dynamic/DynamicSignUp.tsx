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
import { DynamicCheckbox } from "./DynamicCheckbox";
import { DynamicInput } from "./DynamicInput";
import type Property from "./Interface/Property/SignUp.js";

/**
 * Dynamic SignUp component that accepts registration form schema
 * Renders email, password, confirm password, terms checkbox, social OAuth
 */
const DynamicSignUp = ({
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
		ConfirmPasswordField,
		TermsCheckbox,
		SubmitButton,
		OauthButtons = [],
		ShowDivider = true,
		FooterLinks,
	} = Content;

	const [Email, SetEmail] = useState("");
	const [Password, SetPassword] = useState("");
	const [ConfirmPassword, SetConfirmPassword] = useState("");
	const [TermsAccepted, SetTermsAccepted] = useState(false);
	const [Errors, SetErrors] = useState<{
		email?: string;
		password?: string;
		confirmPassword?: string;
		terms?: string;
	}>({});

	const Validate = () => {
		const NewErrors: typeof Errors = {};

		if (!Email) {
			NewErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(Email)) {
			NewErrors.email = "Please enter a valid email";
		}

		if (!Password) {
			NewErrors.password = "Password is required";
		} else if (Password.length < 8) {
			NewErrors.password = "Password must be at least 8 characters";
		}

		if (!ConfirmPassword) {
			NewErrors.confirmPassword = "Please confirm your password";
		} else if (Password !== ConfirmPassword) {
			NewErrors.confirmPassword = "Passwords do not match";
		}

		if (!TermsAccepted) {
			NewErrors.terms = "You must accept the terms and conditions";
		}

		SetErrors(NewErrors);
		return Object.keys(NewErrors).length === 0;
	};

	const HandleSubmit = (Event: React.FormEvent) => {
		Event.preventDefault();
		if (Validate()) {
			OnSubmit?.(Email, Password, ConfirmPassword, TermsAccepted);
		}
	};

	return (
		<section className="py-20" aria-label="Sign up">
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
								aria-label="Sign up form">
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

								<DynamicInput
									Content={{
										...ConfirmPasswordField,
										Type: "password",
										OnChange: SetConfirmPassword,
									}}
									Id="confirmPassword"
								/>

								<DynamicCheckbox
									Content={{
										...TermsCheckbox,
										Checked: TermsAccepted,
										OnChange: SetTermsAccepted,
									}}
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

							{ShowDivider && OauthButtons.length > 0 && (
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

							{OauthButtons.length > 0 && (
								<div className="space-y-3">
									{OauthButtons.map((ButtonItem, Index) => (
										<DynamicButton
											key={Index}
											Content={{
												...ButtonItem,
												FullWidth: true,
											}}
											OnAction={() =>
												OnOAuth?.(ButtonItem.Icon as string)
											}
										/>
									))}
								</div>
							)}
						</CardContent>
						<CardFooter className="flex flex-col gap-3 text-center text-sm">
							{FooterLinks?.SignIn && (
								<div>
									<button
										type="button"
										className="font-medium text-primary hover:underline"
										onClick={() =>
											FooterLinks.SignIn &&
											OnNavigate?.(
												FooterLinks.SignIn.Href,
											)
										}>
										{FooterLinks.SignIn.Label}
									</button>
									<p className="mt-1 text-xs text-muted-foreground">
										Already have an account?
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

export { DynamicSignUp };

export default DynamicSignUp;
