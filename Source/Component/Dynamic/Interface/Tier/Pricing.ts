import type ButtonContent from "../Content/Button.js";

export default interface Interface {
	id: string;
	name: string;
	description?: string;
	price: {
		monthly: number;
		yearly: number;
	};
	currency?: string;
	features: string[];
	cta: ButtonContent;
	highlighted?: boolean;
	popular?: boolean;
}
