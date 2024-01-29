import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '@srcRoot/components/Loader';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import DataService from '@srcRoot/lib/dataService';

import ActionCreators from '../actions/index';
import DataGrid from './DataGrid';
import FormFilter from './FormFilter';
import { ApiUrl } from '../common/constants';

export const AppContainer = (props) => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const isLoading = useSelector((state) => state.isLoading);

    const { sendRequest } = useToggleRequest();

    const { setFormData, setSelectedStatus, setSelectedProducts, setSelectedCurrency, setSelectedBaseCurrency } = ActionCreators;

    const setInitFormData = (result) => {
        if (!result || !result.data) {
            dispatch(setFormData(null));
            return;
        }
        const data = result.data;

        data.statusList = data.statusList.map((item) => ({ value: item.id, label: item.name, status: true }));
        data.currencyList = data.currencyList.map((item) => ({ ...item, status: true }));

        data.baseCurrencyList = data.baseCurrencyList.map((item) => ({ value: item.key, label: item.value }));
        data.defaultBaseCurrency = data.baseCurrencyList.find((x) => x.label == data.defaultBaseCurrency);
        dispatch(setSelectedBaseCurrency(data.defaultBaseCurrency));

        const defaultSelectedCurrency = data.currencyList.slice(1).reduce((acc, cur) => acc + ',' + cur.key, data.currencyList[0].key);
        dispatch(setSelectedCurrency(defaultSelectedCurrency));

        const defaultSelectedProduct = data.productOptions.slice(1).reduce((acc, cur) => acc + ',' + cur.code, data.productOptions[0].code);
        dispatch(setSelectedProducts(defaultSelectedProduct));

        const defaultSelectedstatus = data.statusList.slice(1).reduce((acc, cur) => acc + ',' + cur.value, data.statusList[0].value);
        dispatch(setSelectedStatus(defaultSelectedstatus));

        dispatch(setFormData(data));
    };

    useLayoutEffect(() => {
        sendRequest(() => DataService.postReportData(ApiUrl.INIT_FORM_URL), setInitFormData);
    }, []);

    return (
        <React.Fragment>
            <Loader isLoading={isLoading} />
            {formData && <FormFilter />}
            <DataGrid />
        </React.Fragment>
    );
};

export default React.memo(AppContainer);
