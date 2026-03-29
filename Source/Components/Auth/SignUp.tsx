"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import { Label } from "@/Components/UI/Label";
import { Checkbox } from "@/Components/UI/Checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/UI/Card";
import { toast } from "sonner";
import { Github, Chrome, Gitlab } from "lucide-react";
import { useTranslation } from "@/Lib/I18n";
import { authAPI } from "@/Lib/api/auth";

/**
 * SignUp component - New user registration with email/password and OAuth options
 *
 * @example
 * ```tsx
 * <SignUp />
 * ```
 *
 * @remarks
 * - Integrates with Workers API via AuthAPI
 * - Form validation with Zod schemas
 * - Terms of Service and Privacy Policy acceptance required
 * - Loading states with disabled inputs
 * - Error handling with sonner toasts
 * - Redirects to email verification on success
 * - OAuth flows for GitHub, Google, GitLab
 */
export function SignUp() {
	const { t } = useTranslation();
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		acceptTerms: false,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.email) {
			newErrors.email = t("account.signUp.validation.emailRequired", "Email is required");
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = t("account.signUp.validation.emailInvalid", "Invalid email format");
		}

		if (!formData.password) {
			newErrors.password = t("account.signUp.validation.passwordRequired", "Password is required");
		} else if (formData.password.length < 8) {
			newErrors.password = t("account.signUp.validation.passwordTooShort", "Password must be at least 8 characters");
		}

		if (!formData.confirmPassword) {
			newErrors.confirmPassword = t("account.signUp.validation.confirmPasswordRequired", "Please confirm your password");
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = t("account.signUp.confirmPasswordMismatch", "Passwords do not match");
		}

		if (!formData.acceptTerms) {
			newErrors.terms = t("account.signUp.validation.termsRequired", "You must accept the terms and privacy policy");
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsLoading(true);
		setErrors({});

		try {
			await authAPI.register(formData.email, formData.password, formData.email.split("@")[0]);
			toast.success(t("account.signUp.successToast", "Account created successfully"));
			// Redirect to verification page
			router.push(`/account/verify?email=${encodeURIComponent(formData.email)}`);
		} catch (err) {
			const message = err instanceof Error ? err.message : t("account.signUp.errorToast", "Failed to create account");
			setErrors({ form: message });
			toast.error(message);
		} finally {
			setIsLoading(false);
		}
	};

	const updateField = (field: keyof typeof formData, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const handleOAuth = (provider: "github" | "google" | "gitlab") => {
		authAPI.oauth(provider);
	};

	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="max-w-md mx-auto">
					<Card className="border-[3px] !rounded-none">
						<CardHeader className="space-y-1 text-center">
							<CardTitle className="text-2xl">{t("account.signUp.title", "Create Account")}</CardTitle>
							<CardDescription>
								{t("account.signUp.subtitle", "Enter your information to create an account")}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form className="space-y-4" onSubmit={handleSubmit}>
								<div className="space-y-2">
									<Label htmlFor="email">{t("account.signUp.emailLabel", "Email")}</Label>
									<Input
										id="email"
										type="email"
										placeholder={t("account.signUp.emailPlaceholder", "name@example.com")}
										value={formData.email}
										onChange={(e) => updateField("email", e.target.value)}
										required
										disabled={isLoading}
										aria-describedby={errors.email ? "email-error" : undefined}
									/>
									{errors.email && <p id="email-error" className="text-sm text-destructive">{errors.email}</p>}
								</div>
								<div className="space-y-2">
									<Label htmlFor="password">{t("account.signUp.passwordLabel", "Password")}</Label>
									<Input
										id="password"
										type="password"
										value={formData.password}
										onChange={(e) => updateField("password", e.target.value)}
										required
										minLength={8}
										disabled={isLoading}
										aria-describedby={errors.password ? "password-error" : undefined}
									/>
									<p className="text-xs text-muted-foreground">
										{t("account.signUp.passwordHint", "Minimum 8 characters")}
									</p>
									{errors.password && <p id="password-error" className="text-sm text-destructive">{errors.password}</p>}
								</div>
								<div className="space-y-2">
									<Label htmlFor="confirmPassword">{t("account.signUp.confirmPasswordLabel", "Confirm Password")}</Label>
									<Input
										id="confirmPassword"
										type="password"
										value={formData.confirmPassword}
										onChange={(e) => updateField("confirmPassword", e.target.value)}
										required
										disabled={isLoading}
										aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
									/>
									{errors.confirmPassword && <p id="confirm-error" className="text-sm text-destructive">{errors.confirmPassword}</p>}
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox
										id="terms"
										checked={formData.acceptTerms}
										onCheckedChange={(checked) => updateField("acceptTerms", checked as boolean)}
										required
										disabled={isLoading}
										aria-describedby={errors.terms ? "terms-error" : undefined}
									/>
									<Label htmlFor="terms" className="text-sm">
										{t("account.signUp.termsLabel", "I agree to the")}{" "}
										<Link href="/legal/terms" className="text-primary hover:underline">
											{t("account.signUp.termsLink", "Terms of Service")}
										</Link>
										{" "}{t("common.and", "and")}{" "}
										<Link href="/legal/privacy" className="text-primary hover:underline">
											{t("account.signUp.privacyLink", "Privacy Policy")}
										</Link>
									</Label>
								</div>
								{errors.terms && <p id="terms-error" className="text-sm text-destructive">{errors.terms}</p>}
								{errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? (
										<>
											<span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
											{t("account.signUp.loading", "Creating account...")}
										</>
									) : (
										t("account.signUp.submit", "Create Account")
									)}
								</Button>
							</form>
						</CardContent>
						<CardFooter className="flex flex-col gap-4">
							<div className="relative w-full">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-background px-2 text-muted-foreground">
										{t("account.signUp.or", "Or")}
									</span>
								</div>
							</div>
							<div className="grid grid-cols-1 gap-2 w-full">
								<Button variant="outline" type="button" className="w-full" onClick={() => handleOAuth("github")}>
									<Github className="mr-2 h-4 w-4" />
									{t("account.signUp.social.github", "Continue with GitHub")}
								</Button>
								<Button variant="outline" type="button" className="w-full" onClick={() => handleOAuth("google")}>
									<Chrome className="mr-2 h-4 w-4" />
									{t("account.signUp.social.google", "Continue with Google")}
								</Button>
								<Button variant="outline" type="button" className="w-full" onClick={() => handleOAuth("gitlab")}>
									<Gitlab className="mr-2 h-4 w-4" />
									{t("account.signUp.social.gitlab", "Continue with GitLab")}
								</Button>
							</div>
							<p className="text-sm text-muted-foreground text-center">
								{t("account.signUp.hasAccount", "Already have an account?")}{" "}
								<Link href="/account/signin" className="text-primary hover:underline font-medium">
									{t("account.signUp.signInLink", "Sign in")}
								</Link>
							</p>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
