import '@testing-library/jest-dom';

// Mock para las llamadas a la API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
  })
);

// Mock para localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock para window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock para route helper
global.route = jest.fn((name) => `/${name}`);

// Mock para las imágenes
export const mockImage = {
    src: '',
    onload: null,
    onerror: null,
    set src(value) {
        this._src = value;
        if (value) {
            this.onload?.();
        } else {
            this.onerror?.();
        }
    },
    get src() {
        return this._src;
    }
};

global.Image = jest.fn(() => mockImage); 