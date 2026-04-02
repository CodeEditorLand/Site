const o={name:"Code Editor Land",description:`The next-generation code editor.
Open source and free forever.`},r={product:{title:"Product",features:"Features",downloads:"Download",docs:"Docs",blog:"Blog"},company:{title:"Community",issues:"Issues",contributing:"Contributing",github:"GitHub",enterprise:"Enterprise"},legal:{title:"Legal",privacy:"Privacy",terms:"Terms",license:"License"}},i={github:"GitHub",twitter:"X (Twitter)",discord:"Discord",linkedin:"LinkedIn"},s={copyright:`© {{year}} Code Editor Land.
All rights reserved.`,builtBy:"Built by the Code Editor Land team",madeWith:"Made with"},c={prefix:"This project has been funded through the ",ngiFund:"NGI0 Commons Fund",nlnetIntro:", a fund established by ",nlnet:"NLnet",euSupport:" with financial support from the European Commission's Next Generation Internet programme, under grant agreement No. 101135429. ",projectPage:"View project page"},C={brand:o,columns:r,social:i,bottomBar:s,funding:c},G=Object.freeze(Object.defineProperty({__proto__:null,bottomBar:s,brand:o,columns:r,default:C,funding:c,social:i},Symbol.toStringTag,{value:"Module"})),d={title:"Неуспешна проверка",description:"Тази връзка за проверка е невалидна или е изтекла.",instruction:"Моля, заявете нов имейл за проверка или се свържете с поддръжката, ако проблемът продължава.",resendButton:"Изпратете нов имейл за проверка",contactSupport:"Свържете се с поддръжката",backToSignInButton:"Обратно към вход"},l={description:`Връзка за проверка беше изпратена на вашия имейл адрес.
Моля, проверете входящата си поща и натиснете връзката, за да активирате профила си.
Връзката е валидна 7 дни.
Ако имейлът не бъде получен в рамките на няколко минути, проверете папката за нежелана поща или промоции.
От съображения за сигурност не споделяйте този имейл с никого.`,resendButton:"Изпратете отново имейл за проверка",title:"Потвърдете имейл адреса си"},u={title:"Имейлът е потвърден!",description:"Вашият имейл беше успешно потвърден.",instruction:"Вече можете да влезете в профила си и да започнете да използвате Code Editor Land.",continue:"Продължете към вход",continueButton:"Продължете към началната страница"},a="Потвърдете имейла си",p="Връзка за проверка беше изпратена на",b="Натиснете връзката в имейла, за да потвърдите профила си и да започнете да използвате Code Editor Land.",g="Не получихте имейла?",f="Проверете папката за нежелана поща или",h="изпратете отново имейл за проверка",m="Изпратете отново имейл за проверка",y="Обратно към вход",S="Изпращане...",T="Имейлът за проверка е изпратен!",v={title:"Проверка на имейла ви",description:"Моля, изчакайте, докато проверим вашия имейл адрес..."},w="Възникна грешка по време на проверката. Моля, опитайте отново.",E="Неуспешно повторно изпращане на имейл. Моля, опитайте отново.",F="Имейл",I="Въведете имейла си за повторно изпращане на проверка",L="Имейлът за проверка е изпратен отново!",j={error:d,pending:l,success:u,title:a,description:p,instruction:b,didntReceive:g,checkSpam:f,resendLink:h,resendButton:m,backToSignIn:y,resending:S,resent:T,verifying:v,errorGeneric:w,resendFailed:E,emailLabel:F,emailPlaceholder:I,resendSuccess:L},P=Object.freeze(Object.defineProperty({__proto__:null,backToSignIn:y,checkSpam:f,default:j,description:p,didntReceive:g,emailLabel:F,emailPlaceholder:I,error:d,errorGeneric:w,instruction:b,pending:l,resendButton:m,resendFailed:E,resendLink:h,resendSuccess:L,resending:S,resent:T,success:u,title:a,verifying:v},Symbol.toStringTag,{value:"Module"}));let t=null,n=!1;const B="StaccatoTurbulence",M=()=>{if(n)return;n=!0;const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("width","0"),e.setAttribute("height","0"),e.setAttribute("aria-hidden","true"),e.style.position="absolute",e.style.pointerEvents="none",e.innerHTML=`<defs>
		<filter id="${B}" x="-10%" y="-10%" width="120%" height="120%">
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
	</defs>`,document.body.appendChild(e),t=e.querySelector("feTurbulence")},N=e=>{if(!t)return;const _=Math.abs(Math.floor(e*1e3))%9999;t.setAttribute("seed",String(_))},O={InjectFilter:M,AnimateFilter:N},k=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"}));export{G as F,k as T,P as V};
