export interface ThemeImageProps {
	src: string;
	darkSrc?: string;
	alt?: string;
	width?: number | string;
	height?: number | string;
	className?: string;
	[key: string]: unknown;
}

/**
 * ThemeImage - native <picture> element that serves the correct SVG for the
 * active colour scheme.  No per-image JavaScript; the global toggle in
 * Base.astro sets `data-theme-dark` source media to "all" or
 * "(prefers-color-scheme: dark)" once on load and whenever the user clicks
 * the toggle.
 *
 * Dark-image path convention: /Image/Foo.svg → /Dark/Image/Foo.svg.
 * Pass `darkSrc` explicitly to override.
 */
export function ThemeImage({
	src,
	darkSrc,
	alt = "",
	width,
	height,
	className,
	...props
}: ThemeImageProps) {
	const Dark = darkSrc ?? src.replace(/^\/Image\//, "/Dark/Image/");

	return (
		<picture>
			<source
				srcSet={Dark}
				media="(prefers-color-scheme: dark)"
				data-theme-dark=""
			/>
			<img
				src={src}
				alt={alt}
				width={width}
				height={height}
				className={className}
				{...props}
			/>
		</picture>
	);
}

export default ThemeImage;
