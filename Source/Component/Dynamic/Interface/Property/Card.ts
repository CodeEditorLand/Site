import type CardSection from "../Section/Card.js";

export default interface Interface {
	sections: CardSection;
	className?: string;
	onClick?: () => void;
}
