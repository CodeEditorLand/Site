"use client";

import * as React from "react";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
	Groups,
	InGroup,
	type DisplaySpec,
	type Kind,
	type Specimen,
} from "../../Content/Specimen/Display.js";

import {
	Accordion,
	AccordionContent,
	AccordionEmpty,
	AccordionItem,
	AccordionTrigger,
} from "../UI/Accordion";

import { Alert, AlertAction, AlertDescription, AlertTitle } from "../UI/Alert";

import { Avatar, AvatarFallback, AvatarGroup } from "../UI/Avatar";

import { Badge, BadgeGroup, BadgeTones, type BadgeTone } from "../UI/Badge";

import { BreadcrumbCollapse, type Crumb } from "../UI/Breadcrumb";

import { Calendar, CalendarPlate } from "../UI/Calendar";

import {
	Carousel,
	CarouselContent,
	CarouselEmpty,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	CarouselStatus,
} from "../UI/Carousel";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardRegister,
	CardState,
	CardTitle,
} from "../UI/Card";

import { ChartContainer, ChartEmpty, ChartFrame } from "../UI/Chart";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../UI/Collapsible";

import {
	Pagination,
	PaginationContent,
	PaginationNext,
	PaginationPrevious,
	PaginationRange,
	PaginationStatus,
} from "../UI/Pagination";

import { Progress } from "../UI/Progress";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "../UI/Resizable";

import { ScrollAreaFrame } from "../UI/ScrollArea";

import { SeparatorLabel } from "../UI/Separator";

import { SkeletonMatrix, SkeletonRecord } from "../UI/Skeleton";

import { Notify, SonnerReceipt, Toaster } from "../UI/Sonner";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableEmpty,
	TableHead,
	TableHeader,
	TableRegister,
	TableRow,
} from "../UI/Table";

import {
	Tabs,
	TabsContent,
	TabsEmpty,
	TabsList,
	TabsTrigger,
} from "../UI/Tabs";

/**
 * SpecimenDisplay - the display family, printed live.
 *
 * ─── WHY EVERY ROW IS A REAL COMPONENT ───────────────────────────────────
 * The sheet's doctrine: a part with states is shown with its states, because a
 * screenshot of a component cannot be composed with. So every row mounts the kit's
 * own primitive at the state the row names - the table at `dense`, the tab strip with
 * nine labels in a narrow column, the accordion with its panel open, the progress bar
 * at 7 of 12, the chart with four bars, the month with its marks.
 *
 * ─── THE RENDERER DECIDES NOTHING ────────────────────────────────────────
 * A row states what it is, which part it exercises, when that state is right and the
 * props its specimen needs; this file mounts it. That split is why the matrix and the
 * rows cannot drift: both read `Content/Specimen/Display.ts`, and a state added there
 * appears on both with no second edit.
 *
 * ─── THE ROW THAT MEASURES ITS CONTAINER ─────────────────────────────────
 * The chart draws itself with `recharts`, which measures its container - so the row
 * prints its own loading arm until the island has mounted, which is honest twice
 * over: it is what the reader sees while the plot is measured, and it is the chart's
 * own loading state printed by the component rather than faked by the sheet.
 */

/** Two digits, because every figure on this sheet is printed at a fixed width. */
const Pad = (Value: number | string): string => String(Value).padStart(2, "0");

/* ─── THE TABLE'S OWN DATA ───────────────────────────────────────────────── */

