const INCREMENT = "Development-01KTP20R5H9AMGPG6PMM7QXMAH" ;
const WarnLog = (..._Message) => {
  console.warn(`[Route Register ${INCREMENT}]`, ..._Message);
} ;
if (!("serviceWorker" in navigator)) {
  WarnLog("Service Worker API not supported.");
}
const Register = {};

export { Register as default };
//# sourceMappingURL=Register.DSos5mad.js.map
