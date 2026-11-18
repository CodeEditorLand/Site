// @vitest-environment node
import { describe, expect, it } from "vitest";

import {
	FrameClosing,
	FrameExtent,
	FrameSectionOf,
	FrameSections,
} from "../../Component/Layout/Frame/Data.js";
import { BuildPaletteRegister } from "../../Component/UI/Palette/Data.js";
import { FilterEntries } from "../../Component/UI/Palette/Match.js";

/**
 * The index's door, in the three registers that carry it.
 *
 * `/Contents` is not a part of the record, so it must not be counted as one
 * (`FrameExtent` stays `10`) - but it must be reachable, and all three chrome
 * surfaces must call it the same thing. These assertions are the contract; the
 * rail and the footer are markup, and the palette's register is the one surface
 * a test can read whole.
 */
describe("the index's door", () => {
	it("keeps the frame at ten parts and closes them with the index", () => {
		expect(FrameSections).toHaveLength(10);
		expect(FrameExtent).toBe("10");
		expect(FrameClosing.Key).toBe("contents");
		expect(FrameClosing.Href).toBe("/Contents");
	});

	it("resolves /Contents to the closing record, not to UNFILED", () => {
		// The running head prints `↳ CONTENTS` on the index page instead of
		// `◎ UNFILED`: the one page that files everything is not unfiled.
		expect(FrameSectionOf("/Contents").Key).toBe("contents");
		expect(FrameSectionOf("/Contents/").Key).toBe("contents");
		expect(FrameSectionOf("/Not/A/Route").Key).toBe("unfiled");
	});

	it("registers CONTENTS as a route in the palette, beside the ten", () => {
		const Register = BuildPaletteRegister([]);
		const Contents = Register.Routes.find(
			(Row) => Row.Href === "/Contents",
		);

		expect(Contents).toBeDefined();
		expect(Contents?.Label).toBe("CONTENTS");
		expect(Contents?.Kind).toBe("route");
		// The ten parts still lead the register, in their own order.
		expect(Register.Routes.slice(0, 10).map((Row) => Row.Label)).toEqual(
			FrameSections.map((Section) => Section.Label),
		);
	});

	it("finds it by `contents` and by `/contents`", () => {
		const { Routes } = BuildPaletteRegister([]);

		for (const Query of ["contents", "/contents", "CONTENTS"]) {
			expect(FilterEntries(Query, Routes)[0]?.Href).toBe("/Contents");
		}
	});
});
