import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import type CardContentItem from "./Interface/Item/Content/Card.js";
import type Property from "./Interface/Property/Card.js";

/**
 * Dynamic Card component that accepts section schemas
 * Composes Card, CardHeader, CardContent, CardFooter based on provided data
 */
export function DynamicCard({
	sections,
	className,
	onClick,
}: Property) {
	const { header, body, footer } = sections;

	return (
		<Card
			className={className}
			onClick={onClick}
			style={{ cursor: onClick ? "pointer" : undefined }}>
			{header && (
				<CardHeader>
					{header.title && <CardTitle>{header.title}</CardTitle>}
					{header.description && (
						<CardDescription>{header.description}</CardDescription>
					)}
					{header.content && (
						<div className="mt-2">{header.content}</div>
					)}
				</CardHeader>
			)}
			{body && (
				<CardContent>
					{body.title && (
						<h3 className="mb-2 font-semibold">{body.title}</h3>
					)}
					{body.description && (
						<p className="mb-4 text-muted-foreground">
							{body.description}
						</p>
					)}
					{body.content}
				</CardContent>
			)}
			{footer && <CardFooter>{footer.content}</CardFooter>}
		</Card>
	);
}

// Convenience wrapper for simple cards with title/desc/children
interface SimpleCardProps {
	title?: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

export function SimpleCard({
	title,
	description,
	children,
	className,
	onClick,
}: SimpleCardProps) {
	return (
		<Card
			className={className}
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

export type { CardContentItem, CardSection };
