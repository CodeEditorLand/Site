import type CardContentItem from "../Item/Content/Card.js";

export default interface Interface {
	Header?: CardContentItem;

	Body?: CardContentItem;

	Footer?: CardContentItem;
}
