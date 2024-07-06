import { Component, ErrorInfo, Fragment, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    return this.state.error ? (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
        <h1 className="text-4xl font-bold mb-4">Oops... Something went wrong!</h1>
        <h2 className="text-2xl text-red-600 mb-2">{this.state.error.name}</h2>
        <p className="mb-4">{this.state.error.message}</p>
        <details className="bg-gray-200 p-4 rounded-md shadow-md w-full max-w-2xl">
          <summary className="cursor-pointer">Details</summary>
          <p className="whitespace-pre-wrap mt-2">{this.state.error.stack}</p>
        </details>
      </div>
    ) : (
      <Fragment>{this.props.children}</Fragment>
    );
  }
}

export default ErrorBoundary;
