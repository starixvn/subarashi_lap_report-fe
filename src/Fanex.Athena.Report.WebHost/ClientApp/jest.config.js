const skipTests = process.env.SKIP_TESTS === '1' || process.env.SKIP_TESTS === 'true';

module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src', '<rootDir>/test'],
    moduleFileExtensions: ['js', 'jsx', 'json'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|scss)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png|woff2?)$': '<rootDir>/test/fileMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
    testMatch: skipTests ? ['^$'] : ['**/?(*.)+(spec|test).[jt]s?(x)'],
    passWithNoTests: skipTests,
};
