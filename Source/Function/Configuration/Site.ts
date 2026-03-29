export default (await import("./On.js")).default
	? "http://localhost"
	: (await import("./Resolve.js")).default.Site;
