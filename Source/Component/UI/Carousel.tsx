"use client";

import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from "embla-carousel-react";

import { ArrowLeft, ArrowRight } from "lucide-react";

import * as React from "react";

import { Button } from "./Button";

import { cn } from "./Utility";

/**
 * Carousel - one of a set, one at a time, by choice.
 *
 * ─── THE POSITION IS THE CAROUSEL'S ONLY STATE ───────────────────────────
 * A carousel is a set with one member visible, and the member is the state. The
 * kit drew the two arrows and nothing else, so a reader had to infer where they
 * were from what they could see. The family prints it:
 *
 *   CarouselStatus   `# SLIDE / 02 OF 05`, and the set's name
 *   CarouselDots     the set as marks - a rule with squares, not a row of pills
 *   CarouselEmpty    the set with nothing in it: `◎ SLIDE / 00`
 *
 * ─── THE DOTS ARE NOT CONTROLS ───────────────────────────────────────────
 * They are `aria-hidden` and take no pointer. Five unlabelled buttons would be
 * five tab stops that say nothing, and the status line is the accessible
 * statement - `aria-live="polite"`, so a slide change is announced once rather
 * than five times.
 *
 * ─── REDUCED MOTION IS A RE-INIT, NOT A HIDDEN TRANSITION ────────────────
 * Embla moves the track with a transform, and a stylesheet cannot shorten that.
 * So the component asks the reader's own preference and re-initialises the
 * carousel with `duration: 0` - the slides snap. The state survives and the
 * interval does not, which is the same contract every other interval on this site
 * keeps.
 */

type CarouselApi = UseEmblaCarouselType[1];

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;

type CarouselOptions = UseCarouselParameters[0];

type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
	opts?: CarouselOptions;

	plugins?: CarouselPlugin;

	orientation?: "horizontal" | "vertical";

	setApi?: (api: CarouselApi) => void;

	/** Shows a sliver of the next slide, which is the cheapest way to say "more". */
	peek?: boolean;
};

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];

	api: ReturnType<typeof useEmblaCarousel>[1];

	scrollPrev: () => void;

	scrollNext: () => void;

	canScrollPrev: boolean;

	canScrollNext: boolean;

	/** Which slide is at the leading edge, zero-based. */
	index: number;

	/** How many slides the set holds. */
	count: number;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function UseCarousel() {
	const context = React.useContext(CarouselContext);

	if (!context) {
		throw new Error("UseCarousel must be used within a <Carousel />");
	}

	return context;
}

