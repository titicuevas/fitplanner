import '@testing-library/jest-dom';

// Mock de Inertia
global.Inertia = {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
};

// Mock de window.URL.createObjectURL
global.URL.createObjectURL = jest.fn();

// Mock de window.URL.revokeObjectURL
global.URL.revokeObjectURL = jest.fn(); 