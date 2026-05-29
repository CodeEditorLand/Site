const logo = "Land";
const nav = {"features":"Funktionen","download":"Herunterladen","docs":"Dokumentation","blog":"Blog","contributing":"Mitwirken","dashboard":"Dashboard","github":"GitHub"};
const actions = {"signIn":"Anmelden","signUp":"Registrieren","editorPortal":"Editor-Portal","getStarted":"Land holen","logout":"Abmelden","loading":"Laden…"};
const user = {"avatarAlt":"Benutzermenü","menu":{"dashboard":"Dashboard","account":"Konto","signOut":"Abmelden"}};
const DeHeader = {
  logo,
  nav,
  actions,
  user,
};

const Header = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	actions,
	default: DeHeader,
	logo,
	nav,
	user
}, Symbol.toStringTag, { value: 'Module' }));

const forgotPassword = {"emailPlaceholder":"name@beispiel.de","submit":"Link zum Zurücksetzen senden","subtitle":"Geben Sie Ihre E-Mail ein und wir senden Ihnen einen sicheren Reset-Link.","success":{"title":"Prüfen Sie Ihre E-Mail","subtitle":"Ein Link zum Zurücksetzen des Passworts wurde gesendet an","instruction":"Klicken Sie auf den Link in der E-Mail, um Ihr Passwort zurückzusetzen.\nDer Link läuft in 24 Stunden ab.","resend":"E-Mail erneut senden"},"title":"Passwort zurücksetzen","emailLabel":"E-Mail","loading":"Wird gesendet...","backToSignIn":"Zurück zur Anmeldung","successToast":"E-Mail zum Zurücksetzen gesendet","errorToast":"E-Mail zum Zurücksetzen konnte nicht gesendet werden","emailRequired":"E-Mail ist erforderlich","resendSuccess":"E-Mail zum Zurücksetzen erneut gesendet","resendError":"E-Mail konnte nicht erneut gesendet werden","emailSent":"E-Mail zum Zurücksetzen an Ihren Posteingang gesendet"};
const resetPassword = {"checkingMessage":"Ihr Zurücksetzungs-Token wird überprüft, bitte warten...","confirmLabel":"Neues Passwort bestätigen","confirmPlaceholder":"Geben Sie Ihr neues Passwort erneut ein","invalidToken":{"title":"Ungültiges oder abgelaufenes Token","description":"Dieser Link zum Zurücksetzen des Passworts ist ungültig, abgelaufen oder wurde bereits verwendet.","instruction":"Fordern Sie eine neue E-Mail zum Zurücksetzen des Passworts an.","button":"Neue E-Mail zum Zurücksetzen anfordern"},"passwordLabel":"Neues Passwort","passwordPlaceholder":"Geben Sie ein sicheres neues Passwort ein","submit":"Passwort zurücksetzen","subtitle":"Geben Sie unten Ihr neues Passwort ein","success":{"title":"Passwort erfolgreich zurückgesetzt","description":"Ihr Passwort wurde zurückgesetzt.\nSie können sich jetzt mit Ihrem neuen Passwort anmelden.","button":"Weiter zur Anmeldung"},"title":"Neues Passwort festlegen","passwordHint":"Mindestens 8 Zeichen","loading":"Wird zurückgesetzt...","mismatch":"Passwörter stimmen nicht überein","signInLink":"Anmelden","checking":"Token wird überprüft...","error":{"tooShort":"Passwort muss mindestens 8 Zeichen lang sein"},"successToast":"Passwort erfolgreich zurückgesetzt","errorToast":"Passwort konnte nicht zurückgesetzt werden"};
const signIn = {"emailPlaceholder":"name@example.com","forgotPassword":"Passwort vergessen? Sicher zurücksetzen.","githubButton":"Weiter mit GitHub","passwordPlaceholder":"Geben Sie Ihr Passwort ein","signUpLink":"Registrieren","subtitle":"Bei Ihrem Land-Workspace anmelden.","title":"Anmelden","emailLabel":"E-Mail","passwordLabel":"Passwort","submit":"Anmelden","loading":"Anmeldung...","or":"Oder","noAccount":"Noch kein Konto?","successToast":"Erfolgreich angemeldet","errorToast":"Ungültige Anmeldedaten","showPassword":"Passwort anzeigen","hidePassword":"Passwort verbergen"};
const signUp = {"confirmPasswordLabel":"Passwort bestätigen","confirmPasswordPlaceholder":"Geben Sie Ihr Passwort erneut zur Bestätigung ein","emailPlaceholder":"name@beispiel.de","passwordHint":"Mindestens 8 Zeichen","passwordPlaceholder":"Erstellen Sie ein sicheres Passwort","signInLink":"Anmelden","social":{"github":"Weiter mit GitHub","google":"Weiter mit Google","gitlab":"Weiter mit GitLab"},"subtitle":"Erstellen Sie Ihr kostenloses Land-Konto.","termsLabel":"Ich stimme den Nutzungsbedingungen und der Datenschutzrichtlinie zu","title":"Konto erstellen","validation":{"emailRequired":"E-Mail ist erforderlich","emailInvalid":"Ungültiges E-Mail-Format","passwordRequired":"Passwort ist erforderlich","passwordTooShort":"Passwort muss mindestens 8 Zeichen lang sein","confirmPasswordRequired":"Bitte bestätigen Sie Ihr Passwort","termsRequired":"Sie müssen die Nutzungsbedingungen und die Datenschutzrichtlinie akzeptieren"},"emailLabel":"E-Mail","passwordLabel":"Passwort","submit":"Kostenloses Konto erstellen","loading":"Konto wird erstellt...","or":"Oder","hasAccount":"Bereits ein Konto?","termsLink":"Nutzungsbedingungen","privacyLink":"Datenschutzrichtlinie","and":"und","successToast":"Konto erfolgreich erstellt","errorToast":"Konto konnte nicht erstellt werden","confirmPasswordMismatch":"Passwörter stimmen nicht überein","passwordStrength":{"weak":"Schwaches Passwort","medium":"Mittleres Passwort","strong":"Starkes Passwort"}};
const common = {"and":"und"};
const portal = {"title":"Bei CodeEditorLand anmelden","subtitle":"Wählen Sie die Stufe, die zu Ihrer Arbeitsweise passt. Cloud-Sync, OAuth-Identität, Local-First-Daemon oder Enterprise-SSO.","cloud":{"title":"Cloud","subtitle":"Einmal anmelden und jedes Gerät ist synchron.\n\nWorkspace-Status Ende-zu-Ende verschlüsselt, nie im Transit lesbar.","signIn":"Sicher anmelden","emailLabel":"E-Mail","emailPlaceholder":"name@beispiel.de","passwordLabel":"Passwort","passwordPlaceholder":"Geben Sie Ihr Passwort ein","feature":{"sync":"Workspace bleibt auf jedem Gerät synchron","backup":"Verschlüsseltes Cloud-Backup aller Konfigurationen","team":"Geteilte Team-Workspaces inklusive","extension":"Erweiterungen mit einem Klick aus dem Marketplace installieren","remote":"Integration von Remote-Entwicklungsservern"},"capability":{"jwt":"JWT RS256 Token 15 Min. Zugriff 30 Tage Aktualisierung","okta":"Okta SSO-Integration verfügbar","mfa":"Mehrfaktor-Authentifizierung unterstützt","rbac":"Rollenbasierte Zugriffskontrolle auf Gateway-Ebene","audit":"Vollständiges Audit-Log jede Aktion aufgezeichnet","cert":"Entwicklerzertifikate automatisch bereitgestellt"}},"provider":{"title":"Provider","subtitle":"Nutzen Sie die Entwickleridentität, die Sie bereits haben.\n\nWir fragen nur Ihre E-Mail-Adresse ab, niemals Repository-Zugriff oder Org-Daten.","continueGitHub":"Mit GitHub fortfahren","continueGoogle":"Mit Google fortfahren","continueGitLab":"Mit GitLab fortfahren","oauthNote":"OAuth 2.0 Nur E-Mail-Scope Mit Ihren Einstellungen verknüpft","feature":{"github":"Kein neues Passwort Ihre GitHub-Identität genügt","sso":"Einmalanmeldung für alle Land-Dienste","repo":"Thema und Tastenkürzel folgen Ihrer Provider-Identität","team":"Organisations- und Teammitgliedschaft automatisch synchronisiert","ci":"CI/CD-Pipeline-Integration mit Build-Triggern"},"capability":{"oauth":"OAuth 2.0 mit PKCE S256 bei jedem Flow","scope":"Nur E-Mail- und Profil-Scope nichts anderes angefragt","token":"Refresh-Token-Rotation bei jeder Anmeldung","webhook":"Webhook-Ereignisabonnements","org":"Zugriffsrichtlinien auf Organisationsebene","cert":"Entwicklerzertifikate automatisch bereitgestellt"}},"localfirst":{"title":"Local-First","subtitle":"Kein Internet? Kein Problem. Der Air-Daemon läuft vollständig auf Ihrer Maschine.\n\nIhre Code und Anmeldedaten verlassen sie nie.","daemonLabel":"Air Daemon","daemonStatus":"Wird gescannt...","connect":"Mit Air-Daemon verbinden","note":"Kein Cloud-Abhängigkeit JWT-Zertifikate mTLS","feature":{"daemon":"Browser verbindet sich über verschlüsseltes Loopback mit Air-Daemon","build":"Builds direkt von der Website-Konsole starten","deploy":"Änderungen direkt im laufenden Editor deployen","configure":"Vollständige Editor-Konfigurations- und Einstellungsverwaltung","parity":"Vollständige VS Code-Funktionsparität nichts fehlt","offline":"Vollständiger Offline-Betrieb kein Cloud-Login erforderlich","bake":"Portal direkt als eingebettetes SaaS in den Editor integrieren"},"capability":{"jwt":"JWT ES384 Zertifikate 5 Min. Ablauf rotiert bei Neuverbindung","mtls":"mTLS gegenseitige Authentifizierung Daemon und Browser beide verifiziert","crdt":"CRDT-Zustandssynchronisierung für konfliktfreies Offline-Bearbeiten","team":"Team-Management vollständig lokal keine Cloud-Abhängigkeit","cert":"Lokale Zertifizierungsstelle keine externen CA-Aufrufe","ws":"WebSocket-Live-Verbindung nur über Loopback","rbac":"Lokale RBAC-Richtlinien auf Daemon-Ebene durchgesetzt","backup":"Verschlüsseltes lokales Backup aller Workspace-Zustände"}},"enterprise":{"title":"Enterprise","subtitle":"Ihr IT-Team kontrolliert jeden Arbeitsplatz.\n\nOIDC, SAML 2.0 und SCIM bedeuten null manuelle Bereitstellung und vollständige Verzeichnis-Governance.","ariaLabel":"Enterprise SSO","domainLabel":"Geschäftliche E-Mail oder Domain","domainPlaceholder":"name@unternehmen.de","continueSSO":"Mit SSO fortfahren","continueOkta":"Mit Okta fortfahren","continueAzure":"Weiter mit Azure AD","continueSAML":"Weiter mit SAML","oktaDomainLabel":"Okta-Domain","oktaDomainPlaceholder":"ihre-org.okta.com","azureTenantLabel":"Azure AD Mandanten-ID","azureTenantPlaceholder":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","samlMetadataLabel":"SAML-Metadaten-URL","samlMetadataPlaceholder":"https://ihr-idp.com/metadata.xml","note":"OpenID Connect Discovery SAML 2.0 Assertion SCIM 2.0 Benutzerbereitstellung","feature":{"okta":"Okta SSO eine Anmeldung schaltet alles frei","azure":"Azure AD / Entra ID Ihre Microsoft-Identität funktioniert","saml":"SAML 2.0 für jeden Legacy-Enterprise-IdP","scim":"SCIM-Bereitstellung neue Entwickler in Minuten einsatzbereit","group":"IdP-Gruppe zu CEL-Rollen-Mapping Least Privilege automatisch","audit":"SOC 2-Logs in CEF oder JSON an Ihr SIEM exportiert"},"capability":{"oidc":"OIDC Discovery auto-konfiguriert aus Ihrer IdP-Metadaten-URL","jit":"Just-in-Time-Bereitstellung bei erster Anmeldung","mfa":"MFA über IdP-Authentifizierungskontext durchgesetzt","session":"Sitzungsdauer durch IdP-Richtlinie gesteuert","ca":"Organisations-CA-Zertifikate von der IT verwaltet","compliance":"SOC 2 Typ II / DSGVO-Compliance-Dokumentation"}},"labels":{"included":"Enthalten","capabilities":"Fähigkeiten","protocol":"Protokoll:","settingsManaged":"Verwaltete Einstellungen","allTiers":"In allen Stufen enthalten"}};
const loading = "Wird geladen...";
const error = "Authentifizierungsfehler";
const tryAgain = "Erneut versuchen";
const dashboard = "Zum Dashboard";
const logout = "Abmelden";
const emailNotVerified = "E-Mail nicht verifiziert.\nPrüfen Sie Ihren Posteingang.";
const redirecting = "Weiterleitung zur Anmeldung...";
const dashboardPage = {"title":"Dashboard","welcome":"Willkommen zurück","downloadsHeading":"Downloads","signOut":"Abmelden","loading":"Konto wird geladen…","error":"Konto konnte nicht geladen werden."};
const DeAccount = {
  forgotPassword,
  resetPassword,
  signIn,
  signUp,
  common,
  portal,
  loading,
  error,
  tryAgain,
  dashboard,
  logout,
  emailNotVerified,
  redirecting,
  dashboardPage,
};

const Account = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	common,
	dashboard,
	dashboardPage,
	default: DeAccount,
	emailNotVerified,
	error,
	forgotPassword,
	loading,
	logout,
	portal,
	redirecting,
	resetPassword,
	signIn,
	signUp,
	tryAgain
}, Symbol.toStringTag, { value: 'Module' }));

const Doc = {
  "sidebar.title": "Documentation",
  "sidebar.elements": "Éléments",
  "sidebar.gettingStarted": "Premiers pas",
};

const Doc$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Doc
}, Symbol.toStringTag, { value: 'Module' }));

export { Account as A, DeAccount as D, Header as H, DeHeader as a, Doc$1 as b };
