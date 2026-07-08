const buildId = new Date().getTime();

module.exports = {
	plugins: [
		require("postcss-import"),

		require("postcss-url")([
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

		require("tailwindcss/nesting"),

		require("tailwindcss")("./tailwind.config.js"),

		require("postcss-combine-media-query"),

		require("postcss-combine-duplicated-selectors")({
			removeDuplicatedProperties: true,
			removeDuplicatedValues: false,
		}),

		require("autoprefixer"),

		require("cssnano")({
			// discardUnused's fontFace check only sees literal font-family
			// strings; it can't resolve `font-family: var(--FontSans)`
			// indirection (Global.css → Base.css), so it drops every
			// @font-face rule as "unused". Keep font-face pruning off;
			// leave the rest of discardUnused (keyframes, counter-style,
			// namespace) at its default.
			preset: ["advanced", { discardUnused: { fontFace: false } }],
		}),

		require("postcss-reporter"),
	],
};
