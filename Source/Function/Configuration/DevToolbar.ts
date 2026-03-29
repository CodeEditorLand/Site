export default (await import("./On.js")).default
	? true
	: (await import("./Resolve.js")).default.DevToolbar;
