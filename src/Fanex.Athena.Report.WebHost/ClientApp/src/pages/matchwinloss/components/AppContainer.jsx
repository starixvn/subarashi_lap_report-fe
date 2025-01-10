import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteLoaderData } from 'react-router-dom';

import { MATCH_WL } from '@srcRoot/constants/pages';
import Loader from '@srcRoot/components/Loader';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import DataService from '@srcRoot/lib/dataService';

import { ActionCreators } from '../actions/index';
import { constants } from '../common';
import DataGrid from './DataGrid';
import FormFilter from './FormFilter';
import Site from '@srcRoot/lib/site';

export const AppContainer = (props) => {
    const dispatch = useDispatch();
    const loadedData = useRouteLoaderData(MATCH_WL);
    const formData = useSelector((state) => state.formData);
    const isLoading = useSelector((state) => state.isLoading);
    const { sendRequest } = useToggleRequest();

    const { DateConstraint } = constants;
    const { setFormData, setSelectedDate, setSelectedProducts, setSelectedCurrency, setSelectedBaseCurrency, setBaseCurrencyList } = ActionCreators;

    const setInitFormData = (result) => {
        if (!result || !result.data) {
            dispatch(setFormData(null));
            return;
        }
        const data = result.data;

        data.baseCurrencies = data.baseCurrencies.map((item) => ({
            value: item.key,
            label: item.value,
        }));
        dispatch(setBaseCurrencyList(data.baseCurrencies));

        const defaultBaseCurrency = data.baseCurrencies.find((x) => x.label == data.baseCurrency);
        data.baseCurrency = defaultBaseCurrency ? defaultBaseCurrency : data.baseCurrencies[0];
        dispatch(setSelectedBaseCurrency(data.baseCurrency));

        data.currencies = [
            constants.CurrencySelectAll,
            ...data.currencies.map((item) => ({
                value: item.key,
                label: item.value,
            })),
        ];

        dispatch(setSelectedCurrency(data.currencies[0]));

        data.isSelfMode = loadedData.IsSelfMode;

        dispatch(setSelectedDate(DateConstraint.today));
        dispatch(setSelectedProducts(data.productOptions));
        dispatch(setFormData(data));
    };

    useEffect(() => {
        if (!Site.getLrfSavedSessionStorage()) {
            sendRequest(() => DataService.getReportData(constants.ApiUrl.INIT_FORM_URL), setInitFormData);
        }
    }, []);

    return (
        <div className="matchwinloss">
            <Loader isLoading={isLoading} />
            {formData && <FormFilter />}
            <DataGrid />
        </div>
    );
};

export default React.memo(AppContainer);
