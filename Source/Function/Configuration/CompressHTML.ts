export default (await import("./On.js")).default
	? false
	: (await import("./Resolve.js")).default.CompressHTML;
