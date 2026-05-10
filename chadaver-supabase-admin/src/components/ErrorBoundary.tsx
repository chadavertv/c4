import React from 'react';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message?: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-3xl p-8 text-white">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6">
            <h1 className="text-2xl font-semibold">Something broke</h1>
            <p className="mt-2 text-sm text-red-100/80">{this.state.message}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
