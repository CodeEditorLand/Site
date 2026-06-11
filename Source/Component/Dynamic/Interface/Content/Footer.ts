import type FooterColumn from "../Column/Footer.js";

export default interface Interface {
	Brand: {
		Name: string;

		Description?: string;
	};

	Social?: {
		GitHub?: string;

		Twitter?: string;

		Discord?: string;

		LinkedIn?: string;
	};

	Columns: FooterColumn[];

	BottomBar?: {
		Copyright?: string;

		MadeWith?: boolean;
	};
}
