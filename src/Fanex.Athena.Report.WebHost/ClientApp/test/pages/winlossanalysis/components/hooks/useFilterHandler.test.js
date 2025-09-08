import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Mock dependencies before imports
jest.mock('@/hooks/useSubsidiarySearch');
jest.mock('@/helpers/langHelper');
jest.mock('@/pages/winlossanalysis/common/Service');
jest.mock('@/pages/winlossanalysis/actions/index.js');

const mockUseSubsidiary = require('@/hooks/useSubsidiarySearch');
const mockLangHelper = require('@/helpers/langHelper');
const mockService = require('@/pages/winlossanalysis/common/Service');
const mockActions = require('@/pages/winlossanalysis/actions/index.js');

// Setup mocks
mockUseSubsidiary.default.mockReturnValue({
    defaultSelectedSubsidiary: []
});

mockLangHelper.default = {
    getSingleResource: jest.fn((key) => {
        if (key === 'DateRangeExceedMsg') {
            return 'Date range exceeds {0} months';
        }
        return key;
    })
};

mockService.default = {
    isContainProductSportBook: jest.fn(() => true),
    getCashoutMode: jest.fn((mode) => ({ value: mode, label: 'Cashout Mode' }))
};

mockActions.ActionCreators = {
    setUsername: jest.fn((username) => ({ type: 'SET_USERNAME', username })),
    setSubsidiaryList: jest.fn((list) => ({ type: 'SET_SUBSIDIARY_LIST', list })),
    setSelectedStatus: jest.fn((status) => ({ type: 'SET_SELECTED_STATUS', status })),
    setSelectedProducts: jest.fn((products) => ({ type: 'SET_SELECTED_PRODUCTS', products })),
    getSportList: jest.fn((products) => ({ type: 'GET_SPORT_LIST', products })),
    getBetTypeList: jest.fn((products, license) => ({ type: 'GET_BET_TYPE_LIST', products, license })),
    setSelectedSport: jest.fn((sport) => ({ type: 'SET_SELECTED_SPORT', sport })),
    setSelectedBettype: jest.fn((bettype) => ({ type: 'SET_SELECTED_BETTYPE', bettype })),
    setDateRange: jest.fn((range) => ({ type: 'SET_DATE_RANGE', range })),
    setSelectedCashOutMode: jest.fn((mode) => ({ type: 'SET_SELECTED_CASH_OUT_MODE', mode })),
    setSelectedLiveStatus: jest.fn((status) => ({ type: 'SET_SELECTED_LIVE_STATUS', status })),
    setSelectedCustomerClass: jest.fn((customerClass) => ({ type: 'SET_SELECTED_CUSTOMER_CLASS', customerClass })),
    setSelectedOddsGroup: jest.fn((group) => ({ type: 'SET_SELECTED_ODDS_GROUP', group })),
    setSelectedPlatform: jest.fn((platform) => ({ type: 'SET_SELECTED_PLATFORM', platform })),
    setSelectedCurrency: jest.fn((currency) => ({ type: 'SET_SELECTED_CURRENCY', currency })),
    setSelectedBaseCurrency: jest.fn((currency) => ({ type: 'SET_SELECTED_BASE_CURRENCY', currency })),
    changeIsConvertAll: jest.fn((checked) => ({ type: 'CHANGE_IS_CONVERT_ALL', checked })),
    setSubsidiarySearch: jest.fn((search) => ({ type: 'SET_SUBSIDIARY_SEARCH', search })),
    setSelectedVipOnly: jest.fn((vip) => ({ type: 'SET_SELECTED_VIP_ONLY', vip })),
    setSearchMode: jest.fn((mode) => ({ type: 'SET_SEARCH_MODE', mode })),
    setGroupInOriginalCurrency: jest.fn((group) => ({ type: 'SET_GROUP_IN_ORIGINAL_CURRENCY', group })),
    setExcludeTestData: jest.fn((exclude) => ({ type: 'SET_EXCLUDE_TEST_DATA', exclude })),
    setProductList: jest.fn((products) => ({ type: 'SET_PRODUCT_LIST', products })),
    setSelectedViewInTime: jest.fn((time) => ({ type: 'SET_SELECTED_VIEW_IN_TIME', time })),
    setHour: jest.fn((hour) => ({ type: 'SET_HOUR', hour })),
    setSelectedGroupByOption: jest.fn((option) => ({ type: 'SET_SELECTED_GROUP_BY_OPTION', option })),
    setSelectedBreakDownByOption: jest.fn((option) => ({ type: 'SET_SELECTED_BREAKDOWN_BY_OPTION', option }))
};

import { useFilterHandler } from '@/pages/winlossanalysis/components/hooks/useFilterHandler';

