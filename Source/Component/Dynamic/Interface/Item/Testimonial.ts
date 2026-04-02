export default interface Interface {
	Id: string;
	Quote: string;
	Author: string;
	Role?: string;
	Company?: string;
	Avatar?: string;
	Rating?: 1 | 2 | 3 | 4 | 5;
}
