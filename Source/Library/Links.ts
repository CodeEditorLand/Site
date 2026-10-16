/**
 * The canonical link registry for the CodeEditorLand site - the single
 * source for every internal route and external URL the pages emit. Adapted
 * from the Aphrodite/Site pattern (typed Link lists + ExternalLinks +
 * Repo/Link() composition with the branch pin in one place).
 */

export interface InternalLink {
	Href: string;

	Label: string;
}

/** A repository entry: the bare clone URL plus the branch segment links compose with. */
export interface Repo {
	/** The repository's base URL (no branch, no trailing slash). */
	Base: string;

	/** The branch segment, always in the tree/<branch> form. */
	Branch: string;
}

/** The canonical branch: every repository deep-link composes with it. */
export const BranchCurrent = "tree/Current";

/**
 * Compose a repository URL: Link(LandRepo, "CONTRIBUTING.md")
 * -> "https://github.com/CodeEditorLand/Land/tree/Current/CONTRIBUTING.md".
 * The one function every composed repository URL flows through - a future
 * branch rename or scheme change edits this file alone.
 */
export function Link(Repo: Repo, Path: string): string {
	return `${Repo.Base}/${Repo.Branch}/${Path}`;
}

/** The Land repository - the product repo and the site's canonical home. */
export const LandRepo: Repo = {
	Base: "https://github.com/CodeEditorLand/Land",

	Branch: BranchCurrent,
};

/** External canonical URLs, verbatim from the site's documented flows. */
export const ExternalLinks = {
	/** The Land repository - the product repo and the site's canonical home. */
	Repository: "https://github.com/CodeEditorLand/Land",

	/** The releases listing on the Land repository. */
	Releases: "https://github.com/CodeEditorLand/Land/releases",

	/** The issue tracker on the Land repository. */
	Issues: "https://github.com/CodeEditorLand/Land/issues",

	/** The umbrella organization. */
	PlayForm: "https://PlayForm.Cloud",

	/** The NLnet NGI0 Commons Fund page - the site spelling (no trailing slash). */
	Nlnet: "https://nlnet.nl/commonsfund",

	/** The NLnet project page for Land. */
	NlnetProject: "https://nlnet.nl/project/Land/",

	/** The docs tree on the Land repository at the canonical Current branch. */
	Docs: Link(LandRepo, "Documentation"),
} as const;

/** Every element repository, keyed by element name, linked at the canonical Current branch. */
export const ElementRepos = {
	Air: {
		Base: "https://github.com/CodeEditorLand/Air",
		Branch: BranchCurrent,
	},

	Cocoon: {
		Base: "https://github.com/CodeEditorLand/Cocoon",
		Branch: BranchCurrent,
	},

	Common: {
		Base: "https://github.com/CodeEditorLand/Common",
		Branch: BranchCurrent,
	},

	Echo: {
		Base: "https://github.com/CodeEditorLand/Echo",
		Branch: BranchCurrent,
	},

	Grove: {
		Base: "https://github.com/CodeEditorLand/Grove",
		Branch: BranchCurrent,
	},

	Land: {
		Base: "https://github.com/CodeEditorLand/Land",
		Branch: BranchCurrent,
	},

	Maintain: {
		Base: "https://github.com/CodeEditorLand/Maintain",
		Branch: BranchCurrent,
	},

	Mist: {
		Base: "https://github.com/CodeEditorLand/Mist",
		Branch: BranchCurrent,
	},

	Mountain: {
		Base: "https://github.com/CodeEditorLand/Mountain",
		Branch: BranchCurrent,
	},

	Output: {
		Base: "https://github.com/CodeEditorLand/Output",
		Branch: BranchCurrent,
	},

	Rest: {
		Base: "https://github.com/CodeEditorLand/Rest",
		Branch: BranchCurrent,
	},

	SideCar: {
		Base: "https://github.com/CodeEditorLand/SideCar",
		Branch: BranchCurrent,
	},

	Sky: {
		Base: "https://github.com/CodeEditorLand/Sky",
		Branch: BranchCurrent,
	},

	Vine: {
		Base: "https://github.com/CodeEditorLand/Vine",
		Branch: BranchCurrent,
	},

	Wind: {
		Base: "https://github.com/CodeEditorLand/Wind",
		Branch: BranchCurrent,
	},

	Worker: {
		Base: "https://github.com/CodeEditorLand/Worker",
		Branch: BranchCurrent,
	},
} as const;
