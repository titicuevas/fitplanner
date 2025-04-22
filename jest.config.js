export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
            presets: [
                ['@babel/preset-env', { targets: { node: 'current' } }],
                '@babel/preset-react',
                '@babel/preset-typescript'
            ]
        }]
    },
    testMatch: [
        '<rootDir>/resources/js/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/resources/js/**/*.{spec,test}.{js,jsx,ts,tsx}'
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    transformIgnorePatterns: [
        '/node_modules/(?!(axios|@inertiajs)/)'
    ]
}; 