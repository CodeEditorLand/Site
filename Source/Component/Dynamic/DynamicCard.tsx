import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../UI/Card";
import type Property from "./Interface/Property/Card.js";
import type SimpleProperty from "./Interface/Property/Card/Simple.js";

/**
 * Dynamic Card with simplex noise integration.
 * Applies StaccatoCard + StaccatoBorderShimmer + StaccatoShadowLift
 * for organic hover lift and border breathing.
 */
const DynamicCard = ({ Sections, ClassName, OnClick }: Property) => {
	const {
		Header: HeaderSection,
		Body: BodySection,
		Footer: FooterSection,
	} = Sections;

	return (
		<Card
			className={`StaccatoCard StaccatoBorderShimmer ${ClassName || ""}`}
			onClick={OnClick}
			style={{ cursor: OnClick ? "pointer" : undefined }}>
			{HeaderSection && (
				<CardHeader>
					{HeaderSection.title && (
						<CardTitle>{HeaderSection.title}</CardTitle>
					)}
					{HeaderSection.content && (
						<div className="mt-2">{HeaderSection.content}</div>
					)}
					{HeaderSection.description && (
						<CardDescription>
							{HeaderSection.description}
						</CardDescription>
					)}
				</CardHeader>
			)}
			{BodySection && (
				<CardContent>
					{BodySection.title && (
						<h3 className="mb-2 font-semibold">
							{BodySection.title}
						</h3>
					)}
					{BodySection.description && (
						<p className="StaccatoBreath mb-4 text-muted-foreground whitespace-pre-line">
							{BodySection.description}
						</p>
					)}
					{BodySection.content}
				</CardContent>
			)}
			{FooterSection && <CardFooter>{FooterSection.content}</CardFooter>}
		</Card>
	);
};

export { DynamicCard };

export default DynamicCard;

export const SimpleCard = ({
	Title,
	Description,
	Children,
	ClassName,
	OnClick,
}: SimpleProperty) => {
	return (
		<Card
			className={`StaccatoCard StaccatoBorderShimmer ${ClassName || ""}`}
			onClick={OnClick}
			style={{ cursor: OnClick ? "pointer" : undefined }}>
			{(Title || Description) && (
				<CardHeader>
					{Title && <CardTitle>{Title}</CardTitle>}
					{Description && (
						<CardDescription>{Description}</CardDescription>
					)}
				</CardHeader>
			)}
			<CardContent>{Children}</CardContent>
		</Card>
	);
};
