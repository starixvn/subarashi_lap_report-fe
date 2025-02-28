import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '@/components/Loader';
import LangHelper from '@/helpers/langHelper';
import useToggleRequest from '@/hooks/useToggleRequest';
import DataService from '@/lib/dataService';

import actions from '../actions';
import { constants } from '../common';
import DataGrid from './DataGrid';
import FormFilter from './FormFilter';
import GridBreadcrumb from './GridBreadcrumb';

export const AppContainer = (props) => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const isLoading = useSelector((state) => state.isLoading);

    const { sendRequest } = useToggleRequest();

    const { setFormData, setSelectedCurrency } = actions;
    const { SelectAllOption, ApiUrl } = constants;
    const setInitFormData = (result) => {
        if (!result || !result.data) {
            dispatch(setFormData(null));
            return;
        }

        const data = result.data;

        const currencySelectAllOption = { ...SelectAllOption };
        currencySelectAllOption.label = currencySelectAllOption.label.toUpperCase();
        data.currencies = [
            currencySelectAllOption,
            ...data.baseCurrencies.map((item) => ({ value: item.key, label: `${LangHelper.getSingleResource('Based')} ${item.value}` })).reverse(),
            ...data.currencies.map((item) => ({
                value: item.key,
                label: item.value,
            })),
        ];

        const defaultSelectedCurrency = data.currencies.find((x) => x.value == data.currencyId);
        dispatch(setSelectedCurrency(defaultSelectedCurrency));

        dispatch(setFormData(data));
    };

    useEffect(() => {
        sendRequest(() => DataService.getReportData(ApiUrl.INIT_FORM_URL), setInitFormData);
    }, []);

    return (
        <React.Fragment>
            <Loader isLoading={isLoading} />
            {formData && <FormFilter />}
            <GridBreadcrumb />
            <DataGrid />
        </React.Fragment>
    );
};

export default React.memo(AppContainer);
