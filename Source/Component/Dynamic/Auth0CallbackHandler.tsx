"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import Auth0ProviderWrapper from "../Provider/Auth0Provider";

const WriteAuthToServiceWorker = async (
	Token: string,
	ExpiresAt: number,
	UserId: string,
): Promise<void> => {
	if (
		typeof navigator === "undefined" ||
		!navigator.serviceWorker?.controller
	)
		return;

	await new Promise<void>((Resolve) => {
		const Timeout = setTimeout(Resolve, 5000);

		const OnMessage = (Event: MessageEvent) => {
			if (Event.data?.Type === "Auth:Written") {
				clearTimeout(Timeout);
				navigator.serviceWorker.removeEventListener(
					"message",
					OnMessage,
				);
				Resolve();
			}
		};

		navigator.serviceWorker.addEventListener("message", OnMessage);

		navigator.serviceWorker.controller!.postMessage({
			Type: "Auth:Write",
			Token,
			ExpiresAt,
			UserId,
		});
	});
};

const Handler = () => {
	const { isLoading, isAuthenticated, error, getAccessTokenSilently, user } =
		useAuth0();

	useEffect(() => {
		if (isLoading) return;

		const LoadingState = document.getElementById("LoadingState");
		const ErrorState = document.getElementById("ErrorState");
		const ErrorMessage = document.getElementById("ErrorMessage");

		if (error) {
			LoadingState?.classList.add("hidden");
			ErrorState?.classList.remove("hidden");
			if (ErrorMessage) ErrorMessage.textContent = error.message;
			return;
		}

		if (isAuthenticated) {
			(async () => {
				try {
					const Token = await getAccessTokenSilently();
					await WriteAuthToServiceWorker(
						Token,
						Date.now() + 3600_000,
						user?.sub ?? "",
					);
				} catch {
					// proceed even if SW sync fails
				}
				let ReturnTo = "/Dashboard";
				try {
					const Stored = sessionStorage.getItem("auth0_return_to");
					if (
						Stored &&
						Stored.startsWith("/") &&
						!Stored.startsWith("//")
					) {
						ReturnTo = Stored;
						sessionStorage.removeItem("auth0_return_to");
					}
				} catch {}
				window.location.replace(ReturnTo);
			})();
		}
	}, [isLoading, isAuthenticated, error]);

	return null;
};

export default ({
	Domain,
	ClientIdentifier,
}: {
	Domain?: string;
	ClientIdentifier?: string;
} = {}) => (
	<Auth0ProviderWrapper
		Domain={Domain}
		ClientIdentifier={ClientIdentifier}
		Children={<Handler />}
	/>
);
