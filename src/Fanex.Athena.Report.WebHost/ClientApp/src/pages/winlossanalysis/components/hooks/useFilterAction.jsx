import { useCallback } from 'react';
import { batch, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useRouteLoaderData } from 'react-router-dom';
import LangHelper from '@/helpers/langHelper';
import Site from '@/lib/site';
import StringHelper from '@/lib/stringHelper';
import useBaseCurrencyForMultiSelectCurrency from '@/hooks/useBaseCurrencyForMultiSelectCurrency';
import useSubsidiarySearch from '@/hooks/useSubsidiarySearch';
import { WL_ANALYSIS } from '@/constants/pages';
import { ActionCreators } from '../../actions/index.js';
import Service from '../../common/Service.js';
import { useValidParam } from './useValidParam';
import { ALL_SELECTED_TEXT, SortBy, SortOrder, SearchMode, ViewInTimeMode } from '../../common/constants.js';

/**
 * Helper function to build the report title based on parameters
 */
const _buildTitle = params => {
    const { FromDate, ToDate, ProductCodes, SearchUserName, CurrencyCodes, BaseCurrencyName, ViewInTime } = params;
    const dateRangeText = `, ${Site.convertDateToString(FromDate)} → ${Site.convertDateToString(ToDate)}`;
    const currencyText = `, ${LangHelper.getSingleResource('Currency')}: ${CurrencyCodes}, ${LangHelper.getSingleResource(
        'BaseCurrency'
    )}: ${BaseCurrencyName}`;
    const productText = `, ${LangHelper.getSingleResource('LicenseeW_L')} (${ProductCodes})`;
    const userText = SearchUserName ? `, ${LangHelper.getSingleResource('Username')}: ${SearchUserName}` : '';
    const viewinTimeText = ` - ${ViewInTime === ViewInTimeMode.Settlement ? LangHelper.getSingleResource('SettlementTime') : LangHelper.getSingleResource('FinancialDate')}`;

    return LangHelper.getSingleResource('WinlossAnalysis') + viewinTimeText + dateRangeText + currencyText + productText + userText;
};

/**
 * Helper function to get subsidiary information
 */
const _getSubsidiaryInfo = (loadedData, isSubsidiarySearch, selectedSubsidiary, defaultSelectedSubsidiary) => {
    const subsidiary = Site.getLrfSubsidiary(loadedData.IsSelfMode);
    let { SubsidiarySearch, SubsidiaryList } = subsidiary;

    if (!subsidiary || Object.keys(subsidiary).length === 0) {
        SubsidiarySearch = isSubsidiarySearch;
        SubsidiaryList = selectedSubsidiary || defaultSelectedSubsidiary;
    }

    return { SubsidiarySearch, SubsidiaryList };
};

/**
 * Helper function to get currency text display
 */
const _getCurrencyText = (selectedCurrency, currencyList) => {
    const selectedCurrencyCode = Service.getCurrencyCodes(selectedCurrency, currencyList);
    return selectedCurrencyCode === ALL_SELECTED_TEXT ? LangHelper.getSingleResource('All') : StringHelper.addSpaceAfterComma(selectedCurrencyCode);
};

/**
 * Helper function to build request parameters
 */