/** One row of the specimen table, keyed by the column names the row declares. */
const TableData = (
	Count: number,

	Columns: readonly string[],
): readonly Record<string, string>[] => {
	const Tiers: readonly Record<string, string>[] = [
		{
			TIER: "CLOUD",

			PROTOCOL: "gRPC",

			FEATURES: "04",

			RELEASE: "0.4.1",

			DATE: "2026-11-14",

			CHANNEL: "PUBLIC",

			STATUS: "ACTIVE",

			ROUTE: "/Contents",

			LAYER: "Chrome",
		},

		{
			TIER: "PROVIDER",

			PROTOCOL: "IPC",

			FEATURES: "03",

			RELEASE: "0.4.0",

			DATE: "2026-10-02",

			CHANNEL: "PUBLIC",

			STATUS: "VERIFIED",

			ROUTE: "/Doc",

			LAYER: "Reading",
		},

		{
			TIER: "LOCAL-FIRST",

			PROTOCOL: "TCP",

			FEATURES: "05",

			RELEASE: "0.3.8",

			DATE: "2026-08-21",

			CHANNEL: "PRE-RELEASE",

			STATUS: "PREPARING",

			ROUTE: "/Download",

			LAYER: "Manifest",
		},

		{
			TIER: "ENTERPRISE",

			PROTOCOL: "WASM",

			FEATURES: "04",

			RELEASE: "0.3.6",

			DATE: "2026-07-09",

			CHANNEL: "PUBLIC",

			STATUS: "ARCHIVED",

			ROUTE: "/Portal",

			LAYER: "App",
		},
	];

	return Array.from({ length: Count }, (_, Index) => {
		const Base = Tiers[Index % Tiers.length]!;

		const Row: Record<string, string> = {};

		for (const Column of Columns)
			Row[Column] = Base[Column] ?? "UNAVAILABLE";

		// The release column needs a figure that is unique per row, or seven dense
		// rows would print the same release four times and read as one row.
		if (Column(Columns, "RELEASE")) {
			Row["RELEASE"] = `0.4.${String(Index + 1).padStart(2, "0")}`;
		}

		return Row;
	});
};

/** Whether the table's head names a column. */
const Column = (Columns: readonly string[], Name: string): boolean =>
	Columns.includes(Name);

