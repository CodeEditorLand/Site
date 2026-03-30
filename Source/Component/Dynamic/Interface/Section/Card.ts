import type CardContentItem from "../Item/Content/Card.js";

export default interface Interface {
	header?: CardContentItem;
	body?: CardContentItem;
	footer?: CardContentItem;
}
