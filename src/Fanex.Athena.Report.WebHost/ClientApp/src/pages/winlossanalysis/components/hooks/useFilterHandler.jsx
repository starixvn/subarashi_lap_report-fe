import { batch, useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from '../../actions/index.js';
import LangHelper from '@/helpers/langHelper';
import useSubsidiarySearch from '@/hooks/useSubsidiarySearch';
import Service from '../../common/Service';
import { useCallback } from 'react';
import { ProductCode, CashOutMode, ViewInTimeMode } from '../../common/constants.js';

export const useFilterHandler = () => {
    const dispatch = useDispatch();
    const formData = useSelector(state => state.formData);
    const orgProductList = useSelector(state => state.productList);
    const { defaultSelectedSubsidiary } = useSubsidiarySearch();
    const defaultState = useSelector(state => state.defaultState);

    const {
        setUsername,
        setSubsidiaryList,
        setSelectedStatus,
        setSelectedProducts,
        getSportList,
        getBetTypeList,
        setSelectedSport,
        setSelectedBettype,
        setDateRange,
        setSelectedCashOutMode,
        setSelectedLiveStatus,
        setSelectedCustomerClass,
        setSelectedOddsGroup,
        setSelectedPlatform,
        setSelectedCurrency,
        setSelectedBaseCurrency,
        changeIsConvertAll,
        setSubsidiarySearch,
        setSelectedVipOnly,
        setSearchMode,
        setGroupInOriginalCurrency,
        setExcludeTestData,
        setProductList,
        setSelectedViewInTime,
        setHour,
        setSelectedGroupByOption,
        setSelectedBreakDownByOption,
    } = ActionCreators;

    const onUserNameInputHandler = useCallback(value => dispatch(setUsername(value)), []);

    const onSubsidiaryDropDownChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSubsidiaryList(selectedItemsKey)), []);

    const onDateRangeChangeHandler = useCallback((date, isValidMonthRange = true, limitedMonthRange) => {
        if (isValidMonthRange) {
            dispatch(setDateRange(date));
        } else {
            const message = LangHelper.getSingleResource('DateRangeExceedMsg').replace('{0}', limitedMonthRange);
            alert(message);
        }
    }, []);

    const onStatusChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedStatus(selectedItemsKey)), []);

    const onLiveStatusChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedLiveStatus(selectedItemsKey)), []);

    const onProductChangeHandler = useCallback((currentItem, selectedItemsKey) => {
        batch(() => {
            dispatch(setSelectedProducts(selectedItemsKey));
            if (!Service.isContainProductSportBook(selectedItemsKey)) {
                dispatch(setSelectedCashOutMode(Service.getCashoutMode(CashOutMode.IncludeCOFromSB)));
            }
            dispatch(getSportList(selectedItemsKey));
            dispatch(getBetTypeList(selectedItemsKey, formData.licenseeName));
        });
    }, []);

    const onSportChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedSport(selectedItemsKey)), []);

    const onBetTypeChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedBettype(selectedItemsKey)), []);

    const onRiskLevelChangeHandler = useCallback((currentItem, selectedItemsKey) => {
        const customerClass = formData.riskLevelList
            .filter(r => selectedItemsKey.includes(r.id))
            .map(r => r.customerClassList)
            .join(',');
        dispatch(setSelectedCustomerClass(customerClass));
    }, []);

    const onOddsGroupChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedOddsGroup(selectedItemsKey)), []);

    const onPlatformChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedPlatform(selectedItemsKey)), []);

    const onCurrencyChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedCurrency(selectedItemsKey)), []);

    const onBaseCurrencyChangeHandler = useCallback(item => dispatch(setSelectedBaseCurrency(item)), []);

    const onConverAllChangeHandler = useCallback(checked => dispatch(changeIsConvertAll(checked)), []);

    const onVipOnlyChangeHandler = useCallback(item => dispatch(setSelectedVipOnly(item)), []);

    const onGroupInOriginalCurrencyChangeHandler = useCallback(checked => dispatch(setGroupInOriginalCurrency(checked)), []);

    const onExcludeTextDataChangeHandler = useCallback(checked => dispatch(setExcludeTestData(checked)), []);

    const onCashOutModeChangeHandler = useCallback((item, viewInTime) => {
        const { settlementTimeProductList } = formData;
        if (item.value === CashOutMode.ViewCOOnly) {
            const productListOrg = viewInTime === ViewInTimeMode.Settlement ? settlementTimeProductList : orgProductList;

            const selectedProduct = productListOrg
                .filter(product => product.id === ProductCode.SportsBook)
                .map(item => item.id)
                .join(',');

            const productList = productListOrg.map(product => (product.id === ProductCode.SportsBook ? product : { ...product, status: false }));
            onProductChangeHandler(null, selectedProduct);
            dispatch(setProductList(productList));
        }
        dispatch(setSelectedCashOutMode(item));
    }, []);

    const onSearchModeChangeHandler = useCallback(event => {
        const { value } = event.target;
        dispatch(setSearchMode(value));
    }, []);

    const onSubsidiaryCheckBoxChangeHandler = useCallback(checked => {
        dispatch(setSubsidiarySearch(checked));
        checked && dispatch(setSubsidiaryList(defaultSelectedSubsidiary));
    }, []);

    const onViewInTimeChangeHandler = useCallback(event => {
        const { settlementTimeProductList } = formData;

        const value = +event.target.value;

        batch(() => {
            if (value === ViewInTimeMode.Settlement) {
                const productList = settlementTimeProductList;
                const selectedProduct = productList.map(product => product.id).join(',');

                onProductChangeHandler(null, selectedProduct);
                dispatch(setProductList(productList));
            } else {
                onProductChangeHandler(null, defaultState.selectedProduct);
                dispatch(setProductList(orgProductList));
            }

            dispatch(setGroupInOriginalCurrency(defaultState.isGroupInOriginalCurrency));
            dispatch(setSelectedGroupByOption(defaultState.selectedGroupByOption));
            dispatch(setSelectedBreakDownByOption(defaultState.selectedBreakDownByOption));
            dispatch(setDateRange({ startDate: defaultState.dateRange.fromDate, endDate: defaultState.dateRange.toDate }));
            dispatch(setSelectedCashOutMode(defaultState.selectedCashOutMode));
            dispatch(setHour(defaultState.selectedHour));
            dispatch(setSelectedViewInTime(value));
        });
    }, []);

    const onHourChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setHour(selectedItemsKey)), []);

    return {
        onUserNameInputHandler,
        onSubsidiaryDropDownChangeHandler,
        onStatusChangeHandler,
        onProductChangeHandler,
        onSportChangeHandler,
        onBetTypeChangeHandler,
        onLiveStatusChangeHandler,
        onDateRangeChangeHandler,
        onRiskLevelChangeHandler,
        onOddsGroupChangeHandler,
        onPlatformChangeHandler,
        onVipOnlyChangeHandler,
        onCurrencyChangeHandler,
        onBaseCurrencyChangeHandler,
        onConverAllChangeHandler,
        onSubsidiaryCheckBoxChangeHandler,
        onSearchModeChangeHandler,
        onGroupInOriginalCurrencyChangeHandler,
        onExcludeTextDataChangeHandler,
        onCashOutModeChangeHandler,
        onViewInTimeChangeHandler,
        onHourChangeHandler,
    };
};
