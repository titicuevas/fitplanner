import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Pruebas básicas', () => {
    it('debería renderizar un texto simple', () => {
        render(<div>Hola Mundo</div>);
        expect(screen.getByText('Hola Mundo')).toBeInTheDocument();
    });

    it('debería sumar correctamente', () => {
        expect(1 + 1).toBe(2);
    });
}); 