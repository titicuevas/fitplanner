import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';

export function getErrorMessage(error: unknown, fallback = 'Ha ocurrido un error. Inténtalo de nuevo.') {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as
            | { message?: string; error?: string; errors?: Record<string, string[] | string> }
            | undefined;

        if (data?.message) return data.message;
        if (data?.error) return data.error;

        if (data?.errors) {
            const first = Object.values(data.errors)[0];
            if (Array.isArray(first) && first[0]) return first[0];
            if (typeof first === 'string') return first;
        }

        if (error.response?.status === 401) return 'Tu sesión ha expirado. Vuelve a iniciar sesión.';
        if (error.response?.status === 403) return 'No tienes permiso para realizar esta acción.';
        if (error.response?.status === 404) return 'No se encontró el recurso solicitado.';
        if (error.response?.status === 422) return 'Revisa los datos enviados.';
        if ((error.response?.status ?? 0) >= 500) return 'Error del servidor. Inténtalo más tarde.';
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return fallback;
}

export function showSuccessToast(title: string, text: string) {
    return Swal.fire({
        icon: 'success',
        title,
        text,
        confirmButtonColor: '#10B981',
        timer: 2200,
        timerProgressBar: true,
        showConfirmButton: false,
        position: 'top-end',
        toast: true,
    });
}

export function showErrorToast(message: string) {
    return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#EF4444',
        timer: 3200,
        timerProgressBar: true,
        showConfirmButton: false,
        position: 'top-end',
        toast: true,
    });
}

export function showSuccessMessage(message: string) {
    return Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: message,
        confirmButtonColor: '#10B981',
        timer: 2200,
        timerProgressBar: true,
    });
}

export function showErrorMessage(message: string) {
    return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#EF4444',
    });
}

export function showApiError(error: unknown, fallback?: string) {
    return showErrorMessage(getErrorMessage(error, fallback));
}
