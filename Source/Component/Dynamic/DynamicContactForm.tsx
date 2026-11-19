"use client";

import { useAuth0 } from "@auth0/auth0-react";

import { Copy, Mail, MessageSquare } from "lucide-react";

import { useState } from "react";

import type { CSSProperties } from "react";

import {
	BuildEmailBody,
	BuildMailtoHref,
	GeneratePairId,
	type RequestConfig,
} from "../../Library/Contact/Request.js";

import Auth0Provider from "../Provider/Auth0Provider.js";

import { FormSummary } from "../UI/FormSummary";

// ── Exported wrapper (Auth0 context) ──────────────────────────────────────

export default ({
	Config,
	Domain,
	ClientIdentifier,
}: {
	Config: RequestConfig;

	Domain?: string;

	ClientIdentifier?: string;
}) => (
	<Auth0Provider
		Children={<ContactFormInner Config={Config} />}
		{...(Domain ? { Domain } : {})}
		{...(ClientIdentifier ? { ClientIdentifier } : {})}
	/>
);

// ── Provider label helper ─────────────────────────────────────────────────

const ProviderLabel = (Sub?: string): string => {
	if (!Sub) return "Email / Password";

	if (Sub.startsWith("google-oauth2|")) return "Google";

	if (Sub.startsWith("github|")) return "GitHub";

	if (Sub.startsWith("gitlab|")) return "GitLab";

	if (Sub.startsWith("okta|")) return "Okta SSO";

	if (Sub.startsWith("samlp|")) return "SAML SSO";

	if (Sub.startsWith("waad|")) return "Azure AD";

	return "Auth0";
};

// ── Required marker ───────────────────────────────────────────────────────

/**
 * The asterisk every required label shares, so it is written once.
 *
 * Module-level rather than declared inside the form: a component defined in
 * another component's body is a new component type on every render, which
 * remounts its DOM. This one has no state, but it should still be a type, not a
 * value.
 */
const RequiredMark = () => (
	<span className="contact-form__required" aria-hidden="true">
		*
	</span>
);

// ── The form's surface ────────────────────────────────────────────────────

/**
 * The form's own surface: the white information box on the creme field, square,
 * at the documented inset.
 *
 * HEAD wrapped the field block in a `StaccatoCard bg-card` div; the surface is
 * the same, but it is a `jelly-card` now (`DESIGN.md` §1.7, §6.5 - a card is a
 * Jelly element, not a `<div>` plus utilities). The five custom properties are
 * the ones `Doc.astro` and the release manifest pass, so every white box on the
 * site is one surface. `--jelly-card-font-size: inherit` keeps the card from
 * resetting type to Jelly's own default, so every role inside it stays on the
 * site's scale.
 */
const Surface = {
	"--jelly-fill": "var(--Card)",

	"--jelly-radius": "0",

	"--jelly-card-font-size": "inherit",

	"--jelly-card-padding-block": "var(--space-group)",

	"--jelly-card-padding-inline": "var(--space-group)",
} as CSSProperties;

// ── Inner form component ──────────────────────────────────────────────────

/**
 * The form body. Presentation changed; behaviour did not.
 *
 * Every handler, the Auth0 context, the field types, the validation rules, the
 * mailto/copy payloads and the pair reference are exactly as they were. What
 * changed is the surface: the request's title, its sentence and the handler
 * address are printed by the form itself, inside the chip row the baseline
 * opens with - the page's only `h1` is the request title, and it sits at the
 * mono label scale rather than the display scale - and every Tailwind string
 * inside the form was replaced by a class from `Contact/_Form.scss`, so the
 * form's anatomy is in one partial instead of in the markup.
 */
