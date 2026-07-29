import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Progress from './Components/Progress';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const pages = import.meta.glob([
            './Pages/**/*.tsx',
            './Pages/**/*.jsx',
            '!./Pages/**/*.test.{jsx,tsx}',
            '!./Pages/**/__tests__/**',
        ]);

        const pagePath = pages[`./Pages/${name}.tsx`]
            ? `./Pages/${name}.tsx`
            : `./Pages/${name}.jsx`;

        return resolvePageComponent(pagePath, pages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <>
                <Progress />
                <App {...props} />
            </>
        );
    },
    progress: false
});
