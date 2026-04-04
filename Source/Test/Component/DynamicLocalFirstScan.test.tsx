import { cleanup, render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

// ─── react-i18next mock ───

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (Key: string, Options?: { defaultValue?: string }) =>
			Options?.defaultValue ?? Key,
	}),
}));

// ─── Inline component implementing LocalFirst scan interface ───
// The DynamicLocalFirstScan component does not exist as a standalone file yet.
// This test suite defines the component contract based on:
//   - Interface/Property/Portal/LocalFirst.ts (DaemonStatus, OnConnect, IsLoading)
//   - Interface/Content/Portal/LocalFirst.ts (Title, Description, ConnectButton, etc.)
//   - The local-first section in DynamicPortal.tsx (daemon scan, WebSocket, download)
//
// The inline component below satisfies the interface and validates the expected
// behavior. When the real component is created, swap the import.

type DaemonStatus = "Scanning" | "Connected" | "Disconnected";

interface LocalFirstContent {
	Title: string;
	Description: string;
	ConnectButton: { Text: string; OnClick?: () => void };
	DownloadHref?: string;
	Feature: string[];
	Setting: string[];
	Protocol: string[];
	Certificate: string[];
}

interface LocalFirstScanProperty {
	Content: LocalFirstContent;
	OnConnect?: () => void;
	IsLoading?: boolean;
	DaemonStatus?: DaemonStatus;
	ClassName?: string;
}

/**
 * Reference implementation for test purposes.
 *
 * Behavior:
 *   - "Scanning" status: pulsing scan indicator
 *   - "Connected" status: success indicator
 *   - "Disconnected" status: failure indicator + download link
 *   - IsLoading: disabled connect button
 */
const DynamicLocalFirstScan = ({
	Content,
	OnConnect,
	IsLoading = false,
	DaemonStatus: Status = "Scanning",
}: LocalFirstScanProperty) => {
	return (
		<div
			role="region"
			aria-label="Local-first daemon scan"
			data-status={Status}>
			<h3>{Content.Title}</h3>
			<p>{Content.Description}</p>

			{Status === "Scanning" && (
				<div data-testid="scanning-indicator" aria-live="polite">
					<span className="animate-pulse">Scanning for Air Daemon...</span>
				</div>
			)}

			{Status === "Connected" && (
				<div data-testid="connected-indicator" aria-live="polite">
					<span>Connected to Air Daemon</span>
				</div>
			)}

			{Status === "Disconnected" && (
				<div data-testid="disconnected-indicator" aria-live="polite">
					<span>Air Daemon not found</span>
					{Content.DownloadHref && (
						<a
							href={Content.DownloadHref}
							aria-label="Download Air Daemon">
							Download Air Daemon
						</a>
					)}
				</div>
			)}

			<button
				onClick={() => {
					if (!IsLoading && OnConnect) {
						OnConnect();
					}
				}}
				disabled={IsLoading || Status === "Scanning"}
				aria-busy={IsLoading}>
				{Content.ConnectButton.Text}
			</button>

			{Content.Feature.length > 0 && (
				<ul aria-label="Features">
					{Content.Feature.map((FeatureText, Index) => (
						<li key={Index}>{FeatureText}</li>
					))}
				</ul>
			)}

			{Content.Protocol.length > 0 && (
				<div aria-label="Protocols">
					{Content.Protocol.map((ProtocolText, Index) => (
						<span key={Index}>{ProtocolText}</span>
					))}
				</div>
			)}

			{Content.Certificate.length > 0 && (
				<div aria-label="Certificates">
					{Content.Certificate.map((CertificateText, Index) => (
						<span key={Index}>{CertificateText}</span>
					))}
				</div>
			)}
		</div>
	);
};

// ─── Test fixtures ───

const SampleContent: LocalFirstContent = {
	Title: "Air Daemon",
	Description: "Zero cloud dependency. Your code stays on your machine.",
	ConnectButton: { Text: "Connect to Air Daemon" },
	DownloadHref: "/Download",
	Feature: [
		"Local-first editing",
		"Offline capable",
		"End-to-end encrypted sync",
	],
	Setting: ["Theme", "Keybindings"],
	Protocol: ["mTLS", "WebSocket"],
	Certificate: ["JWT", "x509"],
};

afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
});

