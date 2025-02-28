import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_BASE_CURRENCY_VALUE } from '@/constants/config';
import Loader from '@/components/Loader';
import useToggleRequest from '@/hooks/useToggleRequest';
import DataService from '@/lib/dataService';

import ActionCreators from '../actions/index';
import DataGrid from './DataGrid';
import FormFilter from './FormFilter';
import { ApiUrl } from '../common/constants';

export const AppContainer = (props) => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const isLoading = useSelector((state) => state.isLoading);

    const { sendRequest } = useToggleRequest();

    const { setFormData, setSubsidiaryList, setSelectedProducts, setSelectedCurrency, setSelectedBaseCurrency } = ActionCreators;

    const setInitFormData = (result) => {
        if (!result || !result.data) {
            dispatch(setFormData(null));
            return;
        }
        const data = result.data;

        data.currencyList = data.currencyList.map((item) => ({ ...item, status: true }));

        data.baseCurrencyList = data.baseCurrencyList.map((item) => ({
            value: item.key,
            label: item.value,
        }));
        const defaultBaseCurrency = data.baseCurrencyList.find((x) => x.label == data.defaultBaseCurrency);
        data.defaultBaseCurrency = defaultBaseCurrency ? defaultBaseCurrency : { value: DEFAULT_BASE_CURRENCY_VALUE, label: data.defaultBaseCurrency };
        dispatch(setSelectedBaseCurrency(data.defaultBaseCurrency));

        const defaultSelectedCurrency = data.currencyList.map((item) => item.key).join(',');
        dispatch(setSelectedCurrency(defaultSelectedCurrency));

        const defaultSelectedProduct = data.productOptions.map((item) => item.code).join(',');
        dispatch(setSelectedProducts(defaultSelectedProduct));

        dispatch(setSubsidiaryList(data.subsidiaryList.join(',')));
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
