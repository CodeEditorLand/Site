import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { c as GeneratePairId, l as Requests, o as BuildEmailBody, s as BuildMailtoHref } from "./Purpose_DgbipYwf.mjs";
import { t as Auth0Provider_default } from "./Auth0Provider_QSmpZFE4.mjs";
import { Yt as cn, Zt as createAstro, ct as $$RecordLedger, ft as RegisterOf, yt as Row } from "./Base_BVG1wSoZ.mjs";
import { t as $$RecordAside } from "./RecordAside_DoIExEdG.mjs";
import { t as $$RecordMargin } from "./RecordMargin_DhcIZIHx.mjs";
import { t as $$RecordStage } from "./RecordStage_Gz3AmIfZ.mjs";
import { t as $$SurfaceStatusLine } from "./SurfaceStatusLine_BA5-UTi2.mjs";
import { n as ContactProcess } from "./Register_D7L0dB72.mjs";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Copy, Mail, MessageSquare } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
// Source/Component/UI/FormSummary.tsx
var FormSummary = ({ Rows, State = "INTERRUPTED", OnSelect, Note, Id, ClassName }) => {
	if (Rows.length === 0) return null;
	const Count = Rows.length;
	const Word = Count === 1 ? "FIELD" : "FIELDS";
	return /* @__PURE__ */ jsxs("div", {
		className: cn("FormSummary", ClassName),
		id: Id,
		role: "alert",
		children: [
			/* @__PURE__ */ jsxs("p", {
				className: "FormSummary__Head",
				children: [/* @__PURE__ */ jsx("span", {
					className: "FormSummary__Mark",
					children: State
				}), /* @__PURE__ */ jsxs("span", {
					className: "FormSummary__Count",
					children: [
						Count,
						" ",
						Word
					]
				})]
			}),
			/* @__PURE__ */ jsx("ul", {
				className: "FormSummary__List",
				children: Rows.map((Row) => /* @__PURE__ */ jsx("li", {
					className: "FormSummary__Row",
					children: OnSelect ? /* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "FormSummary__Link",
						onClick: () => OnSelect(Row.Id),
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "FormSummary__Field",
								children: Row.Field
							}),
							" ",
							Row.Message
						]
					}) : /* @__PURE__ */ jsxs("p", {
						className: "FormSummary__Link",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "FormSummary__Field",
								children: Row.Field
							}),
							" ",
							Row.Message
						]
					})
				}, Row.Id))
			}),
			Note ? /* @__PURE__ */ jsx("p", {
				className: "FormSummary__Note",
				children: `↳${Note}`
			}) : null
		]
	});
};
FormSummary.displayName = "FormSummary";
// Source/Component/Dynamic/DynamicContactForm.tsx
var DynamicContactForm_default = ({ Config, Domain, ClientIdentifier }) => /* @__PURE__ */ jsx(Auth0Provider_default, {
	Children: /* @__PURE__ */ jsx(ContactFormInner, { Config }),
	...Domain ? { Domain } : {},
	...ClientIdentifier ? { ClientIdentifier } : {}
});
var ProviderLabel = (Sub) => {
	if (!Sub) return "Email / Password";
	if (Sub.startsWith("google-oauth2|")) return "Google";
	if (Sub.startsWith("github|")) return "GitHub";
	if (Sub.startsWith("gitlab|")) return "GitLab";
	if (Sub.startsWith("okta|")) return "Okta SSO";
	if (Sub.startsWith("samlp|")) return "SAML SSO";
	if (Sub.startsWith("waad|")) return "Azure AD";
	return "Auth0";
};
/**
* The asterisk every required label shares, so it is written once.
*
* Module-level rather than declared inside the form: a component defined in
* another component's body is a new component type on every render, which
* remounts its DOM. This one has no state, but it should still be a type, not a
* value.
*/
var RequiredMark = () => /* @__PURE__ */ jsx("span", {
	className: "contact-form__required",
	"aria-hidden": "true",
	children: "*"
});
/**
* The form's own surface: the white information box on the creme field, square,
* at the documented inset.
*
* The field block is a `jelly-card`, not a `StaccatoCard bg-card` div: a card is
* a Jelly element (`DESIGN.md` §1.7, §6.5), not a `<div>` plus utilities. The
* five custom properties are the ones `Doc.astro` and the release manifest pass,
* so every white box on the site is one surface. `--jelly-card-font-size:
* inherit` keeps the card from resetting type to Jelly's own default, so every
* role inside it stays on the site's scale.
*/
var Surface = {
	"--jelly-fill": "var(--Card)",
	"--jelly-radius": "0",
	"--jelly-card-font-size": "inherit",
	"--jelly-card-padding-block": "var(--space-group)",
	"--jelly-card-padding-inline": "var(--space-group)"
};
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
var ContactFormInner = ({ Config }) => {
	const { user: User } = useAuth0();
	const Year = (/* @__PURE__ */ new Date()).getFullYear();
	const InitialValues = () => {
		const V = {};
		for (const Field of Config.Fields) if (Field.prefill === "name") V[Field.id] = User?.name || User?.nickname || "";
		else if (Field.prefill === "email") V[Field.id] = User?.email || "";
		else if (Field.prefill === "sub") V[Field.id] = User?.sub || "";
		else if (Field.prefill === "provider") V[Field.id] = ProviderLabel(User?.sub);
		else if (Field.type === "checkboxes") V[Field.id] = [];
		else V[Field.id] = "";
		return V;
	};
	const [PairId] = useState(GeneratePairId);
	const [Values, SetValues] = useState(InitialValues);
	const [CopyState, SetCopyState] = useState("idle");
	const [Errors, SetErrors] = useState({});
	const HandleChange = (Id, Value) => {
		SetValues((Prev) => ({
			...Prev,
			[Id]: Value
		}));
		SetErrors((Prev) => ({
			...Prev,
			[Id]: ""
		}));
		SetCopyState("idle");
	};
	const HandleCheckboxGroup = (Id, Option) => {
		const Current = Values[Id] || [];
		const Next = Current.includes(Option) ? Current.filter((V) => V !== Option) : [...Current, Option];
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
	const ComputeErrors = () => {
		const NewErrors = {};
		for (const Field of Config.Fields) {
			if (!Field.required) continue;
			const Value = Values[Field.id];
			if (Field.type === "checkbox" && Value !== "true") NewErrors[Field.id] = "This confirmation is required.";
			else if (Field.type === "checkboxes" && Value.length === 0) NewErrors[Field.id] = "Select at least one option.";
			else if (Field.type !== "checkbox" && Field.type !== "checkboxes" && (!Value || Value.trim() === "")) NewErrors[Field.id] = "This field is required.";
		}
		return NewErrors;
	};
	/** Commit an interruption, and say whether the form is fileable. */
	const ApplyErrors = (Next) => {
		SetErrors(Next);
		return Object.keys(Next).length === 0;
	};
	/** Put the cursor where the fix is. The controls all carry their field's id. */
	const Focus = (Id) => {
		const Control = document.getElementById(Id);
		if (!Control) return;
		Control.focus({ preventScroll: true });
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
	const HandlePrimary = (Event) => {
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
		} catch {}
	};
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
		if (Field.type === "checkboxes") return Array.isArray(Value) && Value.length > 0;
		return typeof Value === "string" && Value.trim() !== "";
	});
	const FormState = Object.values(Errors).some((Message) => typeof Message === "string" && Message !== "") ? "INTERRUPTED" : Complete ? "READY" : "PREPARING";
	/** The interrupted fields, in the order the form prints them. */
	const Interrupted = Config.Fields.filter((Field) => Errors[Field.id]);
	/** The primary action is armed only when the request is fileable. */
	const Armed = FormState === "READY";
	/** The required marker every label shares, so it is written once. */
	return /* @__PURE__ */ jsx("div", {
		className: "contact-form",
		children: /* @__PURE__ */ jsxs("div", {
			className: "contact-form__inner",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "contact-form__open",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "contact-form__meta",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "contact-form__pair",
								title: "Pair reference - income code + instance ID. Quote this in all replies.",
								children: [
									Config.Code,
									"-",
									PairId
								]
							}), /* @__PURE__ */ jsx("span", {
								className: "contact-form__state",
								"data-state": FormState,
								role: "status",
								children: FormState
							})]
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "contact-form__title",
							children: Config.Title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "contact-form__standfirst",
							children: Config.Subtitle
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "contact-form__handler",
							children: [
								"Sends to:",
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "contact-form__handler-value",
									children: Config.To
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsxs("jelly-card", {
					style: Surface,
					children: [/* @__PURE__ */ jsx(FormSummary, {
						Rows: Interrupted.map((Field) => ({
							Id: Field.id,
							Field: Field.label,
							Message: Errors[Field.id] ?? ""
						})),
						OnSelect: Focus,
						Note: "Fill the fields above and the primary action arms itself. Nothing has been sent yet."
					}), /* @__PURE__ */ jsx("div", {
						className: "contact-form__fields",
						children: Config.Fields.map((Field) => {
							const Value = Values[Field.id];
							const Error = Errors[Field.id];
							/**
							* The hint and the error, in that order, as one id
							* list: a control that carries a sentence must point
							* at it, or the sentence is only a colour.
							*/
							const DescribedBy = [Field.hint ? `${Field.id}-hint` : null, Error ? `${Field.id}-error` : null].filter(Boolean).join(" ");
							if (Field.type === "checkbox") return /* @__PURE__ */ jsxs("div", {
								className: "contact-form__field",
								children: [/* @__PURE__ */ jsxs("label", {
									className: "contact-form__check",
									children: [/* @__PURE__ */ jsx("input", {
										id: Field.id,
										type: "checkbox",
										className: "contact-form__checkbox",
										checked: Value === "true",
										"aria-invalid": Error ? true : void 0,
										"aria-describedby": DescribedBy || void 0,
										onChange: (E) => HandleChange(Field.id, E.target.checked ? "true" : "false")
									}), /* @__PURE__ */ jsx("span", {
										className: "contact-form__check-label",
										children: Field.label
									})]
								}), Error && /* @__PURE__ */ jsx("p", {
									className: "contact-form__error",
									id: `${Field.id}-error`,
									children: Error
								})]
							}, Field.id);
							if (Field.type === "checkboxes") {
								const Selected = Value || [];
								return /* @__PURE__ */ jsxs("div", {
									className: "contact-form__field",
									children: [
										/* @__PURE__ */ jsxs("label", {
											className: "contact-form__label",
											children: [Field.label, Field.required && /* @__PURE__ */ jsx(RequiredMark, {})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "contact-form__options",
											role: "group",
											"aria-invalid": Error ? true : void 0,
											"aria-describedby": DescribedBy || void 0,
											children: (Field.options || []).map((Opt) => /* @__PURE__ */ jsxs("label", {
												className: "contact-form__option",
												children: [/* @__PURE__ */ jsx("input", {
													type: "checkbox",
													className: "contact-form__checkbox",
													checked: Selected.includes(Opt),
													onChange: () => HandleCheckboxGroup(Field.id, Opt)
												}), Opt]
											}, Opt))
										}),
										Error && /* @__PURE__ */ jsx("p", {
											className: "contact-form__error",
											id: `${Field.id}-error`,
											children: Error
										})
									]
								}, Field.id);
							}
							if (Field.type === "select") return /* @__PURE__ */ jsxs("div", {
								className: "contact-form__field",
								children: [
									/* @__PURE__ */ jsxs("label", {
										htmlFor: Field.id,
										className: "contact-form__label",
										children: [Field.label, Field.required && /* @__PURE__ */ jsx(RequiredMark, {})]
									}),
									/* @__PURE__ */ jsxs("select", {
										id: Field.id,
										className: "contact-form__input",
										"aria-invalid": Error ? true : void 0,
										"aria-describedby": DescribedBy || void 0,
										value: Value || "",
										onChange: (E) => HandleChange(Field.id, E.target.value),
										children: [/* @__PURE__ */ jsx("option", {
											value: "",
											children: "Select..."
										}), (Field.options || []).map((Opt) => /* @__PURE__ */ jsx("option", {
											value: Opt,
											children: Opt
										}, Opt))]
									}),
									Error && /* @__PURE__ */ jsx("p", {
										className: "contact-form__error",
										id: `${Field.id}-error`,
										children: Error
									})
								]
							}, Field.id);
							if (Field.type === "textarea") return /* @__PURE__ */ jsxs("div", {
								className: "contact-form__field",
								children: [
									/* @__PURE__ */ jsxs("label", {
										htmlFor: Field.id,
										className: "contact-form__label",
										children: [Field.label, Field.required && /* @__PURE__ */ jsx(RequiredMark, {})]
									}),
									/* @__PURE__ */ jsx("textarea", {
										id: Field.id,
										rows: 4,
										className: "contact-form__input",
										"aria-invalid": Error ? true : void 0,
										"aria-describedby": DescribedBy || void 0,
										placeholder: Field.placeholder,
										value: Value || "",
										onChange: (E) => HandleChange(Field.id, E.target.value)
									}),
									Field.hint && /* @__PURE__ */ jsx("p", {
										className: "contact-form__hint",
										id: `${Field.id}-hint`,
										children: Field.hint
									}),
									Error && /* @__PURE__ */ jsx("p", {
										className: "contact-form__error",
										id: `${Field.id}-error`,
										children: Error
									})
								]
							}, Field.id);
							return /* @__PURE__ */ jsxs("div", {
								className: "contact-form__field",
								children: [
									/* @__PURE__ */ jsxs("label", {
										htmlFor: Field.id,
										className: "contact-form__label",
										children: [Field.label, Field.required && /* @__PURE__ */ jsx(RequiredMark, {})]
									}),
									/* @__PURE__ */ jsx("input", {
										id: Field.id,
										type: Field.type,
										className: "contact-form__input",
										"aria-invalid": Error ? true : void 0,
										"aria-describedby": DescribedBy || void 0,
										placeholder: Field.placeholder,
										value: Value || "",
										onChange: (E) => HandleChange(Field.id, E.target.value)
									}),
									Field.hint && /* @__PURE__ */ jsx("p", {
										className: "contact-form__hint",
										id: `${Field.id}-hint`,
										children: Field.hint
									}),
									Error && /* @__PURE__ */ jsx("p", {
										className: "contact-form__error",
										id: `${Field.id}-error`,
										children: Error
									})
								]
							}, Field.id);
						})
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "contact-form__actions",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "contact-form__actions-label",
							children: "How would you like to send this?"
						}),
						/* @__PURE__ */ jsxs("a", {
							href: MailtoHref,
							onClick: HandlePrimary,
							"aria-disabled": Armed ? void 0 : true,
							className: [
								"contact-form__action",
								"emphasis-expressive",
								...Config.Destructive ? ["contact-form__action--destructive"] : []
							].join(" "),
							children: [/* @__PURE__ */ jsx(Mail, { "aria-hidden": "true" }), /* @__PURE__ */ jsxs("span", {
								className: "contact-form__action-text",
								children: [/* @__PURE__ */ jsx("span", {
									className: "contact-form__action-title",
									children: "Open in email client"
								}), /* @__PURE__ */ jsx("span", {
									className: "contact-form__action-note",
									children: "Opens your default mail app with the form pre-filled as plain text - ready to review and send."
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: HandleCopy,
							className: "contact-form__action contact-form__action--plain",
							children: [/* @__PURE__ */ jsx(Copy, { "aria-hidden": "true" }), /* @__PURE__ */ jsxs("span", {
								className: "contact-form__action-text",
								children: [/* @__PURE__ */ jsx("span", {
									className: "contact-form__action-title",
									children: CopyState === "copied" ? "Copied to clipboard" : "Copy request text"
								}), /* @__PURE__ */ jsxs("span", {
									className: "contact-form__action-note",
									children: [
										"Copies a formatted plain-text version with pair reference",
										" ",
										/* @__PURE__ */ jsxs("span", {
											className: "contact-form__mono",
											children: [
												Config.Code,
												"-",
												PairId
											]
										}),
										" ",
										"- paste into any email, ticket, or chat."
									]
								})]
							})]
						}),
						Config.ConversationHref && /* @__PURE__ */ jsxs("a", {
							href: Config.ConversationHref,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "contact-form__action contact-form__action--plain",
							children: [/* @__PURE__ */ jsx(MessageSquare, { "aria-hidden": "true" }), /* @__PURE__ */ jsxs("span", {
								className: "contact-form__action-text",
								children: [/* @__PURE__ */ jsx("span", {
									className: "contact-form__action-title",
									children: "Open a conversation"
								}), /* @__PURE__ */ jsx("span", {
									className: "contact-form__action-note",
									children: "Start a public or private thread - good for questions that benefit from community input."
								})]
							})]
						})
					]
				}),
				CopyState === "copied" && /* @__PURE__ */ jsxs("p", {
					className: "contact-form__receipt",
					role: "status",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "contact-form__receipt-word",
							children: "COPIED"
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "contact-form__receipt-ref",
							children: [
								Config.Code,
								"-",
								PairId
							]
						}),
						/* @__PURE__ */ jsx("span", {
							className: "contact-form__receipt-note",
							children: "Paste it into any mail or ticket."
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "contact-form__note",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "contact-form__mono contact-form__mono--strong",
							children: [
								Config.Code,
								"-",
								PairId
							]
						}),
						" ",
						"is your unique pair reference for this submission -",
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "contact-form__mono",
							children: Config.Code
						}),
						" ",
						"identifies the request type,",
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "contact-form__mono",
							children: PairId
						}),
						" is the instance ID. Quote",
						" ",
						/* @__PURE__ */ jsxs("span", {
							className: "contact-form__mono contact-form__mono--strong",
							children: [
								Config.Code,
								"-",
								PairId
							]
						}),
						" ",
						"in any reply so our team can locate and track your request immediately without searching by email address."
					]
				})
			]
		})
	});
};
// Source/Component/Contact/ContactWorkspace.astro
createAstro("https://editor.land");
var $$ContactWorkspace = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ContactWorkspace;
	const { code, state = "rest", class: Class } = Astro.props;
	const Config = Requests[code];
	const { Auth0Domain, Auth0ClientIdentifier } = await import("./Auth_COyUGpTd.mjs");
	const Record = [
		{
			key: "CODE:",
			value: Config.Code
		},
		{
			key: "BASIS:",
			value: Config.Article ?? "UNAVAILABLE"
		},
		{
			key: "ROUTE:",
			value: "/CONTACT",
			code: true
		},
		{
			key: "SLA:",
			value: `${Config.ResponseDays} DAYS`
		},
		{
			key: "MAILBOX:",
			value: Config.To,
			code: true
		}
	];
	const Process = ContactProcess.map((Step) => Step.index === "03" ? {
		...Step,
		line: `The answer arrives within ${Config.ResponseDays} days, at the address you gave.`
	} : { ...Step });
	const Note = {
		index: "NOTE_01",
		label: "THE WINDOW",
		body: `The ${Config.ResponseDays}-day window belongs to this route, not to the desk: a different request answers in a different window, and the route's record prints its own.`,
		source: "Source/Library/Contact/Request.ts"
	};
	const Aside = {
		index: "ASIDE_01",
		label: "WHAT THIS ROUTE DOES NOT DO",
		line: "One route, one request.",
		rows: [
			{
				key: "DELETE:",
				value: Config.Code === "ERASE" ? "This is the erasure route: it removes the record it can identify and answers with what was removed." : "Not this route. Erasure is /CONTACT/ERASE, which answers in its own window."
			},
			{
				key: "EXPORT:",
				value: Config.Code === "REACH" ? "This is the export route: the copy is structured and machine-readable." : "Not this route. A copy of your data is /CONTACT/REACH."
			},
			{
				key: "URGENT:",
				value: "UNAVAILABLE - the desk has no priority channel. The window is the commitment, and it is printed above."
			}
		],
		source: "Source/Library/Contact/Request.ts"
	};
	const State = state === "interrupted" ? [Row("STATUS", "INTERRUPTED")] : [];
	const Declarations = state === "interrupted" ? [
		{
			key: "ROUTE",
			value: `/CONTACT/${Config.Code}`
		},
		{
			key: "MAILBOX",
			value: Config.To
		},
		{
			key: "SLA",
			value: `${Config.ResponseDays} DAYS`
		}
	] : [];
	const OwnForm = Astro.slots.has("form");
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["contact-shell", Class], "class:list")}> <div class="contact-shell__workspace"> <aside class="contact-shell__record" aria-label="Request record"> ${State.length || Declarations.length ? renderTemplate`${renderComponent($$result, "SurfaceStatusLine", $$SurfaceStatusLine, {
		"states": State,
		"declarations": Declarations,
		"class": "contact-shell__status"
	})}` : null} ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
		"rows": Record,
		"register": RegisterOf("REQUEST", Record),
		"pinned": true
	})} ${renderComponent($$result, "RecordStage", $$RecordStage, {
		"stages": Process,
		"orientation": "stack"
	})} ${renderComponent($$result, "RecordMargin", $$RecordMargin, { "note": Note })} ${renderComponent($$result, "RecordAside", $$RecordAside, { "aside": Aside })} </aside> <div class="contact-shell__gutter" aria-hidden="true"></div> <div class="contact-shell__form"> ${OwnForm ? renderTemplate`${renderSlot($$result, $$slots["form"])}` : renderTemplate`${renderComponent($$result, "DynamicContactForm", DynamicContactForm_default, {
		"client:load": true,
		"Config": Config,
		"Domain": Auth0Domain,
		"ClientIdentifier": Auth0ClientIdentifier,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicContactForm.tsx",
		"client:component-export": "default"
	})}`} </div> </div> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Contact/ContactWorkspace.astro", void 0);
export { FormSummary as n, $$ContactWorkspace as t };
