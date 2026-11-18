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
 * intervals. A spinner may stay circular - `animate-spin` is the one loop the
 * motion layer permits, because a square cannot spin - so the busy state keeps
 * that class and loses only the dimming.
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

	return (
		<Button
			variant={Variant}
			size={Size}
			type={Type}
			disabled={Disabled || IsLoading}
			className={`${FullWidth ? "w-full" : ""} ${ClassName || ""}`}
			aria-busy={IsLoading || undefined}
			onClick={() => {
				if (IsLoading) return;

				if (OnAction) OnAction();

				if (OnClick) OnClick();

				if (Href) window.location.href = Href;
			}}
			{...props}
		>
			{Text}
			{IsLoading ? (
				<>
					{"\u2001"}

					<lucide.Loader2
						className="h-4 w-4 animate-spin"
						aria-hidden="true"
					/>
				</>
			) : IconComponent ? (
				<>
					{"\u2001"}

					<IconComponent
						className="h-5 w-5"
						aria-hidden="true"
					/>
				</>
			) : null}
		</Button>
	);
};

export { DynamicButton };

export default DynamicButton;
