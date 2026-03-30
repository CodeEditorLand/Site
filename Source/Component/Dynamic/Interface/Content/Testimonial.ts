import type Testimonial from "../Item/Testimonial.js";

export default interface Interface {
	title?: string;
	subtitle?: string;
	testimonials: Testimonial[];
	columns?: 1 | 2 | 3 | 4 | 5 | 6;
}
