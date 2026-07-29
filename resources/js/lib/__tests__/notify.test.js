import axios from 'axios';
import { getErrorMessage } from '../getErrorMessage';

describe('getErrorMessage', () => {
    it('devuelve el message del response de axios', () => {
        const error = new axios.AxiosError('Request failed');
        error.response = {
            status: 422,
            data: { message: 'Datos inválidos' },
            statusText: 'Unprocessable Entity',
            headers: {},
            config: { headers: {} },
        };

        expect(getErrorMessage(error)).toBe('Datos inválidos');
    });

    it('extrae el primer error de validación', () => {
        const error = new axios.AxiosError('Request failed');
        error.response = {
            status: 422,
            data: { errors: { score: ['La puntuación debe estar entre 1 y 10.'] } },
            statusText: 'Unprocessable Entity',
            headers: {},
            config: { headers: {} },
        };

        expect(getErrorMessage(error)).toBe('La puntuación debe estar entre 1 y 10.');
    });

    it('mapea códigos HTTP conocidos', () => {
        const error = new axios.AxiosError('Unauthorized');
        error.response = {
            status: 401,
            data: {},
            statusText: 'Unauthorized',
            headers: {},
            config: { headers: {} },
        };

        expect(getErrorMessage(error)).toBe('Tu sesión ha expirado. Vuelve a iniciar sesión.');
    });

    it('usa el fallback por defecto', () => {
        expect(getErrorMessage(null)).toBe('Ha ocurrido un error. Inténtalo de nuevo.');
        expect(getErrorMessage({}, 'Custom')).toBe('Custom');
    });
});
