import { ExternalLink } from "lucide-react";

import React from "react";

import { cn } from "../UI/Utility";

import type { FieldRecord as FieldRecordData } from "../../Content/Record/FieldRecord";

import { FieldRecordSeal } from "./FieldRecordSeal";

export interface SpecimenLabelProps {
	record: FieldRecordData;

	className?: string;

	/** Seal render size in px (default 28 - card-sized specimen anchor, not the hero 64). */
	sealSize?: number;

	/** Hide the index + seal header row (used when the host renders its own). */
	showHeader?: boolean;

	/** Hide the title row (used when the host renders the element name itself). */
	showTitle?: boolean;

	/** Optional node rendered as the final ledger row (e.g. an action). */
	action?: React.ReactNode;
}

/**
 * SpecimenLabel - the element-series ledger artifact (Daylight Field Record).
 *
 * The distinct physical form for the element series: ink directly on the
 * creme canvas (NO --Card white background - the canvas shows through),
 * hairline rgba(7,7,7,0.08) rules between rows, dense left-aligned mono
 * uppercase ledger type, a small seal as the specimen anchor, and one green
 * accent detail (the STATUS row when the record tone is "specimen").
 *
 * The field-record grammar is preserved (# INDEX, 〈STAMP〉, /ROUTE, PROGRAM,
 * TITLE:, STATUS:, metadata rows) but stamps render at ledger scale
 * (text-sm), never the hero-scale text-field-l, so they fit card-width
 * specimens without overflowing or wrapping awkwardly.
 *
 * This is deliberately NOT the white FieldRecordDataCard box used by the
 * hero / 404 / Portal hero / pricing / download sections.
 */
const SpecimenLabel: React.FC<SpecimenLabelProps> = ({
	record,
	className,
	sealSize = 28,
	showHeader = true,
	showTitle = true,
	action,
}) => {
	const Index = record.Index.replace(/^#\s*/, "");

	const IsSpecimen = record.Status.Tone === "specimen";

	return (
		<div className={cn("flex flex-col", className)}>
			{showHeader && (
				<div className="flex items-start justify-between gap-3">
					<span className="font-mono text-sm font-medium uppercase tracking-[0.2em] text-card-foreground">
						# {Index}
					</span>
					<FieldRecordSeal
						element={record.Seal}

						size={sealSize}

						className="shrink-0"
					/>
				</div>
			)}

			{record.Stamp?.length ? (
				<div className="mt-3 border-t border-border pt-3">
					{record.Stamp.map((Line) => (
						<p
							key={Line}

							className="font-mono text-sm font-medium uppercase leading-none tracking-[0.15em] text-card-foreground"
						>
							〈{Line}〉
						</p>
					))}
				</div>
			) : null}

			{record.Route?.length ? (
				<div className="mt-3 border-t border-border pt-3">
					{record.Route.map((Line) => (
						<p
							key={Line}

							className="font-mono text-sm uppercase leading-none tracking-[0.15em] text-card-foreground opacity-70"
						>
							{Line}
						</p>
					))}
				</div>
			) : null}

			{record.Program?.length ? (
				<div className="mt-3 border-t border-border pt-3">
					<p className="font-mono text-xs uppercase tracking-[0.25em] text-card-foreground opacity-60">
						{record.Program.join("\u2001")}
					</p>
				</div>
			) : null}

			{showTitle && (
				<div className="mt-3 border-t border-border pt-3">
					{record.Href ? (
						<a
							href={record.Href}

							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 font-mono text-lg font-medium uppercase leading-tight tracking-[0.1em] text-card-foreground hover:underline"
						>
							{record.Title}:
							<ExternalLink
								className="h-3.5 w-3.5 shrink-0 text-current"
								aria-hidden="true"
							/>
						</a>
					) : (
						<p className="font-mono text-lg font-medium uppercase leading-tight tracking-[0.1em] text-card-foreground">
							{record.Title}:
						</p>
					)}
					{record.Relation ? (
						<p className="mt-1.5 font-mono text-sm leading-relaxed text-card-foreground opacity-70">
							↳{record.Relation}
						</p>
					) : null}
				</div>
			)}

			<div className="mt-3 border-t border-border pt-3">
				<p
					className={`font-mono text-sm font-medium uppercase tracking-[0.2em] ${
						IsSpecimen ? "text-accent" : "text-card-foreground"
					}`}
				>
					STATUS: {record.Status.Value}
				</p>
			</div>

			{record.Metadata?.length ? (
				<div className="mt-3 border-t border-border pt-3">
					{record.Metadata.map((Row) => (
						<div key={Row.Label} className="flex gap-3 py-0.5">
							<span className="w-28 shrink-0 whitespace-nowrap font-mono text-sm uppercase tracking-[0.1em] text-card-foreground opacity-60">
								{Row.Label}:
							</span>
							<span className="font-mono text-sm font-medium uppercase tracking-[0.15em] text-card-foreground">
								{Row.Value}
							</span>
						</div>
					))}
				</div>
			) : null}

			{action ? (
				<div className="mt-3 border-t border-border pt-3">{action}</div>
			) : null}
		</div>
	);
};

export { SpecimenLabel };

export default SpecimenLabel;
