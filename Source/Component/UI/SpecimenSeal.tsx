/**
 * SpecimenSeal - the seal's neutral roundel, kept as the entry point it was.
 *
 * This file used to draw a second seal: a filled disc with eight petals and
 * eight smaller petals inside it, in `#D6B947` and `var(--Accent, #1E742A)`.
 * It had no consumer, and it was a different form from the eight element
 * roundels beside it - so the site had two seals and used one.
 *
 * The form now lives in `Component/Mark/SealNeutral.tsx`, where the element
 * seals' fallback arm reads it, and this module re-exports it so the path that
 * always named the neutral seal still names it. Nothing was deleted: the disc
 * was replaced by the roundel every other seal is a variation of, and the `◎`
 * the empty field prints is the mark the disc's consumers were using.
 */
export {
	SealNeutral as SpecimenSeal,
	SealNeutral as default,
} from "../Mark/SealNeutral.js";
