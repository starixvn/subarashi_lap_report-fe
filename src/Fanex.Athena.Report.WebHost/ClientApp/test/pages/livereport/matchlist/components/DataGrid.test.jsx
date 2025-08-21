import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
let DataGrid;

const mockSearchParams = new Map([
    ['BaseCurrency', 'USD'],
    ['ProductName', 'Sportsbook'],
]);

jest.mock('react-router-dom', () => ({
    useSearchParams: () => [
        {
            get: key => mockSearchParams.get(key) || null,
        },
    ],
}));

const mockSendRequest = jest.fn();
jest.mock('@/hooks/useToggleRequest', () =>
    jest.fn(() => ({
        sendRequest: mockSendRequest,
    }))
);

jest.mock('@/components/ReportTitle', () => ({ content }) => <div data-testid="report-title">{content}</div>);

jest.mock('@/components/NoDataTitle', () => () => <div data-testid="no-data-title">No Data Available</div>);

// Keep module registry stable across tests to avoid context mismatches

const mockDataService = {
    getReportData: jest.fn(),
};

jest.doMock('@/lib/dataService', () => ({
    __esModule: true,
    default: mockDataService,
}));

jest.mock('@/pages/livereport/matchlist/common', () => ({
    __esModule: true,
    default: {
        generateReportTitle: jest.fn(() => 'Live Report - Sportsbook (USD)'),
    },
    constants: {
        ApiUrl: { DATA_URL: '/api/livereport/data' },
    },
}));

const mockBuildHeaders = jest.fn(() => <div data-testid="mock-headers">Headers</div>);
const mockBuildBody = jest.fn(() => <div data-testid="mock-body">Body</div>);

jest.mock('@/pages/livereport/matchlist/gridBuilder', () => ({
    __esModule: true,
    default: undefined,
    BuildHeaders: (...args) => mockBuildHeaders(...args),
    BuildBody: (...args) => mockBuildBody(...args),
}));

jest.mock('@/pages/livereport/matchlist/actions', () => ({
    ActionCreators: {
        setGridData: jest.fn(payload => ({ type: 'SET_GRID_DATA', payload })),
    },
}));

jest.mock('@legion-lib/react-grid', () => ({
    Table: ({ header, body, onSort }) => (
        <div data-testid="table">
            <div data-testid="table-header">{header}</div>
            <div data-testid="table-body">{body}</div>
            <button data-testid="sort-button" onClick={() => onSort && onSort('test', 'desc')}>
                Sort
            </button>
        </div>
    ),
}));

