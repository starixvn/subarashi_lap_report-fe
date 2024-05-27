import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_BASE_CURRENCY_VALUE } from '@srcRoot/constants/config';
import Loader from '@srcRoot/components/Loader';
import useMobileVersion from '@srcRoot/hooks/useMobileVersion';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import DataService from '@srcRoot/lib/dataService';
import AppLayout from '@srcRoot/layouts/AppLayout';

import { ActionCreators } from '../actions/index';
import { ApiUrl, VipOnlyList } from '../common/constants';
import DataGrid from './desktop/DataGrid';
import FormFilter from './desktop/FormFilter';
import MobileDataGrid from './mobile/MobileDataGrid';
import MobileFormFilter from './mobile/MobileFormFilter';

export const AppContainer = () => {
    const dispatch = useDispatch();
    const defaultState = useSelector((state) => state.defaultState);
    const formData = useSelector((state) => state.formData);
    const isLoading = useSelector((state) => state.isLoading);
    const isUseMobileVer = useMobileVersion();

    const { sendRequest } = useToggleRequest();

    const {
        setDefaultState,
        setFormData,
        setProductList,
        setSelectedProducts,
        setSelectedCurrency,
        setSelectedBaseCurrency,
        setSelectedStatus,
        setSelectedLiveStatus,
        setSelectedPlatform,
        setSelectedOddsGroup,
        setSelectedCustomerClass,
    } = ActionCreators;

    const setInitFormData = (result) => {
        if (!result || !result.data) {
            dispatch(setFormData(null));
            return;
        }
        const data = result.data;

        data.productOptions = data.productOptions.map((item) => ({ id: item.code, value: item.name, status: true }));
        defaultState.selectedProduct = data.productOptions.map((item) => item.id).join(',');
        dispatch(setSelectedProducts(defaultState.selectedProduct));

        data.currencyList = data.currencyList.map((item) => ({ id: item.key, value: item.value, status: true }));
        defaultState.selectedCurrency = data.currencyList.map((item) => item.id).join(',');
        dispatch(setSelectedCurrency(defaultState.selectedCurrency));

        data.baseCurrencyList = data.baseCurrencyList.map((item) => ({ value: item.key, label: item.value }));

        const defaultBaseCurrency = data.baseCurrencyList.find((x) => x.label == data.defaultBaseCurrency);
        data.defaultBaseCurrency = defaultBaseCurrency ? defaultBaseCurrency : { value: DEFAULT_BASE_CURRENCY_VALUE, label: data.defaultBaseCurrency };
        defaultState.selectedBaseCurrency = data.defaultBaseCurrency;
        dispatch(setSelectedBaseCurrency(defaultState.selectedBaseCurrency));

        defaultState.selectedStatus = data.statusList.map((item) => item.id).join(',');
        dispatch(setSelectedStatus(defaultState.selectedStatus));

        data.statusList = data.statusList.map((item) => ({ id: item.id, value: item.name, status: true }));
        data.liveStatusList = data.liveStatusList.map((item) => ({ id: item.key, value: item.value, status: true }));
        defaultState.selectedLiveStatus = data.liveStatusList.map((item) => item.id).join(',');
        dispatch(setSelectedLiveStatus(defaultState.selectedLiveStatus));

        data.platformList = data.platformList.map((item) => ({ id: item.key, value: item.value, status: true }));
        defaultState.selectedPlatform = data.platformList.map((item) => item.id).join(',');
        dispatch(setSelectedPlatform(defaultState.selectedPlatform));

        data.oddsGroupList = data.oddsGroupList.map((item) => ({ id: item, value: item, status: true }));
        defaultState.selectedOddsGroup = data.oddsGroupList.map((item) => item.id).join(',');
        dispatch(setSelectedOddsGroup(defaultState.selectedOddsGroup));

        const defaultSelectedCustomerClass = data.riskLevel.map((item) => item.customerClassList.map((item) => item).join(','));
        defaultState.selectedCustomerClass = defaultSelectedCustomerClass.map((item) => item).join(',');
        dispatch(setSelectedCustomerClass(defaultState.selectedCustomerClass));

        data.riskLevelList = data.riskLevel.map((item) => ({
            id: item.id,
            value: item.name,
            valueDecoration: 'risk-level ' + item.key,
            customerClassList: item.customerClassList.map((item) => item).join(','),
            status: true,
        }));

        defaultState.selectedVipOnly = VipOnlyList[0];
        defaultState.subsidiaryList = data.subsidiaryList;

        dispatch(setDefaultState(defaultState));
        dispatch(setProductList(data.productOptions));
        dispatch(setFormData(data));
    };

    useLayoutEffect(() => {
        sendRequest(() => DataService.postReportData(ApiUrl.INIT_FORM_URL), setInitFormData);
    }, []);

    const desktopLayout = (
        <AppLayout>
            <Loader isLoading={isLoading} />
            {formData && <FormFilter />}
            {formData && <DataGrid />}
        </AppLayout>
    );

    const mobileLayout = (
        <div className="mobile-container">
            <AppLayout>
                <Loader isLoading={isLoading} />
                {formData && <MobileFormFilter />}
                {formData && <MobileDataGrid />}
            </AppLayout>
        </div>
    );

    return isUseMobileVer && formData ? mobileLayout : desktopLayout;
};

export default AppContainer;
