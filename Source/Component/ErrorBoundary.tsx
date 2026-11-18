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
 * React Error Boundary that catches render errors in child components.
 * Shows a flat, styled fallback UI consistent with the design system.
 * Accepts a FallbackComponent prop for custom error UI (e.g. skeletons).
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
							labelled rows. It used to print "Something went wrong" - a
							sentence that tells the reader how to feel - and then the
							raw exception, with no statement of what was lost or what
							to do. The exception message is still printed, as `CAUSE:`,
							because it is the one fact the boundary actually holds.
						*/}
						<h2 className="mb-4 font-mono text-[13px] font-medium tracking-[0.08em] text-card-foreground uppercase">
							<span aria-hidden="true">#</span>{" "}FAILURE / 01{"\u2001"}
							<span aria-hidden="true">/</span>RUNTIME
						</h2>

						<p className="mb-4 flex items-center gap-2 font-mono text-[13px] tracking-[0.08em] text-card-foreground uppercase">
							<span
								aria-hidden="true"
								className="bg-destruct inline-block h-2 w-2"
							/>
							<span>STATUS:</span>
							<span>{"\u2001"}INTERRUPTED</span>
						</p>

						<dl className="space-y-3 text-left">
							<div>
								<dt className="font-mono text-[13px] tracking-[0.08em] text-muted uppercase">
									WHAT FAILED:
								</dt>
								<dd className="text-card-foreground">
									This region stopped rendering. The rest of the page
									still reads, and nothing was sent anywhere.
								</dd>
							</div>
							<div>
								<dt className="font-mono text-[13px] tracking-[0.08em] text-muted uppercase">
									CAUSE:
								</dt>
								<dd className="text-card-foreground">
									{CaughtError.message ||
										"The component threw without a message."}
								</dd>
							</div>
							<div>
								<dt className="font-mono text-[13px] tracking-[0.08em] text-muted uppercase">
									RETRY:
								</dt>
								<dd>
									<button
										type="button"
										onClick={this.HandleRetry}
										className="text-destruct hover:bg-destruct hover:text-destruct-fg inline-flex h-9 items-center justify-center border border-[var(--Destruct)] bg-card px-4 py-2 font-mono text-[13px] tracking-[0.08em] uppercase transition-all"
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
