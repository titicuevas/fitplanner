export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.(js|jsx)$': ['babel-jest', {
            presets: [
                ['@babel/preset-env', { targets: { node: 'current' } }],
                '@babel/preset-react'
            ]
        }]
    },
    testMatch: [
        '<rootDir>/resources/js/**/__tests__/**/*.{js,jsx}',
        '<rootDir>/resources/js/**/*.{spec,test}.{js,jsx}'
    ],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        '/node_modules/(?!(axios|@inertiajs)/)'
    ]
}; 