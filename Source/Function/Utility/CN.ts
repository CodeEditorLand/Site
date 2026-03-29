import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: (string | undefined | null | false)[]) {
	return twMerge(clsx(inputs));
}