/** The table, at whatever state the row asked for. */
const TableStage = ({ Row }: { Row: Specimen }) => {
	const Columns = Row.columns ?? ["TIER", "PROTOCOL", "FEATURES"];

	const Data = TableData(Row.rows ?? 3, Columns);

	const Label = Row.register ?? "TIERS";

	const Empty = Data.length === 0;

	const Partial = Row.variant === "partial";

	return (
		<>
			<TableRegister
				label={Label}
				count={Pad(Data.length)}
				{...(Row.dense ? { note: "DENSE" } : {})}
			/>

			<Table
				density={Row.dense ? "dense" : "comfortable"}
				sticky={Row.sticky ?? false}
				pinFirst={Row.sticky === true || Row.width === "narrow"}
				bordered
				{...(Row.sticky === true ? { height: "18rem" } : {})}
			>
				<TableCaption
					register={
						<TableRegister
							label={Label}

							count={Pad(Data.length)}

							note={`${Columns.length} COLUMNS`}
						/>
					}
				>
					{Empty
						? "The head is the schema and it stays: a table that disappeared with its rows would hide the one fact it still knows."
						: `Read across: one ${Label.toLowerCase().replace(/s$/, "")} per row, one fact per column, and the register above carries the set's own length.`}
				</TableCaption>

				<TableHeader>
					<TableRow>
						{Columns.map((Name) => (
							<TableHead key={Name}>{Name}</TableHead>
						))}
					</TableRow>
				</TableHeader>

				<TableBody>
					{Empty ? (
						<TableEmpty
							colSpan={Columns.length}

							statement="A tier is filed here once a protocol is bound to it."
							cause="No tier has been bound yet, so the set is empty rather than missing."
							next={{
								label: "READ THE PROTOCOL SPINES",
								href: "/Doc",
							}}
						/>
					) : (
						Data.map((Entry, Index) => (
							<TableRow key={Index}>
								{Columns.map((Name, ColumnIndex) => {
									const Value = Entry[Name] ?? "UNAVAILABLE";

									const Unknown =
										Partial &&
										Index === 1 &&
										ColumnIndex === 2;

									return (
										<TableCell
											key={Name}
											numeric={Name === "FEATURES"}
											wrap={Name === "RELEASE"}
											empty={Unknown}
										>
											{Unknown ? "UNAVAILABLE" : Value}
										</TableCell>
									);
								})}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</>
	);
};

/* ─── THE CARD ───────────────────────────────────────────────────────────── */

const CardStage = ({ Row }: { Row: Specimen }) => {
	const State = Row.variant;

	return (
		<Card
			{...(State === "empty"
				? { state: "empty" as const }
				: State === "stale"
					? { state: "stale" as const }
					: {})}
		>
			<CardHeader>
				<CardRegister
					label={Row.register ?? "RELEASE_01"}
					count={Pad(4)}
					note="4 FACTS"
				/>

				<CardTitle>{Row.title ?? "WHAT IT CARRIES"}</CardTitle>

				<CardDescription>
					One card, one artifact: the register names the record, the
					title says what it is about, the foot states the state.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<p className="TableEmpty__Statement">
					{Row.note ??
						"A header with a register, a body with its sentence, and a foot that prints the status - the same three sections every record card on this site carries."}
				</p>

				{State === "empty" ? (
					<CardState
						word="EMPTY"
						line="No row is filed against this release yet."
					/>
				) : null}

				{State === "stale" ? (
					<CardState
						word="STALE"
						line="The figures are as of 14 NOV 2026 - 318 days old."
					/>
				) : null}

				{State === undefined ? (
					<CardState word="STATUS: ACTIVE" line="CHANNEL: PUBLIC" />
				) : null}
			</CardContent>
		</Card>
	);
};

/* ─── THE BADGES ─────────────────────────────────────────────────────────── */

const BadgeStage = ({ Row }: { Row: Specimen }) => {
	const Count = Row.rows ?? 6;

	const Tones = BadgeTones.filter((Tone) => Tone !== "quiet").slice(0, Count);

	const Items = Tones.map((Tone, Index) => (
		<Badge
			key={Tone}
			tone={Tone as BadgeTone}
			{...(Index === 0 ? { count: Pad(4), mark: "dot" as const } : {})}
		>
			{`${Tone.toUpperCase()}: ${Index === 0 ? "gRPC" : Tone === "ipc" ? "IPC" : Tone === "tcp" ? "TCP" : Tone === "wasm" ? "WASM" : Tone === "rust" ? "RUST" : Tone === "tauri" ? "TAURI" : Tone === "effect" ? "EFFECT-TS" : Tone === "electron" ? "ELECTRON" : "ACCENT"}`}
		</Badge>
	));

	return <BadgeGroup items={Items} max={Row.width === "narrow" ? 4 : 6} />;
};

/* ─── THE TABS ───────────────────────────────────────────────────────────── */

const ViewNames = [
	"OVERVIEW",

	"PROTOCOL",

	"ARTIFACTS",

	"CHECKSUMS",

	"COMPATIBILITY",

	"REQUIREMENTS",

	"LICENSE",

	"PROVENANCE",

	"ARCHIVE",
];

const TabsStage = ({ Row }: { Row: Specimen }) => {
	const Count = Row.rows ?? 3;

	if (Count === 0) {
		return (
			<TabsEmpty
				statement="A view is filed here once a subject has more than one reading."
				cause="No view is filed, so the strip would be a track with nothing to choose."
			/>
		);
	}

	const Names = ViewNames.slice(0, Count);

	return (
		<Tabs defaultValue={Names[0]}>
			<TabsList
				label="Views"
				overflow={Row.width === "narrow" ? "scroll" : "wrap"}
			>
				{Names.map((Name) => (
					<TabsTrigger value={Name} key={Name}>
						{Name}
					</TabsTrigger>
				))}
			</TabsList>

			{Names.map((Name, Index) => (
				<TabsContent value={Name} key={Name} label={`/${Name}`}>
					<p className="TableEmpty__Statement">
						{Index === 0
							? "The first view is the one the page opens on: the subject stated, the figures beneath it, and no claim that needs the other tabs to be understood."
							: `${Name} is a sibling reading of the same subject. One panel is visible at a time, and every panel prints under its own name on paper.`}
					</p>
				</TabsContent>
			))}
		</Tabs>
	);
};

/* ─── THE DISCLOSURES ────────────────────────────────────────────────────── */

const SectionNames = ["WHAT IT IS", "WHAT IT CARRIES", "WHAT IT REFUSES"];

const AccordionStage = ({ Row }: { Row: Specimen }) => {
	const Count = Row.rows ?? 3;

	if (Count === 0) {
		return (
			<AccordionEmpty
				statement="A section is filed here once the subject has something to keep closed."
				cause="No section is filed, so the stack would be a ruled void."
			/>
		);
	}

	return (
		<Accordion type="single" collapsible defaultValue="WHAT IT IS">
			{SectionNames.slice(0, Count).map((Name) => (
				<AccordionItem value={Name} key={Name}>
					<AccordionTrigger>{Name}</AccordionTrigger>
					<AccordionContent>
						<p className="TableEmpty__Statement">
							{Name === "WHAT IT IS"
								? "A disclosure that is open is a head: the label goes to 500, the mark goes to the ink, and the rule under it steps to the edge ink. The panel is simply there."
								: `${Name} stays closed until it is asked for, and the stack keeps its one open panel rather than opening a second.`}
						</p>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
};

const CollapsibleStage = ({ Row }: { Row: Specimen }) => {
	const Open = Row.variant === "open";

	return (
		<Collapsible defaultOpen={Open}>
			<CollapsibleTrigger>
				<span className="DisplayRegister__Label">
					{Open ? "THE REGION, OPEN" : "THE REGION, CLOSED"}
				</span>
			</CollapsibleTrigger>

			<CollapsibleContent>
				<p className="TableEmpty__Statement">
					One region and one trigger: the mark is `→` while it is
					closed and `↳` while it is open, and the panel's height is
					the only thing that animates. Under reduced motion the panel
					is simply there.
				</p>
			</CollapsibleContent>

			{Open ? null : (
				<p className="TableEmpty__Cause">
					Closed: the trigger prints the mark and the panel holds its
					content without printing it.
				</p>
			)}
		</Collapsible>
	);
};

/* ─── THE MEASUREMENTS ───────────────────────────────────────────────────── */

const ProgressStage = ({ Row }: { Row: Specimen }) => (
	<Progress
		label={Row.label ?? "PREPARING"}
		value={Row.value ?? 0}
		max={Row.max ?? 12}
		{...(Row.variant === "loading"
			? { state: "loading" as const }
			: Row.variant === "failed"
				? { state: "failed" as const }
				: Row.variant === "complete"
					? { state: "complete" as const }
					: {})}
	/>
);

const SkeletonStage = ({ Row }: { Row: Specimen }) => {
	if (Row.variant === "matrix") {
		return (
			<SkeletonMatrix
				marker={Row.register ?? "# LOADING / 03"}
				columns={Row.columns ?? ["TIER", "PROTOCOL", "FEATURES"]}
				rows={Row.rows ?? 3}
			/>
		);
	}

	return (
		<SkeletonRecord
			marker={Row.register ?? "# LOADING / 04"}
			keys={["TIER:", "PROTOCOL:", "FEATURES:", "STATUS:"]}
			waiting="THE TIER REGISTER"
			age="318 DAYS"
		/>
	);
};

const ChartStage = ({ Row }: { Row: Specimen }) => {
	const [Mounted, SetMounted] = React.useState(false);

	React.useEffect(() => {
		SetMounted(true);
	}, []);

	const Count = Row.rows ?? 4;

	const Data = [
		{ tier: "CLOUD", value: 4 },
		{ tier: "PROVIDER", value: 4 },
		{ tier: "LOCAL", value: 4 },
		{ tier: "ENTERPRISE", value: 4 },
	].slice(0, Count);

	if (Count === 0) {
		return (
			<ChartFrame
				label={Row.register ?? "TIERS"}
				count="00"
				state="empty"
				caption="A figure with no series says what would be plotted rather than drawing a scale it does not have."
			>
				<ChartEmpty
					statement="Four tiers, one bar each, once the protocol bindings are counted."
					cause="No binding is filed, so the figure has a scale and no values - which is the one thing a chart may not draw."
				/>
			</ChartFrame>
		);
	}

	return (
		<ChartFrame
			label={Row.register ?? "TIERS"}
			count={Pad(Count)}
			caption="Four tiers against the features each carries: the shape is the claim, and the register is the provenance."
		>
			{Mounted ? (
				<ChartContainer
					config={{
						value: {
							label: "FEATURES",
							color: "var(--CardForeground)",
						},
					}}
					className="aspect-auto h-full w-full"
				>
					<BarChart
						data={Data}
						margin={{ top: 8, right: 8, bottom: 8, left: 0 }}
					>
						<CartesianGrid
							vertical={false}
							stroke="var(--Border)"
						/>
						<XAxis
							dataKey="tier"
							tickLine={false}
							axisLine={false}
						/>
						<YAxis width={28} tickLine={false} axisLine={false} />
						<Bar
							dataKey="value"
							fill="var(--color-value)"
							radius={0}
						/>
					</BarChart>
				</ChartContainer>
			) : (
				<SkeletonMatrix
					marker="# LOADING / 04"
					columns={Data.map((Entry) => Entry.tier)}
					rows={2}
				/>
			)}
		</ChartFrame>
	);
};

const CalendarStage = ({ Row }: { Row: Specimen }) => {
	const Empty = Row.variant === "empty";

	return (
		<CalendarPlate
			label={Row.register ?? "RELEASES"}
			period="NOV 2026"
			state={Empty ? "empty" : "rest"}
			note={
				Empty
					? "No release is dated in this month. The days still print: which days a month has is known before what happened on them is."
					: "Two releases are dated in this month, and the plate prints the days around them - a date's meaning is its neighbours."
			}
		>
			<Calendar
				mode="single"
				selected={new Date(2026, 10, 14)}
				modifiers={{
					marked: [new Date(2026, 10, 14), new Date(2026, 10, 26)],
				}}
			/>
		</CalendarPlate>
	);
};

/* ─── THE QUIET ONES ─────────────────────────────────────────────────────── */

const AvatarStage = ({ Row }: { Row: Specimen }) => {
	if (Row.kind === "avatargroup") {
		const Names = [
			"Ada Lovelace",
			"Grace Hopper",
			"Alan Turing",
			"Barbara Liskov",
			"Edsger Dijkstra",
			"Frances Allen",
			"Ken Thompson",
		];

		return (
			<AvatarGroup
				items={Names.slice(0, Row.rows ?? 4).map((Name) => ({
					name: Name,
				}))}
				max={4}
			/>
		);
	}

	return (
		<Avatar size="plate">
			<AvatarFallback empty delayMs={0} />
		</Avatar>
	);
};

const AlertStage = ({ Row }: { Row: Specimen }) => {
	const Error = Row.variant === "error";

	return (
		<Alert state={Error ? "error" : "stale"}>
			<AlertTitle>{Row.label ?? "STATUS: UNAVAILABLE"}</AlertTitle>

			<AlertDescription>
				<p>{Row.note ?? "The action could not be completed."}</p>
			</AlertDescription>

			<AlertAction
				next={{ label: "READ THE CAUSE", href: "/Status" }}
				{...(Error
					? {
							retry: {
								label: Row.action ?? "RETRY",
								onClick: () =>
									Notify.failed("The retry was recorded."),
							},
						}
					: {})}
			/>
		</Alert>
	);
};

const BreadcrumbStage = ({ Row }: { Row: Specimen }) => {
	const Places = [
		"/HOME",
		"/DOC",
		"/DOC/LAYER",
		"/DOC/LAYER/CHROME",
		"/DOC/LAYER/CHROME/HEADER",
		"/DOC/LAYER/CHROME/HEADER/RIBBON",
		"/DOC/LAYER/CHROME/HEADER/RIBBON/STATUS",
		"/DOC/LAYER/CHROME/HEADER/RIBBON/STATUS/VALUE",
		"/SPECIMEN",
	];

	const Crumbs: Crumb[] = Places.slice(0, Row.rows ?? 4).map(
		(Place, Index, All) => ({
			label: Place,
			...(Index === All.length - 1 ? {} : { href: Place }),
		}),
	);

	return <BreadcrumbCollapse items={Crumbs} tail={2} />;
};

const PaginationStage = ({ Row }: { Row: Specimen }) => {
	const Total = Row.rows ?? 12;

	const Page = Row.value ?? 1;

	return (
		<>
			<PaginationStatus
				page={Page}
				{...(Total === 0 ? {} : { total: Total })}
				range={
					Total === 0
						? "SHOWING 00-00 OF 00"
						: `SHOWING ${Pad((Page - 1) * 12 + 1)}-${Pad(Page * 12)} OF ${Pad(Total * 12)}`
				}
			/>

			<Pagination>
				<PaginationContent>
					<PaginationPrevious
						href="#"
						{...(Page <= 1
							? { "aria-disabled": "true" as const }
							: {})}
					/>

					{Total === 0 ? null : (
						<PaginationRange
							page={Page}
							total={Total}
							hrefOf={(Value) => `#page-${Value}`}
						/>
					)}

					<PaginationNext
						href="#"
						{...(Page >= Total
							? { "aria-disabled": "true" as const }
							: {})}
					/>
				</PaginationContent>
			</Pagination>
		</>
	);
};

const ScrollAreaStage = ({ Row }: { Row: Specimen }) => {
	const Count = Row.rows ?? 24;

	return (
		<ScrollAreaFrame
			label={Row.register ?? "LEDGER"}
			count={Pad(Count)}
			unit="ROWS"
		>
			{Array.from({ length: Count }, (_, Index) => (
				<p className="TableEmpty__Statement" key={Index}>
					<span aria-hidden="true">#</span> {Pad(Index + 1)}
					{`\u2001`}
					{`ROW: A LEDGER LINE PRINTED INSIDE THE FRAME`}
				</p>
			))}
		</ScrollAreaFrame>
	);
};

const ResizableStage = ({ Row }: { Row: Specimen }) => (
	<div style={{ height: "12rem" }}>
		<ResizablePanelGroup
			register={Row.register ?? "PANES"}
			orientation="horizontal"
		>
			<ResizablePanel defaultSize={49} minSize={24}>
				<div
					className="TableEmpty"
					style={{ padding: "var(--space-reading)" }}
				>
					<p className="TableEmpty__Statement">THE LEDGER</p>
					<p className="TableEmpty__Cause">
						49 - the data card's share.
					</p>
				</div>
			</ResizablePanel>

			<ResizableHandle withHandle label="RESIZE: LEDGER ␁ NOTES" />

			<ResizablePanel defaultSize={51} minSize={24}>
				<div
					className="TableEmpty"
					style={{ padding: "var(--space-reading)" }}
				>
					<p className="TableEmpty__Statement">THE NOTES</p>
					<p className="TableEmpty__Cause">
						51 - the evidence's share.
					</p>
				</div>
			</ResizablePanel>
		</ResizablePanelGroup>
	</div>
);

const CarouselStage = ({ Row }: { Row: Specimen }) => {
	const Count = Row.rows ?? 4;

	if (Count === 0) {
		return (
			<CarouselEmpty statement="A slide is filed here once the set has more than one plate." />
		);
	}

	return (
		<Carousel opts={{ loop: false }}>
			<CarouselContent>
				{Array.from({ length: Count }, (_, Index) => (
					<CarouselItem key={Index}>
						<div
							className="TableEmpty"
							style={{
								padding: "var(--space-group)",
								border: "var(--BorderWidth) var(--BorderStyle) var(--Border)",
								background: "var(--Card)",
								minHeight: "8rem",
							}}
						>
							<p className="TableEmpty__Statement">
								{`PLATE ${Pad(Index + 1)}`}
							</p>
							<p className="TableEmpty__Cause">
								One slide of the set, printed at the frame's
								width.
							</p>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>

			<CarouselPrevious />
			<CarouselNext />

			<CarouselStatus label={Row.register ?? "PLATES"} />
		</Carousel>
	);
};

const SonnerStage = ({ Row }: { Row: Specimen }) => {
	const Error = Row.variant === "error";

	return (
		<>
			<SonnerReceipt
				state={Row.label ?? "VERIFIED"}
				line={Row.note ?? "The release record was written."}
				type={Error ? "error" : "success"}
				{...(Row.action === undefined ? {} : { action: Row.action })}
			/>

			<p style={{ marginBlockStart: "var(--space-tight)" }}>
				<button
					type="button"
					className="AlertAction__Next"
					onClick={() => {
						if (Error)
							Notify.failed(
								Row.note ?? "The action was refused.",
							);
						else
							Notify.verified(
								Row.note ?? "The action was recorded.",
								{
									label: "UNDO",
									onClick: () => Notify.dismiss(),
								},
							);
					}}
				>
					<span aria-hidden="true">→</span> FIRE THE RECEIPT
				</button>
			</p>
		</>
	);
};

/* ─── THE STAGE ──────────────────────────────────────────────────────────── */

/** What each kind mounts. The renderer decides nothing about the state. */
const StageOf = (Row: Specimen): React.ReactNode => {
	switch (Row.kind) {
		case "table":
			return <TableStage Row={Row} />;
		case "card":
			return <CardStage Row={Row} />;
		case "badge":
		case "badgegroup":
			return <BadgeStage Row={Row} />;
		case "tabs":
			return <TabsStage Row={Row} />;
		case "accordion":
			return <AccordionStage Row={Row} />;
		case "collapsible":
			return <CollapsibleStage Row={Row} />;
		case "progress":
			return <ProgressStage Row={Row} />;
		case "skeleton":
			return <SkeletonStage Row={Row} />;
		case "separator":
			return (
				<SeparatorLabel
					label={Row.label ?? "WHAT CHANGES"}
					{...(Row.value === undefined
						? {}
						: { count: Pad(Row.value) })}
					note="THE SEAM IT NAMES"
				/>
			);
		case "avatar":
		case "avatargroup":
			return <AvatarStage Row={Row} />;
		case "alert":
			return <AlertStage Row={Row} />;
		case "breadcrumb":
			return <BreadcrumbStage Row={Row} />;
		case "pagination":
			return <PaginationStage Row={Row} />;
		case "scrollarea":
			return <ScrollAreaStage Row={Row} />;
		case "resizable":
			return <ResizableStage Row={Row} />;
		case "carousel":
			return <CarouselStage Row={Row} />;
		case "chart":
			return <ChartStage Row={Row} />;
		case "calendar":
			return <CalendarStage Row={Row} />;
		case "sonner":
			return <SonnerStage Row={Row} />;
		default:
			return null;
	}
};

/** The stage's own width, from the row. */
const SkinClass = (Row: Specimen): string => {
	const Width = Row.width ?? "band";

	return `specimen-display__stage specimen-display__stage--${Width}`;
};

/** One labelled row: the state, the part, when it is right, and the specimen. */
const RowView = ({ Row: Specimen }: { Row: Specimen }) => (
	<article className="specimen-display__row" id={`display-${Specimen.mark}`}>
		<header className="specimen-display__spec">
			<p className="specimen-display__mark">
				<span
					className="specimen-display__mark-hash"
					aria-hidden="true"
				>
					#
				</span>
				{Specimen.mark}
			</p>

			<h3 className="specimen-display__state">{Specimen.state}</h3>

			<p className="specimen-display__part">{Specimen.component}</p>

			<p className="specimen-display__when">{Specimen.when}</p>
		</header>

		<div
			className={SkinClass(Specimen)}
			data-skin={Specimen.width ?? "band"}
		>
			{StageOf(Specimen)}
		</div>
	</article>
);

export const SpecimenDisplay = () => (
	<div className="specimen-display">
		{/* One toaster for the whole band, not one per receipt row: two mounted
		    toasters would print every receipt twice, which is the one thing a
		    receipt may not do. */}
		<Toaster position="bottom-right" />

		{Groups.map((Group) => (
			<section className="specimen-display__group" key={Group.key}>
				<p className="specimen-display__group-head">
					<span className="specimen-display__group-kicker">
						{Group.label}
					</span>
					<span className="specimen-display__group-count">
						{InGroup(Group.key).length}
					</span>
				</p>

				<p className="specimen-display__group-note">{Group.note}</p>

				<div className="specimen-display__rows">
					{InGroup(Group.key).map((Entry) => (
						<RowView Row={Entry} key={Entry.mark} />
					))}
				</div>
			</section>
		))}
	</div>
);

export default SpecimenDisplay;

/** Re-exported so the Astro band can count what it prints. */
export type { DisplaySpec, Kind };
