import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '@srcRoot/components/Loader';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import DataService from '@srcRoot/lib/dataService';

import { ActionCreators } from '../actions/index';
import DataGrid from './DataGrid';
import FormFilter from './FormFilter';
import { constants } from '../common';
import BetListRunningPopup from './BetListRunningPopup';

export const AppContainer = (props) => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const isLoading = useSelector((state) => state.isLoading);

    const { sendRequest } = useToggleRequest();

    const { setFormData, setSelectedBaseCurrency, setBaseCurrencyList, setSelectedCurrency, setSelectedProducts } = ActionCreators;
    const { CurrencySelectAll } = constants;
    const setInitFormData = (result) => {
        if (!result || !result.data) {
            dispatch(setFormData(null));
            return;
        }

        const data = result.data;

        data.baseCurrencies = data.baseCurrencies.map((item) => ({ value: item.key, label: item.value }));
        dispatch(setBaseCurrencyList(data.baseCurrencies));

        data.baseCurrency = data.baseCurrencies.find((x) => x.label == data.baseCurrency);
        data.baseCurrency = data.baseCurrency ? data.baseCurrency : data.baseCurrencies[0];
        dispatch(setSelectedBaseCurrency(data.baseCurrency));

        data.currencies = [
            CurrencySelectAll,
            ...data.currencies.map((item) => ({
                value: item.key,
                label: item.value,
            })),
        ];

        dispatch(setSelectedCurrency(data.currencies[0]));
        dispatch(setSelectedProducts(data.productOptions));
        dispatch(setFormData(data));
    };

    useEffect(() => {
        sendRequest(() => DataService.getReportData(constants.ApiUrl.INIT_FORM_URL), setInitFormData);
    }, []);

    return (
        <React.Fragment>
            <Loader isLoading={isLoading} />
            {formData && <FormFilter />}
            <DataGrid />
            <BetListRunningPopup />
        </React.Fragment>
    );
};

export default React.memo(AppContainer);
