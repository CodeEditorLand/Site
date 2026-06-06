import { useEffect, useState } from "react";

export interface ThemeIconProps {
	/** Light theme icon path (e.g., "/Image/Rust.svg") */
	src: string;
	/** Alt text for accessibility */
	alt?: string;
	/** Width in pixels */
	width?: number | string;
	/** Height in pixels */
	height?: number | string;
	/** Additional CSS classes */
	className?: string;
	/** Additional props passed to img */
	[key: string]: unknown;
}

/**
 * ThemeIcon — renders an icon that automatically switches between light and dark versions
 * based on the current theme. The dark version is expected to be at the same path
 * but under /Dark/Image/ instead of /Image/.
 *
 * Example:
 * <ThemeIcon src="/Image/Rust.svg" alt="Rust" width={16} height={16} />
 * Renders "/Image/Rust.svg" in light mode, "/Dark/Image/Rust.svg" in dark mode.
 */
export function ThemeIcon({
	src,
	alt = "",
	width,
	height,
	className,
	...props
}: ThemeIconProps) {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const root = document.documentElement;
		const initial = root.classList.contains("dark");
		setIsDark(initial);

		const observer = new MutationObserver(() => {
			setIsDark(root.classList.contains("dark"));
		});

		observer.observe(root, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	const themeSrc = isDark ? src.replace(/^\/Image\//, "/Dark/Image/") : src;

	return (
		<img
			src={themeSrc}
			alt={alt}
			width={width}
			height={height}
			className={className}
			{...props}
		/>
	);
}

export default ThemeIcon;
