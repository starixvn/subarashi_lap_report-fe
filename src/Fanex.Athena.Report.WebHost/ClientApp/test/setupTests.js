import '@testing-library/jest-dom'

// Suppress React Router future flag warnings in tests
const originalWarn = console.warn;
console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('React Router Future Flag Warning')) {
        return;
    }
    originalWarn(...args);
};

// Suppress React act warnings for suspended resources in tests
const originalError = console.error;
console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Warning: A suspended resource finished loading inside a test')) {
        return;
    }
    originalError(...args);
};

// Mock window.alert to prevent JSDOM "Not implemented" errors
global.window.alert = jest.fn();

// Mock axios globally to prevent interceptor errors in src/lib/axios.js
jest.mock('axios', () => {
    const mockAxios = {
        default: {
            interceptors: {
                request: { use: jest.fn() },
                response: { use: jest.fn() }
            },
            create: jest.fn(() => ({
                interceptors: {
                    request: { use: jest.fn() },
                    response: { use: jest.fn() }
                }
            })),
            get: jest.fn(() => Promise.resolve({ data: {} })),
            post: jest.fn(() => Promise.resolve({ data: {} })),
            put: jest.fn(() => Promise.resolve({ data: {} })),
            delete: jest.fn(() => Promise.resolve({ data: {} })),
            CancelToken: {
                source: jest.fn(() => ({
                    token: 'mock-cancel-token',
                    cancel: jest.fn()
                }))
            }
        },
        interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() }
        },
        get: jest.fn(() => Promise.resolve({ data: {} })),
        post: jest.fn(() => Promise.resolve({ data: {} })),
        put: jest.fn(() => Promise.resolve({ data: {} })),
        delete: jest.fn(() => Promise.resolve({ data: {} })),
        CancelToken: {
            source: jest.fn(() => ({
                token: 'mock-cancel-token',
                cancel: jest.fn()
            }))
        },
        HttpStatusCode: { 
            Unauthorized: 401,
            Forbidden: 403 
        }
    };
    return mockAxios;
});



