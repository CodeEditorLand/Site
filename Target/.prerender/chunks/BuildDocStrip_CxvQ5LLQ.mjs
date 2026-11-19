// Source/Function/Doc/BuildDocStrip.ts
var BuildDocStrip = (Input, T) => {
	const Copy = (Key, Default) => T(Key, {
		ns: "doc",
		defaultValue: Default
	});
	/** A field whose value the tree can supply. */
	const Field = (Name, Value) => ({
		Label: Copy(`strip.${Name}`, `${Name.toUpperCase()}:`),
		Value
	});
	/**
	* A field no schema field can fill. `UNAVAILABLE` is the grammar's documented
	* empty state and it renders quiet, so an absent fact never reads as a claim.
	*/
	const Empty = (Name) => ({
		Label: Copy(`strip.${Name}`, `${Name.toUpperCase()}:`),
		Value: Copy("strip.unavailable", "UNAVAILABLE"),
		Tone: "quiet"
	});
	return [
		{
			Label: Copy("strip.status", "STATUS:"),
			Value: Copy("strip.state", "PUBLISHED")
		},
		Field("layer", Input.Layer.toUpperCase()),
		Field("source", Input.Source),
		Empty("compat"),
		Empty("updated"),
		...Input.Extras ?? []
	];
};
export { BuildDocStrip as t };
