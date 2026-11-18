import * as lucide from "lucide-react";

import { Button } from "../UI/Button";

import type Property from "./Interface/Property/Button.js";

export type DynamicButtonProps = Property;

/**
 * Icon registry:direct imports for instant render.
 * Covers all icons used in CTA buttons across the site.
 */
const ButtonIconRegistry: Record<string, lucide.LucideIcon> = {
	ArrowRight: lucide.ArrowRight,

	ChevronRight: lucide.ChevronRight,

	Download: lucide.Download,

	ExternalLink: lucide.ExternalLink,

	GitFork: lucide.GitFork,

	Globe: lucide.Globe,

	Heart: lucide.Heart,

	LogIn: lucide.LogIn,

	Mail: lucide.Mail,

	Search: lucide.Search,

	Send: lucide.Send,

	Sparkles: lucide.Sparkles,
};

/**
 * Dynamic Button - one action, in a Jelly button.
 *
 * The element is Jelly's, so the surface, the padding and the press belong to it
 * (`--jelly-button-padding-inline`, the host's own spring); the site states the
 * one thing Jelly cannot know - the focus ring - in its own `:focus-visible` rule
 * (`_Base.scss`: 2px `--Accent` at 4px). This adapter adds the label, the icon
 * and the busy state, and nothing else.
 *
 * The three `Staccato*` hooks it used to carry are gone. They belonged to the
 * noise system in `_Noise.scss`, whose channels are "updated every frame by
 * Staccato.ts" - a script that is not in the tree - so they were resolving to
 * static values: `StaccatoSpinner` held the loading glyph at 65% opacity and
 * `StaccatoIcon` held every icon at 85%, both with a 1.4s opacity transition that
 * had nothing to transition between. `StaccatoButton` also set
 * `padding-inline: 1rem` on the host, which is a second padding outside Jelly's
 * own, and a 0.5s `ease` hover lift that is not one of the site's three
 * intervals.
 *
 * ─── THE BUSY STATE HAS NO SPINNER ────────────────────────────────────────
 * It carried `lucide.Loader2` with `animate-spin`, on the argument that a
 * spinner may stay circular because a square cannot spin. The argument is about
 * the shape and the shape was never the problem: a spinner is a LOOP, it says
 * "something is happening" for as long as it turns and nothing else, and a state
 * that never resolves is not a state. The busy arm is now the record grammar's
 * own - a bar whose value is not known yet, and the word `LOADING` beside it -
 * drawn from the skeleton layer's two tokens so a busy button and a loading
 * record are the same object at two scales. See `Stylesheet/System/State/_Busy.scss`.
 */
const DynamicButton = ({ Content, OnAction, IsLoading = false }: Property) => {
	const {
		Text,

		Icon,

		Variant = "ghost",

		Size = "default",

		Type = "button",

		Disabled = false,

		FullWidth = false,

		ClassName,

		Href,

		OnClick,
		...props
	} = Content;

	const IconComponent = Icon ? ButtonIconRegistry[Icon] || null : null;

	// ─── THE FOUR THINGS THIS ADAPTER STATES ──────────────────────────────
	//
	// `disabled` is the ARMED gate, not the wait. A busy control keeps its box and
	// its authority: it is working, not unarmed, and a reader who sees a filled
	// button flatten the moment they press it reads the flattening as a refusal.
	// The second press is refused by the handler below and by
	// `[aria-busy="true"]`'s progress cursor, which is the honest pair - the state
	// says "in progress", not "not allowed".
	//
	// `aria-busy` is the state. The label shows it, the handler refuses it, and the
	// stylesheet gives it the cursor.
	//
	// `aria-label` keeps the action's NAME while the label is showing the state, so
	// a reader who tabs to the control during the wait is still told what it does.
	//
	// The props are spread before the three, so a caller can style and describe the
	// control but cannot make it claim to be idle while it is working.
	return (
		<Button
			variant={Variant}
			size={Size}
			type={Type}
			className={`${FullWidth ? "w-full" : ""} ${ClassName || ""}`}
			onClick={() => {
				if (IsLoading) return;

				if (OnAction) OnAction();

				if (OnClick) OnClick();

				if (Href) window.location.href = Href;
			}}
			{...props}
			disabled={Disabled}
			aria-busy={IsLoading || undefined}
			// The action's NAME becomes the control's accessible name while the label
			// is showing the state, so a reader who tabs to it during the wait is
			// still told what it does. Spread conditionally rather than assigned, so a
			// caller's own `aria-label` is untouched at rest.
			{...(IsLoading ? { "aria-label": Text } : {})}
		>
			{IsLoading ? (
				// ─── NO SPINNER ───────────────────────────────────────────────
				// This was `lucide.Loader2` with `animate-spin`: a loop that says
				// "something is happening" for as long as it spins and nothing else.
				// The busy arm is printed instead, in the record grammar and from the
				// skeleton layer's own two tokens - a bar whose value is not known
				// yet, and the vocabulary's own word. `State/_Busy.scss` states why.
				// The word is uppercased by the layer's tracking register, so it is
				// written here in sentence case like every other label on the site.
				<span className="StateBusy">
					<span className="StateBusy__Bar" aria-hidden="true" />

					<span className="StateBusy__Word">Loading</span>
				</span>
			) : (
				Text
			)}

			{!IsLoading && IconComponent ? (
				<>
					{"\u2001"}

					<IconComponent className="h-5 w-5" aria-hidden="true" />
				</>
			) : null}
		</Button>
	);
};

export { DynamicButton };

export default DynamicButton;
