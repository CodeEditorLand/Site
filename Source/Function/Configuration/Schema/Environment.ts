export default (await import("zod")).z.enum([
	"Production",
	"Preview",
	"Development",
]);
