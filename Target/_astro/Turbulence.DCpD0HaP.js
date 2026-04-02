const B={"meta.title":"Блог | Code Editor Land","meta.description":"Задълбочени архитектурни анализи, бележки за версии и актуализации.","page.title":"Блог","page.subtitle":"Архитектура, версии и пътят напред.","card.readMore":"Прочетете повече","card.minRead":"мин. четене","empty.title":"Няма публикации все още","empty.subtitle":"Проверете отново скоро за актуализации."},A=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"})),o={title:"Неуспешна проверка",description:"Тази връзка за проверка е невалидна или е изтекла.",instruction:"Моля, заявете нов имейл за проверка или се свържете с поддръжката, ако проблемът продължава.",resendButton:"Изпратете нов имейл за проверка",contactSupport:"Свържете се с поддръжката",backToSignInButton:"Обратно към вход"},i={description:`Връзка за проверка беше изпратена на вашия имейл адрес.
Моля, проверете входящата си поща и натиснете връзката, за да активирате профила си.
Връзката е валидна 7 дни.
Ако имейлът не бъде получен в рамките на няколко минути, проверете папката за нежелана поща или промоции.
От съображения за сигурност не споделяйте този имейл с никого.`,resendButton:"Изпратете отново имейл за проверка",title:"Потвърдете имейл адреса си"},r={title:"Имейлът е потвърден!",description:"Вашият имейл беше успешно потвърден.",instruction:"Вече можете да влезете в профила си и да започнете да използвате Code Editor Land.",continue:"Продължете към вход",continueButton:"Продължете към началната страница"},c="Потвърдете имейла си",s="Връзка за проверка беше изпратена на",l="Натиснете връзката в имейла, за да потвърдите профила си и да започнете да използвате Code Editor Land.",a="Не получихте имейла?",d="Проверете папката за нежелана поща или",u="изпратете отново имейл за проверка",p="Изпратете отново имейл за проверка",b="Обратно към вход",g="Изпращане...",m="Имейлът за проверка е изпратен!",f={title:"Проверка на имейла ви",description:"Моля, изчакайте, докато проверим вашия имейл адрес..."},y="Възникна грешка по време на проверката. Моля, опитайте отново.",S="Неуспешно повторно изпращане на имейл. Моля, опитайте отново.",_="Имейл",h="Въведете имейла си за повторно изпращане на проверка",v="Имейлът за проверка е изпратен отново!",j={error:o,pending:i,success:r,title:c,description:s,instruction:l,didntReceive:a,checkSpam:d,resendLink:u,resendButton:p,backToSignIn:b,resending:g,resent:m,verifying:f,errorGeneric:y,resendFailed:S,emailLabel:_,emailPlaceholder:h,resendSuccess:v},C=Object.freeze(Object.defineProperty({__proto__:null,backToSignIn:b,checkSpam:d,default:j,description:s,didntReceive:a,emailLabel:_,emailPlaceholder:h,error:o,errorGeneric:y,instruction:l,pending:i,resendButton:p,resendFailed:S,resendLink:u,resendSuccess:v,resending:g,resent:m,success:r,title:c,verifying:f},Symbol.toStringTag,{value:"Module"})),E={"meta.title":"Blog | Code Editor Land","meta.description":"Análisis de arquitectura, notas de versión y actualizaciones.","page.title":"Blog","page.subtitle":"Arquitectura, versiones y el camino por delante.","card.readMore":"Leer más","card.minRead":"min de lectura","empty.title":"Sin publicaciones aún","empty.subtitle":"Vuelva pronto para ver actualizaciones."},F=Object.freeze(Object.defineProperty({__proto__:null,default:E},Symbol.toStringTag,{value:"Module"}));let t=null,n=!1;const M="StaccatoTurbulence",L=()=>{if(n)return;n=!0;const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("width","0"),e.setAttribute("height","0"),e.setAttribute("aria-hidden","true"),e.style.position="absolute",e.style.pointerEvents="none",e.innerHTML=`<defs>
		<filter id="${M}" x="-10%" y="-10%" width="120%" height="120%">
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
	</defs>`,document.body.appendChild(e),t=e.querySelector("feTurbulence")},O=e=>{if(!t)return;const T=Math.abs(Math.floor(e*1e3))%9999;t.setAttribute("seed",String(T))},I={InjectFilter:L,AnimateFilter:O},w=Object.freeze(Object.defineProperty({__proto__:null,default:I},Symbol.toStringTag,{value:"Module"}));export{A as B,w as T,C as V,F as a};
