import { cleanup, render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { DynamicCard, SimpleCard } from "../../Component/Dynamic/DynamicCard";
import type { CardSection } from "../../Component/Dynamic/Type.js";

afterEach(() => {
	cleanup();
});

describe("DynamicCard", () => {
	it("renders with header title and description", () => {
		const Sections: CardSection = {
			Header: {
				title: "Card Title",
				description: "Card description text",
			},
		};

		render(<DynamicCard Sections={Sections} />);

		const TitleElement = screen.getByText("Card Title");
		const DescriptionElement = screen.getByText("Card description text");

		expect(TitleElement).toBeInTheDocument();
		expect(DescriptionElement).toBeInTheDocument();
	});

	it("renders with body content", () => {
		const Sections: CardSection = {
			Body: {
				title: "Body Title",
				description: "Body description",
				content: React.createElement("span", null, "Body content here"),
			},
		};

		render(<DynamicCard Sections={Sections} />);

		const BodyTitle = screen.getByText("Body Title");
		const BodyDescription = screen.getByText("Body description");
		const BodyContent = screen.getByText("Body content here");

		expect(BodyTitle).toBeInTheDocument();
		expect(BodyDescription).toBeInTheDocument();
		expect(BodyContent).toBeInTheDocument();
	});

	it("renders with footer content", () => {
		const Sections: CardSection = {
			Footer: {
				content: React.createElement("span", null, "Footer content"),
			},
		};

		render(<DynamicCard Sections={Sections} />);

		const FooterContent = screen.getByText("Footer content");

		expect(FooterContent).toBeInTheDocument();
	});

	it("renders all sections together", () => {
		const Sections: CardSection = {
			Header: {
				title: "Full Card",
				description: "Full card description",
			},
			Body: {
				content: React.createElement("p", null, "Main content area"),
			},
			Footer: {
				content: React.createElement("button", null, "Footer Action"),
			},
		};

		render(<DynamicCard Sections={Sections} />);

		expect(screen.getByText("Full Card")).toBeInTheDocument();
		expect(screen.getByText("Full card description")).toBeInTheDocument();
		expect(screen.getByText("Main content area")).toBeInTheDocument();
		expect(screen.getByText("Footer Action")).toBeInTheDocument();
	});

	it("handles click events", async () => {
		const ClickHandler = vi.fn();
		const Sections: CardSection = {
			Header: { title: "Clickable Card" },
		};
		const User = UserEvent.setup();

		render(<DynamicCard Sections={Sections} OnClick={ClickHandler} />);

		const CardElement = screen.getByText("Clickable Card").closest("div");

		if (CardElement) {
			await User.click(CardElement);
		}

		expect(ClickHandler).toHaveBeenCalledTimes(1);
	});

	it("applies custom className", () => {
		const Sections: CardSection = {
			Header: { title: "Styled Card" },
		};

		const { container } = render(
			<DynamicCard Sections={Sections} ClassName="custom-class" />,
		);

		const CardElement = container.firstElementChild;

		expect(CardElement?.className).toContain("custom-class");
	});

	it("sets pointer cursor when onClick is provided", () => {
		const Sections: CardSection = {
			Header: { title: "Pointer Card" },
		};

		const { container } = render(
			<DynamicCard Sections={Sections} OnClick={() => {}} />,
		);

		const CardElement = container.firstElementChild as HTMLElement;

		expect(CardElement?.style.cursor).toBe("pointer");
	});
});

describe("SimpleCard", () => {
	it("renders with title, description, and children", () => {
		render(
			<SimpleCard
				Title="Simple Title"
				Description="Simple description"
				Children={<p>Child content</p>}
			/>,
		);

		const TitleElement = screen.getByText("Simple Title");
		const DescriptionElement = screen.getByText("Simple description");
		const ChildContent = screen.getByText("Child content");

		expect(TitleElement).toBeInTheDocument();
		expect(DescriptionElement).toBeInTheDocument();
		expect(ChildContent).toBeInTheDocument();
	});

	it("renders children without title or description", () => {
		render(<SimpleCard Children={<p>Only children</p>} />);

		const ChildContent = screen.getByText("Only children");

		expect(ChildContent).toBeInTheDocument();
	});

	it("handles click events", async () => {
		const ClickHandler = vi.fn();
		const User = UserEvent.setup();

		render(
			<SimpleCard
				Title="Clickable"
				OnClick={ClickHandler}
				Children={<p>Content</p>}
			/>,
		);

		const CardElement = screen.getByText("Clickable").closest("div");

		if (CardElement) {
			await User.click(CardElement);
		}

		expect(ClickHandler).toHaveBeenCalledTimes(1);
	});
});
