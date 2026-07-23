import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// A simple safety net: if a component throws during render, show a friendly
// fallback instead of a blank white screen. Logged to the console for now —
// wire up a real error-reporting service (Sentry, etc.) before launch.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary] Unhandled error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 text-center bg-background text-foreground">
          <div>
            <h1 className="text-3xl font-black uppercase mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Something went wrong
            </h1>
            <p className="text-muted-foreground mb-6">
              Please refresh the page. If this keeps happening, contact hello@vistarent.co.ke.
            </p>
            <button
              onClick={() => window.location.assign("/")}
              className="inline-flex items-center justify-center gap-2 font-semibold rounded bg-primary text-primary-foreground hover:opacity-90 transition-all duration-150 cursor-pointer px-5 py-2.5 text-sm"
            >
              Back to home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
