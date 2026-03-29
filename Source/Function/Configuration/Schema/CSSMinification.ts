const { z } = await import("zod");

export default z.union([z.enum(["esbuild", "lightningcss"]), z.literal(false)]);
