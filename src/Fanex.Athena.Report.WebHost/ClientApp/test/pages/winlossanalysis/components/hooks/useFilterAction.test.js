import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Mock dependencies before imports
jest.mock('@/hooks/useBaseCurrencyForMultiSelectCurrency');
jest.mock('@/hooks/useSubsidiarySearch');
jest.mock('react-router-dom');
jest.mock('@/pages/winlossanalysis/components/hooks/useValidParam');
jest.mock('@/helpers/langHelper');
jest.mock('@/lib/site');
jest.mock('@/lib/stringHelper');
jest.mock('@/pages/winlossanalysis/actions/index.js');
jest.mock('@/pages/winlossanalysis/common/Service.js');
jest.mock('uuid');

const mockUseBaseCurrency = require('@/hooks/useBaseCurrencyForMultiSelectCurrency');
const mockUseSubsidiary = require('@/hooks/useSubsidiarySearch');
const mockRouterDom = require('react-router-dom');
const mockUseValidParam = require('@/pages/winlossanalysis/components/hooks/useValidParam');
const mockLangHelper = require('@/helpers/langHelper');
const mockSite = require('@/lib/site');
const mockStringHelper = require('@/lib/stringHelper');
const mockActions = require('@/pages/winlossanalysis/actions/index.js');
const mockService = require('@/pages/winlossanalysis/common/Service.js');
const mockUuid = require('uuid');

// Setup mocks
mockUseBaseCurrency.default.mockReturnValue({
    baseCurrencyList: [{ value: 'USD', label: 'USD' }]
});

mockUseSubsidiary.default.mockReturnValue({
    isSubsidiarySearch: false,
    defaultSelectedSubsidiary: []
});

mockRouterDom.useRouteLoaderData.mockReturnValue({
    IsSelfMode: true
});

mockUseValidParam.useValidParam.mockReturnValue(true);

mockLangHelper.default = {
    getSingleResource: jest.fn((key) => key)
};

mockSite.default = {
    convertDateToString: jest.fn((date) => {
        if (date && typeof date.toISOString === 'function') {
            return date.toISOString().split('T')[0];
        }
        return '2023-01-01'; // fallback date string
    }),
    getLrfSubsidiary: jest.fn(() => ({
        SubsidiarySearch: false,
        SubsidiaryList: []
    }))
};

mockStringHelper.default = {
    addSpaceAfterComma: jest.fn((str) => str)
};

mockUuid.v4.mockReturnValue('mock-uuid-456');

mockActions.ActionCreators = {
    setReportTitle: jest.fn((title) => ({ type: 'SET_REPORT_TITLE', title })),
    setRequestParam: jest.fn((param) => ({ type: 'SET_REQUEST_PARAM', param })),
    toggleLoader: jest.fn((loading) => ({ type: 'TOGGLE_LOADER', loading })),
    getReportData: jest.fn((params) => ({ type: 'GET_REPORT_DATA', params })),
    setDateRange: jest.fn((range) => ({ type: 'SET_DATE_RANGE', range })),
    setSelectedProducts: jest.fn((products) => ({ type: 'SET_SELECTED_PRODUCTS', products })),
    setSelectedCurrency: jest.fn((currency) => ({ type: 'SET_SELECTED_CURRENCY', currency })),
    setSelectedPlatform: jest.fn((platform) => ({ type: 'SET_SELECTED_PLATFORM', platform })),
    setSelectedStatus: jest.fn((status) => ({ type: 'SET_SELECTED_STATUS', status })),
    setSelectedLiveStatus: jest.fn((status) => ({ type: 'SET_SELECTED_LIVE_STATUS', status })),
    setSelectedBaseCurrency: jest.fn((currency) => ({ type: 'SET_SELECTED_BASE_CURRENCY', currency })),
    setSelectedVipOnly: jest.fn((vip) => ({ type: 'SET_SELECTED_VIP_ONLY', vip })),
    setSelectedCustomerClass: jest.fn((customerClass) => ({ type: 'SET_SELECTED_CUSTOMER_CLASS', customerClass })),
    setSelectedOddsGroup: jest.fn((oddsGroup) => ({ type: 'SET_SELECTED_ODDS_GROUP', oddsGroup })),
    setUsername: jest.fn((username) => ({ type: 'SET_USERNAME', username })),
    setSearchMode: jest.fn((mode) => ({ type: 'SET_SEARCH_MODE', mode })),
    setGroupInOriginalCurrency: jest.fn((group) => ({ type: 'SET_GROUP_IN_ORIGINAL_CURRENCY', group })),
    setSelectedCashOutMode: jest.fn((mode) => ({ type: 'SET_SELECTED_CASH_OUT_MODE', mode })),
    setExcludeTestData: jest.fn((exclude) => ({ type: 'SET_EXCLUDE_TEST_DATA', exclude })),
    setSelectedGroupByOption: jest.fn((option) => ({ type: 'SET_SELECTED_GROUP_BY_OPTION', option })),
    setSelectedBreakDownByOption: jest.fn((option) => ({ type: 'SET_SELECTED_BREAKDOWN_BY_OPTION', option })),
    setSubsidiarySearch: jest.fn((search) => ({ type: 'SET_SUBSIDIARY_SEARCH', search })),
    setSubsidiaryList: jest.fn((list) => ({ type: 'SET_SUBSIDIARY_LIST', list })),
    setAppUuid: jest.fn((uuid) => ({ type: 'SET_APP_UUID', uuid })),
    setProductList: jest.fn((products) => ({ type: 'SET_PRODUCT_LIST', products })),
    setSelectedViewInTime: jest.fn((time) => ({ type: 'SET_SELECTED_VIEW_IN_TIME', time })),
    setHour: jest.fn((hour) => ({ type: 'SET_HOUR', hour }))
};

