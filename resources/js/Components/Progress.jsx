import NProgress from 'nprogress';
import { router } from '@inertiajs/react';
import '../../../node_modules/nprogress/nprogress.css';

export default function Progress() {
    NProgress.configure({ showSpinner: false });

    router.on('start', () => {
        NProgress.start();
    });

    router.on('finish', () => {
        NProgress.done();
    });

    return null;
} 