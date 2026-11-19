// Source/Content/Surface/Life.ts
/** The one provenance line every surface passes as its `lifeNote`. */
var LifeSource = "SOURCE: /STATUS";
/**
* The app surfaces, in the order the status board reads them: the two that are
* not built, the one that is open and still moving, then the two that answer.
*
* Every word here is decided by the page's own content table, not by this one -
* the sentence in `decides` names the row, the figure or the absence it was read
* from.
*/
var SurfaceLives = {
	PORTAL: {
		surface: "PORTAL",
		route: "/PORTAL",
		term: "PLANNED",
		decides: "Every tier states `STATUS: PREPARING` and every feature row that is not built ends `planned`: the four modes are named and specified, and none of them can be entered yet.",
		source: LifeSource
	},
	DOWNLOAD: {
		surface: "DOWNLOAD",
		route: "/DOWNLOAD",
		term: "PLANNED",
		decides: "Nothing on it is downloadable: the release states `STATUS: NO PUBLIC ARTIFACTS`, every platform's `VERSION` and `SIZE` print `UNAVAILABLE`, and the edition's artifact figure is `0`.",
		source: LifeSource
	},
	DASHBOARD: {
		surface: "DASHBOARD",
		route: "/DASHBOARD",
		term: "BETA",
		decides: "The surface answers for every reader, but the behaviour under them is still moving: the settings rows print `Coming Soon`, the editor connection is `Not Connected`, and the production telemetry is `Disabled`.",
		source: LifeSource
	},
	VERIFY: {
		surface: "VERIFY",
		route: "/VERIFY",
		term: "LIVE",
		decides: "The card exchanges the link's token in the browser and prints the pending, verifying and verified arms; the audit around it - the scope, the five states, the check - is built.",
		source: LifeSource
	},
	ACCOUNT: {
		surface: "ACCOUNT",
		route: "/ACCOUNT",
		term: "LIVE",
		decides: "The profile island answers from Auth0 and the access ledger beside it is built; the surface states only what it can see, and every route in its rail exists.",
		source: LifeSource
	}
};
/**
* The surfaces, in reading order, for a block that prints the whole set.
*
* Exported as an array rather than left to `Object.keys`, because the order is
* the board's and an object's key order is not a design decision.
*/
var SurfaceNames = [
	"PORTAL",
	"DOWNLOAD",
	"DASHBOARD",
	"VERIFY",
	"ACCOUNT"
];
export { SurfaceNames as n, SurfaceLives as t };
