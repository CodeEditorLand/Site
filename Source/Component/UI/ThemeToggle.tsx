import * as lucide from "lucide-react";

import { Button } from "./Button";

/**
 * ThemeToggle - Daylight Field Record.
 * Single theme: renders a static sun icon indicating daylight mode.
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
