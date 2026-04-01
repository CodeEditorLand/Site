let t=null,n=!1;const i="StaccatoTurbulence",l=()=>{if(n)return;n=!0;const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("width","0"),e.setAttribute("height","0"),e.setAttribute("aria-hidden","true"),e.style.position="absolute",e.style.pointerEvents="none",e.innerHTML=`<defs>
		<filter id="${i}" x="-10%" y="-10%" width="120%" height="120%">
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
	</defs>`,document.body.appendChild(e),t=e.querySelector("feTurbulence")},s=e=>{if(!t)return;const r=Math.abs(Math.floor(e*1e3))%9999;t.setAttribute("seed",String(r))},u={InjectFilter:l,AnimateFilter:s};export{u as default};
