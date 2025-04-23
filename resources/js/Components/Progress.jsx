import NProgress from 'nprogress/nprogress';
import { router } from '@inertiajs/react';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';

export default function Progress() {
    useEffect(() => {
        NProgress.configure({ showSpinner: false });

        const handleStart = () => NProgress.start();
        const handleFinish = () => NProgress.done();

        router.on('start', handleStart);
        router.on('finish', handleFinish);

        return () => {
            router.off?.('start', handleStart);
            router.off?.('finish', handleFinish);

            NProgress.done();
            NProgress.remove();
        };
    }, []);

    return null;
} 