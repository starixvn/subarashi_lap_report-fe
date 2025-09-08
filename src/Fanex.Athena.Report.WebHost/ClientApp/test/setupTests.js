import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util';
import { ExcludeTestDataOptions } from '@/pages/turnover/common/filter';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

if (global.TextEncoder === undefined) {
    global.TextEncoder = TextEncoder;
}

if (global.TextDecoder === undefined) {
    global.TextDecoder = TextDecoder;
}

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
global.alert = global.window.alert;

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
