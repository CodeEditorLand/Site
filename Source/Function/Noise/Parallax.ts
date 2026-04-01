const GetScrollProgress = (): number => {
	const ScrollTop =
		document.documentElement.scrollTop || document.body.scrollTop;
	const ScrollHeight =
		document.documentElement.scrollHeight -
		document.documentElement.clientHeight;

	if (ScrollHeight <= 0) return 0;

	return Math.min(1, Math.max(0, ScrollTop / ScrollHeight));
};

const UpdateScrollProgress = (Root: CSSStyleDeclaration): void => {
	Root.setProperty("--ScrollProgress", String(GetScrollProgress()));
};

export default { UpdateScrollProgress };
