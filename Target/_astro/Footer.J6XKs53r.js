import { b1 as jsxDevRuntimeExports, c as Auth0Provider$1, b3 as useAuth0, b2 as reactExports } from './Vendor/React.D_hnTAe2.js';

const Auth0Provider = ({
  Children,
  Domain = "",
  ClientIdentifier = "",
  Organization
}) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Auth0Provider$1,
  {
    domain: Domain,
    clientId: ClientIdentifier,
    cacheLocation: "localstorage",
    ...Organization ? { organization: Organization } : {},
    authorizationParams: {
      redirect_uri: typeof window !== "undefined" ? `${window.location.origin}/OAuth/Success` : "https://editor.land/OAuth/Success",
      ...Organization ? { organization: Organization } : {}
    },
    children: Children
  },
  void 0,
  false,
  {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Provider/Auth0Provider.tsx",
    lineNumber: 30,
    columnNumber: 2
  },
  undefined
);

const WriteAuthToServiceWorker = async (Token, ExpiresAt, UserId) => {
  if (typeof navigator === "undefined" || !navigator.serviceWorker?.controller)
    return;
  await new Promise((Resolve) => {
    const Timeout = setTimeout(Resolve, 5e3);
    const OnMessage = (Event) => {
      if (Event.data?.Type === "Auth:Written") {
        clearTimeout(Timeout);
        navigator.serviceWorker.removeEventListener(
          "message",
          OnMessage
        );
        Resolve();
      }
    };
    navigator.serviceWorker.addEventListener("message", OnMessage);
    navigator.serviceWorker.controller.postMessage({
      Type: "Auth:Write",
      Token,
      ExpiresAt,
      UserId
    });
  });
};
const Handler = () => {
  const { isLoading, isAuthenticated, error, getAccessTokenSilently, user } = useAuth0();
  reactExports.useEffect(() => {
    if (isLoading) return;
    const LoadingState = document.getElementById("LoadingState");
    const ErrorState = document.getElementById("ErrorState");
    const ErrorMessage = document.getElementById("ErrorMessage");
    if (error) {
      LoadingState?.classList.add("hidden");
      ErrorState?.classList.remove("hidden");
      if (ErrorMessage) ErrorMessage.textContent = error.message;
      return;
    }
    if (isAuthenticated) {
      (async () => {
        try {
          const Token = await getAccessTokenSilently();
          await WriteAuthToServiceWorker(
            Token,
            Date.now() + 36e5,
            user?.sub ?? ""
          );
        } catch {
        }
        let ReturnTo = "/Dashboard";
        try {
          const Stored = sessionStorage.getItem("auth0_return_to");
          if (Stored && Stored.startsWith("/") && !Stored.startsWith("//")) {
            ReturnTo = Stored;
            sessionStorage.removeItem("auth0_return_to");
          }
        } catch {
        }
        window.location.replace(ReturnTo);
      })();
    }
  }, [isLoading, isAuthenticated, error]);
  return null;
};
const Auth0CallbackHandler = ({
  Domain,
  ClientIdentifier
} = {}) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Auth0Provider,
  {
    Domain,
    ClientIdentifier,
    Children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Handler, {}, void 0, false, {
      fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0CallbackHandler.tsx",
      lineNumber: 104,
      columnNumber: 13
    }, undefined)
  },
  void 0,
  false,
  {
    fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0CallbackHandler.tsx",
    lineNumber: 101,
    columnNumber: 2
  },
  undefined
);

const Blog = {
  "meta.title": "Blog | Code Editor Land",
  "meta.description": "Architecture deep-dives, release notes, and updates.",
  "page.title": "Blog",
  "page.subtitle": "Architecture, releases, and the road ahead.",
  "card.readMore": "Read more",
  "card.minRead": "min read",
  "empty.title": "No posts yet",
  "empty.subtitle": "Check back soon for updates.",
};

const Blog$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Blog
}, Symbol.toStringTag, { value: 'Module' }));

const Doc$2 = {
  "sidebar.title": "Documentation",
  "sidebar.elements": "Elements",
  "sidebar.gettingStarted": "Getting Started",
};

const Doc$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Doc$2
}, Symbol.toStringTag, { value: 'Module' }));

const Doc = {
  "sidebar.title": "Dokumentation",
  "sidebar.elements": "Elemente",
  "sidebar.gettingStarted": "Erste Schritte",
};

const Doc$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Doc
}, Symbol.toStringTag, { value: 'Module' }));

const brand = {"name":"Code Editor Land","description":"L'éditeur de code de nouvelle génération.\nOpen source et gratuit pour toujours."};
const columns = {"product":{"title":"Produit","features":"Fonctionnalités","downloads":"Télécharger","docs":"Documentation","blog":"Blog"},"company":{"title":"Communauté","issues":"Issues","contributing":"Contribuer","github":"GitHub","enterprise":"Entreprise"},"legal":{"title":"Mentions légales","privacy":"Confidentialité","terms":"Conditions d'utilisation","license":"Licence"}};
const social = {"github":"GitHub","twitter":"X (Twitter)","discord":"Discord","linkedin":"LinkedIn"};
const bottomBar = {"copyright":"© {{year}} Code Editor Land. Tous droits réservés.","builtBy":"Créé par l'équipe Code Editor Land","madeWith":"Fait avec"};
const funding = {"prefix":"Ce projet a été financé par le ","ngiFund":"Fonds NGI0 Commons","nlnetIntro":", un fonds établi par ","nlnet":"NLnet","euSupport":" avec le soutien financier du programme Internet de prochaine génération de la Commission européenne, dans le cadre de la convention de subvention n° 101135429. ","projectPage":"Voir la page du projet"};
const Footer = {
  brand,
  columns,
  social,
  bottomBar,
  funding,
};

const Footer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	bottomBar,
	brand,
	columns,
	default: Footer,
	funding,
	social
}, Symbol.toStringTag, { value: 'Module' }));

export { Auth0CallbackHandler as A, Blog$1 as B, Doc$3 as D, Footer$1 as F, Auth0Provider as a, Doc$1 as b };
//# sourceMappingURL=Footer.J6XKs53r.js.map
