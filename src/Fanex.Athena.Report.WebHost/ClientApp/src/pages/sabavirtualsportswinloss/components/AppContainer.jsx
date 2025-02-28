import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '@/components/Loader';
import useToggleRequest from '@/hooks/useToggleRequest';
import DataService from '@/lib/dataService';
import LangHelper from '@/helpers/langHelper';

import actions from '../actions';
import { constants } from '../common';
import BetListCustomerPopup from './BetListCustomerPopup';
import DataGrid from './DataGrid';
import FormFilter from './FormFilter';

export const AppContainer = (props) => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const isLoading = useSelector((state) => state.isLoading);

    const { sendRequest } = useToggleRequest();

    const { setFormData, setSelectedSport, setSelectedCurrency } = actions;
    const { SelectAllOption } = constants;
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

        data.sports = [
            SelectAllOption,
            ...data.sports.map((item) => ({
                value: item.key,
                label: item.value,
            })),
        ];

        const defaultSelectedCurrency = data.currencies.find((x) => x.value == data.currencyId);
        dispatch(setSelectedCurrency(defaultSelectedCurrency));

        dispatch(setSelectedSport(data.sports[0]));
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
            <BetListCustomerPopup />
        </React.Fragment>
    );
};

export default React.memo(AppContainer);
