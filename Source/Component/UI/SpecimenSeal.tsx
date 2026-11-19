/**
 * SpecimenSeal - the seal's neutral roundel, and the path that names it.
 *
 * The form is `Component/Mark/SealNeutral.tsx`, and the element seals' fallback arm
 * reads it there (`Brand/FieldRecordSeal.tsx`): a roundel - the form the eight
 * element seals are variations of - with the grammar's `◎` in an empty field. This
 * module re-exports it so the path that has always named the neutral seal keeps
 * naming it: one seal on the site, at one path, with one implementation.
 */
export {
	SealNeutral as SpecimenSeal,
	SealNeutral as default,
} from "../Mark/SealNeutral.js";
