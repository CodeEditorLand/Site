let FilterElement: SVGFETurbulenceElement | null = null;

let Injected = false;

const FILTER_IDENTIFIER = "StaccatoTurbulence";

const InjectFilter = (): void => {
	if (Injected) return;

	Injected = true;

	const Svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

	Svg.setAttribute("width", "0");

	Svg.setAttribute("height", "0");

	Svg.setAttribute("aria-hidden", "true");

	Svg.style.position = "absolute";

	Svg.style.pointerEvents = "none";

	Svg.innerHTML = `<defs>
		<filter id="${FILTER_IDENTIFIER}" x="-10%" y="-10%" width="120%" height="120%">
			<feTurbulence
				type="turbulence"
				baseFrequency="0.02"
				numOctaves="3"
				seed="0"
				result="Noise"
			/>
			<feDisplacementMap
				in="SourceGraphic"
				in2="Noise"
				scale="4"
				xChannelSelector="R"
				yChannelSelector="G"
			/>
		</filter>
	</defs>`;

	document.body.appendChild(Svg);

	FilterElement = Svg.querySelector("feTurbulence");
};

const AnimateFilter = (RawValue: number): void => {
	if (!FilterElement) return;

	const Seed = Math.abs(Math.floor(RawValue * 1000)) % 9999;

	FilterElement.setAttribute("seed", String(Seed));
};

export default { InjectFilter, AnimateFilter };
