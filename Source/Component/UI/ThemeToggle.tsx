import * as lucide from "lucide-react";

import { Button } from "./Button";

/**
 * ThemeToggle - Daylight Field Record.
 *
 * One theme, so there is nothing to toggle: the control is a disabled ghost button
 * carrying the sun, `aria-label="Daylight theme active"` and the title `Daylight`.
 * It is a marker of the theme the page is already in, not a switch - a control that
 * could be pressed and changed nothing would be a lie about a second theme.
 */
const ThemeToggle = ({ ClassName }: { ClassName?: string }) => {
	return (
		<Button
			variant="ghost"
			size="icon"
			aria-label="Daylight theme active"
			title="Daylight"
			className={ClassName}
			disabled
		>
			<lucide.Sun className="h-4 w-4 opacity-50" />
		</Button>
	);
};

export { ThemeToggle };

export default ThemeToggle;
