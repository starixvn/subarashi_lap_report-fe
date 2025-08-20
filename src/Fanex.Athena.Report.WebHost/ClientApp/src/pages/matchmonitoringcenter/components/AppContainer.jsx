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
import PopupPage from './PopupPage';
import { constants } from '../common';
import { v4 as uuidv4 } from 'uuid';

export const AppContainer = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const [formData, isLoading] = useSelector(state => [state.formData, state.isLoading]);

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
        setLeagueList,
        setRequestParam,
        setAppUuid,
    } = ActionCreators;
    const { ApiUrl, CurrencySelectAll, TriggerAlert, MatchStatus } = constants;

    const setInitFormData = result => {
        if (!result || !result.data) {
            dispatch(setFormData(null));
            return;
        }

        const data = result.data;

        data.baseCurrencies = data.baseCurrencies.map(item => ({
            value: item.key,
            label: item.value,
        }));

        data.currencies = [
            CurrencySelectAll,
            ...data.currencies.map(item => ({
                value: item.key,
                label: item.value,
            })),
        ];

        const selectedCurrency = data.currencyId ? data.currencies.find(c => c.value === data.currencyId) || data.currencies[0] : data.currencies[0];

        let selectedBaseCurrency = data.baseCurrencies.find(x => x.label === data.baseCurrency);
        let defaultBaseCurrency = data.baseCurrencies.find(x => x.label === data.defaultBaseCurrency);
        const defaultBaseCurrencyList = data.baseCurrencies;

        if (!selectedBaseCurrency) {
            selectedBaseCurrency = {
                value: DEFAULT_BASE_CURRENCY_VALUE,
                label: data.defaultBaseCurrency,
            };
        }

        if (!defaultBaseCurrency) {
            defaultBaseCurrency = {
                value: DEFAULT_BASE_CURRENCY_VALUE,
                label: data.defaultBaseCurrency,
            };
        }

        if (selectedCurrency.value !== 0 && !data.baseCurrencies.find(x => x.label === selectedCurrency.label)) {
            const newBaseCurrencyList = data.baseCurrencies.slice(0);
            selectedBaseCurrency = { ...selectedCurrency, isEmpty: true };
            newBaseCurrencyList.push(selectedBaseCurrency);
            data.baseCurrencies = newBaseCurrencyList;
        }

        const matchIds = data.matchIds.split(',').map(item => Number(item.trim()));
        const leagueIds = data.leagueIds.split(',').map(item => Number(item.trim()));

        data.matchList = data.matchList.map(item => ({
            ...item,
            status: matchIds.includes(item.id),
        }));
        data.leagueList = data.leagueList.map(item => ({
            ...item,
            status: leagueIds.includes(item.id),
        }));

        const defaultState = {
            selectedBaseCurrency: defaultBaseCurrency,
            selectedMatch: data.matchList.map(item => item.id),
            selectedLeague: data.leagueList.map(item => item.id),
            selectedMatchStatus: MatchStatus[0],
            selectedTriggeredAlert: TriggerAlert[0],
            selectedCurrency: CurrencySelectAll,
            leagueList: data.leagueList.map(item => ({ ...item, status: true })),
            baseCurrencyList: defaultBaseCurrencyList,
        };

        const params = {
            MatchStatus: MatchStatus[0].value,
            MatchIdList: data.matchIds,
            TriggeredAlert: TriggerAlert[0].value,
            BaseCurrency: selectedBaseCurrency.isEmpty ? '' : selectedBaseCurrency.label,
            BaseCurrencyName: selectedBaseCurrency.label,
            CurrencyName: selectedCurrency.label,
            CurrencyId: selectedCurrency.value,
        };

        batch(() => {
            dispatch(setBaseCurrencyList(data.baseCurrencies));
            dispatch(setSelectedBaseCurrency(selectedBaseCurrency));
            dispatch(setRequestParam(params));
            dispatch(setSelectedCurrency(selectedCurrency));
            dispatch(setSelectedMatchStatus(MatchStatus[0]));
            dispatch(setSelectedTriggeredAlert(TriggerAlert[0]));
            dispatch(setSelectedLeague(data.leagueIds));
            dispatch(setSelectedMatch(data.matchIds));
            dispatch(setFormData(data));
            dispatch(setMatchList(data.matchList));
            dispatch(setLeagueList(data.leagueList));
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
            <PopupPage />
        </React.Fragment>
    );
};

export default React.memo(AppContainer);
