import React from "react";

import { cn } from "../UI/Utility";

import { CornerMarks } from "./CornerMarks";

export interface FieldRecordDataCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const FieldRecordDataCard = React.forwardRef<
	HTMLDivElement,
	FieldRecordDataCardProps
>(({ className, children, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn("CornerMarkShell text-card-fg bg-card relative", className)}
			style={
				{
					"--card-padding-block": "2.75rem",
					"--card-padding-inline": "1.5rem",
				} as React.CSSProperties
			}
			{...props}
		>
			{/* C19: picture-frame corner marks at the card level - every
			 FieldRecord surface (hero / 404 / portal / manifest) inherits them. */}
			<CornerMarks />
			<div
				style={{
					padding:
						"var(--card-padding-block) var(--card-padding-inline)",
				}}
			>
				{children}
			</div>
		</div>
	);
});

FieldRecordDataCard.displayName = "FieldRecordDataCard";

export { FieldRecordDataCard };

export default FieldRecordDataCard;
