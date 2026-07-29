type LoadingSpinnerProps = {
    label?: string;
    centered?: boolean;
};

export default function LoadingSpinner({
    label = 'Cargando...',
    centered = true,
}: LoadingSpinnerProps) {
    return (
        <div className={centered ? 'flex items-center justify-center py-12' : 'flex items-center py-6'}>
            <div
                className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"
                role="status"
                aria-label={label}
            />
            <span className="ml-3 text-gray-600 dark:text-gray-300">{label}</span>
        </div>
    );
}