mockService.default = {
    getCurrencyCodes: jest.fn(() => 'USD'),
    getNormalizedSelectedParamValueForMultiSelectFilter: jest.fn(() => []),
    getNormalizedSelectedParamValueForTreeListFilter: jest.fn(() => []),
    getSelectedBettypeXML: jest.fn(() => '')
};

import { useFilterAction } from '@/pages/winlossanalysis/components/hooks/useFilterAction';

const createMockStore = (initialState = {}) => {
    const defaultState = {
        requestParam: { PageSize: 50 },
        username: '',
        selectedBaseCurrency: { value: 'USD', label: 'USD' },
        selectedProduct: [],
        selectedStatus: [],
        dateRange: {
            fromDate: new Date('2023-01-01'),
            toDate: new Date('2023-01-31')
        },
        selectedLiveStatus: [],
        selectedPlatform: [],
        selectedCurrency: [],
        selectedSport: [],
        selectedBettype: [],
        selectedSubsidiary: [],
        selectedOddsGroup: [],
        selectedCustomerClass: [],
        searchMode: 1,
        sportList: [],
        selectedVipOnly: { value: false },
        isGroupInOriginalCurrency: false,
        isExcludeTestData: false,
        selectedCashOutMode: { value: 0 },
        selectedGroupByOption: '',
        selectedBreakDownByOption: '',
        formData: {
            productOptions: [],
            oddsGroupList: [],
            riskLevelList: [],
            liveStatusList: [],
            statusList: [],
            platformList: [],
            currencyList: []
        },
        selectedViewInTime: 1,
        selectedHour: 0,
        defaultState: {
            dateRange: {
                fromDate: new Date('2023-01-01'),
                toDate: new Date('2023-01-31')
            },
            selectedViewInTime: 1,
            selectedHour: 0,
            selectedProduct: [],
            selectedCurrency: [],
            selectedPlatform: [],
            selectedStatus: [],
            selectedLiveStatus: [],
            selectedBaseCurrency: { value: 'USD', label: 'USD' },
            selectedVipOnly: { value: false },
            selectedCustomerClass: [],
            selectedOddsGroup: [],
            isGroupInOriginalCurrency: false,
            isExcludeTestData: false,
            selectedCashOutMode: { value: 0 },
            selectedGroupByOption: '',
            selectedBreakDownByOption: '',
            subsidiarySearch: false,
            selectedSubsidiary: [],
            username: ''
        },
        ...initialState
    };

    const reducer = (state = defaultState, action) => {
        switch (action.type) {
            case 'SET_REPORT_TITLE':
                return { ...state, reportTitle: action.title };
            case 'SET_REQUEST_PARAM':
                return { ...state, requestParam: action.param };
            case 'TOGGLE_LOADER':
                return { ...state, isLoading: action.loading };
            case 'SET_DATE_RANGE':
                return { ...state, dateRange: action.range };
            case 'SET_SELECTED_CURRENCY':
                return { ...state, selectedCurrency: action.currency };
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
        expect(hookResult).toHaveProperty('onClickClearFilter');
        expect(typeof hookResult.submit).toBe('function');
        expect(typeof hookResult.onClickClearFilter).toBe('function');
    });

    test('submit should dispatch correct actions when form is valid', () => {
        renderHook();
        
        const mockEvent = { preventDefault: jest.fn() };
        hookResult.submit(mockEvent);
        
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockActions.ActionCreators.setReportTitle).toHaveBeenCalled();
        expect(mockActions.ActionCreators.setRequestParam).toHaveBeenCalled();
        expect(mockActions.ActionCreators.toggleLoader).toHaveBeenCalled();
        expect(mockActions.ActionCreators.getReportData).toHaveBeenCalled();
    });

    test('submit should not dispatch actions when form is invalid', () => {
        // Mock invalid form
        mockUseValidParam.useValidParam.mockReturnValue(false);
        
        renderHook();
        
        const mockEvent = { preventDefault: jest.fn() };
        hookResult.submit(mockEvent);
        
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockActions.ActionCreators.setReportTitle).not.toHaveBeenCalled();
        
        // Reset mock for other tests
        mockUseValidParam.useValidParam.mockReturnValue(true);
    });

    test('onClickClearFilter should dispatch reset actions', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onClickClearFilter();
        
        // Should dispatch multiple reset actions
        expect(mockActions.ActionCreators.setDateRange).toHaveBeenCalled();
        expect(mockActions.ActionCreators.setSelectedViewInTime).toHaveBeenCalled();
        expect(mockActions.ActionCreators.setHour).toHaveBeenCalled();
        expect(mockActions.ActionCreators.setProductList).toHaveBeenCalled();
        expect(mockActions.ActionCreators.setSelectedProducts).toHaveBeenCalled();
        expect(mockActions.ActionCreators.setAppUuid).toHaveBeenCalled();
    });

    test('should handle different selectedBaseCurrency values', () => {
        const storeWithDifferentCurrency = createMockStore({
            selectedBaseCurrency: { value: 'EUR', label: 'EUR' }
        });
        
        const TestComponentWithDifferentCurrency = () => {
            hookResult = useFilterAction();
            return null;
        };

        render(
            <Provider store={storeWithDifferentCurrency}>
                <TestComponentWithDifferentCurrency />
            </Provider>
        );
        
        expect(hookResult).toHaveProperty('submit');
        expect(hookResult).toHaveProperty('onClickClearFilter');
    });

    test('should build correct title when submitting', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        const mockEvent = { preventDefault: jest.fn() };
        hookResult.submit(mockEvent);
        
        // Check that setReportTitle was called with a string
        expect(mockActions.ActionCreators.setReportTitle).toHaveBeenCalled();
        const lastCall = mockActions.ActionCreators.setReportTitle.mock.calls[mockActions.ActionCreators.setReportTitle.mock.calls.length - 1];
        expect(typeof lastCall[0]).toBe('string');
    });

    test('should handle different form data structures', () => {
        const storeWithComplexFormData = createMockStore({
            formData: {
                productOptions: [{ value: 1, label: 'Product 1' }],
                oddsGroupList: [{ value: 1, label: 'Odds Group 1' }],
                riskLevelList: [{ customerClassList: 'VIP,Regular' }],
                liveStatusList: [{ value: 1, label: 'Live' }],
                statusList: [{ value: 1, label: 'Active' }],
                platformList: [{ value: 1, label: 'Desktop' }],
                currencyList: [{ value: 'USD', label: 'USD' }]
            }
        });
        
        const TestComponentWithComplexData = () => {
            hookResult = useFilterAction();
            return null;
        };

        render(
            <Provider store={storeWithComplexFormData}>
                <TestComponentWithComplexData />
            </Provider>
        );
        
        expect(hookResult).toHaveProperty('submit');
        expect(hookResult).toHaveProperty('onClickClearFilter');
    });

    test('should return consistent function types', () => {
        renderHook();
        
        // Verify functions are returned and are callable
        expect(typeof hookResult.submit).toBe('function');
        expect(typeof hookResult.onClickClearFilter).toBe('function');
        
        // Verify functions work as expected
        const mockEvent = { preventDefault: jest.fn() };
        expect(() => hookResult.submit(mockEvent)).not.toThrow();
        expect(() => hookResult.onClickClearFilter()).not.toThrow();
    });
});