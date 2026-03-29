import React, { useEffect, useRef } from "react";

const Background: React.FC = () => {
	const layoutRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const layout = layoutRef.current;
		if (!layout) return;

		const images = Array.from(
			layout.querySelectorAll<HTMLImageElement>(".Image") ?? [],
		);

		if (images.length === 0) {
			return;
		}

		const loadStart = performance.now();

		Promise.all(
			images.map((img) => {
				if (img.complete) {
					return Promise.resolve();
				}
				return new Promise((resolve, reject) => {
					img.addEventListener("load", resolve);
					img.addEventListener("error", reject);
				});
			}),
		)
			.then(() => {
				if (performance.now() - loadStart > 50) {
					layout.classList.add("Transition");
				}
				layout.classList.add("Load");
			})
			.catch(() => {
				layout.classList.add("Load");
			});
	}, []);

	return (
		<div id="Layout" ref={layoutRef}>
			<div id="Background" className="Container">
				<img
					src="/Asset/Background.svg"
					alt=""
					role="presentation"
					className="Image"
					loading="eager"
					decoding="async"
					width={1920}
					height={1080}
				/>
			</div>

			<div id="Rock" className="Container">
				<picture>
					<source
						media="(min-width: 1920px)"
						srcSet="/Asset/DesktopLargeRock.webp"
					/>
					<source
						media="(min-width: 1280px)"
						srcSet="/Asset/DesktopRock.webp"
					/>
					<source
						media="(min-width: 768px)"
						srcSet="/Asset/TabletRock.webp"
					/>
					<img
						src="/Asset/MobileRock.webp"
						alt=""
						role="presentation"
						className="Image"
						loading="eager"
						decoding="async"
						width="2400"
						height="1309"
					/>
				</picture>
			</div>
		</div>
	);
};

export default Background;
