import type CardSection from "../Section/Card.js";

export default interface Interface {
	Sections: CardSection;

	ClassName?: string;

	OnClick?: () => void;

	Style?: React.CSSProperties;
}
