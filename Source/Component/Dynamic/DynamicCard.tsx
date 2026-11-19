import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../UI/Card";

import { RichText } from "../UI/RichText.js";

import type Property from "./Interface/Property/Card.js";

import type SimpleProperty from "./Interface/Property/Card/Simple.js";

/**
 * Dynamic Card - a Jelly card with three optional sections.
 *
 * The surface is Jelly's: `UI/Card` renders the `jelly-card` host and pins the
 * four properties the site's cards share (`--jelly-fill`, radius 0, no internal
 * padding, inherited type). This adapter only composes a header, a body and a
 * footer into it.
 *
 * The body's prose carries no `StaccatoBreath`. The class is the noise system's
 * live-opacity hook, and on static prose it resolves to a constant `opacity:
 * 0.9` under a `1.6s` opacity transition - motion with no state to move between,
 * and a second dimming on top of the `opacity-70` the body already carries. A
 * card's body is a sentence; a sentence is not loading, and it is not being
 * hovered.
 */
const DynamicCard = ({ Sections, ClassName, OnClick, Style }: Property) => {
	const {
		Header: HeaderSection,

		Body: BodySection,

		Footer: FooterSection,
	} = Sections;

	return (
		<Card
			className={`${ClassName || ""}`}
			onClick={OnClick}
			style={
				{
					cursor: OnClick ? "pointer" : undefined,
					...(Style || {}),
				} as React.CSSProperties
			}
		>
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
						<h3 className="mb-2 font-mono text-sm font-medium">
							{BodySection.title}
						</h3>
					)}

					{BodySection.description && (
						<div className="mb-4 text-card-foreground opacity-70">
							<RichText Text={BodySection.description} />
						</div>
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
			className={`${ClassName || ""}`}
			onClick={OnClick}
			style={{ cursor: OnClick ? "pointer" : undefined }}
		>
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
