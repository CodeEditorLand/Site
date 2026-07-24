//#region Source/Function/Configuration/Auth0ClientIdentifier.ts
var Auth0ClientIdentifier_default = Object.assign({
	"ASSETS_PREFIX": void 0,
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SITE": "https://editor.land",
	"SSR": true
}, {})["AUTH0_CLIENT_ID"] || process.env["AUTH0_CLIENT_ID"] || "";
//#endregion
//#region Source/Function/Configuration/Auth0Domain.ts
var Auth0Domain_default = Object.assign({
	"ASSETS_PREFIX": void 0,
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SITE": "https://editor.land",
	"SSR": true
}, {})["AUTH0_DOMAIN"] || process.env["AUTH0_DOMAIN"] || "";
//#endregion
export { Auth0ClientIdentifier_default as n, Auth0Domain_default as t };