function Carousel({
	orientation = "horizontal",
	opts,
	setApi,
	plugins,
	className,
	children,
	peek,
	...props
}: React.ComponentProps<"div"> & CarouselProps) {
	const [carouselRef, api] = useEmblaCarousel(
		{
			...opts,
			axis: orientation === "horizontal" ? "x" : "y",
		},

		plugins,
	);

	const [canScrollPrev, setCanScrollPrev] = React.useState(false);

	const [canScrollNext, setCanScrollNext] = React.useState(false);

	const [index, setIndex] = React.useState(0);

	const [count, setCount] = React.useState(0);

	const onSelect = React.useCallback((api: CarouselApi) => {
		if (!api) return;

		setCanScrollPrev(api.canScrollPrev());

		setCanScrollNext(api.canScrollNext());

		setIndex(api.selectedScrollSnap());

		setCount(api.scrollSnapList().length);
	}, []);

	const scrollPrev = React.useCallback(() => {
		api?.scrollPrev();
	}, [api]);

	const scrollNext = React.useCallback(() => {
		api?.scrollNext();
	}, [api]);

	const handleKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();

				scrollPrev();
			} else if (event.key === "ArrowRight") {
				event.preventDefault();

				scrollNext();
			} else if (event.key === "Home") {
				event.preventDefault();

				api?.scrollTo(0);
			} else if (event.key === "End") {
				event.preventDefault();

				api?.scrollTo(api.scrollSnapList().length - 1);
			}
		},

		[api, scrollPrev, scrollNext],
	);

	React.useEffect(() => {
		if (!api || !setApi) return;

		setApi(api);
	}, [api, setApi]);

	React.useEffect(() => {
		if (!api) return;

		onSelect(api);

		api.on("reInit", onSelect);

		api.on("select", onSelect);

		return () => {
			api?.off("select", onSelect);
		};
	}, [api, onSelect]);

	/**
	 * Reduced motion: re-init with a zero duration.
	 *
	 * Embla's movement is a transform on the track, so a stylesheet cannot shorten
	 * it - the preference has to reach the library. The listener follows a change of
	 * preference as well as its value at mount, because a reader can turn it on
	 * while the page is open.
	 */
	React.useEffect(() => {
		if (!api || typeof window === "undefined") return;

		const Query = window.matchMedia("(prefers-reduced-motion: reduce)");

		const Apply = () => {
			// `duration` is only written when the preference asks for it: an
			// `undefined` would be a second way of saying "the library's default", and
			// exact-optional-properties refuses the two spellings in one object.
			if (Query.matches) api.reInit({ duration: 0 });
			else api.reInit();
		};

		Apply();

		Query.addEventListener("change", Apply);

		return () => Query.removeEventListener("change", Apply);
	}, [api, opts?.duration]);

	return (
		<CarouselContext.Provider
			value={{
				carouselRef,
				api: api,
				opts,
				orientation:
					orientation ||
					(opts?.axis === "y" ? "vertical" : "horizontal"),
				scrollPrev,
				scrollNext,
				canScrollPrev,
				canScrollNext,
				index,
				count,
			}}
		>
			<div
				onKeyDownCapture={handleKeyDown}
				className={cn("relative", className)}
				role="region"
				aria-roledescription="carousel"
				data-slot="carousel"
				data-peek={peek ? "true" : undefined}
				{...props}
			>
				{children}
			</div>
		</CarouselContext.Provider>
	);
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
	const { carouselRef, orientation } = UseCarousel();

	return (
		<div
			ref={carouselRef}
			className="overflow-hidden"
			data-slot="carousel-content"
		>
			<div
				className={cn(
					"flex",
					orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
	const { orientation } = UseCarousel();

	return (
		<div
			role="group"
			aria-roledescription="slide"
			data-slot="carousel-item"
			className={cn(
				"min-w-0 shrink-0 grow-0 basis-full",
				orientation === "horizontal" ? "pl-4" : "pt-4",
				className,
			)}
			{...props}
		/>
	);
}

function CarouselPrevious({
	className,
	variant = "outline",
	size = "icon",
	...props
}: React.ComponentProps<typeof Button>) {
	const { orientation, scrollPrev, canScrollPrev } = UseCarousel();

	return (
		<Button
			data-slot="carousel-previous"
			variant={variant}
			size={size}
			className={cn(
				"absolute size-8 rounded-none",
				orientation === "horizontal"
					? "-left-12 top-1/2 -translate-y-1/2"
					: "-top-12 left-1/2 -translate-x-1/2 rotate-90",
				className,
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<ArrowLeft />
			<span className="sr-only">Previous slide</span>
		</Button>
	);
}

function CarouselNext({
	className,
	variant = "outline",
	size = "icon",
	...props
}: React.ComponentProps<typeof Button>) {
	const { orientation, scrollNext, canScrollNext } = UseCarousel();

	return (
		<Button
			data-slot="carousel-next"
			variant={variant}
			size={size}
			className={cn(
				"absolute size-8 rounded-none",
				orientation === "horizontal"
					? "-right-12 top-1/2 -translate-y-1/2"
					: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
				className,
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<ArrowRight />
			<span className="sr-only">Next slide</span>
		</Button>
	);
}

interface CarouselStatusProps {
	/** The set's name: `PLATES` prints as `# PLATES / 02 OF 05`. */
	label?: string;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * CarouselStatus - the position, printed.
 *
 * `# SLIDE / 02 OF 05` in the site's grammar, and `aria-live="polite"` so the change
 * is announced once. A set of zero prints `SLIDE / 00`, which is the empty state's
 * figure rather than a lie about a first slide.
 */
function CarouselStatus({ label, className }: CarouselStatusProps) {
	const { index, count } = UseCarousel();

	const Pad = (Value: number): string => String(Value).padStart(2, "0");

	return (
		<div className={cn("CarouselStatus", className)} aria-live="polite">
			<p className="DisplayRegister">
				<span className="DisplayRegister__Mark" aria-hidden="true">
					#
				</span>
				<span className="DisplayRegister__Label">
					{label ?? "SLIDE"}
				</span>
				<span className="DisplayRegister__Rule" aria-hidden="true">
					/
				</span>
				<span className="DisplayRegister__Value">
					{count === 0 ? "00" : Pad(index + 1)} OF {Pad(count)}
				</span>
			</p>

			<CarouselDots />
		</div>
	);
}

/**
 * CarouselDots - the set as marks.
 *
 * A square per slide, filled at the current one, at the size of a state's mark
 * (8px). `aria-hidden`: the status line is the accessible statement.
 */
function CarouselDots() {
	const { count, index } = UseCarousel();

	if (count <= 1) return null;

	return (
		<span className="CarouselDots" aria-hidden="true">
			{Array.from({ length: count }, (_, Position) => (
				<span
					className="CarouselDots__Dot"
					key={Position}
					data-active={Position === index}
				/>
			))}
		</span>
	);
}

interface CarouselEmptyProps {
	/** What would be here. */
	statement: string;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * CarouselEmpty - the set with nothing in it.
 *
 * A carousel of zero slides renders a frame, two disabled arrows and no content.
 * That is a control that answers nothing, which the site's grammar forbids, so the
 * empty arm replaces the track entirely and says what the set would have held.
 */
function CarouselEmpty({ statement, className }: CarouselEmptyProps) {
	return (
		<div className={cn("DisplayAbsent", className)}>
			<span className="DisplayAbsent__Mark" aria-hidden="true">
				◎
			</span>
			<span className="DisplayAbsent__Word">SLIDE / 00</span>
			<p className="DisplayAbsent__Statement">{statement}</p>
		</div>
	);
}

export {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	CarouselStatus,
	CarouselDots,
	CarouselEmpty,
};
