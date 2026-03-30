import React, { useEffect, useRef } from "react";

const Background: React.FC = () => {
	const LayoutReference = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const Layout = LayoutReference.current;
		if (!Layout) return;

		const ImageList = Array.from(
			Layout.querySelectorAll<HTMLImageElement>(".Image") ?? [],
		);

		if (ImageList.length === 0) {
			return;
		}

		const LoadStart = performance.now();

		Promise.all(
			ImageList.map((Image) => {
				if (Image.complete) {
					return Promise.resolve();
				}
				return new Promise((Resolve, Reject) => {
					Image.addEventListener("load", Resolve);
					Image.addEventListener("error", Reject);
				});
			}),
		)
			.then(() => {
				if (performance.now() - LoadStart > 50) {
					Layout.classList.add("Transition");
				}
				Layout.classList.add("Load");
			})
			.catch(() => {
				Layout.classList.add("Load");
			});
	}, []);

	return (
		<div id="Layout" ref={LayoutReference}>
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