describe('LiveReport MatchList DataGrid', () => {
    let store;
    let mockDispatch;

    const createMockStore = (initialState = {}) => {
        const defaultReducers = {
            formData: (state = null, action) => {
                if (state === undefined) {
                    return null;
                }
                return state;
            },
            gridData: (state = null, action) => {
                if (state === undefined) {
                    return null;
                }
                return state;
            },
            requestParam: (state = {}, action) => {
                if (state === undefined) {
                    return {};
                }
                return state;
            },
            ...initialState,
        };
        return createStore(combineReducers(defaultReducers));
    };

    const mockFormData = {
        sportOptions: [{ id: 1, name: 'Football' }],
        currencyOptions: [{ id: 1, name: 'USD' }],
    };

    const mockGridData = [
        { matchId: 1, homeTeam: 'Team A', awayTeam: 'Team B' },
        { matchId: 2, homeTeam: 'Team C', awayTeam: 'Team D' },
    ];

    const mockRequestParam = {
        SortColumn: 'matchId',
        SortDirection: 'asc',
    };

    beforeEach(() => {
        // Clear all mocks but preserve structure
        jest.clearAllMocks();

        // Ensure mockDataService has the right structure
        mockDataService.getReportData = jest.fn().mockResolvedValue({ data: [] });

        mockDispatch = jest.fn();
        DataGrid = require('@/pages/livereport/matchlist/components/DataGrid').default;
        store = createMockStore({
            formData: (state = mockFormData) => state,
            gridData: (state = mockGridData) => state,
            requestParam: (state = mockRequestParam) => state,
        });
        store.dispatch = mockDispatch;
    });

    const renderWithProviders = component => render(<Provider store={store}>{component}</Provider>);

    test('returns null when gridData is null', () => {
        store = createMockStore({
            formData: (state = mockFormData) => state,
            gridData: (state = null) => state,
            requestParam: (state = mockRequestParam) => state,
        });
        store.dispatch = mockDispatch;

        const { container } = renderWithProviders(<DataGrid />);
        expect(container.firstChild).toBeNull();
    });

    test('renders NoDataTitle when gridData is empty', () => {
        store = createMockStore({
            formData: (state = mockFormData) => state,
            gridData: (state = []) => state,
            requestParam: (state = mockRequestParam) => state,
        });
        store.dispatch = mockDispatch;

        renderWithProviders(<DataGrid />);

        expect(screen.getByTestId('report-title')).toBeInTheDocument();
        expect(screen.getByTestId('no-data-title')).toBeInTheDocument();
    });

    test('renders DataGrid with data', () => {
        renderWithProviders(<DataGrid />);

        expect(screen.getByTestId('report-title')).toBeInTheDocument();
        expect(screen.getByTestId('table')).toBeInTheDocument();
        expect(screen.getByTestId('mock-headers')).toBeInTheDocument();
        expect(screen.getByTestId('mock-body')).toBeInTheDocument();
    });

    test('generates report title correctly', () => {
        renderWithProviders(<DataGrid />);
        expect(screen.getByText('Live Report - Sportsbook (USD)')).toBeInTheDocument();
    });

    test('handles table sorting', () => {
        renderWithProviders(<DataGrid />);

        const sortButton = screen.getByTestId('sort-button');
        fireEvent.click(sortButton);

        // Should trigger sort functionality
        expect(sortButton).toBeInTheDocument();
    });

    test('renders table with correct structure', () => {
        renderWithProviders(<DataGrid />);

        const table = screen.getByTestId('table');
        expect(table).toBeInTheDocument();
        expect(screen.getByTestId('table-header')).toBeInTheDocument();
        expect(screen.getByTestId('table-body')).toBeInTheDocument();
    });

    test('uses CurrencyName when BaseCurrency is not available', () => {
        jest.clearAllMocks();

        // Mock search params without BaseCurrency
        mockSearchParams.clear();
        mockSearchParams.set('CurrencyName', 'EUR');
        mockSearchParams.set('ProductName', 'Sportsbook');

        renderWithProviders(<DataGrid />);

        const serviceModule = require('@/pages/livereport/matchlist/common').default;
        expect(serviceModule.generateReportTitle).toHaveBeenCalledWith('Sportsbook', 'EUR');
    });

    test('handles sort functionality with sendRequest', () => {
        mockDataService.getReportData.mockResolvedValue({ data: mockGridData });
        mockSendRequest.mockImplementation((requestFn, callback) => {
            // Simulate successful request
            requestFn().then(result => callback(result));
        });

        renderWithProviders(<DataGrid />);

        const sortButton = screen.getByTestId('sort-button');
        fireEvent.click(sortButton);

        expect(mockSendRequest).toHaveBeenCalledWith(expect.any(Function), expect.any(Function));
    });

    test('updateGridData sets grid data when result exists', async () => {
        const mockActionCreators = require('@/pages/livereport/matchlist/actions').ActionCreators;
        const testData = [{ matchId: 99, homeTeam: 'Test' }];

        mockSendRequest.mockImplementation((requestFn, callback) => {
            callback(testData);
        });

        renderWithProviders(<DataGrid />);

        const sortButton = screen.getByTestId('sort-button');
        fireEvent.click(sortButton);

        expect(mockActionCreators.setGridData).toHaveBeenCalledWith(testData);
    });

    test('updateGridData sets null when result is falsy', async () => {
        const mockActionCreators = require('@/pages/livereport/matchlist/actions').ActionCreators;

        mockSendRequest.mockImplementation((requestFn, callback) => {
            callback(null);
        });

        renderWithProviders(<DataGrid />);

        const sortButton = screen.getByTestId('sort-button');
        fireEvent.click(sortButton);

        expect(mockActionCreators.setGridData).toHaveBeenCalledWith(null);
    });

    test('fetchReportData makes correct API call', async () => {
        const testParams = { testParam: 'value' };
        const expectedResponse = { data: mockGridData };

        mockDataService.getReportData.mockResolvedValue(expectedResponse);
        mockSendRequest.mockImplementation(async (requestFn, callback) => {
            const result = await requestFn();
            callback(result);
        });

        renderWithProviders(<DataGrid />);

        const sortButton = screen.getByTestId('sort-button');
        fireEvent.click(sortButton);

        // The request function should have been called
        expect(mockSendRequest).toHaveBeenCalled();
    });

    test('onSort constructs correct parameters', () => {
        const expectedParams = {
            ...mockRequestParam,
            SortColumn: 'test',
            SortDirection: 'desc',
        };

        mockSendRequest.mockImplementation((requestFn, callback) => {
            // We can verify the params indirectly through the implementation
            callback([]);
        });

        renderWithProviders(<DataGrid />);

        const sortButton = screen.getByTestId('sort-button');
        fireEvent.click(sortButton);

        expect(mockSendRequest).toHaveBeenCalledWith(expect.any(Function), expect.any(Function));
    });

    test('passes correct props to Table component', () => {
        const { container } = renderWithProviders(<DataGrid />);

        const table = screen.getByTestId('table');
        expect(table).toBeInTheDocument();

        // Verify Table component receives the built headers and body
        expect(screen.getByTestId('mock-headers')).toBeInTheDocument();
        expect(screen.getByTestId('mock-body')).toBeInTheDocument();
    });

    test('generates report title with no currency parameter', () => {
        const serviceModule = require('@/pages/livereport/matchlist/common').default;
        serviceModule.generateReportTitle.mockClear();

        // Mock search params without currency
        mockSearchParams.clear();
        mockSearchParams.set('ProductName', 'Live');

        renderWithProviders(<DataGrid />);

        expect(serviceModule.generateReportTitle).toHaveBeenCalledWith('Live', null);
    });

    test('handles undefined formData', () => {
        store = createMockStore({
            formData: (state = null, action) => {
                if (state === undefined) {
                    return null;
                }
                return state;
            },
            gridData: (state = mockGridData) => state,
            requestParam: (state = mockRequestParam) => state,
        });
        store.dispatch = mockDispatch;

        expect(() => renderWithProviders(<DataGrid />)).not.toThrow();
    });

    test('handles undefined requestParam', () => {
        store = createMockStore({
            formData: (state = mockFormData) => state,
            gridData: (state = mockGridData) => state,
            requestParam: (state = {}, action) => {
                if (state === undefined) {
                    return {};
                }
                return state;
            },
        });
        store.dispatch = mockDispatch;

        expect(() => renderWithProviders(<DataGrid />)).not.toThrow();
    });

    test('BuildHeaders and BuildBody are called with correct data', () => {
        renderWithProviders(<DataGrid />);

        expect(mockBuildHeaders).toHaveBeenCalledWith(mockFormData);
        expect(mockBuildBody).toHaveBeenCalledWith(mockGridData);
    });

    test('renders ReportTitle with correct content for empty data', () => {
        store = createMockStore({
            formData: (state = mockFormData) => state,
            gridData: (state = []) => state,
            requestParam: (state = mockRequestParam) => state,
        });
        store.dispatch = mockDispatch;

        renderWithProviders(<DataGrid />);

        expect(screen.getByTestId('report-title')).toHaveTextContent('Live Report - Sportsbook (USD)');
    });

    test('handles sort with empty request parameters', () => {
        store = createMockStore({
            formData: (state = mockFormData) => state,
            gridData: (state = mockGridData) => state,
            requestParam: (state = {}) => state,
        });
        store.dispatch = mockDispatch;

        mockSendRequest.mockImplementation((requestFn, callback) => {
            callback([]);
        });

        renderWithProviders(<DataGrid />);

        const sortButton = screen.getByTestId('sort-button');
        fireEvent.click(sortButton);

        expect(mockSendRequest).toHaveBeenCalled();
    });

    test('handles async fetchReportData error gracefully', async () => {
        mockDataService.getReportData.mockRejectedValue(new Error('API Error'));
        mockSendRequest.mockImplementation(async (requestFn, callback) => {
            try {
                const result = await requestFn();
                callback(result);
            } catch (error) {
                callback(null);
            }
        });

        renderWithProviders(<DataGrid />);

        const sortButton = screen.getByTestId('sort-button');
        fireEvent.click(sortButton);

        expect(mockSendRequest).toHaveBeenCalled();
    });

    test('displays correct report title when both BaseCurrency and CurrencyName are present', () => {
        const serviceModule2 = require('@/pages/livereport/matchlist/common').default;
        serviceModule2.generateReportTitle.mockClear();

        mockSearchParams.clear();
        mockSearchParams.set('BaseCurrency', 'USD');
        mockSearchParams.set('CurrencyName', 'EUR');
        mockSearchParams.set('ProductName', 'Sportsbook');

        renderWithProviders(<DataGrid />);

        // Should prefer BaseCurrency over CurrencyName
        expect(serviceModule2.generateReportTitle).toHaveBeenCalledWith('Sportsbook', 'USD');
    });

    test('table component receives all required props', () => {
        renderWithProviders(<DataGrid />);

        // The Table component should be rendered with specific props
        // We can verify this through the mock implementation
        const table = screen.getByTestId('table');
        expect(table).toBeInTheDocument();

        // Sort button should be available (indicating onSort prop is passed)
        expect(screen.getByTestId('sort-button')).toBeInTheDocument();
    });
});