const createMockStore = (initialState = {}) => {
    const defaultState = {
        formData: {
            licenseeName: 'TestLicense',
            riskLevelList: [
                { id: 1, customerClassList: 'VIP' },
                { id: 2, customerClassList: 'Regular' }
            ],
            settlementTimeProductList: [
                { id: 1, name: 'Product 1', status: true },
                { id: 2, name: 'Product 2', status: true }
            ]
        },
        productList: [
            { id: 1, name: 'Product 1', status: true },
            { id: 2, name: 'Product 2', status: true }
        ],
        defaultState: {
            selectedProduct: '1,2',
            isGroupInOriginalCurrency: false,
            selectedGroupByOption: '',
            selectedBreakDownByOption: '',
            dateRange: {
                fromDate: new Date('2023-01-01'),
                toDate: new Date('2023-01-31')
            },
            selectedCashOutMode: { value: 0, label: 'Default' },
            selectedHour: 0
        },
        ...initialState
    };

    const reducer = (state = defaultState, action) => {
        switch (action.type) {
            case 'SET_USERNAME':
                return { ...state, username: action.username };
            case 'SET_SUBSIDIARY_LIST':
                return { ...state, subsidiaryList: action.list };
            case 'SET_SELECTED_STATUS':
                return { ...state, selectedStatus: action.status };
            case 'SET_DATE_RANGE':
                return { ...state, dateRange: action.range };
            default:
                return state;
        }
    };

    return createStore(reducer, applyMiddleware(thunk));
};

