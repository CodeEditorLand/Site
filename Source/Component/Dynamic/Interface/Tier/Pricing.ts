import type ButtonContent from "../Content/Button.js";

export default interface Interface {
	Id: string;
	Name: string;
	Description?: string;
	Price: {
		Monthly: number;
		Yearly: number;
	};
	Currency?: string;
	Elements?: string[];
	Features: string[];
	CTA: ButtonContent;
	Highlighted?: boolean;
	Popular?: boolean;
}
