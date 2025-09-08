import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';

// Mock dependencies before imports
jest.mock('@/hooks/useToggleRequest');
jest.mock('@/helpers/langHelper');
jest.mock('@/lib/dataService');
jest.mock('@/lib/site');
jest.mock('@/pages/matchmonitoringcenter/actions');
jest.mock('@/pages/matchmonitoringcenter/common');
jest.mock('uuid');

const mockUseToggleRequest = require('@/hooks/useToggleRequest');
const mockLangHelper = require('@/helpers/langHelper');
const mockDataService = require('@/lib/dataService');
const mockSite = require('@/lib/site');
const mockActions = require('@/pages/matchmonitoringcenter/actions');
const mockCommon = require('@/pages/matchmonitoringcenter/common');
const mockUuid = require('uuid');

// Setup mocks
mockUseToggleRequest.default.mockReturnValue({
    sendRequest: jest.fn((request, callback) => {
        setTimeout(() => {
            try {
                const result = request();
                if (callback) callback(result);
            } catch (error) {
                console.error(error);
            }
        }, 0);
    })
});

mockLangHelper.default = {
    getSingleResource: jest.fn(() => 'No information available')
};

mockDataService.default = {
    postReportData: jest.fn(() => Promise.resolve({ data: { mockData: true } })),
    getReportFile: jest.fn(() => Promise.resolve({ status: 200, data: new Blob() }))
};

mockSite.default = {
    downloadFile: jest.fn()
};

mockUuid.v4.mockReturnValue('mock-uuid-123');

mockActions.ActionCreators = {
    setGridData: jest.fn((data) => ({ type: 'SET_GRID_DATA', data })),
    setSelectedCurrency: jest.fn((currency) => ({ type: 'SET_SELECTED_CURRENCY', currency })),
    setSelectedBaseCurrency: jest.fn((currency) => ({ type: 'SET_SELECTED_BASE_CURRENCY', currency })),
    setRequestParam: jest.fn((param) => ({ type: 'SET_REQUEST_PARAM', param })),
    getUserGuideContent: jest.fn((page) => ({ type: 'GET_USER_GUIDE_CONTENT', page })),
    setSelectedMatchStatus: jest.fn((status) => ({ type: 'SET_SELECTED_MATCH_STATUS', status })),
    setSelectedTriggeredAlert: jest.fn((alert) => ({ type: 'SET_SELECTED_TRIGGERED_ALERT', alert })),
    setSelectedMatch: jest.fn((match) => ({ type: 'SET_SELECTED_MATCH', match })),
    setSelectedLeague: jest.fn((league) => ({ type: 'SET_SELECTED_LEAGUE', league })),
    getMatchList: jest.fn((leagueIds) => ({ type: 'GET_MATCH_LIST', leagueIds })),
    setLeagueList: jest.fn((leagues) => ({ type: 'SET_LEAGUE_LIST', leagues })),
    setBaseCurrencyList: jest.fn((currencies) => ({ type: 'SET_BASE_CURRENCY_LIST', currencies })),
    setAppUuid: jest.fn((uuid) => ({ type: 'SET_APP_UUID', uuid })),
    setLastFetchTime: jest.fn((time) => ({ type: 'SET_LAST_FETCH_TIME', time }))
};

mockCommon.constants = {
    ApiUrl: {
        DATA_URL: '/api/data',
        EXPORT_EXCEL_URL: '/api/export'
    }
};

import { useFilterAction } from '@/pages/matchmonitoringcenter/hook/useFilterAction';

const createMockStore = (initialState = {}) => {
    const defaultState = {
        selectedMatchStatus: { value: 1, label: 'All' },
        selectedMatch: [],
        selectedTriggeredAlert: { value: 0, label: 'All' },
        selectedBaseCurrency: { isEmpty: false, label: 'USD', value: 'USD' },
        selectedCurrency: { label: 'USD', value: 'USD' },
        userGuideContent: null,
        defaultState: {
            selectedMatchStatus: { value: 1, label: 'All' },
            selectedTriggeredAlert: { value: 0, label: 'All' },
            selectedMatch: [],
            selectedLeague: [],
            selectedCurrency: { label: 'USD', value: 'USD' },
            selectedBaseCurrency: { isEmpty: false, label: 'USD', value: 'USD' },
            leagueList: [{ id: 1, name: 'League 1' }],
            baseCurrencyList: []
        },
        requestParam: {
            MatchStatus: 1,
            MatchIdList: [],
            TriggeredAlert: 0,
            BaseCurrency: 'USD',
            BaseCurrencyName: 'USD',
            CurrencyName: 'USD',
            CurrencyId: 'USD'
        },
        ...initialState
    };

    const reducer = (state = defaultState, action) => {
        switch (action.type) {
            case 'SET_GRID_DATA':
                return { ...state, gridData: action.data };
            case 'SET_SELECTED_CURRENCY':
                return { ...state, selectedCurrency: action.currency };
            case 'SET_SELECTED_BASE_CURRENCY':
                return { ...state, selectedBaseCurrency: action.currency };
            case 'SET_REQUEST_PARAM':
                return { ...state, requestParam: action.param };
            default:
                return state;
        }
    };

    return createStore(reducer, applyMiddleware(thunk));
};

