import { batch, useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from '../../actions/index.js';
import LangHelper from '@srcRoot/helpers/langHelper';
import useSubsidiarySearch from '@srcRoot/hooks/useSubsidiarySearch';
import Service from '../../common/Service';
import { useCallback } from 'react';
import { ProductCode, CashOutMode } from '../../common/constants.js';

export const useFilterHandler = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const { defaultSelectedSubsidiary } = useSubsidiarySearch();

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
    } = ActionCreators;

    const onUserNameInputHandler = useCallback((value) => dispatch(setUsername(value)), []);

    const onSubsidiaryDropDownChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSubsidiaryList(selectedItemsKey)), []);

    const onDateRangeChangeHandler = useCallback((date, isValidMonthRange = true) => {
        if (isValidMonthRange) {
            dispatch(setDateRange(date));
        } else {
            const message = LangHelper.getSingleResource('DateRangeExceedMsg').replace('{0}', formData.dateConstraint.limitedMonthRange);
            alert(message);
        }
    }, []);

    const onStatusChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedStatus(selectedItemsKey)), []);

    const onLiveStatusChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedLiveStatus(selectedItemsKey)), []);

    const onProductChangeHandler = useCallback((currentItem, selectedItemsKey) => {
        batch(() => {
            dispatch(setSelectedProducts(selectedItemsKey));
            if (!Service.isContainProductSportBookOrBa(selectedItemsKey)) {
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
            .filter((r) => selectedItemsKey.includes(r.id))
            .map((r) => r.customerClassList)
            .join(',');
        dispatch(setSelectedCustomerClass(customerClass));
    }, []);

    const onOddsGroupChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedOddsGroup(selectedItemsKey)), []);

    const onPlatformChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedPlatform(selectedItemsKey)), []);

    const onCurrencyChangeHandler = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedCurrency(selectedItemsKey)), []);

    const onBaseCurrencyChangeHandler = useCallback((item) => dispatch(setSelectedBaseCurrency(item)), []);

    const onConverAllChangeHandler = useCallback((checked) => dispatch(changeIsConvertAll(checked)), []);

    const onVipOnlyChangeHandler = useCallback((item) => dispatch(setSelectedVipOnly(item)), []);

    const onGroupInOriginalCurrencyChangeHandler = useCallback((checked) => dispatch(setGroupInOriginalCurrency(checked)), []);

    const onExcludeTextDataChangeHandler = useCallback((checked) => dispatch(setExcludeTestData(checked)), []);

    const onCashOutModeChangeHandler = useCallback((item) => {
        if (item.value === CashOutMode.ViewCOOnly) {
            const selectedProduct = formData.productOptions
                .filter((product) => product.id == ProductCode.BA || product.id == ProductCode.SportsBook)
                .map((item) => item.id)
                .join(',');
            const productList = formData.productOptions.map((item) =>
                item.id == ProductCode.SportsBook || item.id == ProductCode.BA ? item : { ...item, status: false }
            );
            onProductChangeHandler(null, selectedProduct);
            dispatch(setProductList(productList));
        }
        dispatch(setSelectedCashOutMode(item));
    }, []);

    const onSearchModeChangeHandler = useCallback((event) => {
        const { value } = event.target;
        dispatch(setSearchMode(value));
    }, []);

    const onSubsidiaryCheckBoxChangeHandler = useCallback((checked) => {
        dispatch(setSubsidiarySearch(checked));
        checked && dispatch(setSubsidiaryList(defaultSelectedSubsidiary));
    }, []);

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
    };
};
