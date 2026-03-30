import type FooterColumn from "../Column/Footer.js";

export default interface Interface {
	brand: {
		name: string;
		description?: string;
	};
	social?: {
		github?: string;
		twitter?: string;
		discord?: string;
		linkedin?: string;
	};
	columns: FooterColumn[];
	bottomBar?: {
		copyright?: string;
		madeWith?: boolean;
	};
}
