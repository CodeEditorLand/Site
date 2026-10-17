/**
 * The curated registry maps for the prose pass (Phase 3d split: these
 * small registry-composed maps are not URL-keyed, so they live here rather
 * than in a per-URL fragment). Re-exported by the LinkIndex aggregator
 * so the consumers' import statements stay unchanged.
 */

import { ElementRepos, ExternalLinks } from "../Links";

export const MentionMap: Readonly<Record<string, string>> = {
	"editor.land": ExternalLinks.Repository,

	Land: ExternalLinks.Repository,

	PlayForm: ExternalLinks.PlayForm,

	Air: ElementRepos.Air.Base,

	Cocoon: ElementRepos.Cocoon.Base,

	Common: ElementRepos.Common.Base,

	Echo: ElementRepos.Echo.Base,

	Grove: ElementRepos.Grove.Base,

	Maintain: ElementRepos.Maintain.Base,

	Mist: ElementRepos.Mist.Base,

	Mountain: ElementRepos.Mountain.Base,

	Output: ElementRepos.Output.Base,

	Rest: ElementRepos.Rest.Base,

	SideCar: ElementRepos.SideCar.Base,

	Sky: ElementRepos.Sky.Base,

	Vine: ElementRepos.Vine.Base,

	Wind: ElementRepos.Wind.Base,

	Worker: ElementRepos.Worker.Base,
};

export const TechnicalMentions: Readonly<Record<string, string>> = {
	"Effect-TS": "https://effect.website",

	ManagedRuntime: "https://effect.website",

	LandWorkbenchRuntime: ElementRepos.Wind.Base,
};

export const Protected = ["Code Editor Land", "CodeEditorLand"] as const;
