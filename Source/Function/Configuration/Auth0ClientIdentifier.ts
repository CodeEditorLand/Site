export default (import.meta.env["PUBLIC_AUTH0_CLIENT_ID"] as
	string | undefined) ||
	(import.meta.env["AUTH0_CLIENT_ID"] as string | undefined) ||
	process.env["AUTH0_CLIENT_ID"] ||
	"";
