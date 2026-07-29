import Swal from 'sweetalert2/dist/sweetalert2.js';

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
