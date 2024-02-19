import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ActionCreators } from '../actions/index';
import DataGrid from './desktop/DataGrid';
import FormFilter from './desktop/FormFilter';
import MobileDataGrid from './mobile/MobileDataGrid';
import MobileFormFilter from './mobile/MobileFormFilter';
import useMobileVersion from '@srcRoot/hooks/useMobileVersion';
import Loader from '@srcRoot/components/Loader';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import DataService from '@srcRoot/lib/dataService';
import { ApiUrl, VipOnlyList } from '../common/constants';
import AppLayout from '../../../layouts/AppLayout';

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
        defaultState.selectedProduct = data.productOptions.slice(1).reduce((acc, cur) => acc + ',' + cur.id, data.productOptions[0].id);
        dispatch(setSelectedProducts(defaultState.selectedProduct));

        data.currencyList = data.currencyList.map((item) => ({ id: item.key, value: item.value, status: true }));
        defaultState.selectedCurrency = data.currencyList.slice(1).reduce((acc, cur) => acc + ',' + cur.id, data.currencyList[0].id);
        dispatch(setSelectedCurrency(defaultState.selectedCurrency));

        data.baseCurrencyList = data.baseCurrencyList.map((item) => ({ value: item.key, label: item.value }));
        data.defaultBaseCurrency = data.baseCurrencyList.find((x) => x.label == data.defaultBaseCurrency);
        defaultState.selectedBaseCurrency = data.defaultBaseCurrency;
        dispatch(setSelectedBaseCurrency(defaultState.selectedBaseCurrency));

        defaultState.selectedStatus = data.statusList.slice(1).reduce((acc, cur) => acc + ',' + cur.id, data.statusList[0].id);
        dispatch(setSelectedStatus(defaultState.selectedStatus));

        data.statusList = data.statusList.map((item) => ({ id: item.id, value: item.name, status: true }));
        data.liveStatusList = data.liveStatusList.map((item) => ({ id: item.key, value: item.value, status: true }));
        defaultState.selectedLiveStatus = data.liveStatusList.slice(1).reduce((acc, cur) => acc + ',' + cur.id, data.liveStatusList[0].id);
        dispatch(setSelectedLiveStatus(defaultState.selectedLiveStatus));

        data.platformList = data.platformList.map((item) => ({ id: item.key, value: item.value, status: true }));
        defaultState.selectedPlatform = data.platformList.slice(1).reduce((acc, cur) => acc + ',' + cur.id, data.platformList[0].id);
        dispatch(setSelectedPlatform(defaultState.selectedPlatform));

        data.oddsGroupList = data.oddsGroupList.map((item) => ({ id: item, value: item, status: true }));
        defaultState.selectedOddsGroup = data.oddsGroupList.slice(1).reduce((acc, cur) => acc + ',' + cur.id, data.oddsGroupList[0].id);
        dispatch(setSelectedOddsGroup(defaultState.selectedOddsGroup));

        const defaultSelectedCustomerClass = data.riskLevel.map((item) =>
            item.customerClassList.slice(1).reduce((acc, cur) => acc + ',' + cur, item.customerClassList[0])
        );
        defaultState.selectedCustomerClass = defaultSelectedCustomerClass.slice(1).reduce((acc, cur) => acc + ',' + cur, defaultSelectedCustomerClass[0]);
        dispatch(setSelectedCustomerClass(defaultState.selectedCustomerClass));

        data.riskLevelList = data.riskLevel.map((item) => ({
            id: item.id,
            value: item.name,
            valueDecoration: 'risk-level ' + item.key,
            customerClassList: item.customerClassList.slice(1).reduce((acc, cur) => acc + ',' + cur, item.customerClassList[0]),
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
