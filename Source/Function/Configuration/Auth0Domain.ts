export default (import.meta.env["PUBLIC_AUTH0_DOMAIN"] as string | undefined) ||
	(import.meta.env["AUTH0_DOMAIN"] as string | undefined) ||
	process.env["AUTH0_DOMAIN"] ||
	"";
