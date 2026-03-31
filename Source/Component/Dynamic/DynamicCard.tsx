import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../UI/Card";
import type CardContentItem from "./Interface/Item/Content/Card.js";
import type Property from "./Interface/Property/Card.js";

/**
 * Dynamic Card with simplex noise integration.
 * Applies StaccatoCard + StaccatoBorderShimmer + StaccatoShadowLift
 * for organic hover lift and border breathing.
 */
export function DynamicCard({
	sections,
	className,
	onClick,
}: Property) {
	const { header: HeaderSection, body: BodySection, footer: FooterSection } = sections;

	return (
		<Card
			className={`StaccatoCard StaccatoBorderShimmer ${className || ""}`}
			onClick={onClick}
			style={{ cursor: onClick ? "pointer" : undefined }}>
			{HeaderSection && (
				<CardHeader>
					{HeaderSection.title && <CardTitle>{HeaderSection.title}</CardTitle>}
					{HeaderSection.content && (
						<div className="mt-2">{HeaderSection.content}</div>
					)}
					{HeaderSection.description && (
						<CardDescription>{HeaderSection.description}</CardDescription>
					)}
				</CardHeader>
			)}
			{BodySection && (
				<CardContent>
					{BodySection.title && (
						<h3 className="mb-2 font-semibold">{BodySection.title}</h3>
					)}
					{BodySection.description && (
						<p className="StaccatoBreath mb-4 text-muted-foreground">
							{BodySection.description}
						</p>
					)}
					{BodySection.content}
				</CardContent>
			)}
			{FooterSection && <CardFooter>{FooterSection.content}</CardFooter>}
		</Card>
	);
}

import type SimpleProperty from "./Interface/Property/Card/Simple.js";

export function SimpleCard({
	title,
	description,
	children,
	className,
	onClick,
}: SimpleProperty) {
	return (
		<Card
			className={`StaccatoCard StaccatoBorderShimmer ${className || ""}`}
			onClick={onClick}
			style={{ cursor: onClick ? "pointer" : undefined }}>
			{(title || description) && (
				<CardHeader>
					{title && <CardTitle>{title}</CardTitle>}
					{description && (
						<CardDescription>{description}</CardDescription>
					)}
				</CardHeader>
			)}
			<CardContent>{children}</CardContent>
		</Card>
	);
}