const _getParams = options => {
    const {
        isValidModel,
        dateRange,
        requestParam,
        formData,
        baseCurrencyList,
        selectedBaseCurrency,
        loadedData,
        isSubsidiarySearch,
        selectedSubsidiary,
        defaultSelectedSubsidiary,
        selectedCurrency,
        selectedViewInTime,
        selectedHour,
        selectedProduct,
        username,
        searchMode,
        selectedStatus,
        selectedSport,
        sportList,
        selectedBettype,
        selectedPlatform,
        selectedLiveStatus,
        selectedVipOnly,
        selectedCustomerClass,
        selectedOddsGroup,
        isGroupInOriginalCurrency,
        isExcludeTestData,
        selectedCashOutMode,
        selectedGroupByOption,
        selectedBreakDownByOption,
    } = options;
    if (!isValidModel) {
        return null;
    }

    const { fromDate, toDate } = dateRange;
    const { PageSize } = requestParam;
    const { oddsGroupList, riskLevelList, liveStatusList, statusList, platformList, currencyList } = formData;
    const baseCurrency = baseCurrencyList.find(x => x.value === selectedBaseCurrency.value);

    const { SubsidiarySearch, SubsidiaryList } = _getSubsidiaryInfo(loadedData, isSubsidiarySearch, selectedSubsidiary, defaultSelectedSubsidiary);

    const seletedCurrencyText = _getCurrencyText(selectedCurrency, currencyList);

    return {
        PageSize: PageSize,
        PageIndex: 1,
        FromDate: Site.convertDateToString(fromDate),
        ToDate: Site.convertDateToString(toDate),
        ViewInTime: selectedViewInTime,
        HourParts: selectedHour,
        ProductCodes: selectedProduct,
        SearchUserName: username,
        SearchMode: searchMode,
        CurrencyIdList: selectedCurrency,
        CurrencyCodes: seletedCurrencyText,
        BaseCurrency: selectedBaseCurrency.label,
        StatusIds: Service.getNormalizedSelectedParamValueForMultiSelectFilter(selectedStatus, statusList),
        SportIds: Service.getNormalizedSelectedParamValueForTreeListFilter(selectedSport, sportList),
        BetTypeIds: Service.getSelectedBettypeXML(selectedBettype),
        PlatformIds: Service.getNormalizedSelectedParamValueForMultiSelectFilter(selectedPlatform, platformList),
        LiveStatusIds: Service.getNormalizedSelectedParamValueForMultiSelectFilter(selectedLiveStatus, liveStatusList),
        IsVipOnly: selectedVipOnly.value,
        CustomerClass: Service.getNormalizedSelectedParamValueForMultiSelectFilter(selectedCustomerClass, riskLevelList, r => r.customerClassList),
        FullCustomerClass: riskLevelList && riskLevelList.map(r => r.customerClassList).join(','),
        OddsGroup: Service.getNormalizedSelectedParamValueForMultiSelectFilter(selectedOddsGroup, oddsGroupList),
        IsShowInOrginalCurrency: isGroupInOriginalCurrency,
        IsExcludedTestData: isExcludeTestData,
        CashOutMode: selectedCashOutMode.value,
        GroupMode: selectedGroupByOption,
        BreakdownMode: selectedBreakDownByOption,
        BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
        SortBy: SortBy.Default,
        SortOrder: SortOrder.ASC,
        SubsidiaryList,
        SubsidiarySearch,
        SubmitTime: new Date().getTime(),
    };
};

/**
 * Helper function to handle form submission
 */
const _handleSubmit = options => {
    const { event, getParamsFunc, dispatch, setReportTitle, setRequestParam, toggleLoader, getReportData } = options;
    event.preventDefault();
    const params = getParamsFunc();
    if (!params) {
        return;
    }

    const title = _buildTitle(params);
    batch(() => {
        dispatch(setReportTitle(title));
        dispatch(setRequestParam(params));
        dispatch(toggleLoader(true));
        dispatch(getReportData(params));
    });
};

/**
 * Helper function to reset all filter states to default values
 */
