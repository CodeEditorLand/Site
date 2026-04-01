import type { RouteWorkerPolicy } from "./Policy.js";

declare global {
	interface Window {
		_ROUTE_WORKER: string;

		trustedTypes?: import("trusted-types").TrustedTypePolicyFactory;

		_POLICY_ROUTE?: {
			RouteWorker?: RouteWorkerPolicy;
		};
	}
}

declare const __DEV__: boolean;

declare const __INCREMENT__: string;

const INCREMENT =
	typeof __INCREMENT__ !== "undefined" ? __INCREMENT__ : "Initial";

const Path =
	typeof window._ROUTE_WORKER === "string"
		? window._ROUTE_WORKER
		: "/service-worker.js";

const Scope = "/";

const Reload = "RouteWorkerReload";

const Log = __DEV__
	? (..._Message: any[]) => {
			console.log(`[Route Register ${INCREMENT}]`, ..._Message);
		}
	: () => {};

const ErrorLog = __DEV__
	? (..._Message: any[]) => {
			console.error(`[Route Register ${INCREMENT}]`, ..._Message);
		}
	: () => {};

const WarnLog = __DEV__
	? (..._Message: any[]) => {
			console.warn(`[Route Register ${INCREMENT}]`, ..._Message);
		}
	: () => {};

if ("serviceWorker" in navigator) {
	const RegisteredKey = "RouteWorkerRegistered";

	const CheckForUpdate = async (Registration: ServiceWorkerRegistration) => {
		const Update = await Registration.update();

		__DEV__ &&
			Log(
				"Service Worker update check:",
				Update ? "Update found" : "Up to date",
			);
	};

	const Control = async () => {
		const InitiallyControlled = !!navigator.serviceWorker.controller;

		__DEV__ &&
			Log(`Page controlled on script start: ${InitiallyControlled}`);

		try {
			__DEV__ &&
				Log(
					`Registering Route Service Worker: ${Path} with scope: ${Scope}`,
				);

			let URL: string | TrustedScriptURL;

			if (window.trustedTypes) {
				__DEV__ &&
					Log("TrustedTypes available. Using RouteWorker policy...");

				try {
					const Policy = window._POLICY_ROUTE?.RouteWorker;

					if (!Policy) {
						ErrorLog(
							"Policy 'RouteWorker' NOT found. Ensure Policy.ts executes first.",
						);

						throw new Error(
							"Required Trusted Types policy 'RouteWorker' not found.",
						);
					}

					URL = Policy.createScriptURL(Path);

					__DEV__ && Log(`Created TrustedScriptURL for: ${Path}`);
				} catch (_Error) {
					__DEV__ &&
						ErrorLog("TrustedScriptURL creation failed:", _Error);

					throw _Error;
				}
			} else {
				__DEV__ &&
					WarnLog(
						"Trusted Types not available. Using plain string for SW path.",
					);

				URL = Path;
			}

			const Registration = await navigator.serviceWorker.register(
				URL as unknown as URL,
				{
					scope: Scope,
					type: "classic",
				},
			);

			__DEV__ && Log("Registration succeeded.");

			__DEV__ && Log("Scope:", Registration.scope);

			if (Registration.installing)
				__DEV__ && Log("Service Worker installing.");
			else if (Registration.waiting)
				__DEV__ && Log("Service Worker waiting.");
			else if (Registration.active)
				__DEV__ && Log("Service Worker active.");

			__DEV__ && Log("Waiting for navigator.serviceWorker.ready...");

			await navigator.serviceWorker.ready;

			__DEV__ && Log("navigator.serviceWorker.ready resolved.");

			const Controlled = !!navigator.serviceWorker.controller;

			__DEV__ && Log(`Page controlled after ready: ${Controlled}`);

			sessionStorage.setItem(RegisteredKey, "true");

			const UpdateRegistration =
				await navigator.serviceWorker.getRegistration(Scope);

			if (UpdateRegistration) {
				CheckForUpdate(UpdateRegistration);
			}

			if (!InitiallyControlled && !Controlled) {
				__DEV__ && Log("Page not yet controlled. Setting reload flag.");

				sessionStorage.setItem(Reload, "true");

				window.location.reload();

				return;
			}

			if (sessionStorage.getItem(Reload)) {
				__DEV__ && Log("Clearing reload flag.");

				sessionStorage.removeItem(Reload);
			}

			// Listen for version updates from the service worker
			navigator.serviceWorker.addEventListener("message", (Event) => {
				if (Event.data?.Version === "New") {
					__DEV__ &&
						Log("New SW version detected. Route map updated.");
				}
			});
		} catch (_Error) {
			__DEV__ && ErrorLog("Registration failed:", _Error);

			if (
				_Error instanceof TypeError &&
				(_Error.message.includes("TrustedScriptURL") ||
					_Error.message.includes("Trusted Type"))
			) {
				__DEV__ &&
					ErrorLog(
						"Possible Trusted Types policy violation. Check CSP.",
					);
			}

			if (sessionStorage.getItem(Reload)) {
				sessionStorage.removeItem(Reload);
			}
		}
	};

	if (document.readyState === "loading") {
		__DEV__ && Log("DOM not ready, deferring registration.");

		document.addEventListener("DOMContentLoaded", Control);
	} else {
		__DEV__ && Log("DOM ready, registering now.");

		Control();
	}
}

if (!("serviceWorker" in navigator)) {
	__DEV__ && WarnLog("Service Worker API not supported.");
}

export default {};