describe("DynamicLocalFirstScan", () => {
	it("shows scanning state initially", () => {
		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Scanning"
			/>,
		);

		const ScanningIndicator = screen.getByTestId("scanning-indicator");

		expect(ScanningIndicator).toBeInTheDocument();
		expect(
			screen.getByText("Scanning for Air Daemon..."),
		).toBeInTheDocument();
	});

	it("shows connected state when daemon is found", () => {
		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Connected"
			/>,
		);

		const ConnectedIndicator = screen.getByTestId("connected-indicator");

		expect(ConnectedIndicator).toBeInTheDocument();
		expect(
			screen.getByText("Connected to Air Daemon"),
		).toBeInTheDocument();
	});

	it("shows disconnected state when daemon is not found", () => {
		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Disconnected"
			/>,
		);

		const DisconnectedIndicator = screen.getByTestId(
			"disconnected-indicator",
		);

		expect(DisconnectedIndicator).toBeInTheDocument();
		expect(
			screen.getByText("Air Daemon not found"),
		).toBeInTheDocument();
	});

	it("shows download link when daemon not detected", () => {
		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Disconnected"
			/>,
		);

		const DownloadLink = screen.getByText("Download Air Daemon");

		expect(DownloadLink).toBeInTheDocument();
		expect(DownloadLink.closest("a")).toHaveAttribute("href", "/Download");
	});

	it("does not show download link when no DownloadHref provided", () => {
		const ContentWithoutDownload = {
			...SampleContent,
			DownloadHref: undefined,
		};

		render(
			<DynamicLocalFirstScan
				Content={ContentWithoutDownload}
				DaemonStatus="Disconnected"
			/>,
		);

		expect(
			screen.queryByText("Download Air Daemon"),
		).not.toBeInTheDocument();
	});

	it("connect button is disabled during scanning", () => {
		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Scanning"
			/>,
		);

		const ConnectButton = screen.getByRole("button", {
			name: "Connect to Air Daemon",
		});

		expect(ConnectButton).toBeDisabled();
	});

	it("connect button is disabled when loading", () => {
		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Connected"
				IsLoading={true}
			/>,
		);

		const ConnectButton = screen.getByRole("button", {
			name: "Connect to Air Daemon",
		});

		expect(ConnectButton).toBeDisabled();
		expect(ConnectButton).toHaveAttribute("aria-busy", "true");
	});

	it("calls OnConnect when connect button is clicked", async () => {
		const ConnectHandler = vi.fn();
		const User = UserEvent.setup();

		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Connected"
				OnConnect={ConnectHandler}
			/>,
		);

		const ConnectButton = screen.getByRole("button", {
			name: "Connect to Air Daemon",
		});

		await User.click(ConnectButton);

		expect(ConnectHandler).toHaveBeenCalledTimes(1);
	});

	it("does not call OnConnect when loading", async () => {
		const ConnectHandler = vi.fn();
		const User = UserEvent.setup();

		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Connected"
				OnConnect={ConnectHandler}
				IsLoading={true}
			/>,
		);

		const ConnectButton = screen.getByRole("button", {
			name: "Connect to Air Daemon",
		});

		await User.click(ConnectButton);

		expect(ConnectHandler).not.toHaveBeenCalled();
	});

	it("renders title and description", () => {
		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Scanning"
			/>,
		);

		expect(screen.getByText("Air Daemon")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Zero cloud dependency. Your code stays on your machine.",
			),
		).toBeInTheDocument();
	});

	it("renders feature list", () => {
		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Scanning"
			/>,
		);

		expect(screen.getByText("Local-first editing")).toBeInTheDocument();
		expect(screen.getByText("Offline capable")).toBeInTheDocument();
		expect(
			screen.getByText("End-to-end encrypted sync"),
		).toBeInTheDocument();
	});

	it("renders protocol list", () => {
		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Scanning"
			/>,
		);

		expect(screen.getByText("mTLS")).toBeInTheDocument();
		expect(screen.getByText("WebSocket")).toBeInTheDocument();
	});

	it("renders certificate list", () => {
		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Scanning"
			/>,
		);

		expect(screen.getByText("JWT")).toBeInTheDocument();
		expect(screen.getByText("x509")).toBeInTheDocument();
	});

	it("has proper region aria-label", () => {
		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Scanning"
			/>,
		);

		const Region = screen.getByRole("region", {
			name: "Local-first daemon scan",
		});

		expect(Region).toBeInTheDocument();
	});

	it("sets data-status attribute reflecting daemon state", () => {
		const { container } = render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Connected"
			/>,
		);

		const Region = container.querySelector('[data-status="Connected"]');

		expect(Region).toBeTruthy();
	});

	it("scanning indicator has aria-live for screen reader announcements", () => {
		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Scanning"
			/>,
		);

		const ScanningIndicator = screen.getByTestId("scanning-indicator");

		expect(ScanningIndicator).toHaveAttribute("aria-live", "polite");
	});

	it("connected indicator has aria-live for screen reader announcements", () => {
		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Connected"
			/>,
		);

		const ConnectedIndicator = screen.getByTestId("connected-indicator");

		expect(ConnectedIndicator).toHaveAttribute("aria-live", "polite");
	});

	it("disconnected indicator has aria-live for screen reader announcements", () => {
		render(
			<DynamicLocalFirstScan
				Content={SampleContent}
				DaemonStatus="Disconnected"
			/>,
		);

		const DisconnectedIndicator = screen.getByTestId(
			"disconnected-indicator",
		);

		expect(DisconnectedIndicator).toHaveAttribute("aria-live", "polite");
	});
});