const _resetFilterToDefaults = options => {
    const { dispatch, defaultState, formData, actionCreators } = options;
    const {
        setDateRange,
        setSelectedViewInTime,
        setHour,
        setProductList,
        setSelectedProducts,
        setSelectedCurrency,
        setSelectedPlatform,
        setSelectedStatus,
        setSelectedLiveStatus,
        setSelectedBaseCurrency,
        setSelectedVipOnly,
        setSelectedCustomerClass,
        setSelectedOddsGroup,
        setSearchMode,
        setGroupInOriginalCurrency,
        setSelectedCashOutMode,
        setExcludeTestData,
        setSelectedGroupByOption,
        setSelectedBreakDownByOption,
        setSubsidiarySearch,
        setSubsidiaryList,
        setUsername,
        setAppUuid,
    } = actionCreators;

    batch(() => {
        dispatch(
            setDateRange({
                startDate: defaultState.dateRange.fromDate,
                endDate: defaultState.dateRange.toDate,
            })
        );
        dispatch(setSelectedViewInTime(defaultState.selectedViewInTime));
        dispatch(setHour(defaultState.selectedHour));
        dispatch(setProductList(formData.productOptions));
        dispatch(setSelectedProducts(defaultState.selectedProduct));
        dispatch(setSelectedCurrency(defaultState.selectedCurrency));
        dispatch(setSelectedPlatform(defaultState.selectedPlatform));
        dispatch(setSelectedStatus(defaultState.selectedStatus));
        dispatch(setSelectedLiveStatus(defaultState.selectedLiveStatus));
        dispatch(setSelectedBaseCurrency(defaultState.selectedBaseCurrency));
        dispatch(setSelectedVipOnly(defaultState.selectedVipOnly));
        dispatch(setSelectedCustomerClass(defaultState.selectedCustomerClass));
        dispatch(setSelectedOddsGroup(defaultState.selectedOddsGroup));
        dispatch(setSearchMode(SearchMode.MatchPrecise));
        dispatch(setGroupInOriginalCurrency(defaultState.isGroupInOriginalCurrency));
        dispatch(setSelectedCashOutMode(defaultState.selectedCashOutMode));
        dispatch(setExcludeTestData(defaultState.isExcludeTestData));
        dispatch(setSelectedGroupByOption(defaultState.selectedGroupByOption));
        dispatch(setSelectedBreakDownByOption(defaultState.selectedBreakDownByOption));
        dispatch(setSubsidiarySearch(defaultState.subsidiarySearch));
        dispatch(setSubsidiaryList(defaultState.selectedSubsidiary));
        dispatch(setUsername(defaultState.username));
        dispatch(setAppUuid(`${uuidv4()}`));
    });
};

/**
 * Custom hook to get all required selector values
 */
const useFilterSelectors = () =>
    useSelector(
        state => [
            state.requestParam,
            state.username,
            state.selectedBaseCurrency,
            state.selectedProduct,
            state.selectedStatus,
            state.dateRange,
            state.selectedLiveStatus,
            state.selectedPlatform,
            state.selectedCurrency,
            state.selectedSport,
            state.selectedBettype,
            state.selectedSubsidiary,
            state.selectedOddsGroup,
            state.selectedCustomerClass,
            state.searchMode,
            state.sportList,
            state.selectedVipOnly,
            state.isGroupInOriginalCurrency,
            state.isExcludeTestData,
            state.selectedCashOutMode,
            state.selectedGroupByOption,
            state.selectedBreakDownByOption,
            state.formData,
            state.selectedViewInTime,
            state.selectedHour,
            state.defaultState,
        ],
        shallowEqual
    );

/**
 * Custom hook to get action creators
 */
const useActionCreators = () => ({
    setReportTitle: ActionCreators.setReportTitle,
    setRequestParam: ActionCreators.setRequestParam,
    toggleLoader: ActionCreators.toggleLoader,
    getReportData: ActionCreators.getReportData,
    setDateRange: ActionCreators.setDateRange,
    setSelectedProducts: ActionCreators.setSelectedProducts,
    setSelectedCurrency: ActionCreators.setSelectedCurrency,
    setSelectedPlatform: ActionCreators.setSelectedPlatform,
    setSelectedStatus: ActionCreators.setSelectedStatus,
    setSelectedLiveStatus: ActionCreators.setSelectedLiveStatus,
    setSelectedBaseCurrency: ActionCreators.setSelectedBaseCurrency,
    setSelectedVipOnly: ActionCreators.setSelectedVipOnly,
    setSelectedCustomerClass: ActionCreators.setSelectedCustomerClass,
    setSelectedOddsGroup: ActionCreators.setSelectedOddsGroup,
    setUsername: ActionCreators.setUsername,
    setSearchMode: ActionCreators.setSearchMode,
    setGroupInOriginalCurrency: ActionCreators.setGroupInOriginalCurrency,
    setSelectedCashOutMode: ActionCreators.setSelectedCashOutMode,
    setExcludeTestData: ActionCreators.setExcludeTestData,
    setSelectedGroupByOption: ActionCreators.setSelectedGroupByOption,
    setSelectedBreakDownByOption: ActionCreators.setSelectedBreakDownByOption,
    setSubsidiarySearch: ActionCreators.setSubsidiarySearch,
    setSubsidiaryList: ActionCreators.setSubsidiaryList,
    setAppUuid: ActionCreators.setAppUuid,
    setProductList: ActionCreators.setProductList,
    setSelectedViewInTime: ActionCreators.setSelectedViewInTime,
    setHour: ActionCreators.setHour,
});

