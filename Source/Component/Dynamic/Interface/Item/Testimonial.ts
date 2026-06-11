export default interface Interface {
	Id: string;

	Quote: string;

	Author: string;

	Role?: string;

	Company?: string;

	Avatar?: string;

	Emoji?: string;

	Href?: string;

	Rating?: 1 | 2 | 3 | 4 | 5;
}
