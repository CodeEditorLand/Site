import { useEffect, useRef } from "react";

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
 * active colour scheme.  The global Base.astro script syncs `data-theme-dark`
 * sources during initial HTML parsing.  The mount effect below covers the gap
 * for React client components that render new <source> elements after
 * DOMContentLoaded (when the Base.astro MutationObserver has already
 * disconnected).  Subsequent theme toggles are handled globally by
 * ThemeToggle.SyncPictureSources which iterates all source[data-theme-dark].
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
	const Dark =
		darkSrc ??
		src
			.replace(/^\/Image\//, "/Dark/Image/")
			.replace(/^\/Asset\/(?!Dark\/)/, "/Asset/Dark/");
	const sourceRef = useRef<HTMLSourceElement>(null);

	useEffect(() => {
		if (!sourceRef.current) return;
		const isDark = document.documentElement.classList.contains("dark");
		sourceRef.current.media = isDark
			? "all"
			: "(prefers-color-scheme: dark)";
	}, []);

	return (
		<picture>
			<source
				ref={sourceRef}
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
