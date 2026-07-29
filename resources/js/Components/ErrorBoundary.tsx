import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren<{
    fallback?: ReactNode;
}>;

type State = {
    hasError: boolean;
    message: string;
};

export default class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
        message: '',
    };

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            message: error.message || 'Ha ocurrido un error inesperado.',
        };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('ErrorBoundary:', error, info.componentStack);
    }

    private handleReload = () => {
        window.location.reload();
    };

    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        if (this.props.fallback) {
            return this.props.fallback;
        }

        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
                <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg dark:bg-gray-800">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Algo ha fallado</h1>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                        {this.state.message}
                    </p>
                    <button
                        type="button"
                        onClick={this.handleReload}
                        className="mt-6 inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        Recargar página
                    </button>
                </div>
            </div>
        );
    }
}
