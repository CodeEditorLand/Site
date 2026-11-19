export interface ThemeIconProps {
	src: string;

	alt?: string;

	width?: number | string;

	height?: number | string;

	className?: string;

	[key: string]: unknown;
}

/**
 * ThemeIcon - Daylight Field Record (single theme).
 *
 * A plain <img>, like ThemeImage: the caller names the light-surface glyph
 * (/Image/Foo.svg or /Asset/Foo.svg) and nothing switches it per OS.
 */
export function ThemeIcon({
	src,
	alt = "",
	width,
	height,
	className,
	...props
}: ThemeIconProps) {
	return (
		<img
			src={src}
			alt={alt}
			width={width}
			height={height}
			className={className}
			{...props}
		/>
	);
}

export default ThemeIcon;
