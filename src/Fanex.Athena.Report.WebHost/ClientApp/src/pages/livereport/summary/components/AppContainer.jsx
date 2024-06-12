import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteLoaderData } from 'react-router-dom';

import { LIVE_REPORT } from '@srcRoot/constants/pages';
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
    const loadedData = useRouteLoaderData(LIVE_REPORT);
    const formData = useSelector((state) => state.formData);
    const isLoading = useSelector((state) => state.isLoading);
    const { sendRequest } = useToggleRequest();

    const { LiveStatuses, CurrencySelectAll, DefaultLiveStatus } = constants;
    const {
        setFormData,
        setSelectedStatus,
        setSelectedCurrency,
        setSelectedBaseCurrency,
        setBaseCurrencyList,
        setSubsidiarySearch,
        setWhiteLabelTreeList,
        setSubsidiaryList,
    } = ActionCreators;

    const setInitFormData = async (result) => {
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

        data.liveStatuses = LiveStatuses;
        dispatch(setSelectedStatus(DefaultLiveStatus));

        data.isSelfMode = loadedData.IsSelfMode;

        dispatch(setSubsidiarySearch(data.subsidiarySearch));
        dispatch(setWhiteLabelTreeList(data.whitelabelList));
        dispatch(setFormData(data));
    };

    useEffect(() => {
        if (!Site.getLrfSavedSessionStorage()) {
            sendRequest(() => DataService.getReportData(constants.ApiUrl.INIT_FORM_URL), setInitFormData);
        }
    }, []);

    return (
        <div className="livereport-summary">
            <Loader isLoading={isLoading} />
            {formData && <FormFilter />}
            <DataGrid />
        </div>
    );
};

export default React.memo(AppContainer);