describe('useFilterHandler', () => {
    let store;
    let TestComponent;
    let hookResult;

    beforeEach(() => {
        store = createMockStore();
        hookResult = null;
        
        TestComponent = () => {
            hookResult = useFilterHandler();
            return null;
        };

        jest.clearAllMocks();
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

    test('should return all expected handler functions', () => {
        renderHook();
        
        expect(hookResult).toHaveProperty('onUserNameInputHandler');
        expect(hookResult).toHaveProperty('onSubsidiaryDropDownChangeHandler');
        expect(hookResult).toHaveProperty('onStatusChangeHandler');
        expect(hookResult).toHaveProperty('onProductChangeHandler');
        expect(hookResult).toHaveProperty('onSportChangeHandler');
        expect(hookResult).toHaveProperty('onBetTypeChangeHandler');
        expect(hookResult).toHaveProperty('onLiveStatusChangeHandler');
        expect(hookResult).toHaveProperty('onDateRangeChangeHandler');
        expect(hookResult).toHaveProperty('onRiskLevelChangeHandler');
        expect(hookResult).toHaveProperty('onOddsGroupChangeHandler');
        expect(hookResult).toHaveProperty('onPlatformChangeHandler');
        expect(hookResult).toHaveProperty('onVipOnlyChangeHandler');
        expect(hookResult).toHaveProperty('onCurrencyChangeHandler');
        expect(hookResult).toHaveProperty('onBaseCurrencyChangeHandler');
        expect(hookResult).toHaveProperty('onConverAllChangeHandler');
        expect(hookResult).toHaveProperty('onSubsidiaryCheckBoxChangeHandler');
        expect(hookResult).toHaveProperty('onSearchModeChangeHandler');
        expect(hookResult).toHaveProperty('onGroupInOriginalCurrencyChangeHandler');
        expect(hookResult).toHaveProperty('onExcludeTextDataChangeHandler');
        expect(hookResult).toHaveProperty('onCashOutModeChangeHandler');
        expect(hookResult).toHaveProperty('onViewInTimeChangeHandler');
        expect(hookResult).toHaveProperty('onHourChangeHandler');
    });

    test('onUserNameInputHandler should dispatch setUsername', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onUserNameInputHandler('testuser');
        
        expect(mockActions.ActionCreators.setUsername).toHaveBeenCalledWith('testuser');
    });

    test('onSubsidiaryDropDownChangeHandler should dispatch setSubsidiaryList', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onSubsidiaryDropDownChangeHandler(null, ['sub1', 'sub2']);
        
        expect(mockActions.ActionCreators.setSubsidiaryList).toHaveBeenCalledWith(['sub1', 'sub2']);
    });

    test('onDateRangeChangeHandler should dispatch setDateRange when valid', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        const dateRange = { startDate: new Date(), endDate: new Date() };
        hookResult.onDateRangeChangeHandler(dateRange, 3, true);
        
        expect(mockActions.ActionCreators.setDateRange).toHaveBeenCalledWith(dateRange);
    });

    test('onDateRangeChangeHandler should show alert when invalid', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        const dateRange = { startDate: new Date(), endDate: new Date() };
        hookResult.onDateRangeChangeHandler(dateRange, 3, false);
        
        expect(window.alert).toHaveBeenCalledWith('Date range exceeds 3 months');
        expect(mockActions.ActionCreators.setDateRange).not.toHaveBeenCalled();
    });

    test('onStatusChangeHandler should dispatch setSelectedStatus', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onStatusChangeHandler(null, ['status1', 'status2']);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_SELECTED_STATUS', status: ['status1', 'status2'] })
        );
    });

    test('onLiveStatusChangeHandler should dispatch setSelectedLiveStatus', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onLiveStatusChangeHandler(null, ['live1', 'live2']);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_SELECTED_LIVE_STATUS', status: ['live1', 'live2'] })
        );
    });

    test('onProductChangeHandler should dispatch multiple actions', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onProductChangeHandler(null, ['1', '2']);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_SELECTED_PRODUCTS', products: ['1', '2'] })
        );
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'GET_SPORT_LIST', products: ['1', '2'] })
        );
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'GET_BET_TYPE_LIST', products: ['1', '2'] })
        );
    });

    test('onSportChangeHandler should dispatch setSelectedSport', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onSportChangeHandler(null, ['sport1', 'sport2']);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_SELECTED_SPORT', sport: ['sport1', 'sport2'] })
        );
    });

    test('onBetTypeChangeHandler should dispatch setSelectedBettype', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onBetTypeChangeHandler(null, ['bettype1', 'bettype2']);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_SELECTED_BETTYPE', bettype: ['bettype1', 'bettype2'] })
        );
    });

    test('onRiskLevelChangeHandler should dispatch setSelectedCustomerClass', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onRiskLevelChangeHandler(null, [1, 2]);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_SELECTED_CUSTOMER_CLASS', customerClass: 'VIP,Regular' })
        );
    });

    test('onOddsGroupChangeHandler should dispatch setSelectedOddsGroup', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onOddsGroupChangeHandler(null, ['odds1', 'odds2']);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_SELECTED_ODDS_GROUP', group: ['odds1', 'odds2'] })
        );
    });

    test('onPlatformChangeHandler should dispatch setSelectedPlatform', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onPlatformChangeHandler(null, ['platform1', 'platform2']);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_SELECTED_PLATFORM', platform: ['platform1', 'platform2'] })
        );
    });

    test('onCurrencyChangeHandler should dispatch setSelectedCurrency', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onCurrencyChangeHandler(null, ['USD', 'EUR']);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_SELECTED_CURRENCY', currency: ['USD', 'EUR'] })
        );
    });

    test('onBaseCurrencyChangeHandler should dispatch setSelectedBaseCurrency', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        const currency = { value: 'USD', label: 'USD' };
        hookResult.onBaseCurrencyChangeHandler(currency);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_SELECTED_BASE_CURRENCY', currency })
        );
    });

    test('onConverAllChangeHandler should dispatch changeIsConvertAll', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onConverAllChangeHandler(true);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'CHANGE_IS_CONVERT_ALL', checked: true })
        );
    });

    test('onVipOnlyChangeHandler should dispatch setSelectedVipOnly', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        const vipOption = { value: true, label: 'VIP Only' };
        hookResult.onVipOnlyChangeHandler(vipOption);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_SELECTED_VIP_ONLY', vip: vipOption })
        );
    });

    test('onGroupInOriginalCurrencyChangeHandler should dispatch setGroupInOriginalCurrency', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onGroupInOriginalCurrencyChangeHandler(true);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_GROUP_IN_ORIGINAL_CURRENCY', group: true })
        );
    });

    test('onExcludeTextDataChangeHandler should dispatch setExcludeTestData', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onExcludeTextDataChangeHandler(true);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_EXCLUDE_TEST_DATA', exclude: true })
        );
    });

    test('onSearchModeChangeHandler should dispatch setSearchMode', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        const event = { target: { value: '1' } };
        hookResult.onSearchModeChangeHandler(event);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_SEARCH_MODE', mode: '1' })
        );
    });

    test('onSubsidiaryCheckBoxChangeHandler should dispatch setSubsidiarySearch', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onSubsidiaryCheckBoxChangeHandler(true);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_SUBSIDIARY_SEARCH', search: true })
        );
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_SUBSIDIARY_LIST', list: [] })
        );
    });

    test('onViewInTimeChangeHandler should dispatch multiple actions when settlement time', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        const event = { target: { value: '2' } }; // ViewInTimeMode.Settlement
        hookResult.onViewInTimeChangeHandler(event);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_SELECTED_VIEW_IN_TIME', time: 2 })
        );
    });

    test('onHourChangeHandler should dispatch setHour', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        renderHook();
        
        hookResult.onHourChangeHandler(null, ['1', '2']);
        
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'SET_HOUR', hour: ['1', '2'] })
        );
    });
});