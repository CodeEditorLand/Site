import { b2 as reactExports, b1 as jsxDevRuntimeExports } from './Vendor/React.D_hnTAe2.js';

class ErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  HandleRetry = () => {
    this.setState({ hasError: false, error: null });
  };
  render() {
    if (this.state.hasError) {
      const CaughtError = this.state.error ?? new Error("Unknown error");
      if (this.props.FallbackComponent) {
        return this.props.FallbackComponent(
          CaughtError,
          this.HandleRetry
        );
      }
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex min-h-[200px] items-center justify-center p-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full max-w-md border border-[var(--Destruct)] bg-card p-8 text-center", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto mb-4 h-1 w-8 bg-[var(--Destruct)]" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/ErrorBoundary.tsx",
          lineNumber: 58,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "mb-2 text-xl font-semibold text-[var(--Foreground)]", children: "Something went wrong" }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/ErrorBoundary.tsx",
          lineNumber: 59,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-6 text-[var(--MuteForeground)]", children: CaughtError.message || "An unexpected error occurred. Please try again." }, void 0, false, {
          fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/ErrorBoundary.tsx",
          lineNumber: 62,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            type: "button",
            onClick: this.HandleRetry,
            className: "inline-flex h-9 items-center justify-center border border-[var(--Destruct)] bg-card px-4 py-2 font-medium text-[var(--Destruct)] transition-all hover:bg-[var(--Destruct)] hover:text-[var(--DestructForeground)]",
            children: "Try again"
          },
          void 0,
          false,
          {
            fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/ErrorBoundary.tsx",
            lineNumber: 66,
            columnNumber: 7
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/ErrorBoundary.tsx",
        lineNumber: 57,
        columnNumber: 6
      }, this) }, void 0, false, {
        fileName: "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/ErrorBoundary.tsx",
        lineNumber: 56,
        columnNumber: 5
      }, this);
    }
    return this.props.children;
  }
}

const error = {"title":"Verificacion fallida","description":"Este enlace de verificacion es invalido o ha caducado.","instruction":"Por favor, solicite un nuevo correo electronico de verificacion o contacte al soporte si el problema persiste.","resendButton":"Enviar nuevo correo de verificacion","contactSupport":"Contactar soporte","backToSignInButton":"Volver a iniciar sesion"};
const pending = {"description":"Se ha enviado un enlace de verificacion a su direccion de correo electronico.\nPor favor, revise su bandeja de entrada y haga clic en el enlace para activar su cuenta.\nEl enlace es valido durante 7 dias.\nSi no recibe el correo en unos minutos, revise la carpeta de spam o promociones.\nPor seguridad, no comparta este correo con nadie.","resendButton":"Reenviar correo de verificacion","title":"Verifique su direccion de correo electronico"};
const success = {"title":"Correo verificado!","description":"Su correo electronico ha sido verificado exitosamente.","instruction":"Ahora puede iniciar sesion en su cuenta y comenzar a usar Code Editor Land.","continue":"Continuar a iniciar sesion","continueButton":"Continuar a la pagina de inicio"};
const title = "Verifique su correo electronico";
const description = "Se envio un enlace de verificacion a";
const instruction = "Haga clic en el enlace del correo electronico para verificar su cuenta y comenzar a usar Code Editor Land.";
const didntReceive = "No recibio el correo electronico?";
const checkSpam = "Revise su carpeta de spam o";
const resendLink = "reenviar correo de verificacion";
const resendButton = "Reenviar correo de verificacion";
const backToSignIn = "Volver a iniciar sesion";
const resending = "Enviando...";
const resent = "Correo de verificacion enviado!";
const verifying = {"title":"Verificando su correo electronico","description":"Por favor espere mientras verificamos su direccion de correo electronico..."};
const errorGeneric = "Ocurrio un error durante la verificacion.\nPor favor, intentelo de nuevo.";
const resendFailed = "No se pudo reenviar el correo electronico.\nPor favor, intentelo de nuevo.";
const emailLabel = "Correo electronico";
const emailPlaceholder = "Ingrese su correo electronico para reenviar la verificacion";
const resendSuccess = "Correo de verificacion reenviado!";
const resendCooldown = "Reenviar en {{seconds}}s";
const resend = {"success":"Correo de verificacion enviado exitosamente."};
const token = {"invalid":"Este enlace de verificacion es invalido.","expired":"Este enlace de verificacion ha caducado. Por favor solicite uno nuevo."};
const Verify = {
  error,
  pending,
  success,
  title,
  description,
  instruction,
  didntReceive,
  checkSpam,
  resendLink,
  resendButton,
  backToSignIn,
  resending,
  resent,
  verifying,
  errorGeneric,
  resendFailed,
  emailLabel,
  emailPlaceholder,
  resendSuccess,
  resendCooldown,
  resend,
  token,
};

const Verify$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	backToSignIn,
	checkSpam,
	default: Verify,
	description,
	didntReceive,
	emailLabel,
	emailPlaceholder,
	error,
	errorGeneric,
	instruction,
	pending,
	resend,
	resendButton,
	resendCooldown,
	resendFailed,
	resendLink,
	resendSuccess,
	resending,
	resent,
	success,
	title,
	token,
	verifying
}, Symbol.toStringTag, { value: 'Module' }));

export { ErrorBoundary as E, Verify$1 as V };
//# sourceMappingURL=Verify.D2u08mPO.js.map
