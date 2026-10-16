import React from "react";

import { cn } from "../UI/Utility";

export type FieldRecordElement =
	| "Land"
	| "Mountain"
	| "Cocoon"
	| "Wind"
	| "Sky"
	| "Air"
	| "Echo"
	| "Grove"
	| "Common"
	| "Maintain"
	| "Mist"
	| "Output"
	| "Rest"
	| "SideCar"
	| "Vine"
	| "Worker";

export interface FieldRecordSealProps {
	element: FieldRecordElement;

	className?: string;

	size?: number;
}

const SealPattern: React.FC<{ element: FieldRecordElement }> = ({
	element,
}) => {
	const stroke = "var(--Accent)";

	const detail = "#D6B947";

	switch (element) {
		case "Land":
			return (
				<svg
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
					className="h-full w-full"
				>
					<circle
						cx="32"
						cy="32"
						r="28"
						fill="none"
						stroke={stroke}
						strokeWidth="1"
					/>
					<circle
						cx="32"
						cy="32"
						r="20"
						fill="none"
						stroke={stroke}
						strokeWidth="0.5"
					/>
					<circle
						cx="32"
						cy="32"
						r="12"
						fill="none"
						stroke={stroke}
						strokeWidth="0.5"
					/>
					{/* Registry tick marks - cardinal (green) + intercardinal (gold) */}
					<path
						d="M32 4 L32 8 M52 32 L56 32 M32 56 L32 60 M8 32 L4 32"
						stroke={stroke}
						strokeWidth="0.5"
					/>
					<path
						d="M46 18 L52 12 M46 46 L52 52 M18 46 L12 52 M18 18 L12 12"
						stroke={detail}
						strokeWidth="0.5"
					/>
					<circle cx="32" cy="32" r="4" fill={stroke} />
				</svg>
			);

		case "Mountain":
			return (
				<svg
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
					className="h-full w-full"
				>
					{/* Sun beside the peaks */}
					<circle
						cx="16"
						cy="12"
						r="3.5"
						fill="none"
						stroke={detail}
						strokeWidth="0.5"
					/>
					<path
						d="M4 58 L20 30 L32 44 L44 18 L60 58"
						fill="none"
						stroke={stroke}
						strokeWidth="1"
					/>
					{/* Summit cap on the main peak */}
					<path
						d="M39 23 L44 17 L49 23"
						fill="none"
						stroke={detail}
						strokeWidth="0.5"
					/>
					<path
						d="M8 62 L24 38 L36 50 L48 30 L56 62"
						fill="none"
						stroke={detail}
						strokeWidth="0.5"
					/>
					<path
						d="M12 64 L28 46 L38 56 L50 40 L52 64"
						fill="none"
						stroke={stroke}
						strokeWidth="0.5"
					/>
				</svg>
			);

		case "Cocoon":
			return (
				<svg
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
					className="h-full w-full"
				>
					{/* Hanging thread + outer shell seam */}
					<path d="M32 0 L32 7" stroke={stroke} strokeWidth="0.5" />
					<path d="M32 8 L32 11" stroke={detail} strokeWidth="0.5" />
					<path
						d="M32 4 C48 16 56 32 52 52 C48 60 38 64 32 64 C26 64 16 60 12 52 C8 32 16 16 32 4 Z"
						fill="none"
						stroke={stroke}
						strokeWidth="1"
					/>
					{/* Wrap bands across the shell */}
					<path
						d="M14 30 L50 30 M12 44 L50 44"
						fill="none"
						stroke={detail}
						strokeWidth="0.5"
					/>
					<path
						d="M32 12 C42 20 48 34 44 50 C42 56 36 58 32 58 C28 58 22 56 20 50 C16 34 22 20 32 12"
						fill="none"
						stroke={detail}
						strokeWidth="0.5"
					/>
					{/* Bottom seam */}
					<path d="M32 59 L32 63" stroke={detail} strokeWidth="0.5" />
					<path
						d="M32 20 C38 26 42 38 38 50 C36 54 34 54 32 54 C30 54 28 54 26 50 C22 38 26 26 32 20"
						fill="none"
						stroke={stroke}
						strokeWidth="0.5"
					/>
				</svg>
			);

		case "Wind":
			return (
				<svg
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
					className="h-full w-full"
				>
					<circle
						cx="32"
						cy="32"
						r="28"
						fill="none"
						stroke={stroke}
						strokeWidth="1"
					/>
					<path
						d="M32 4 L32 60 M4 32 L60 32"
						stroke={stroke}
						strokeWidth="0.5"
					/>
					<path
						d="M10 10 L54 54 M54 10 L10 54"
						stroke={stroke}
						strokeWidth="0.5"
					/>
					{/* Cardinal arrowheads */}
					<path
						d="M28 9 L32 4 L36 9 M28 55 L32 60 L36 55 M55 28 L60 32 L55 36 M9 28 L4 32 L9 36"
						stroke={detail}
						strokeWidth="0.5"
					/>
					<path d="M32 8 L36 28 L32 32 L28 28 Z" fill={stroke} />
				</svg>
			);

		case "Sky":
			return (
				<svg
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
					className="h-full w-full"
				>
					<circle
						cx="32"
						cy="32"
						r="28"
						fill="none"
						stroke={stroke}
						strokeWidth="1"
					/>
					<circle
						cx="32"
						cy="32"
						r="20"
						fill="none"
						stroke={stroke}
						strokeWidth="0.5"
					/>
					<circle
						cx="32"
						cy="32"
						r="12"
						fill="none"
						stroke={stroke}
						strokeWidth="0.5"
					/>
					{/* Sun rays in the ring gap */}
					<path
						d="M32 6 L32 11 M46 18 L52 12 M18 18 L12 12"
						stroke={stroke}
						strokeWidth="0.5"
					/>
					{/* Crescent arc */}
					<path
						d="M48 18 A6 6 0 1 1 53 15"
						fill="none"
						stroke={detail}
						strokeWidth="0.5"
					/>
					<circle cx="24" cy="20" r="1" fill={detail} />
					<circle cx="44" cy="16" r="1" fill={detail} />
					<circle cx="48" cy="40" r="1" fill={detail} />
					<circle cx="20" cy="44" r="1" fill={detail} />
					<circle cx="36" cy="48" r="1" fill={detail} />
					<circle cx="14" cy="26" r="1" fill={detail} />
					<circle cx="52" cy="28" r="1" fill={detail} />
					<circle cx="32" cy="54" r="1" fill={detail} />
				</svg>
			);

		case "Air":
			return (
				<svg
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
					className="h-full w-full"
				>
					<circle
						cx="32"
						cy="32"
						r="12"
						fill="none"
						stroke={stroke}
						strokeWidth="0.5"
					/>
					{/* Four current arcs - one per quadrant */}
					<path
						d="M52 32 A20 20 0 0 1 32 52 M32 52 A20 20 0 0 1 12 32 M12 32 A20 20 0 0 1 32 12 M32 12 A20 20 0 0 1 52 32"
						fill="none"
						stroke={detail}
						strokeWidth="0.5"
					/>
					<circle cx="52" cy="32" r="2" fill={stroke} />
					<circle cx="32" cy="52" r="2" fill={stroke} />
					<circle cx="12" cy="32" r="2" fill={stroke} />
					<circle cx="32" cy="12" r="2" fill={stroke} />
					<circle cx="32" cy="32" r="1.5" fill={detail} />
				</svg>
			);

		case "Echo":
			return (
				<svg
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
					className="h-full w-full"
				>
					<circle cx="32" cy="32" r="4" fill={stroke} />
					<circle
						cx="32"
						cy="32"
						r="12"
						fill="none"
						stroke={stroke}
						strokeWidth="1"
					/>
					<circle
						cx="32"
						cy="32"
						r="20"
						fill="none"
						stroke={stroke}
						strokeWidth="0.5"
					/>
					{/* Dashed outer ring - the echo ripple */}
					<circle
						cx="32"
						cy="32"
						r="28"
						fill="none"
						stroke={detail}
						strokeWidth="0.5"
						strokeDasharray="3 5"
					/>
					{/* Pulse ticks in the ring gap */}
					<path
						d="M32 6 L32 10 M32 54 L32 58"
						stroke={detail}
						strokeWidth="0.5"
					/>
				</svg>
			);

		case "Grove":
			return (
				<svg
					viewBox="0 0 64 64"
					xmlns="http://www.w3.org/2000/svg"
					className="h-full w-full"
				>
					<path d="M32 60 L32 24" stroke={stroke} strokeWidth="1" />
					<path
						d="M32 46 L24 36 M32 46 L40 36 M32 38 L26 30 M32 38 L38 30"
						stroke={stroke}
						strokeWidth="0.5"
					/>
					{/* Ground line + roots */}
					<path
						d="M14 60 L50 60 M24 60 L32 53 L40 60"
						stroke={detail}
						strokeWidth="0.5"
					/>
					<circle cx="32" cy="12" r="3.5" fill={stroke} />
					<circle cx="20" cy="20" r="2.5" fill={stroke} />
					<circle cx="44" cy="20" r="2.5" fill={stroke} />
					<circle cx="26" cy="26" r="2" fill={stroke} />
					<circle cx="38" cy="26" r="2" fill={stroke} />
					<circle cx="16" cy="14" r="1.5" fill={detail} />
					<circle cx="48" cy="14" r="1.5" fill={detail} />
					<circle cx="32" cy="20" r="1.5" fill={detail} />
				</svg>
			);

		default:
			// Unknown elements render the spec's neutral ◎ (U+25CE) fallback -
			// no dedicated seal SVG for the extended architecture elements.
			return (
				<span
					className="flex h-full w-full items-center justify-center font-mono text-base leading-none"
					style={{ color: stroke }}
					aria-hidden="true"
				>
					◎
				</span>
			);
	}
};

const FieldRecordSeal: React.FC<FieldRecordSealProps> = ({
	element,
	className,
	size = 64,
}) => {
	return (
		<div
			className={cn("inline-block", className)}
			style={{
				width: size,
				height: size,
			}}
			aria-hidden="true"
		>
			<SealPattern element={element} />
		</div>
	);
};

export { FieldRecordSeal };

export default FieldRecordSeal;
