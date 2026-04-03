const m={"meta.title":"Блог | Code Editor Land","meta.description":"Задълбочени архитектурни анализи, бележки за версии и актуализации.","page.title":"Блог","page.subtitle":"Архитектура, версии и пътят напред.","card.readMore":"Прочетете повече","card.minRead":"мин. четене","empty.title":"Няма публикации все още","empty.subtitle":"Проверете отново скоро за актуализации."},S=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"})),n={platform:{linux:{description:"DEB, RPM, AppImage",title:"Linux"},macos:{title:"macOS",universalBadge:"Binaire universel"},windows:{description:"64 bits (x64)",title:"Windows"}}},r={subtitle:`Disponible pour macOS, Windows et Linux.

Rapide, natif et gratuit.`,title:"Telecharger Land"},o={description:"Telechargez des versions anterieures si necessaire.",title:"Versions precedentes"},a=`Disponible pour macOS, Windows et Linux.

Construit avec Tauri, propulsé par Rust.`,l={minimum:"Configuration minimale",recommended:"Recommande",subtitle:"Assurez-vous que votre systeme repond a ces exigences avant de telecharger.",supportedOS:"Systemes d'exploitation pris en charge",title:"Configuration requise"},s="Telecharger Land",c={description:`Les versions de Land sont signées avec PGP.

Vérifiez votre téléchargement pour garantir l'intégrité.`,downloadButton:"Telecharger la cle publique PGP",title:"Verifiez votre telechargement",verifyButton:"Verifier le telechargement"},u={version:"Version :",size:"Taille :",requirements:"Configuration requise :",loading:"Chargement des telechargements...",errorTitle:"Impossible de charger les telechargements",downloadFailed:`Échec du téléchargement.

Veuillez réessayer.`,downloadFor:"Telecharger pour {{platform}}",copiedToClipboard:"{{label}} copie dans le presse-papiers !",failedToCopy:"Echec de la copie de {{label}}",sha256Checksum:"Somme de contrôle SHA-256",pgpSignature:"Signature PGP",verificationInstructions:"Instructions de vérification",downloadVerification:"Vérification du téléchargement",integrityCheck:"Vérification de l'intégrité",copy:"Copier",signedWithKeyId:"Signé avec l'ID de clé : {{keyId}}"},d={title:"Transparence de compilation",subtitle:`Divulgation complète sur la télémétrie, les variantes de compilation et le déploiement.

Vérifiez tout dans le code source.`},g={card:n,page:r,previousReleases:o,subtitle:a,systemRequirements:l,title:s,verification:c,labels:u,transparency:d},T=Object.freeze(Object.defineProperty({__proto__:null,card:n,default:g,labels:u,page:r,previousReleases:o,subtitle:a,systemRequirements:l,title:s,transparency:d,verification:c},Symbol.toStringTag,{value:"Module"})),b={"meta.title":"Blog | Code Editor Land","meta.description":"Análisis de arquitectura, notas de versión y actualizaciones.","page.title":"Blog","page.subtitle":"Arquitectura, versiones y el camino por delante.","card.readMore":"Leer más","card.minRead":"min de lectura","empty.title":"Sin publicaciones aún","empty.subtitle":"Vuelva pronto para ver actualizaciones."},w=Object.freeze(Object.defineProperty({__proto__:null,default:b},Symbol.toStringTag,{value:"Module"}));let t=null,i=!1;const f="StaccatoTurbulence",h=()=>{if(i)return;i=!0;const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("width","0"),e.setAttribute("height","0"),e.setAttribute("aria-hidden","true"),e.style.position="absolute",e.style.pointerEvents="none",e.innerHTML=`<defs>
		<filter id="${f}" x="-10%" y="-10%" width="120%" height="120%">
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
	</defs>`,document.body.appendChild(e),t=e.querySelector("feTurbulence")},v=e=>{if(!t)return;const p=Math.abs(Math.floor(e*1e3))%9999;t.setAttribute("seed",String(p))},y={InjectFilter:h,AnimateFilter:v},_=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));export{S as B,T as D,_ as T,w as a};