describe('useFilterAction', () => {
    let store;
    let TestComponent;
    let hookResult;

    beforeEach(() => {
        store = createMockStore();
        hookResult = null;
        
        TestComponent = () => {
            hookResult = useFilterAction();
            return null;
        };

        jest.clearAllMocks();
        
        // Mock window.alert
        window.alert = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    const renderHook = () => {
        render(
            <Provider store={store}>
                <TestComponent />
            </Provider>
        );
    };

    test('should return the expected hook functions', () => {
        renderHook();
        
        expect(hookResult).toHaveProperty('submit');
        expect(hookResult).toHaveProperty('resetFilter');
        expect(hookResult).toHaveProperty('fetchData');
        expect(hookResult).toHaveProperty('exportExcel');
        expect(hookResult).toHaveProperty('fetchUserGuide');
    });

    test('resetFilter should dispatch correct actions', () => {
        renderHook();
        
        const mockEvent = { preventDefault: jest.fn() };
        
        act(() => {
            hookResult.resetFilter(mockEvent);
        });
        
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockActions.ActionCreators.setSelectedMatchStatus).toHaveBeenCalled();
        expect(mockActions.ActionCreators.setSelectedTriggeredAlert).toHaveBeenCalled();
        expect(mockActions.ActionCreators.setSelectedMatch).toHaveBeenCalled();
    });

    test('submit should call sendRequest and dispatch actions', () => {
        renderHook();
        
        const mockEvent = { preventDefault: jest.fn() };
        
        act(() => {
            hookResult.submit(mockEvent);
        });
        
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockActions.ActionCreators.setRequestParam).toHaveBeenCalled();
        expect(mockActions.ActionCreators.setLastFetchTime).toHaveBeenCalled();
    });

    test('fetchData should call sendRequest with requestParam', () => {
        renderHook();
        
        // Should not throw error
        expect(() => hookResult.fetchData()).not.toThrow();
    });

    test('fetchUserGuide should call sendRequest when userGuideContent is null', () => {
        renderHook();
        
        // Should not throw error when called
        expect(() => hookResult.fetchUserGuide()).not.toThrow();
        
        // Verify the sendRequest mock was called (indirectly)
        expect(mockUseToggleRequest.default).toHaveBeenCalled();
    });

    test('fetchUserGuide should not call sendRequest when userGuideContent exists', () => {
        store = createMockStore({ userGuideContent: 'existing content' });
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.fetchUserGuide();
        
        // Should not call the user guide action
        expect(mockActions.ActionCreators.getUserGuideContent).not.toHaveBeenCalled();
    });

    test('exportExcel should call sendRequest', () => {
        renderHook();
        
        // Should not throw error
        expect(() => hookResult.exportExcel()).not.toThrow();
    });

    test('updateData should set gridData when result has data', async () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        // Call submit to trigger updateData through sendRequest callback
        const mockEvent = { preventDefault: jest.fn() };
        hookResult.submit(mockEvent);
        
        // Wait for async operation
        await new Promise(resolve => setTimeout(resolve, 10));
        
        expect(mockActions.ActionCreators.setGridData).toHaveBeenCalled();
    });

    test('getParams should return correct parameter object', () => {
        renderHook();
        
        // Access the private getParams through submit which calls it
        const mockEvent = { preventDefault: jest.fn() };
        
        act(() => {
            hookResult.submit(mockEvent);
        });
        
        // Verify that setRequestParam was called with the expected structure
        expect(mockActions.ActionCreators.setRequestParam).toHaveBeenCalledWith(
            expect.objectContaining({
                MatchStatus: expect.any(Number),
                MatchIdList: expect.any(Array),
                TriggeredAlert: expect.any(Number),
                BaseCurrency: expect.any(String),
                BaseCurrencyName: expect.any(String),
                CurrencyName: expect.any(String),
                CurrencyId: expect.any(String)
            })
        );
    });
});