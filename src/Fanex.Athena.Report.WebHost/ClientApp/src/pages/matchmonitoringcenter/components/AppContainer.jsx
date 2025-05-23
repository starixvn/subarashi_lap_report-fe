import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { DEFAULT_BASE_CURRENCY_VALUE } from '@/constants/config';
import Loader from '@/components/Loader';
import useToggleRequest from '@/hooks/useToggleRequest';
import DataService from '@/lib/dataService';

import { ActionCreators } from '../actions';
import DataGrid from './DataGrid';
import FormFilter from './FormFilter';
import { constants } from '../common';
import { v4 as uuidv4 } from 'uuid';

export const AppContainer = (props) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const [formData, isLoading] = useSelector((state) => [state.formData, state.isLoading]);

    const { sendRequest } = useToggleRequest();

    const {
        setFormData,
        setSelectedBaseCurrency,
        setBaseCurrencyList,
        setSelectedCurrency,
        setSelectedLeague,
        setSelectedMatch,
        setDefaultState,
        setSelectedMatchStatus,
        setSelectedTriggeredAlert,
        setMatchList,
        setRequestParam,
        setAppUuid,
    } = ActionCreators;
    const { ApiUrl, CurrencySelectAll, TriggerAlert, MatchStatus } = constants;

    const setInitFormData = (result) => {
        if (!result || !result.data) {
            dispatch(setFormData(null));
            return;
        }

        const data = result.data;

        data.baseCurrencies = data.baseCurrencies.map((item) => ({ value: item.key, label: item.value }));
        dispatch(setBaseCurrencyList(data.baseCurrencies));

        data.baseCurrency = data.baseCurrencies.find((x) => x.label == data.baseCurrency);
        data.baseCurrency = data.baseCurrency ? data.baseCurrency : { value: DEFAULT_BASE_CURRENCY_VALUE, label: data.defaultBaseCurrency };
        dispatch(setSelectedBaseCurrency(data.baseCurrency));

        data.currencies = [
            CurrencySelectAll,
            ...data.currencies.map((item) => ({
                value: item.key,
                label: item.value,
            })),
        ];

        const matchIds = data.matchIds.split(',').map((item) => Number(item.trim()));
        const leagueIds = data.leagueIds.split(',').map((item) => Number(item.trim()));

        data.matchList = data.matchList.map((item) => ({ ...item, status: matchIds.includes(item.id) }));
        data.leagueList = data.leagueList.map((item) => ({ ...item, status: leagueIds.includes(item.id) }));

        const defaultState = {};
        defaultState.selectedBaseCurrency = data.baseCurrency;
        defaultState.selectedMatch = data.matchIds;
        defaultState.selectedLeague = data.leagueIds;
        defaultState.selectedMatchStatus = MatchStatus[0];
        defaultState.selectedTriggeredAlert = TriggerAlert[0];
        defaultState.selectedCurrency = data.currencies[0];

        const params = {
            MatchStatus: MatchStatus[0].value,
            MatchIdList: data.matchIds,
            TriggeredAlert: TriggerAlert[0].value,
            BaseCurrency: data.baseCurrency.isEmpty ? '' : data.baseCurrency.label,
            BaseCurrencyName: data.baseCurrency.label,
            CurrencyName: data.currencies[0].label,
            CurrencyId: data.currencies[0].value,
        };
        batch(() => {
            dispatch(setRequestParam(params));
            dispatch(setSelectedCurrency(data.currencies[0]));
            dispatch(setSelectedMatchStatus(MatchStatus[0]));
            dispatch(setSelectedTriggeredAlert(TriggerAlert[0]));
            dispatch(setSelectedLeague(data.leagueIds));
            dispatch(setSelectedMatch(data.matchIds));
            dispatch(setFormData(data));
            dispatch(setMatchList(data.matchList));
            dispatch(setDefaultState(defaultState));
            dispatch(setAppUuid(`${uuidv4()}`));
        });
    };

    useEffect(() => {
        const queryString = searchParams.toString();
        const url = queryString ? `${ApiUrl.INIT_FORM_URL}?${queryString}` : ApiUrl.INIT_FORM_URL;
        sendRequest(() => DataService.getReportData(url), setInitFormData);
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
