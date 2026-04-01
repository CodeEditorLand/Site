import type {
	TrustedTypePolicy,
	TrustedTypePolicyFactory,
} from "trusted-types";

export interface RouteWorkerPolicy extends Pick<TrustedTypePolicy, "name"> {
	createScriptURL(Input: string, ...Argument: any[]): TrustedScriptURL;
}

declare global {
	interface Window {
		trustedTypes?: TrustedTypePolicyFactory;

		_POLICY_ROUTE?: {
			RouteWorker?: RouteWorkerPolicy;
		};
	}
}

declare const __DEV__: boolean;

declare const __INCREMENT__: string;

const INCREMENT = __INCREMENT__ ?? "Initial";

const Log = __DEV__
	? (..._Message: any[]) => {
			console.log(`[Route Policy ${INCREMENT}]`, ..._Message);
		}
	: () => {};

const ErrorLog = __DEV__
	? (..._Message: any[]) => {
			console.error(`[Route Policy ${INCREMENT}]`, ..._Message);
		}
	: () => {};

const WarnLog = __DEV__
	? (..._Message: any[]) => {
			console.warn(`[Route Policy ${INCREMENT}]`, ..._Message);
		}
	: () => {};

(() => {
	window._POLICY_ROUTE = window._POLICY_ROUTE || {};

	if (!window.trustedTypes || !window.trustedTypes.createPolicy) {
		__DEV__ &&
			WarnLog(
				"Trusted Types API not supported or policy creation unavailable.",
			);

		return;
	}

	if (!window._POLICY_ROUTE.RouteWorker) {
		try {
			window._POLICY_ROUTE.RouteWorker =
				window.trustedTypes.createPolicy("RouteWorker", {
					createScriptURL: (Input) => {
						if (
							Input &&
							/^\/[^\\:]+\.(js|mjs)(\?.*)?$/.test(Input)
						) {
							__DEV__ &&
								Log(
									`Policy 'RouteWorker' validating URL: ${Input}`,
								);

							return Input;
						}

						__DEV__ &&
							ErrorLog(
								`Policy 'RouteWorker' rejected URL: ${Input}`,
							);

						throw new TypeError(
							`Invalid URL format for route service worker script: ${Input}`,
						);
					},
				});

			__DEV__ &&
				Log("Policy 'RouteWorker' created and stored successfully.");
		} catch (_Error) {
			if (
				_Error instanceof TypeError &&
				_Error.message.includes("already exists")
			) {
				__DEV__ &&
					WarnLog(
						"Policy 'RouteWorker' already existed. Ensure Policy.ts runs only once.",
					);
			} else {
				__DEV__ &&
					ErrorLog(
						"Failed to create policy 'RouteWorker':",
						_Error,
					);
			}
		}
	} else {
		__DEV__ && Log("Policy 'RouteWorker' was already initialized.");
	}
})();

export default {};
