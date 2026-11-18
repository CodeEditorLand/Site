/**
 * The site's one document-title pattern.
 *
 * Every route prints `<page title> | Code Editor Land`, and the pattern is
 * applied HERE, once, rather than by 43 pages that each append a suffix and
 * hope they agree. Before this module the head printed four patterns:
 *
 *   Documentation | Code Editor Land          (the `|` pages)
 *   404 - Page Not Found                     (no suffix at all)
 *   Code Editor Land | Rust and Tauri …      (the home page, name first)
 *   Verify Email - Code Editor Land          (the `-` pages)
 *
 * The rule is idempotent. A page that already appended the suffix - the contact
 * routes build `${Config.Title} | Code Editor Land`, the doc and blog entries do
 * the same - keeps exactly one, in the site's separator, so a page and the frame
 * cannot produce `Foo | Code Editor Land | Code Editor Land`.
 *
 * The home page is the one exception: its title LEADS with the record name and
 * carries the product's tagline after it, which is the baseline's own form
 * (`Target/index.html` at `57c16c23f`). A title that starts with the site name
 * is left alone.
 */

/** The site name, as the head prints it. */
export const SiteName = "Code Editor Land";

/** The separator the site uses between a page's title and the record name. */
export const TitleSeparator = "|";

/**
 * The document title for a page.
 *
 * @param Raw - the title the page passed, with or without its own suffix
 * @returns the title to print, in the site's one pattern
 */
export const NormalizeTitle = (
	Raw: string,
	Name: string = SiteName,
): string => {
	const Trimmed = Raw.trim();

	if (!Trimmed) return Name;

	const Escape = Name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

	// A suffix the page appended itself, in any separator the tree has used
	// (`|`, `·`, `—`, `–`, `-`). Matched first, so `Verify Email - Code Editor
	// Land` is rewritten into the site's separator rather than left alone.
	const Suffix = new RegExp(`\\s*[|·—–-]\\s*${Escape}\\s*$`, "i");

	if (Suffix.test(Trimmed)) {
		const Bare = Trimmed.replace(Suffix, "").trim();

		if (!Bare || Bare.toLowerCase() === Name.toLowerCase()) return Name;

		return `${Bare} ${TitleSeparator} ${Name}`;
	}

	// A title that names the site WITHOUT a suffix keeps its own shape: the home
	// page leads with the record name and carries the product's tagline after it,
	// and the Download masthead names the product mid-sentence ("Download Code
	// Editor Land | Source Builds and Public Release Prep"). Both are the
	// baseline's own forms; appending a second suffix would be the duplicate this
	// module exists to prevent.
	if (Trimmed.toLowerCase().includes(Name.toLowerCase())) return Trimmed;

	return `${Trimmed} ${TitleSeparator} ${Name}`;
};
