import { cleanup, render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import {
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from "vitest";

import { DynamicPricing } from "../../Component/Dynamic/DynamicPricing";

beforeAll(() => {
	if (!i18n.isInitialized) {
		i18n.init({
			resources: {
				en: {
					home: {
						"pricing.labels.monthly": "Monthly",
						"pricing.labels.yearly": "Yearly",
						"pricing.labels.savings": "(Save up to 20%)",
						"pricing.labels.popular": "Most Popular",
						"pricing.labels.perMonth": "/month",
						"pricing.labels.perYear": "/year",
						"pricing.labels.free": "Free",
						"pricing.toggle.toMonthly": "Switch to Monthly billing",
						"pricing.toggle.toYearly": "Switch to Yearly billing",
					},
				},
			},
			lng: "en",
			fallbackLng: "en",
			ns: ["home"],
			defaultNS: "home",
			interpolation: { escapeValue: false },
		});
	}
});

beforeEach(() => {
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: vi.fn().mockReturnValue({
			matches: false,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		}),
	});
});

afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
});

const MakeTier = (Id: string, Name: string, Popular = false) => ({
	Id,
	Name,
	Price: { Monthly: 0, Yearly: 0 },
	Features: ["Feature A", "Feature B"],
	CTA: { Text: "Get started", Href: "/Download" },
	Popular,
});

const Wrap = (Node: React.ReactNode) => (
	<I18nextProvider i18n={i18n}>{Node}</I18nextProvider>
);

describe("DynamicPricing", () => {
	it("renders all tier names", () => {
		render(
			Wrap(
				<DynamicPricing
					Content={{
						Tiers: [
							MakeTier("community", "Community"),
							MakeTier("pro", "Pro"),
						],
					}}
				/>,
			),
		);

		expect(screen.getByText("Community")).toBeInTheDocument();
		expect(screen.getByText("Pro")).toBeInTheDocument();
	});

	it("toggle starts at DefaultYearly value (true)", () => {
		render(
			Wrap(
				<DynamicPricing
					Content={{
						Tiers: [MakeTier("free", "Free")],
						ShowMonthlyYearlyToggle: true,
						DefaultYearly: true,
					}}
				/>,
			),
		);

		const Toggle = screen.getByRole("switch");
		expect(Toggle).toHaveAttribute("aria-checked", "true");
	});

	it("toggle starts at DefaultYearly value (false)", () => {
		render(
			Wrap(
				<DynamicPricing
					Content={{
						Tiers: [MakeTier("free", "Free")],
						ShowMonthlyYearlyToggle: true,
						DefaultYearly: false,
					}}
				/>,
			),
		);

		const Toggle = screen.getByRole("switch");
		expect(Toggle).toHaveAttribute("aria-checked", "false");
	});

	it("clicking toggle flips IsYearly", async () => {
		const User = UserEvent.setup();

		render(
			Wrap(
				<DynamicPricing
					Content={{
						Tiers: [MakeTier("free", "Free")],
						ShowMonthlyYearlyToggle: true,
						DefaultYearly: false,
					}}
				/>,
			),
		);

		const Toggle = screen.getByRole("switch");
		expect(Toggle).toHaveAttribute("aria-checked", "false");

		await User.click(Toggle);
		expect(Toggle).toHaveAttribute("aria-checked", "true");
	});

	it("renders PopularLabel when Popular is true", () => {
		render(
			Wrap(
				<DynamicPricing
					Content={{
						Tiers: [MakeTier("pro", "Pro", true)],
						Labels: { Popular: "Most Popular" },
					}}
				/>,
			),
		);

		expect(screen.getByText("Most Popular")).toBeInTheDocument();
	});

	it("does not render PopularLabel when Popular is false", () => {
		render(
			Wrap(
				<DynamicPricing
					Content={{
						Tiers: [MakeTier("free", "Free", false)],
						Labels: { Popular: "Most Popular" },
					}}
				/>,
			),
		);

		expect(screen.queryByText("Most Popular")).not.toBeInTheDocument();
	});
});