export const useFilterAction = () => {
    const isValidModel = useValidParam();
    const loadedData = useRouteLoaderData(WL_ANALYSIS);
    const dispatch = useDispatch();

    const [
        requestParam,
        username,
        selectedBaseCurrency,
        selectedProduct,
        selectedStatus,
        dateRange,
        selectedLiveStatus,
        selectedPlatform,
        selectedCurrency,
        selectedSport,
        selectedBettype,
        selectedSubsidiary,
        selectedOddsGroup,
        selectedCustomerClass,
        searchMode,
        sportList,
        selectedVipOnly,
        isGroupInOriginalCurrency,
        isExcludeTestData,
        selectedCashOutMode,
        selectedGroupByOption,
        selectedBreakDownByOption,
        formData,
        selectedViewInTime,
        selectedHour,
        defaultState,
    ] = useFilterSelectors();

    const { baseCurrencyList } = useBaseCurrencyForMultiSelectCurrency(selectedBaseCurrency, formData);
    const { isSubsidiarySearch, defaultSelectedSubsidiary } = useSubsidiarySearch();
    const actionCreators = useActionCreators();

    const getParamsFunc = useCallback(
        () =>
            _getParams({
                isValidModel,
                dateRange,
                requestParam,
                formData,
                baseCurrencyList,
                selectedBaseCurrency,
                loadedData,
                isSubsidiarySearch,
                selectedSubsidiary,
                defaultSelectedSubsidiary,
                selectedCurrency,
                selectedViewInTime,
                selectedHour,
                selectedProduct,
                username,
                searchMode,
                selectedStatus,
                selectedSport,
                sportList,
                selectedBettype,
                selectedPlatform,
                selectedLiveStatus,
                selectedVipOnly,
                selectedCustomerClass,
                selectedOddsGroup,
                isGroupInOriginalCurrency,
                isExcludeTestData,
                selectedCashOutMode,
                selectedGroupByOption,
                selectedBreakDownByOption,
            }),
        [
            isValidModel,
            dateRange,
            requestParam,
            formData,
            baseCurrencyList,
            selectedBaseCurrency,
            loadedData,
            isSubsidiarySearch,
            selectedSubsidiary,
            defaultSelectedSubsidiary,
            selectedCurrency,
            selectedViewInTime,
            selectedHour,
            selectedProduct,
            username,
            searchMode,
            selectedStatus,
            selectedSport,
            sportList,
            selectedBettype,
            selectedPlatform,
            selectedLiveStatus,
            selectedVipOnly,
            selectedCustomerClass,
            selectedOddsGroup,
            isGroupInOriginalCurrency,
            isExcludeTestData,
            selectedCashOutMode,
            selectedGroupByOption,
            selectedBreakDownByOption,
        ]
    );

    const submit = useCallback(
        event => {
            _handleSubmit({
                event,
                getParamsFunc,
                dispatch,
                setReportTitle: actionCreators.setReportTitle,
                setRequestParam: actionCreators.setRequestParam,
                toggleLoader: actionCreators.toggleLoader,
                getReportData: actionCreators.getReportData,
            });
        },
        [getParamsFunc, dispatch, actionCreators.setReportTitle, actionCreators.setRequestParam, actionCreators.toggleLoader, actionCreators.getReportData]
    );

    const onClickClearFilter = useCallback(() => {
        _resetFilterToDefaults({
            dispatch,
            defaultState,
            formData,
            actionCreators,
        });
    }, [dispatch, defaultState, formData, actionCreators]);

    return { submit, onClickClearFilter };
};

export default useFilterAction;
