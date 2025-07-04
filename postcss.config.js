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
		require("cssnano")({ preset: "advanced" }),
		require("postcss-reporter"),
	],
};
