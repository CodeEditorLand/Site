import * as lucide from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "./Button";

/**
 * ThemeToggle - switches between the flat-white light theme and the
 * cyberpunk terminal-HUD dark theme by toggling the `.dark` class on
 * <html>. The pre-paint script in Source/Layout/Base.astro sets the
 * initial class (stored preference → OS color scheme) to avoid a flash;
 * this control only handles user-driven changes after hydration.
 *
 * See .claude/skills/land-design/Reference/Theme.md
 */
const SyncPictureSources = (IsDark: boolean) => {
	document
		.querySelectorAll<HTMLSourceElement>("source[data-theme-dark]")
		.forEach((Source) => {
			Source.media = IsDark ? "all" : "(prefers-color-scheme: dark)";
		});
};

const ThemeToggle = ({ ClassName }: { ClassName?: string }) => {
	const [IsDark, SetIsDark] = useState(false);

	// Sync local state with whatever the pre-paint script already decided.
	useEffect(() => {
		SetIsDark(document.documentElement.classList.contains("dark"));
	}, []);

	const Toggle = () => {
		const Next = !document.documentElement.classList.contains("dark");
		document.documentElement.classList.toggle("dark", Next);
		try {
			localStorage.setItem("Theme", Next ? "dark" : "light");
		} catch (_) {}
		document
			.querySelector('meta[name="theme-color"]')
			?.setAttribute("content", Next ? "#0a0a0c" : "#ffffff");
		SyncPictureSources(Next);
		SetIsDark(Next);
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={Toggle}
			aria-label={
				IsDark ? "Switch to light theme" : "Switch to dark theme"
			}
			title={IsDark ? "Light" : "Dark"}
			className={ClassName}>
			{/* Both icons render; CSS shows the relevant one per theme so the
			 control is correct even before hydration reads the class. */}
			<lucide.Sun className="hidden h-4 w-4 dark:block" />
			<lucide.Moon className="block h-4 w-4 dark:hidden" />
		</Button>
	);
};

export { ThemeToggle };

export default ThemeToggle;
