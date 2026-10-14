import { clsx } from "clsx";

import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 */
export function CN(...Input: (string | undefined | null | false)[]) {
	return twMerge(clsx(Input));
}
