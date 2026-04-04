import{_ as S}from"./Doc.D-wJnVsa.js";const $=(async()=>{const{createNoise2D:o}=await S(async()=>{const{createNoise2D:t}=await import("./simplex-noise.cUO6aQiV.js").then(e=>e.s);return{createNoise2D:t}},[]),l=(await S(async()=>{const{default:t}=await import("./Noise.Bg43KO8V.js");return{default:t}},[])).default,f=(await S(async()=>{const{default:t}=await Promise.resolve().then(()=>B);return{default:t}},void 0)).default,E=(await S(async()=>{const{default:t}=await import("./Parallax.6YleB7Vb.js");return{default:t}},[])).default,r=o(),m=l.Step,a=l.Speed,s=l.ChannelSpeed,O="--Staccato",g="--StaccatoRaw",T="--StaccatoPhase",A="--StaccatoColor",w="--StaccatoRhythm",b="--StaccatoMorph",v="--StaccatoBorder",C="--StaccatoGlow";let d=!1,_=0;const M=500;let R=-1/0;const c=(t,e)=>Math.floor(t*e)/e,p=t=>{if(d&&(_=requestAnimationFrame(p)),t-R<M)return;R=t;const e=r(t*a,0),i=c(e,m),u=c(r(t*a*s.Phase,100),4),I=c(r(t*a*s.Color,200),3),L=c(r(t*a*s.Rhythm,300),2),N=c(r(t*a*s.Morph,400),5),Y=c(r(t*a*s.Border,500),4),G=r(t*a*s.Glow,600),n=document.documentElement.style;n.setProperty(O,String(i)),n.setProperty(g,String(e)),n.setProperty(T,String(u)),n.setProperty(A,String(I)),n.setProperty(w,String(L)),n.setProperty(b,String(N)),n.setProperty(v,String(Y)),n.setProperty(C,String(G)),f.AnimateFilter(e),E.UpdateScrollProgress(n)},D=()=>{d||(d=!0,f.InjectFilter(),_=requestAnimationFrame(p))},F=()=>{d=!1,cancelAnimationFrame(_)},h=(t,e)=>{const i=r(e*.73,e*1.31),u=r(e*1.31,e*.73);t.style.setProperty("--StaccatoSeed",String(i)),t.style.setProperty("--StaccatoSeedPhase",String(u))};return{Start:D,Stop:F,Noise:r,Quantize:c,SeedElement:h,SeedSelector:t=>{document.querySelectorAll(t).forEach((i,u)=>{h(i,u)})}}})();let P=null,y=!1;const V="StaccatoTurbulence",j=()=>{if(y)return;y=!0;const o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("width","0"),o.setAttribute("height","0"),o.setAttribute("aria-hidden","true"),o.style.position="absolute",o.style.pointerEvents="none",o.innerHTML=`<defs>
		<filter id="${V}" x="-10%" y="-10%" width="120%" height="120%">
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
	</defs>`,document.body.appendChild(o),P=o.querySelector("feTurbulence")},q=o=>{if(!P)return;const l=Math.abs(Math.floor(o*1e3))%9999;P.setAttribute("seed",String(l))},H={InjectFilter:j,AnimateFilter:q},B=Object.freeze(Object.defineProperty({__proto__:null,default:H},Symbol.toStringTag,{value:"Module"}));export{$ as default};
