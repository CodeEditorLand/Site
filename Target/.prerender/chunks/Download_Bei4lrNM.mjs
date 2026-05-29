const card$1 = {"platform":{"linux":{"description":"DEB, RPM, AppImage","title":"Linux"},"macos":{"title":"macOS","universalBadge":"Universal Binary: Apple Silicon and Intel"},"windows":{"description":"64-bit (x64)","title":"Windows"}}};
const page$1 = {"subtitle":"Native on macOS, Windows, and Linux.\n\nZero cost, zero tracking, full VS Code extension support.","title":"Download Land"};
const previousReleases$1 = {"description":"Download an older version if you need to pin to a specific release.","title":"Previous Releases"};
const subtitle$1 = "Source builds are active today. Public installers, signing, and verification artifacts are still being prepared.";
const systemRequirements$1 = {"minimum":"Minimum Requirements","recommended":"Recommended for the Best Experience","subtitle":"A quick check before you download saves a reinstall later.","supportedOS":"Supported Operating Systems","title":"System Requirements"};
const title$1 = "Download Land";
const verification$1 = {"description":"Every Land release is PGP-signed before it ships.\n\nVerify your download to confirm you got exactly what was built.","downloadButton":"Download PGP Public Key","title":"Every Release is Signed. Verify Yours.","verifyButton":"Verify Download"};
const labels$1 = {"version":"Version:","size":"Size:","requirements":"Requirements:","loading":"Loading available downloads...","errorTitle":"Could not load downloads","downloadFailed":"Download failed. Please try again.","downloadFor":"Download for {{platform}}","copiedToClipboard":"{{label}} copied to clipboard.","failedToCopy":"Could not copy {{label}}","sha256Checksum":"SHA-256 Checksum","pgpSignature":"PGP Signature","verificationInstructions":"Verification Instructions","downloadVerification":"Download Verification","integrityCheck":"Integrity Check","copy":"Copy","signedWithKeyId":"Signed with key ID {{keyId}}"};
const transparency$1 = {"title":"VS Code Phones Home. Land Does Not.","subtitle":"VS Code (not VSCodium) embeds Microsoft telemetry at the network call level. Disabling it via settings reduces what is sent - it does not remove the code paths.\n\nThe Telemetry feature is not in Land's default build. When it is not compiled in, the code does not exist. Nothing to disable."};
const EnDownload = {
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
	default: EnDownload,
	labels: labels$1,
	page: page$1,
	previousReleases: previousReleases$1,
	subtitle: subtitle$1,
	systemRequirements: systemRequirements$1,
	title: title$1,
	transparency: transparency$1,
	verification: verification$1
}, Symbol.toStringTag, { value: 'Module' }));

const card = {"platform":{"linux":{"description":"DEB, RPM, AppImage","title":"Linux"},"macos":{"title":"macOS","universalBadge":"Универсален бинарен файл: Apple Silicon и Intel"},"windows":{"description":"64-битов (x64)","title":"Windows"}}};
const page = {"subtitle":"Нативен на macOS, Windows и Linux.\n\nБез разходи, без проследяване, пълна поддръжка на VS Code разширения.","title":"Изтеглете Land"};
const previousReleases = {"description":"Изтеглете по-стара версия, ако трябва да се закачите за конкретно издание.","title":"Предишни версии"};
const subtitle = "Нативен на macOS, Windows и Linux.\n\nИзграден с Tauri. Задвижван от Rust. Верифициран с PGP.";
const systemRequirements = {"minimum":"Минимални изисквания","recommended":"Препоръчителни за най-добро изживяване","subtitle":"Бърза проверка преди изтеглянето спестява преинсталация по-късно.","supportedOS":"Поддържани операционни системи","title":"Системни изисквания"};
const title = "Изтеглете Land";
const verification = {"description":"Всяко издание на Land е PGP-подписано преди да бъде публикувано.\n\nПроверете изтеглянето си и се уверете, че сте получили точно това, което е компилирано.","downloadButton":"Изтеглете публичния PGP ключ","title":"Всяко издание е подписано. Проверете вашето.","verifyButton":"Проверете изтеглянето"};
const labels = {"version":"Версия:","size":"Размер:","requirements":"Изисквания:","loading":"Зареждане на наличните изтегляния...","errorTitle":"Неуспешно зареждане на изтегляния","downloadFailed":"Изтеглянето неуспешно. Моля, опитайте отново.","downloadFor":"Изтеглете за {{platform}}","copiedToClipboard":"{{label}} е копирано в клипборда.","failedToCopy":"Неуспешно копиране на {{label}}","sha256Checksum":"SHA-256 контролна сума","pgpSignature":"PGP подпис","verificationInstructions":"Инструкции за проверка","downloadVerification":"Проверка на изтеглянето","integrityCheck":"Проверка на целостта","copy":"Копиране","signedWithKeyId":"Подписано с ключ ID: {{keyId}}"};
const transparency = {"title":"Нищо скрито. Пълно разкриване на билда.","subtitle":"Нулева телеметрия по подразбиране. Варианти на билда, цели за внедряване и ключове за подписване са публични.\n\nПроверете всичко в изходния код."};
const BgDownload = {
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
	default: BgDownload,
	labels,
	page,
	previousReleases,
	subtitle,
	systemRequirements,
	title,
	transparency,
	verification
}, Symbol.toStringTag, { value: 'Module' }));

export { BgDownload as B, Download$1 as D, EnDownload as E, Download as a };
