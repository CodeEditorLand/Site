import { cn } from "./Utility";

/**
 * FormSummary - the form's refusal, as an artifact.
 *
 * ─── ONE RECEIPT ──────────────────────────────────────────────────────────
 * The state word, a counted set and one control per member are one artifact, and
 * they are one artifact because a second form that rebuilt them would print a
 * different count in a different ink - which is how a site ends up with two ways
 * to say the same refusal.
 *
 * ─── WHAT IT IS ───────────────────────────────────────────────────────────
 * One block with one job: take the refused rows, and print them as a receipt in
 * the record grammar - `INTERRUPTED`, the count of fields, one line per field,
 * and the next step. The count is `Rows.length`, so the head cannot say three
 * over a list of two; the lines are `<button>`s, so a refusal that names a field
 * also takes the reader to it, which is the difference between an error list and
 * an error artifact.
 *
 * ─── WHY IT RENDERS NOTHING WHEN THERE IS NOTHING ─────────────────────────
 * A receipt for zero refusals is a lie. The empty state of this component is its
 * absence, and the form that mounts it is responsible for not mounting it - the
 * same rule the site applies to a register with no rows and to a figure with no
 * caption. An "empty receipt" would be a fifth adverse state the vocabulary has
 * no word for.
 *
 * ─── IT TAKES ROWS, SO ANY FORM CAN FEED IT ───────────────────────────────
 * A form built on `react-hook-form` feeds it `Object.entries(formState.errors)`;
 * a form that validates by hand - the contact request, and the one live form on
 * this site - feeds it its own `Errors` record. The block knows nothing about
 * either, which is why it is not exported from `UI/Form.tsx`: importing it must
 * not drag a form library into a form that does not use one.
 *
 * ─── ROLE ─────────────────────────────────────────────────────────────────
 * `role="alert"` on the block, not on each line: the refusal is announced once,
 * as one event, because five announcements of one submission is a shout. The
 * block is only in the DOM while the form is refused, so mounting it is the
 * announcement.
 */

/** One refused field: its control's id, its name, and the sentence. */
export interface SummaryRow {
	/** The id of the control the line focuses. */
	readonly Id: string;

	/** The field's name, at medium weight - the fact the reader scans for. */
	readonly Field: string;

	/** What is wrong, in one sentence. */
	readonly Message: string;
}

export interface FormSummaryProps {
	/** The refused fields, in the order the form prints them. */
	Rows: readonly SummaryRow[];

	/** The state word. `INTERRUPTED` is the vocabulary's word for a refusal. */
	State?: string;

	/** Move the cursor to a field. Without it the lines are text, not controls. */
	OnSelect?: (Id: string) => void;

	/**
	 * The next step, in one line: what to do once the fields are filled. The
	 * relation mark `↳` is printed by the component - the note is always a
	 * proposition under the receipt, so the mark is grammar rather than copy.
	 */
	Note?: string;

	/** An id for the block, so a form can point at it. */
	Id?: string;

	/** Classes from the caller. */
	ClassName?: string;
}

export const FormSummary = ({
	Rows,
	State = "INTERRUPTED",
	OnSelect,
	Note,
	Id,
	ClassName,
}: FormSummaryProps) => {
	if (Rows.length === 0) return null;

	const Count = Rows.length;

	const Word = Count === 1 ? "FIELD" : "FIELDS";

	return (
		<div className={cn("FormSummary", ClassName)} id={Id} role="alert">
			<p className="FormSummary__Head">
				<span className="FormSummary__Mark">{State}</span>
				<span className="FormSummary__Count">
					{Count} {Word}
				</span>
			</p>

			<ul className="FormSummary__List">
				{Rows.map((Row) => (
					<li className="FormSummary__Row" key={Row.Id}>
						{OnSelect ? (
							<button
								type="button"
								className="FormSummary__Link"
								onClick={() => OnSelect(Row.Id)}
							>
								<span className="FormSummary__Field">
									{Row.Field}
								</span>{" "}
								{Row.Message}
							</button>
						) : (
							<p className="FormSummary__Link">
								<span className="FormSummary__Field">
									{Row.Field}
								</span>{" "}
								{Row.Message}
							</p>
						)}
					</li>
				))}
			</ul>

			{Note ? <p className="FormSummary__Note">{`↳${Note}`}</p> : null}
		</div>
	);
};

FormSummary.displayName = "FormSummary";

export default FormSummary;
