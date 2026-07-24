import "./server_CE33w8TD.mjs";
//#region Source/Function/Route/Map.ts
var { readdir: ReadDirectory } = await import("node:fs/promises");
var { join: Join, relative: Relative } = await import("node:path");
var CanonicalPath = /* @__PURE__ */ new Set([
	"/Download",
	"/Doc",
	"/Blog",
	"/Portal",
	"/Dashboard",
	"/Contributing",
	"/License",
	"/Verify",
	"/Contact/Sale",
	"/Account",
	"/Account/SignIn",
	"/Account/SignUp",
	"/Account/ForgotPassword",
	"/Account/ResetPassword",
	"/Legal/Term",
	"/Legal/Privacy",
	"/OAuth/Success"
]);
var PascalCaseCanonical = Object.fromEntries([...CanonicalPath].map((PascalPath) => [PascalPath.toLowerCase(), PascalPath]));
var SemanticAlias = {
	"/downloads": "/Download",
	"/down": "/Download",
	"/get": "/Download",
	"/fetch": "/Download",
	"/install": "/Download",
	"/setup": "/Download",
	"/doc/webassembly": "/Doc/why-wasm",
	"/doc/why-webassembly": "/Doc/why-wasm",
	"/documentation": "/Doc",
	"/reference": "/Doc",
	"/help": "/Doc",
	"/guide": "/Doc",
	"/manual": "/Doc",
	"/api": "/Doc",
	"/login": "/Account/SignIn",
	"/log-in": "/Account/SignIn",
	"/sign-in": "/Account/SignIn",
	"/authenticate": "/Account/SignIn",
	"/auth": "/Account/SignIn",
	"/register": "/Account/SignUp",
	"/sign-up": "/Account/SignUp",
	"/join": "/Account/SignUp",
	"/create-account": "/Account/SignUp",
	"/forgot-password": "/Account/ForgotPassword",
	"/forgot": "/Account/ForgotPassword",
	"/password-reset": "/Account/ForgotPassword",
	"/recover": "/Account/ForgotPassword",
	"/recover-password": "/Account/ForgotPassword",
	"/reset-password": "/Account/ResetPassword",
	"/reset": "/Account/ResetPassword",
	"/new-password": "/Account/ResetPassword",
	"/change-password": "/Account/ResetPassword",
	"/tos": "/Legal/Term",
	"/terms-of-service": "/Legal/Term",
	"/eula": "/Legal/Term",
	"/conditions": "/Legal/Term",
	"/privacy-policy": "/Legal/Privacy",
	"/gdpr": "/Legal/Privacy",
	"/data-policy": "/Legal/Privacy",
	"/sale": "/Contact/Sale",
	"/sales-contact": "/Contact/Sale",
	"/contact-sales": "/Contact/Sale",
	"/pricing": "/Contact/Sale",
	"/enterprise": "/Contact/Sale",
	"/buy": "/Contact/Sale",
	"/contribute": "/Contributing",
	"/contributors": "/Contributing",
	"/dev": "/Contributing",
	"/develop": "/Contributing",
	"/opensource": "/Contributing",
	"/open-source": "/Contributing",
	"/home": "/",
	"/main": "/",
	"/index": "/",
	"/start": "/",
	"/welcome": "/",
	"/visit": "/",
	"/verify-email": "/Verify",
	"/email-verification": "/Verify",
	"/confirm": "/Verify",
	"/confirm-email": "/Verify",
	"/activate": "/Verify",
	"/app": "/Portal",
	"/launch": "/Portal",
	"/open": "/Portal",
	"/panel": "/Dashboard",
	"/admin": "/Dashboard",
	"/overview": "/Dashboard",
	"/mit": "/License",
	"/licensing": "/License",
	"/news": "/Blog",
	"/articles": "/Blog",
	"/posts": "/Blog",
	"/updates": "/Blog",
	"/changelog": "/Blog",
	"/callback": "/OAuth/Success",
	"/oauth-callback": "/OAuth/Success",
	"/auth-callback": "/OAuth/Success"
};
var SegmentCases = (Segment) => {
	const Lower = Segment.toLowerCase();
	const Upper = Segment.toUpperCase();
	const Title = Segment.charAt(0).toUpperCase() + Segment.slice(1).toLowerCase();
	return [.../* @__PURE__ */ new Set([
		Lower,
		Upper,
		Segment,
		Title
	])];
};
var SegmentNumber = (Lower) => {
	const Result = /* @__PURE__ */ new Set([Lower]);
	if (Lower.endsWith("ies") && Lower.length > 4) Result.add(Lower.slice(0, -3) + "y");
	else if (/(?:ses|xes|zes|ches|shes)$/.test(Lower)) Result.add(Lower.slice(0, -2));
	else if (Lower.endsWith("s") && !/(?:ss|us|is)$/.test(Lower) && Lower.length > 2) Result.add(Lower.slice(0, -1));
	if (!Lower.endsWith("s")) Result.add(Lower + "s");
	return [...Result];
};
var SegmentCompound = (Segment) => {
	const Words = Segment.match(/[A-Z][a-z]*/g);
	if (!Words || Words.length < 2) return [];
	const Lower = Words.map((W) => W.toLowerCase());
	return [
		Lower.join("-"),
		Lower.join("_"),
		Lower.join(""),
		Lower.join(".")
	];
};
var GeneratePathVariant = (CanonicalPath) => {
	if (CanonicalPath === "/") return [];
	const Segments = CanonicalPath.slice(1).split("/");
	const Result = /* @__PURE__ */ new Set();
	if (Segments.length === 1) {
		const Seg = Segments[0];
		const Lower = Seg.toLowerCase();
		for (const C of SegmentCases(Seg)) Result.add("/" + C);
		for (const N of SegmentNumber(Lower)) {
			Result.add("/" + N);
			Result.add("/" + N.toUpperCase());
		}
		for (const V of SegmentCompound(Seg)) Result.add("/" + V);
	} else {
		const LowerSegs = Segments.map((S) => S.toLowerCase());
		Result.add("/" + LowerSegs.join("/"));
		Result.add("/" + Segments.map((S) => S.toUpperCase()).join("/"));
		for (let I = 0; I < Segments.length; I++) {
			const Seg = Segments[I];
			for (const C of SegmentCases(Seg)) {
				const Parts = [...LowerSegs];
				Parts[I] = C;
				Result.add("/" + Parts.join("/"));
			}
			for (const V of SegmentCompound(Seg)) {
				const Parts = [...LowerSegs];
				Parts[I] = V;
				Result.add("/" + Parts.join("/"));
			}
		}
		Result.add("/" + LowerSegs.join(""));
		Result.add("/" + LowerSegs.join("-"));
		Result.add("/" + LowerSegs.join("_"));
	}
	for (const Path of [...Result]) if (!Path.endsWith("/")) Result.add(Path + "/");
	Result.delete(CanonicalPath);
	return [...Result];
};
//#endregion
export { SemanticAlias as i, GeneratePathVariant as n, PascalCaseCanonical as r, CanonicalPath as t };
