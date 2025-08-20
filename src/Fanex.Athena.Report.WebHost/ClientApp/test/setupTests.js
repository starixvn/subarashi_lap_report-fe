import '@testing-library/jest-dom'

// Suppress React Router future flag warnings in tests
const originalWarn = console.warn;
console.warn = (...args) => {
    if (args[0]?.includes('React Router Future Flag Warning')) {
        return;
    }
    originalWarn(...args);
};

// Suppress React act warnings for suspended resources in tests
const originalError = console.error;
console.error = (...args) => {
    if (args[0]?.includes('Warning: A suspended resource finished loading inside a test')) {
        return;
    }
    originalError(...args);
};

