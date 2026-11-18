import "@testing-library/jest-dom/vitest";

// jelly-button / jelly-icon-button (Vendor/JellyUI) paint their soft-body
// fill on a canvas, in a real <button> inside shadow DOM, and only run for
// real in a browser - Jelly's own tests use Playwright for exactly that
// reason (see Vendor/JellyUI/vitest.config.ts). @testing-library/dom's
// queries never pierce shadow roots (by design - they mirror what the
// accessibility tree exposes, and jsdom doesn't compute one across shadow
// boundaries), so a shadow-DOM stub would be invisible to getByRole here
// regardless of how faithfully it's built. Declaring the role directly on
// the host element instead keeps these jsdom component tests able to assert
// our own prop-wiring (variant/label/disabled) without booting a browser.
//
// The stub is only meaningful where there is a DOM: the `.astro` component
// tests run under `node` (an Astro component cannot render in the browser
// build), and `HTMLElement` is not defined there. Guarding the registration
// keeps one setup file for both environments instead of a second one that
// would drift from this comment.
if (typeof HTMLElement !== "undefined") {
	class JellyButtonStub extends HTMLElement {
		static get observedAttributes() {
			return ["disabled", "type", "label"];
		}

		connectedCallback() {
			this.setAttribute("role", "button");

			this.SyncAttributes();
		}

		attributeChangedCallback() {
			this.SyncAttributes();
		}

		private SyncAttributes() {
			this.setAttribute(
				"aria-disabled",

				String(this.hasAttribute("disabled")),
			);

			if (this.hasAttribute("label")) {
				this.setAttribute("aria-label", this.getAttribute("label")!);
			} else {
				this.removeAttribute("aria-label");
			}
		}
	}

	// customElements.define() requires a distinct constructor per tag, even
	// when the implementation is identical.
	class JellyIconButtonStub extends JellyButtonStub {}

	if (!customElements.get("jelly-button"))
		customElements.define("jelly-button", JellyButtonStub);

	if (!customElements.get("jelly-icon-button"))
		customElements.define("jelly-icon-button", JellyIconButtonStub);
}
