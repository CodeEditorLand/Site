import type { z as Zod } from "zod";

import type Schema from "../Schema.js";

export type Type = Zod.infer<typeof Schema>;

export type { Type as default };
