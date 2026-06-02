import { cn } from "./Utility";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn("animate-pulse rounded-none bg-accent", className)}
			{...props}
		/>
	);
}

/**
 * Generic card skeleton - header + two body lines.
 */
function SkeletonCard({ className }: React.ComponentProps<"div">) {
	return (
		<div className={cn("bg-card p-6", className)}>
			<Skeleton className="mb-4 h-6 w-3/4 bg-[var(--Secondary)]" />
			<Skeleton className="mb-2 h-4 w-full bg-[var(--Secondary)]" />
			<Skeleton className="h-4 w-5/6 bg-[var(--Secondary)]" />
		</div>
	);
}

/**
 * Feature card skeleton - matches FeatureCard layout (title + icon header,
 * description lines, icon stack row).
 */
function SkeletonFeatureCard({ className }: React.ComponentProps<"div">) {
	return (
		<div className={cn("bg-card p-6", className)}>
			<div className="mb-4 flex items-start justify-between">
				<Skeleton className="h-6 w-1/2 bg-[var(--Secondary)]" />
				<Skeleton className="h-10 w-10 shrink-0 bg-[var(--Secondary)]" />
			</div>
			<Skeleton className="mb-2 h-4 w-full bg-[var(--Secondary)]" />
			<Skeleton className="mb-2 h-4 w-5/6 bg-[var(--Secondary)]" />
			<Skeleton className="h-4 w-4/6 bg-[var(--Secondary)]" />
		</div>
	);
}

/**
 * Pricing tier skeleton - matches PricingCard layout (button, name, price,
 * feature list).
 */
function SkeletonPricingTier({ className }: React.ComponentProps<"div">) {
	return (
		<div className={cn("bg-card", className)}>
			<div className="p-6">
				<Skeleton className="mb-4 h-9 w-full bg-[var(--Secondary)]" />
				<Skeleton className="mb-2 h-6 w-1/3 bg-[var(--Secondary)]" />
				<Skeleton className="mb-4 h-4 w-2/3 bg-[var(--Secondary)]" />
				<Skeleton className="h-10 w-1/3 bg-[var(--Secondary)]" />
			</div>
			<div className="p-6">
				{[1, 2, 3, 4].map((Index) => (
					<Skeleton
						key={Index}
						className="mb-3 h-4 w-full bg-[var(--Secondary)]"
					/>
				))}
			</div>
		</div>
	);
}

export { Skeleton, SkeletonCard, SkeletonFeatureCard, SkeletonPricingTier };
