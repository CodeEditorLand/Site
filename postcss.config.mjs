import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import cssnanoPresetAdvanced from "cssnano-preset-advanced";
import postcssCombineDuplicatedSelectors from "postcss-combine-duplicated-selectors";
import postcssCombineMediaQuery from "postcss-combine-media-query";
import postcssImport from "postcss-import";
import postcssReporter from "postcss-reporter";
import postcssUrl from "postcss-url";
import tailwindcss from "tailwindcss";
import tailwindcssNesting from "tailwindcss/nesting/index.js";

const buildId = new Date().getTime();

export default {
	plugins: [
		postcssImport(),

		postcssUrl([
			{
				filter: "**/Asset/**",
				url: (asset) => {
					if (asset.url.includes("?Time=")) {
						return asset.url;
					}

					return `${asset.url}?Time=${buildId}`;
				},
			},
		]),

		tailwindcssNesting(),

		tailwindcss("./tailwind.config.js"),

		postcssCombineMediaQuery(),

		postcssCombineDuplicatedSelectors({
			removeDuplicatedProperties: true,
			removeDuplicatedValues: false,
		}),

		autoprefixer(),

		cssnano({
			// discardUnused's fontFace check only sees literal font-family
			// strings; it can't resolve `font-family: var(--FontSans)`
			// indirection (Global.css → Base.css), so it drops every
			// @font-face rule as "unused". Keep font-face pruning off;
			// leave the rest of discardUnused (keyframes, counter-style,
			// namespace) at its default.
			//
			// The preset is the imported function, not the string
			// "advanced": cssnano resolves the string to the installed
			// `cssnano-preset-advanced` anyway and says so on every build
			// (`[CSSNANO_INSTALLED_PRESET] Warning`), which is noise
			// standing where a real CSS warning should be. The imported
			// function is the same preset, byte-identical output, one
			// line of log less.
			preset: [
				cssnanoPresetAdvanced,
				{ discardUnused: { fontFace: false } },
			],
		}),

		postcssReporter(),
	],
};
