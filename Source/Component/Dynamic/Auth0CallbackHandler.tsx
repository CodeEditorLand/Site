"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import Auth0ProviderWrapper from "../Provider/Auth0Provider";

const Handler = () => {
	const { isLoading, isAuthenticated, error } = useAuth0();

	useEffect(() => {
		if (isLoading) return;

		const LoadingState = document.getElementById("LoadingState");
		const SuccessState = document.getElementById("SuccessState");
		const ErrorState = document.getElementById("ErrorState");
		const ErrorMessage = document.getElementById("ErrorMessage");

		if (error) {
			LoadingState?.classList.add("hidden");
			ErrorState?.classList.remove("hidden");
			if (ErrorMessage) ErrorMessage.textContent = error.message;
			return;
		}

		if (isAuthenticated) {
			LoadingState?.classList.add("hidden");
			SuccessState?.classList.remove("hidden");
			SuccessState?.classList.add("flex");
			setTimeout(() => {
				window.location.href = "/Dashboard";
			}, 2000);
		}
	}, [isLoading, isAuthenticated, error]);

	return null;
};

export default () => (
	<Auth0ProviderWrapper>
		<Handler />
	</Auth0ProviderWrapper>
);
