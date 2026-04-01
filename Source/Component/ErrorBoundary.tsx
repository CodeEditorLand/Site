import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

/**
 * React Error Boundary that catches render errors in child components.
 * Shows a flat, styled fallback UI consistent with the design system.
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

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	HandleRetry = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="flex min-h-[200px] items-center justify-center p-8">
					<div className="w-full max-w-md border border-[var(--Border)] bg-white p-8 text-center">
						<h2 className="mb-2 text-xl font-semibold text-[var(--Foreground)]">
							Something went wrong
						</h2>
						<p className="mb-6 text-sm text-[var(--MuteForeground)]">
							An unexpected error occurred. Please try again.
						</p>
						<button
							type="button"
							onClick={this.HandleRetry}
							className="inline-flex h-9 items-center justify-center border border-[var(--Border)] bg-[var(--Primary)] px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90">
							Try again
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
