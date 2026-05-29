const card$1 = {"platform":{"linux":{"description":"DEB, RPM, AppImage","title":"Linux"},"macos":{"title":"macOS","universalBadge":"Universal Binary"},"windows":{"description":"64-Bit (x64)","title":"Windows"}}};
const page$1 = {"subtitle":"Nativ auf macOS, Windows und Linux.\n\nKostenlos, kein Tracking, volle VS Code-Erweiterungsunterstützung.","title":"Land herunterladen"};
const previousReleases$1 = {"description":"Laden Sie eine ältere Version herunter, wenn Sie eine bestimmte Version festhalten müssen.","title":"Frühere Versionen"};
const subtitle$1 = "Nativ auf macOS, Windows und Linux.\n\nMit Tauri gebaut. Von Rust angetrieben. Mit PGP verifiziert.";
const systemRequirements$1 = {"minimum":"Mindestanforderungen","recommended":"Empfohlen für das beste Erlebnis","subtitle":"Eine kurze Überprüfung vor dem Herunterladen erspart eine Neuinstallation.","supportedOS":"Unterstützte Betriebssysteme","title":"Systemanforderungen"};
const title$1 = "Land herunterladen";
const verification$1 = {"description":"Jedes Land-Release wird vor der Auslieferung PGP-signiert.\n\nÜberprüfen Sie Ihren Download, um zu bestätigen, dass Sie genau das erhalten haben, was gebaut wurde.","downloadButton":"PGP-Public-Key herunterladen","title":"Jedes Release ist signiert. Überprüfen Sie Ihres.","verifyButton":"Download verifizieren"};
const labels$1 = {"version":"Version:","size":"Größe:","requirements":"Anforderungen:","loading":"Verfügbare Downloads werden geladen...","errorTitle":"Downloads konnten nicht geladen werden","downloadFailed":"Download fehlgeschlagen. Bitte erneut versuchen.","downloadFor":"Für {{platform}} herunterladen","copiedToClipboard":"{{label}} in die Zwischenablage kopiert!","failedToCopy":"{{label}} konnte nicht kopiert werden","sha256Checksum":"SHA-256-Prüfsumme","pgpSignature":"PGP-Signatur","verificationInstructions":"Verifikationsanleitung","downloadVerification":"Download-Verifikation","integrityCheck":"Integritätsprüfung","copy":"Kopieren","signedWithKeyId":"Signiert mit Schlüssel-ID: {{keyId}}"};
const transparency$1 = {"title":"Nichts verborgen. Vollständige Build-Offenlegung.","subtitle":"Standardmäßig kein Telemetrie. Build-Varianten, Deployment-Ziele und Signierungsschlüssel sind öffentlich.\n\nÜberprüfen Sie alles im Quellcode."};
const DeDownload = {
  card: card$1,
  page: page$1,
  previousReleases: previousReleases$1,
  subtitle: subtitle$1,
  systemRequirements: systemRequirements$1,
  title: title$1,
  verification: verification$1,
  labels: labels$1,
  transparency: transparency$1,
};

const Download$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	card: card$1,
	default: DeDownload,
	labels: labels$1,
	page: page$1,
	previousReleases: previousReleases$1,
	subtitle: subtitle$1,
	systemRequirements: systemRequirements$1,
	title: title$1,
	transparency: transparency$1,
	verification: verification$1
}, Symbol.toStringTag, { value: 'Module' }));

const card = {"platform":{"linux":{"description":"DEB, RPM, AppImage","title":"Linux"},"macos":{"title":"macOS","universalBadge":"Binario universal"},"windows":{"description":"64 bits (x64)","title":"Windows"}}};
const page = {"subtitle":"Nativo en macOS, Windows y Linux.\n\nGratuito, sin rastreo, compatibilidad total con extensiones de VS Code.","title":"Descargar Land"};
const previousReleases = {"description":"Descargue una versión anterior si necesita fijar a una versión específica.","title":"Versiones anteriores"};
const subtitle = "Nativo en macOS, Windows y Linux.\n\nConstruido con Tauri. Impulsado por Rust. Verificado con PGP.";
const systemRequirements = {"minimum":"Requisitos mínimos","recommended":"Recomendado para la mejor experiencia","subtitle":"Una verificación rápida antes de descargar evita una reinstalación.","supportedOS":"Sistemas operativos compatibles","title":"Requisitos del sistema"};
const title = "Descargar Land";
const verification = {"description":"Cada versión de Land está firmada con PGP antes de su distribución.\n\nVerifique su descarga para confirmar que obtuvo exactamente lo que fue compilado.","downloadButton":"Descargar clave PGP pública","title":"Cada versión está firmada. Verifique la suya.","verifyButton":"Verificar descarga"};
const labels = {"version":"Versión:","size":"Tamaño:","requirements":"Requisitos:","loading":"Cargando descargas disponibles...","errorTitle":"No se pudieron cargar las descargas","downloadFailed":"Descarga fallida. Por favor, inténtelo de nuevo.","downloadFor":"Descargar para {{platform}}","copiedToClipboard":"{{label}} copiado al portapapeles!","failedToCopy":"Error al copiar {{label}}","sha256Checksum":"Suma de verificación SHA-256","pgpSignature":"Firma PGP","verificationInstructions":"Instrucciones de verificación","downloadVerification":"Verificación de descarga","integrityCheck":"Comprobación de integridad","copy":"Copiar","signedWithKeyId":"Firmado con ID de clave: {{keyId}}"};
const transparency = {"title":"Nada oculto. Divulgación completa de la compilación.","subtitle":"Sin telemetría por defecto. Las variantes de compilación, destinos de implementación y claves de firma son públicos.\n\nVerifique todo en el código fuente."};
const EsDownload = {
  card,
  page,
  previousReleases,
  subtitle,
  systemRequirements,
  title,
  verification,
  labels,
  transparency,
};

const Download = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	card,
	default: EsDownload,
	labels,
	page,
	previousReleases,
	subtitle,
	systemRequirements,
	title,
	transparency,
	verification
}, Symbol.toStringTag, { value: 'Module' }));

export { DeDownload as D, EsDownload as E, Download$1 as a, Download as b };
