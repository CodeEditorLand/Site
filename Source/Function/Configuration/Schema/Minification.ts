const { z } = await import("zod");

export default z.union([z.enum(["terser", "esbuild"]), z.literal(false)]);
