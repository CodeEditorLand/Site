const INCREMENT = "Development-01KTP20R5H9AMGPG6PMM7QXMAH" ;
const Log = (..._Message) => {
  console.log(`[Route Policy ${INCREMENT}]`, ..._Message);
} ;
const ErrorLog = (..._Message) => {
  console.error(`[Route Policy ${INCREMENT}]`, ..._Message);
} ;
const WarnLog = (..._Message) => {
  console.warn(`[Route Policy ${INCREMENT}]`, ..._Message);
} ;
(() => {
  window._POLICY_ROUTE = window._POLICY_ROUTE || {};
  if (!window.trustedTypes || !window.trustedTypes.createPolicy) {
    WarnLog(
      "Trusted Types API not supported or policy creation unavailable."
    );
    return;
  }
  if (!window._POLICY_ROUTE.RouteWorker) {
    try {
      window._POLICY_ROUTE.RouteWorker = window.trustedTypes.createPolicy(
        "RouteWorker",
        {
          createScriptURL: (Input) => {
            if (Input && /^\/[^\\:]+\.(js|mjs)(\?.*)?$/.test(Input)) {
              Log(
                `Policy 'RouteWorker' validating URL: ${Input}`
              );
              return Input;
            }
            ErrorLog(
              `Policy 'RouteWorker' rejected URL: ${Input}`
            );
            throw new TypeError(
              `Invalid URL format for route service worker script: ${Input}`
            );
          }
        }
      );
      Log("Policy 'RouteWorker' created and stored successfully.");
    } catch (_Error) {
      if (_Error instanceof TypeError && _Error.message.includes("already exists")) {
        WarnLog(
          "Policy 'RouteWorker' already existed. Ensure Policy.ts runs only once."
        );
      } else {
        ErrorLog("Failed to create policy 'RouteWorker':", _Error);
      }
    }
  } else {
    Log("Policy 'RouteWorker' was already initialized.");
  }
})();
const PublicRoutes = [
  "/",
  "/Download",
  "/Doc",
  "/Blog",
  "/Contributing",
  "/License",
  "/Legal/Term",
  "/Legal/Privacy",
  "/Contact/Sale",
  "/Portal",
  "/Verify"
];
const Policy = {};

export { PublicRoutes, Policy as default };
//# sourceMappingURL=Policy.CBL3PfcE.js.map
