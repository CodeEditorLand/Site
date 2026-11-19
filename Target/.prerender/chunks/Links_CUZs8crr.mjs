// Source/Library/Links.ts
/** The canonical branch: every repository deep-link composes with it. */
var BranchCurrent = "tree/Current";
/**
* Compose a repository URL: Link(LandRepo, "CONTRIBUTING.md")
* -> "https://github.com/CodeEditorLand/Land/tree/Current/CONTRIBUTING.md".
* The one function every composed repository URL flows through - a future
* branch rename or scheme change edits this file alone.
*/
function Link(Repo, Path) {
	return `${Repo.Base}/${Repo.Branch}/${Path}`;
}
/** The Land repository - the product repo and the site's canonical home. */
var LandRepo = {
	Base: "https://github.com/CodeEditorLand/Land",
	Branch: BranchCurrent
};
/** The dependency Editor repository - the VS Code fork under the Dependency org. */
var EditorRepo = {
	Base: "https://github.com/DependencyCodeEditorLand/Editor",
	Branch: BranchCurrent
};
/** The Cache element repository (gitlink under Land/Element/Cache). */
var CacheRepo = {
	Base: "https://github.com/CodeEditorLand/Cache",
	Branch: BranchCurrent
};
/** The Ingress dependency repository (gitlink under Dependency/Microsoft/NPM). */
var IngressRepo = {
	Base: "https://github.com/CodeEditorLand/Ingress",
	Branch: BranchCurrent
};
/** The SWC dependency repository (gitlink under Dependency/SWC/Dependency/SWC and NodeSWC/swc). */
var SWCRepo = {
	Base: "https://github.com/DependencyCodeEditorLand/SWC",
	Branch: BranchCurrent
};
/** The SWCDev dependency repository. */
var SWCDevRepo = {
	Base: "https://github.com/DependencyCodeEditorLand/SWCDev",
	Branch: BranchCurrent
};
/** The TsParserTestRef dependency repository. */
var TsParserTestRefRepo = {
	Base: "https://github.com/DependencyCodeEditorLand/TsParserTestRef",
	Branch: BranchCurrent
};
/** The Tauri dependency repository (gitlink under Dependency/Tauri/Dependency/Tauri). */
var TauriRepo = {
	Base: "https://github.com/DependencyCodeEditorLand/Tauri",
	Branch: BranchCurrent
};
/** The PluginsWorkSpace dependency repository (gitlink under Dependency/Tauri/Dependency/PluginsWorkspace). */
var PluginsWorkSpaceRepo = {
	Base: "https://github.com/DependencyCodeEditorLand/PluginsWorkSpace",
	Branch: BranchCurrent
};
/** External canonical URLs, verbatim from the site's documented flows. */
var ExternalLinks = {
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
	Docs: Link(LandRepo, "Documentation")
};
/** Every element repository, keyed by element name, linked at the canonical Current branch. */
var ElementRepos = {
	Air: {
		Base: "https://github.com/CodeEditorLand/Air",
		Branch: BranchCurrent
	},
	Cocoon: {
		Base: "https://github.com/CodeEditorLand/Cocoon",
		Branch: BranchCurrent
	},
	Common: {
		Base: "https://github.com/CodeEditorLand/Common",
		Branch: BranchCurrent
	},
	Echo: {
		Base: "https://github.com/CodeEditorLand/Echo",
		Branch: BranchCurrent
	},
	Grove: {
		Base: "https://github.com/CodeEditorLand/Grove",
		Branch: BranchCurrent
	},
	Land: {
		Base: "https://github.com/CodeEditorLand/Land",
		Branch: BranchCurrent
	},
	Maintain: {
		Base: "https://github.com/CodeEditorLand/Maintain",
		Branch: BranchCurrent
	},
	Mist: {
		Base: "https://github.com/CodeEditorLand/Mist",
		Branch: BranchCurrent
	},
	Mountain: {
		Base: "https://github.com/CodeEditorLand/Mountain",
		Branch: BranchCurrent
	},
	Output: {
		Base: "https://github.com/CodeEditorLand/Output",
		Branch: BranchCurrent
	},
	Rest: {
		Base: "https://github.com/CodeEditorLand/Rest",
		Branch: BranchCurrent
	},
	SideCar: {
		Base: "https://github.com/CodeEditorLand/SideCar",
		Branch: BranchCurrent
	},
	Sky: {
		Base: "https://github.com/CodeEditorLand/Sky",
		Branch: BranchCurrent
	},
	Vine: {
		Base: "https://github.com/CodeEditorLand/Vine",
		Branch: BranchCurrent
	},
	Wind: {
		Base: "https://github.com/CodeEditorLand/Wind",
		Branch: BranchCurrent
	},
	Worker: {
		Base: "https://github.com/CodeEditorLand/Worker",
		Branch: BranchCurrent
	}
};
export { IngressRepo as a, SWCDevRepo as c, TsParserTestRefRepo as d, ExternalLinks as i, SWCRepo as l, EditorRepo as n, Link as o, ElementRepos as r, PluginsWorkSpaceRepo as s, CacheRepo as t, TauriRepo as u };
