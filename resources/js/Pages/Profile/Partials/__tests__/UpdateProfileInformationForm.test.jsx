import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UpdateProfileInformationForm from '../UpdateProfileInformationForm';

// Mock de Inertia
const mockUsePage = jest.fn();
jest.mock('@inertiajs/react', () => ({
    usePage: () => mockUsePage(),
    useForm: () => ({
        data: {
            name: 'Test User',
            email: 'test@example.com',
            photo: null,
        },
        setData: jest.fn(),
        patch: jest.fn(),
        errors: {},
        processing: false,
        recentlySuccessful: false,
        reset: jest.fn(),
    }),
    Inertia: {
        post: jest.fn()
    }
}));

describe('UpdateProfileInformationForm', () => {
    const user = {
        name: 'Test User',
        email: 'test@example.com',
        profile_photo_path: null,
    };

    beforeEach(() => {
        mockUsePage.mockReturnValue({
            props: {
                auth: {
                    user: {
                        name: 'Test User',
                        email: 'test@example.com',
                        profile_photo_path: null,
                    }
                },
                flash: {}
            }
        });
    });

    it('renders user information correctly', () => {
        render(<UpdateProfileInformationForm />);
        
        expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
        expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    });

    it('handles photo upload', () => {
        render(<UpdateProfileInformationForm />);
        
        const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
        const input = screen.getByRole('button', { name: /cambiar foto/i });
        
        expect(input).toBeInTheDocument();
    });

    it('displays success message', () => {
        mockUsePage.mockReturnValue({
            props: {
                auth: {
                    user: {
                        name: 'Test User',
                        email: 'test@example.com',
                        profile_photo_path: null,
                    }
                },
                flash: { message: 'Perfil actualizado correctamente' }
            }
        });

        render(<UpdateProfileInformationForm />);
        expect(screen.getByText('Perfil actualizado correctamente')).toBeInTheDocument();
    });

    it('displays error message', () => {
        mockUsePage.mockReturnValue({
            props: {
                auth: {
                    user: {
                        name: 'Test User',
                        email: 'test@example.com',
                        profile_photo_path: null,
                    }
                },
                flash: { error: 'Error al actualizar el perfil' }
            }
        });

        render(<UpdateProfileInformationForm />);
        expect(screen.getByText('Error al actualizar el perfil')).toBeInTheDocument();
    });
}); 