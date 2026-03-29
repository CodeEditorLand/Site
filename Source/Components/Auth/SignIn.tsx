"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import { Label } from "@/Components/UI/Label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/UI/Card";
import { toast } from "sonner";
import { Github } from "lucide-react";
import { useTranslation } from "@/Lib/I18n";
import { authAPI } from "@/Lib/api/auth";

/**
 * SignIn component - User authentication form with email/password and GitHub OAuth
 *
 * @example
 * ```tsx
 * <SignIn />
 * ```
 *
 * @remarks
 * - Integrates with Workers API via AuthAPI
 * - Real-time validation with Zod schemas (simulated)
 * - Loading states with disabled inputs
 * - Error handling with sonner toasts
 * - Redirects to dashboard on success
 * - OAuth flow redirects to GitHub
 */
export function SignIn() {
	const { t } = useTranslation();
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			await authAPI.login(email, password);
			toast.success(t("account.signIn.successToast", "Signed in successfully"));
			router.push("/dashboard");
		} catch (err) {
			const message = err instanceof Error ? err.message : t("account.signIn.errorToast", "Invalid credentials");
			setError(message);
			toast.error(message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleGitHubSignIn = () => {
		window.location.href = "/api/auth/github";
	};

	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="max-w-md mx-auto">
					<Card className="border-[3px] !rounded-none">
						<CardHeader className="space-y-1 text-center">
							<CardTitle className="text-2xl">{t("account.signIn.title", "Sign In")}</CardTitle>
							<CardDescription>
								{t("account.signIn.subtitle", "Enter your credentials to access your account")}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form className="space-y-4" onSubmit={handleSubmit}>
								<div className="space-y-2">
									<Label htmlFor="email">{t("account.signIn.emailLabel", "Email")}</Label>
									<Input
										id="email"
										type="email"
										placeholder={t("account.signIn.emailPlaceholder", "name@example.com")}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										disabled={isLoading}
										aria-invalid={!!error}
										aria-describedby={error ? "email-error" : undefined}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="password">{t("account.signIn.passwordLabel", "Password")}</Label>
									<Input
										id="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										minLength={8}
										disabled={isLoading}
										aria-invalid={!!error}
									/>
								</div>
								{error && (
									<div id="email-error" className="text-sm text-destructive" role="alert">
										{error}
									</div>
								)}
								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? (
										<>
											<span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
											{t("account.signIn.loading", "Signing in...")}
										</>
									) : (
										t("account.signIn.submit", "Sign In")
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
										{t("account.signIn.or", "Or")}
									</span>
								</div>
							</div>
							<Button variant="outline" type="button" className="w-full" onClick={handleGitHubSignIn}>
								<Github className="mr-2 h-4 w-4" />
								{t("account.signIn.githubButton", "Continue with GitHub")}
							</Button>
							<p className="text-sm text-muted-foreground text-center">
								{t("account.signIn.noAccount", "Don't have an account?")}{" "}
								<button
									type="button"
									className="text-primary hover:underline font-medium"
									onClick={() => router.push("/account/signup")}
								>
									{t("account.signIn.signUpLink", "Sign up")}
								</button>
							</p>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
