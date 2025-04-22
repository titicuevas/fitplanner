import React, { useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function Progress() {
    useEffect(() => {
        const showProgress = () => {
            // Aquí puedes agregar tu propia lógica de progreso
            // Por ejemplo, mostrar un spinner o una barra de progreso personalizada
        };

        const hideProgress = () => {
            // Aquí puedes ocultar tu indicador de progreso
        };

        router.on('start', showProgress);
        router.on('finish', hideProgress);

        return () => {
            router.off('start', showProgress);
            router.off('finish', hideProgress);
        };
    }, []);

    return null;
} 