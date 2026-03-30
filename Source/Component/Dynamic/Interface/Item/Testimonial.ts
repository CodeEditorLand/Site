export default interface Interface {
	id: string;
	quote: string;
	author: string;
	role?: string;
	company?: string;
	avatar?: string;
	rating?: 1 | 2 | 3 | 4 | 5;
}
