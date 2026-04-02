import type Testimonial from "../Item/Testimonial.js";

export default interface Interface {
	Title?: string;
	Subtitle?: string;
	Testimonials: Testimonial[];
	Columns?: 1 | 2 | 3 | 4 | 5 | 6;
}
