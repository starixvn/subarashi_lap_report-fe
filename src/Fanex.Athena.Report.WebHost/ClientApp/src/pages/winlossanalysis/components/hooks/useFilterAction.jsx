import { useCallback } from 'react';
import { batch, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useRouteLoaderData } from 'react-router-dom';
import LangHelper from '@srcRoot/helpers/langHelper';
import Site from '@srcRoot/lib/site';
import StringHelper from '@srcRoot/lib/stringHelper';
import useBaseCurrencyForMultiSelectCurrency from '@srcRoot/hooks/useBaseCurrencyForMultiSelectCurrency';
import useSubsidiarySearch from '@srcRoot/hooks/useSubsidiarySearch';
import * as pages from '@srcRoot/constants/pages';
import { ActionCreators } from '../../actions/index.js';
import Service from '../../common/Service.js';
import { useValidParam } from './useValidParam';
import { ALL_SELECTED_TEXT, SortBy, SortOrder, SearchMode } from '../../common/constants.js';

export const useFilterAction = () => {
    const isValidModel = useValidParam();
    const loadedData = useRouteLoaderData(pages.WL_ANALYSIS);
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
        bettypeList,
        selectedVipOnly,
        isGroupInOriginalCurrency,
        isExcludeTestData,
        selectedCashOutMode,
        selectedGroupByOption,
        selectedBreakDownByOption,
        formData,
        defaultState,
    ] = useSelector(
        (state) => [
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
            state.bettypeList,
            state.selectedVipOnly,
            state.isGroupInOriginalCurrency,
            state.isExcludeTestData,
            state.selectedCashOutMode,
            state.selectedGroupByOption,
            state.selectedBreakDownByOption,
            state.formData,
            state.defaultState,
        ],
        shallowEqual
    );

    const { baseCurrencyList } = useBaseCurrencyForMultiSelectCurrency(selectedBaseCurrency, formData);
    const { isSubsidiarySearch, defaultSelectedSubsidiary } = useSubsidiarySearch();

    const {
        setReportTitle,
        setRequestParam,
        toggleLoader,
        getReportData,
        setDateRange,
        setSelectedProducts,
        setSelectedCurrency,
        setSelectedPlatform,
        setSelectedStatus,
        setSelectedLiveStatus,
        setSelectedBaseCurrency,
        setSelectedVipOnly,
        setSelectedCustomerClass,
        setSelectedOddsGroup,
        setUsername,
        setSearchMode,
        setGroupInOriginalCurrency,
        setSelectedCashOutMode,
        setExcludeTestData,
        setSelectedGroupByOption,
        setSelectedBreakDownByOption,
        setSubsidiarySearch,
        setSubsidiaryList,
        setAppUuid,
        setProductList,
    } = ActionCreators;

    const _buildTitle = (params) => {
        const { FromDate, ToDate, ProductCodes, SearchUserName, CurrencyCodes, BaseCurrencyName } = params;
        const dateRangeText = `, ${Site.convertDateToString(FromDate)} → ${Site.convertDateToString(ToDate)}`;
        const currencyText = `, ${LangHelper.getSingleResource('Currency')}: ${CurrencyCodes}, ${LangHelper.getSingleResource(
            'BaseCurrency'
        )}: ${BaseCurrencyName}`;
        const productText = `, ${LangHelper.getSingleResource('LicenseeW_L')} (${ProductCodes})`;
        const userText = !!SearchUserName ? `, ${LangHelper.getSingleResource('Username')}: ${SearchUserName}` : '';

        return LangHelper.getSingleResource('WinlossAnalysis') + dateRangeText + currencyText + productText + userText;
    };
    const _getParams = () => {
        if (!isValidModel) {
            return null;
        }

        const { fromDate, toDate } = dateRange;
        const { PageSize } = requestParam;
        const { oddsGroupList, riskLevelList, liveStatusList, statusList, platformList, currencyList } = formData;
        const baseCurrency = baseCurrencyList.find((x) => x.value === selectedBaseCurrency.value);
        const subsidiary = Site.getLrfSubsidiary(loadedData.IsSelfMode);
        let { SubsidiarySearch, SubsidiaryList } = subsidiary;
        if (!subsidiary || Object.keys(subsidiary).length === 0) {
            SubsidiarySearch = isSubsidiarySearch;
            SubsidiaryList = selectedSubsidiary || defaultSelectedSubsidiary;
        }

        const selectedCurrencyCode = Service.getCurrencyCodes(selectedCurrency, currencyList);
        const seletedCurrencyText =
            selectedCurrencyCode == ALL_SELECTED_TEXT ? LangHelper.getSingleResource('All') : StringHelper.addSpaceAfterComma(selectedCurrencyCode);

        return {
            PageSize: PageSize,
            PageIndex: 1,
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
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
            CustomerClass: Service.getNormalizedSelectedParamValueForMultiSelectFilter(selectedCustomerClass, riskLevelList, (r) => r.customerClassList),
            FullCustomerClass: riskLevelList && riskLevelList.map((r) => r.customerClassList).join(','),
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

    const submit = (event) => {
        event.preventDefault();
        const params = _getParams();
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

    const onClickClearFilter = useCallback(() => {
        batch(() => {
            dispatch(setDateRange({ startDate: defaultState.dateRange.fromDate, endDate: defaultState.dateRange.toDate }));
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
    });

    return { submit, onClickClearFilter };
};

export default useFilterAction;
