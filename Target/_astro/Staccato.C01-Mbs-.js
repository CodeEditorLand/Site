import { _ as __vitePreload } from './Footer.xysLliKW.js';

const Staccato = (async () => {
  const { createNoise2D: CreateNoise2D } = await __vitePreload(async () => { const { createNoise2D: CreateNoise2D } = await import('./simplex-noise.n4dlx2W3.js');return { createNoise2D: CreateNoise2D }},true              ?[]:void 0);
  const Config = (await __vitePreload(async () => { const {default: __vite_default__} = await import('./Noise.DlnMwvqJ.js');return { default: __vite_default__ }},true              ?[]:void 0)).default;
  const Turbulence = (await __vitePreload(async () => { const {default: __vite_default__} = await Promise.resolve().then(() => Turbulence$1);return { default: __vite_default__ }},true              ?void 0:void 0)).default;
  const ParallaxModule = (await __vitePreload(async () => { const {default: __vite_default__} = await import('./Parallax.BTqxBt7K.js');return { default: __vite_default__ }},true              ?[]:void 0)).default;
  const Noise = CreateNoise2D();
  const STEP = Config.Step;
  const SPEED = Config.Speed;
  const Channel = Config.ChannelSpeed;
  const PROPERTY_STACCATO = "--Staccato";
  const PROPERTY_RAW = "--StaccatoRaw";
  const PROPERTY_PHASE = "--StaccatoPhase";
  const PROPERTY_COLOR = "--StaccatoColor";
  const PROPERTY_RHYTHM = "--StaccatoRhythm";
  const PROPERTY_MORPH = "--StaccatoMorph";
  const PROPERTY_BORDER = "--StaccatoBorder";
  const PROPERTY_GLOW = "--StaccatoGlow";
  let Active = false;
  let FrameIdentifier = 0;
  const COMMIT_INTERVAL = 500;
  let LastCommit = -Infinity;
  const Quantize = (Value, Step) => Math.floor(Value * Step) / Step;
  const Tick = (Time) => {
    if (Active) {
      FrameIdentifier = requestAnimationFrame(Tick);
    }
    if (Time - LastCommit < COMMIT_INTERVAL) return;
    LastCommit = Time;
    const Raw = Noise(Time * SPEED, 0);
    const Stepped = Quantize(Raw, STEP);
    const Phase = Quantize(Noise(Time * SPEED * Channel.Phase, 100), 4);
    const Color = Quantize(Noise(Time * SPEED * Channel.Color, 200), 3);
    const Rhythm = Quantize(Noise(Time * SPEED * Channel.Rhythm, 300), 2);
    const Morph = Quantize(Noise(Time * SPEED * Channel.Morph, 400), 5);
    const Border = Quantize(Noise(Time * SPEED * Channel.Border, 500), 4);
    const Glow = Noise(Time * SPEED * Channel.Glow, 600);
    const Root = document.documentElement.style;
    Root.setProperty(PROPERTY_STACCATO, String(Stepped));
    Root.setProperty(PROPERTY_RAW, String(Raw));
    Root.setProperty(PROPERTY_PHASE, String(Phase));
    Root.setProperty(PROPERTY_COLOR, String(Color));
    Root.setProperty(PROPERTY_RHYTHM, String(Rhythm));
    Root.setProperty(PROPERTY_MORPH, String(Morph));
    Root.setProperty(PROPERTY_BORDER, String(Border));
    Root.setProperty(PROPERTY_GLOW, String(Glow));
    Turbulence.AnimateFilter(Raw);
    ParallaxModule.UpdateScrollProgress(Root);
  };
  const Start = () => {
    if (Active) return;
    Active = true;
    Turbulence.InjectFilter();
    FrameIdentifier = requestAnimationFrame(Tick);
  };
  const Stop = () => {
    Active = false;
    cancelAnimationFrame(FrameIdentifier);
  };
  const SeedElement = (Element, Index) => {
    const SeedValue = Noise(Index * 0.73, Index * 1.31);
    const SeedPhase = Noise(Index * 1.31, Index * 0.73);
    Element.style.setProperty("--StaccatoSeed", String(SeedValue));
    Element.style.setProperty("--StaccatoSeedPhase", String(SeedPhase));
  };
  const SeedSelector = (Selector) => {
    const ElementList = document.querySelectorAll(Selector);
    ElementList.forEach((Element, Index) => {
      SeedElement(Element, Index);
    });
  };
  return { Start, Stop, Noise, Quantize, SeedElement, SeedSelector };
})();

let FilterElement = null;
let Injected = false;
const FILTER_IDENTIFIER = "StaccatoTurbulence";
const InjectFilter = () => {
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
const AnimateFilter = (RawValue) => {
  if (!FilterElement) return;
  const Seed = Math.abs(Math.floor(RawValue * 1e3)) % 9999;
  FilterElement.setAttribute("seed", String(Seed));
};
const Turbulence = { InjectFilter, AnimateFilter };

const Turbulence$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Turbulence
}, Symbol.toStringTag, { value: 'Module' }));

export { Staccato as default };
//# sourceMappingURL=Staccato.C01-Mbs-.js.map