const ContactFormInner = ({ Config }: { Config: RequestConfig }) => {
	const { user: User } = useAuth0();

	const Year = new Date().getFullYear();

	// Build initial values - prefill from Auth0 where possible
	const InitialValues = (): Record<string, string | string[]> => {
		const V: Record<string, string | string[]> = {};

		for (const Field of Config.Fields) {
			if (Field.prefill === "name")
				V[Field.id] = User?.name || User?.nickname || "";
			else if (Field.prefill === "email") V[Field.id] = User?.email || "";
			else if (Field.prefill === "sub") V[Field.id] = User?.sub || "";
			else if (Field.prefill === "provider")
				V[Field.id] = ProviderLabel(User?.sub);
			else if (Field.type === "checkboxes") V[Field.id] = [];
			else V[Field.id] = "";
		}

		return V;
	};

	// Stable pair ID for this form session - generated once, never changes.
	// Appears as CODE-XXXXX in the subject and body so the team can match
	// a reply to its original submission immediately.
	const [PairId] = useState<string>(GeneratePairId);

	const [Values, SetValues] =
		useState<Record<string, string | string[]>>(InitialValues);

	const [CopyState, SetCopyState] = useState<"idle" | "copied">("idle");

	const [Errors, SetErrors] = useState<Record<string, string>>({});

	const HandleChange = (Id: string, Value: string | string[]) => {
		SetValues((Prev) => ({ ...Prev, [Id]: Value }));

		SetErrors((Prev) => ({ ...Prev, [Id]: "" }));

		/*
		 * Editing a field invalidates the copy: the text in the clipboard no
		 * longer matches the form, so the receipt that says it does has to go.
		 * This is the only thing that clears it - the receipt stays on the page
		 * until it stops being true, rather than leaving after three seconds
		 * the way a toast does.
		 */
		SetCopyState("idle");
	};

	const HandleCheckboxGroup = (Id: string, Option: string) => {
		const Current = (Values[Id] as string[]) || [];

		const Next = Current.includes(Option)
			? Current.filter((V) => V !== Option)
			: [...Current, Option];

		HandleChange(Id, Next);
	};

	/**
	 * Every missing required field, and the sentence that says what is missing.
	 *
	 * A pure read: it returns the errors and touches no state, so a caller can
	 * ask "is this fileable?" without committing an interruption - which is what
	 * lets the primary action decide whether to arm itself, explain itself, or
	 * open the mail client, and lets the error receipt name the first field to
	 * fix without a second pass over the rules.
	 */
	const ComputeErrors = (): Record<string, string> => {
		const NewErrors: Record<string, string> = {};

		for (const Field of Config.Fields) {
			if (!Field.required) continue;

			const Value = Values[Field.id];

			if (Field.type === "checkbox" && Value !== "true") {
				NewErrors[Field.id] = "This confirmation is required.";
			} else if (
				Field.type === "checkboxes" &&
				(Value as string[]).length === 0
			) {
				NewErrors[Field.id] = "Select at least one option.";
			} else if (
				Field.type !== "checkbox" &&
				Field.type !== "checkboxes" &&
				(!Value || (Value as string).trim() === "")
			) {
				NewErrors[Field.id] = "This field is required.";
			}
		}

		return NewErrors;
	};

	/** Commit an interruption, and say whether the form is fileable. */
	const ApplyErrors = (Next: Record<string, string>): boolean => {
		SetErrors(Next);

		return Object.keys(Next).length === 0;
	};

	/** Put the cursor where the fix is. The controls all carry their field's id. */
	const Focus = (Id: string): void => {
		const Control = document.getElementById(Id);

		if (!Control) return;

		Control.focus({ preventScroll: true });

		/*
		 * The site scrolls smoothly, which is right for a link and wrong for a
		 * refusal: the reader pressed a control and has to be taken to the
		 * problem now, not in 300ms. The root's behaviour is `auto` for the one
		 * call and restored afterwards, so no other scroll on the page changes.
		 */
		const Root = document.documentElement;

		const Behavior = Root.style.scrollBehavior;

		Root.style.scrollBehavior = "auto";

		Control.scrollIntoView({ block: "center" });

		Root.style.scrollBehavior = Behavior;
	};

	/**
	 * The primary action, in three states.
	 *
	 * `READY` - every required field carries a value: the link follows its
	 * `mailto:` and the reader's mail client opens with the request in it.
	 *
	 * `PREPARING` - something is missing: the action is `aria-disabled`, and
	 * activating it does not open a half-written message. It files the errors,
	 * renders the receipt, and moves the cursor to the first field that needs a
	 * value. An action that refuses has to say why in the same gesture, which is
	 * the whole reason the refusal is a state rather than a `disabled` attribute
	 * on an anchor that no longer responds at all.
	 */
	const HandlePrimary = (
		Event: React.MouseEvent<HTMLAnchorElement>,
	): void => {
		const Next = ComputeErrors();

		if (Object.keys(Next).length === 0) {
			SetErrors({});

			return;
		}

		Event.preventDefault();

		SetErrors(Next);

		const First = Config.Fields.find((Field) => Next[Field.id]);

		if (First) Focus(First.id);
	};

	const HandleCopy = async () => {
		const Next = ComputeErrors();

		if (!ApplyErrors(Next)) {
			const First = Config.Fields.find((Field) => Next[Field.id]);

			if (First) Focus(First.id);

			return;
		}

		const Body = BuildEmailBody(Config, Values, Year, PairId);

		const Subject = `[${Config.Code}-${PairId}] ${Config.Title} Request`;

		const Full = `To: ${Config.To}\nSubject: ${Subject}\n\n${Body}`;

		try {
			await navigator.clipboard.writeText(Full);

			SetCopyState("copied");
		} catch {
			// Clipboard not available
		}
	};

	// Never call Validate() during render - it calls SetErrors which triggers
	// a state update causing an infinite re-render loop during SSR prerender.
	// Always build the full href; validation fires only on user interaction.
	const MailtoHref = BuildMailtoHref(Config, Values, Year, PairId);

	/**
	 * The form's state, in the site's fixed STATUS vocabulary (`DESIGN.md` §1.5)
	 * and no other word:
	 *
	 * - `PREPARING` - a required field is still empty, so the request is not
	 *   yet fileable. Quiet ink, because nothing is wrong.
	 * - `READY` - every required field carries a value; the request can be
	 *   filed. Full ink.
	 * - `INTERRUPTED` - a send was refused by validation; the errors under the
	 *   fields say which. Full ink, and the errors carry `--Destruct`.
	 *
	 * It reads the same `Values` and `Errors` the controls read, so the word
	 * cannot disagree with the form it describes. No `LOADING` or `VERIFIED`
	 * exists here: the form posts nothing, it hands the reader a message.
	 *
	 * The test is whether any message has words in it, not whether `Errors` has
	 * keys: a field that is edited after a refusal is cleared to an empty
	 * string rather than deleted from the record, and counting keys left the
	 * form interrupted for the rest of its life from the first keystroke.
	 */
	const Complete = Config.Fields.every((Field) => {
		if (!Field.required) return true;

		const Value = Values[Field.id];

		if (Field.type === "checkbox") return Value === "true";

		if (Field.type === "checkboxes")
			return Array.isArray(Value) && Value.length > 0;

		return typeof Value === "string" && Value.trim() !== "";
	});

	const HasErrors = Object.values(Errors).some(
		(Message) => typeof Message === "string" && Message !== "",
	);

	const FormState = HasErrors
		? "INTERRUPTED"
		: Complete
			? "READY"
			: "PREPARING";

	/** The interrupted fields, in the order the form prints them. */
	const Interrupted = Config.Fields.filter((Field) => Errors[Field.id]);

	/** The primary action is armed only when the request is fileable. */
	const Armed = FormState === "READY";

	/** The required marker every label shares, so it is written once. */

	return (
		<div className="contact-form">
			<div className="contact-form__inner">
				{/* The request's own opening: the pair reference and the form's
				    state as chips, then the page's only `h1` - the request
				    title, at the mono label scale rather than the display
				    scale; then its sentence; then the address it is sent to.
				    The code, the statutory basis and the window are not here:
				    they are the route's facts and the page's record head
				    prints them once, above this form. */}
				<div className="contact-form__open">
					<div className="contact-form__meta">
						<span
							className="contact-form__pair"
							title="Pair reference - income code + instance ID. Quote this in all replies."
						>
							{Config.Code}-{PairId}
						</span>
						<span
							className="contact-form__state"
							data-state={FormState}
							role="status"
						>
							{FormState}
						</span>
					</div>

					<h1 className="contact-form__title">{Config.Title}</h1>

					<p className="contact-form__standfirst">
						{Config.Subtitle}
					</p>

					<p className="contact-form__handler">
						Sends to:{" "}
						<span className="contact-form__handler-value">
							{Config.To}
						</span>
					</p>
				</div>

				{/* Form - the field block, on the form's one Jelly surface */}
				<jelly-card style={Surface}>
					{/*
					 * The interruption receipt: what was refused, how many
					 * fields, and which ones.
					 *
					 * It heads the field block because it describes the fields
					 * - and because the refusal moves the cursor to the first
					 * field that needs a value, so the receipt is above the
					 * field the reader lands on. A receipt printed under the
					 * actions was the first attempt: it appears where the reader
					 * pressed, and then the jump leaves it below the fold, which
					 * makes it an artifact nobody reads.
					 *
					 * The artifact itself is `UI/FormSummary` now. It was sixteen
					 * lines of markup here and a second block of classes in
					 * `Contact/_Form.scss`; the words, the count, the ink and the
					 * focus behaviour are unchanged, and what it gained is the
					 * one thing the inline version could not have: the next step.
					 */}
					<FormSummary
						Rows={Interrupted.map((Field) => ({
							Id: Field.id,
							Field: Field.label,
							Message: Errors[Field.id] ?? "",
						}))}
						OnSelect={Focus}
						Note="Fill the fields above and the primary action arms itself. Nothing has been sent yet."
					/>

					<div className="contact-form__fields">
						{Config.Fields.map((Field) => {
							const Value = Values[Field.id];

							const Error = Errors[Field.id];

							/**
							 * The hint and the error, in that order, as one id
							 * list: a control that carries a sentence must point
							 * at it, or the sentence is only a colour.
							 */
							const DescribedBy = [
								Field.hint ? `${Field.id}-hint` : null,
								Error ? `${Field.id}-error` : null,
							]
								.filter(Boolean)
								.join(" ");

							if (Field.type === "checkbox") {
								return (
									<div
										key={Field.id}
										className="contact-form__field"
									>
										<label className="contact-form__check">
											<input
												id={Field.id}
												type="checkbox"
												className="contact-form__checkbox"
												checked={Value === "true"}
												aria-invalid={
													Error ? true : undefined
												}
												aria-describedby={
													DescribedBy || undefined
												}
												onChange={(E) =>
													HandleChange(
														Field.id,

														E.target.checked
															? "true"
															: "false",
													)
												}
											/>
											<span className="contact-form__check-label">
												{Field.label}
											</span>
										</label>
										{Error && (
											<p
												className="contact-form__error"
												id={`${Field.id}-error`}
											>
												{Error}
											</p>
										)}
									</div>
								);
							}

							if (Field.type === "checkboxes") {
								const Selected = (Value as string[]) || [];

								return (
									<div
										key={Field.id}
										className="contact-form__field"
									>
										<label className="contact-form__label">
											{Field.label}
											{Field.required && <RequiredMark />}
										</label>
										<div
											className="contact-form__options"
											role="group"
											aria-invalid={
												Error ? true : undefined
											}
											aria-describedby={
												DescribedBy || undefined
											}
										>
											{(Field.options || []).map(
												(Opt) => (
													<label
														key={Opt}

														className="contact-form__option"
													>
														<input
															type="checkbox"
															className="contact-form__checkbox"
															checked={Selected.includes(
																Opt,
															)}

															onChange={() =>
																HandleCheckboxGroup(
																	Field.id,

																	Opt,
																)
															}
														/>
														{Opt}
													</label>
												),
											)}
										</div>
										{Error && (
											<p
												className="contact-form__error"
												id={`${Field.id}-error`}
											>
												{Error}
											</p>
										)}
									</div>
								);
							}

							if (Field.type === "select") {
								return (
									<div
										key={Field.id}
										className="contact-form__field"
									>
										<label
											htmlFor={Field.id}
											className="contact-form__label"
										>
											{Field.label}
											{Field.required && <RequiredMark />}
										</label>
										<select
											id={Field.id}
											className="contact-form__input"
											aria-invalid={
												Error ? true : undefined
											}
											aria-describedby={
												DescribedBy || undefined
											}
											value={(Value as string) || ""}
											onChange={(E) =>
												HandleChange(
													Field.id,

													E.target.value,
												)
											}
										>
											<option value="">Select...</option>
											{(Field.options || []).map(
												(Opt) => (
													<option
														key={Opt}
														value={Opt}
													>
														{Opt}
													</option>
												),
											)}
										</select>
										{Error && (
											<p
												className="contact-form__error"
												id={`${Field.id}-error`}
											>
												{Error}
											</p>
										)}
									</div>
								);
							}

							if (Field.type === "textarea") {
								return (
									<div
										key={Field.id}
										className="contact-form__field"
									>
										<label
											htmlFor={Field.id}
											className="contact-form__label"
										>
											{Field.label}
											{Field.required && <RequiredMark />}
										</label>
										<textarea
											id={Field.id}
											rows={4}
											className="contact-form__input"
											aria-invalid={
												Error ? true : undefined
											}
											aria-describedby={
												DescribedBy || undefined
											}
											placeholder={Field.placeholder}
											value={(Value as string) || ""}
											onChange={(E) =>
												HandleChange(
													Field.id,

													E.target.value,
												)
											}
										/>
										{Field.hint && (
											<p
												className="contact-form__hint"
												id={`${Field.id}-hint`}
											>
												{Field.hint}
											</p>
										)}
										{Error && (
											<p
												className="contact-form__error"
												id={`${Field.id}-error`}
											>
												{Error}
											</p>
										)}
									</div>
								);
							}

							// text / email
							return (
								<div
									key={Field.id}
									className="contact-form__field"
								>
									<label
										htmlFor={Field.id}
										className="contact-form__label"
									>
										{Field.label}
										{Field.required && <RequiredMark />}
									</label>
									<input
										id={Field.id}
										type={Field.type}
										className="contact-form__input"
										aria-invalid={Error ? true : undefined}
										aria-describedby={
											DescribedBy || undefined
										}
										placeholder={Field.placeholder}
										value={(Value as string) || ""}
										onChange={(E) =>
											HandleChange(
												Field.id,

												E.target.value,
											)
										}
									/>
									{Field.hint && (
										<p
											className="contact-form__hint"
											id={`${Field.id}-hint`}
										>
											{Field.hint}
										</p>
									)}
									{Error && (
										<p
											className="contact-form__error"
											id={`${Field.id}-error`}
										>
											{Error}
										</p>
									)}
								</div>
							);
						})}
					</div>
				</jelly-card>

				{/* Three action options */}
				<div className="contact-form__actions">
					<p className="contact-form__actions-label">
						How would you like to send this?
					</p>

					{/* Option A - Email client. The one expressive element: this is
					    the action the form exists for. */}
					<a
						href={MailtoHref}
						onClick={HandlePrimary}
						aria-disabled={Armed ? undefined : true}
						className={[
							"contact-form__action",

							"emphasis-expressive",
							...(Config.Destructive
								? ["contact-form__action--destructive"]
								: []),
						].join(" ")}
					>
						<Mail aria-hidden="true" />
						<span className="contact-form__action-text">
							<span className="contact-form__action-title">
								Open in email client
							</span>
							<span className="contact-form__action-note">
								Opens your default mail app with the form
								pre-filled as plain text - ready to review and
								send.
							</span>
						</span>
					</a>

					{/* Option B - Copy text */}
					<button
						type="button"
						onClick={HandleCopy}
						className="contact-form__action contact-form__action--plain"
					>
						<Copy aria-hidden="true" />
						<span className="contact-form__action-text">
							<span className="contact-form__action-title">
								{CopyState === "copied"
									? "Copied to clipboard"
									: "Copy request text"}
							</span>
							<span className="contact-form__action-note">
								Copies a formatted plain-text version with pair
								reference{" "}
								<span className="contact-form__mono">
									{Config.Code}-{PairId}
								</span>{" "}
								- paste into any email, ticket, or chat.
							</span>
						</span>
					</button>

					{/* Option C - Conversation (GitHub / external) */}
					{Config.ConversationHref && (
						<a
							href={Config.ConversationHref}

							target="_blank"
							rel="noopener noreferrer"
							className="contact-form__action contact-form__action--plain"
						>
							<MessageSquare aria-hidden="true" />
							<span className="contact-form__action-text">
								<span className="contact-form__action-title">
									Open a conversation
								</span>
								<span className="contact-form__action-note">
									Start a public or private thread - good for
									questions that benefit from community input.
								</span>
							</span>
						</a>
					)}
				</div>

				{/*
				 * The receipt: the copy succeeded, and the reference it was
				 * filed under. A state, not a toast - it stays until the reader
				 * copies again, and it names the pair reference the note below
				 * then explains. `role="status"` so it is announced once.
				 */}
				{CopyState === "copied" && (
					<p className="contact-form__receipt" role="status">
						<span className="contact-form__receipt-word">
							COPIED
						</span>
						<span className="contact-form__receipt-ref">
							{Config.Code}-{PairId}
						</span>
						<span className="contact-form__receipt-note">
							Paste it into any mail or ticket.
						</span>
					</p>
				)}

				{/* Pair reference explanation */}
				<div className="contact-form__note">
					<span className="contact-form__mono contact-form__mono--strong">
						{Config.Code}-{PairId}
					</span>{" "}
					is your unique pair reference for this submission -{" "}
					<span className="contact-form__mono">{Config.Code}</span>{" "}
					identifies the request type,{" "}
					<span className="contact-form__mono">{PairId}</span> is the
					instance ID. Quote{" "}
					<span className="contact-form__mono contact-form__mono--strong">
						{Config.Code}-{PairId}
					</span>{" "}
					in any reply so our team can locate and track your request
					immediately without searching by email address.
				</div>
			</div>
		</div>
	);
};
