import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
	children: ReactNode;

	fallback?: ReactNode;

	FallbackComponent?: (Error: Error, Reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;

	error: Error | null;
}

/**
 * React Error Boundary that catches render errors in a child tree.
 *
 * The fallback is the site's `INTERRUPTED` record, not a sentence about how to feel:
 * `# FAILURE / 01␁/RUNTIME`, the state word, and three labelled rows - `WHAT
 * FAILED:`, `CAUSE:` (the exception's own message, the one fact the boundary holds)
 * and `RETRY:`, which resets the boundary in place.
 *
 * `FallbackComponent` takes the caught error and the reset callback for a caller that
 * wants its own error UI; `fallback` takes a node when the caller does not need the
 * error. No surface in `Source/` mounts this component today - the test is its only
 * call site.
 */
export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);

		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	HandleRetry = () => {
		this.setState({ hasError: false, error: null });
	};

	override render() {
		if (this.state.hasError) {
			const CaughtError = this.state.error ?? new Error("Unknown error");

			if (this.props.FallbackComponent) {
				return this.props.FallbackComponent(
					CaughtError,

					this.HandleRetry,
				);
			}

			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="flex min-h-[200px] items-center justify-center p-8">
					<div className="w-full max-w-md border border-[var(--Destruct)] bg-card p-8">
						{/*
							The site's error state, in the record grammar: a register
							head, a state word from the fixed vocabulary, and three
							labelled rows. The exception message prints as `CAUSE:`,
							because it is the one fact the boundary actually holds;
							what the block does not print is a sentence telling the
							reader how to feel. `RETRY:` resets the boundary in place,
							so the region comes back without a reload.
						*/}
						<h2 className="mb-4 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-card-foreground">
							<span aria-hidden="true">#</span> FAILURE / 01
							{"\u2001"}
							<span aria-hidden="true">/</span>RUNTIME
						</h2>

						<p className="mb-4 flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.08em] text-card-foreground">
							<span
								aria-hidden="true"
								className="bg-destruct inline-block h-2 w-2"
							/>
							<span>STATUS:</span>
							<span>{"\u2001"}INTERRUPTED</span>
						</p>

						<dl className="space-y-3 text-left">
							<div>
								<dt className="font-mono text-[13px] uppercase tracking-[0.08em] text-muted">
									WHAT FAILED:
								</dt>
								<dd className="text-card-foreground">
									This region stopped rendering. The rest of
									the page still reads, and nothing was sent
									anywhere.
								</dd>
							</div>
							<div>
								<dt className="font-mono text-[13px] uppercase tracking-[0.08em] text-muted">
									CAUSE:
								</dt>
								<dd className="text-card-foreground">
									{CaughtError.message ||
										"The component threw without a message."}
								</dd>
							</div>
							<div>
								<dt className="font-mono text-[13px] uppercase tracking-[0.08em] text-muted">
									RETRY:
								</dt>
								<dd>
									<button
										type="button"
										onClick={this.HandleRetry}
										className="text-destruct hover:bg-destruct hover:text-destruct-fg inline-flex h-9 items-center justify-center border border-[var(--Destruct)] bg-card px-4 py-2 font-mono text-[13px] uppercase tracking-[0.08em] transition-all"
									>
										RELOAD THE REGION{"\u2001"}
										<span aria-hidden="true">&rarr;</span>
									</button>
								</dd>
							</div>
						</dl>

						<p className="mt-5 font-mono text-[13px] text-muted">
							SOURCE: BROWSER RUNTIME{"\u2001"}NOTHING WAS SENT
						</p>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
