import NProgress from 'nprogress';
import { router } from '@inertiajs/react';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';

export default function Progress() {
    useEffect(() => {
        NProgress.configure({ showSpinner: false });

        const handleStart = () => NProgress.start();
        const handleFinish = () => NProgress.done();

        const removeStart = router.on('start', handleStart);
        const removeFinish = router.on('finish', handleFinish);

        return () => {
            removeStart();
            removeFinish();
            NProgress.done();
            NProgress.remove();
        };
    }, []);

    return null;
}
