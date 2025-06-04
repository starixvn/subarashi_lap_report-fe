import useToggleRequest from '@/hooks/useToggleRequest';
import { useDispatch, useSelector, shallowEqual, batch } from 'react-redux';

import { MATCH_MONITORING_CENTER } from '@/constants/pages';
import LangHelper from '@/helpers/langHelper';
import DataService from '@/lib/dataService';
import Site from '@/lib/site';

import { ActionCreators } from '../actions';
import { constants } from '../common';
import { v4 as uuidv4 } from 'uuid';

export const useFilterAction = () => {
    const { sendRequest } = useToggleRequest();
    const dispatch = useDispatch();

    const [
        selectedMatchStatus,
        selectedMatch,
        selectedTriggeredAlert,
        selectedBaseCurrency,
        selectedCurrency,
        userGuideContent,
        defaultState,
        formData,
        requestParam,
    ] = useSelector(
        (state) => [
            state.selectedMatchStatus,
            state.selectedMatch,
            state.selectedTriggeredAlert,
            state.selectedBaseCurrency,
            state.selectedCurrency,
            state.userGuideContent,
            state.defaultState,
            state.formData,
            state.requestParam,
        ],
        shallowEqual
    );

    const {
        setGridData,
        setSelectedCurrency,
        setSelectedBaseCurrency,
        setRequestParam,
        getUserGuideContent,
        setSelectedMatchStatus,
        setSelectedTriggeredAlert,
        setSelectedMatch,
        setSelectedLeague,
        setMatchList,
        setAppUuid,
        setLastFetchTime,
    } = ActionCreators;

    const { ApiUrl } = constants;

    const resetFilter = (event) => {
        event.preventDefault();

        batch(() => {
            dispatch(setSelectedMatchStatus(defaultState.selectedMatchStatus));
            dispatch(setSelectedTriggeredAlert(defaultState.selectedTriggeredAlert));
            dispatch(setSelectedMatch(defaultState.selectedMatch));
            dispatch(setSelectedLeague(defaultState.selectedLeague));
            dispatch(setSelectedCurrency(defaultState.selectedCurrency));
            dispatch(setSelectedBaseCurrency(defaultState.selectedBaseCurrency));
            dispatch(setMatchList(formData.matchList));
            dispatch(setAppUuid(`${uuidv4()}`));
        });
    };

    const submit = (event) => {
        event.preventDefault();
        const params = getParams();
        sendRequest(() => DataService.postReportData(ApiUrl.DATA_URL, params), updateData);
        dispatch(setRequestParam(params));
        dispatch(setLastFetchTime(new Date().getTime()));
    };

    const fetchData = () => {
        sendRequest(() => DataService.postReportData(ApiUrl.DATA_URL, requestParam), updateData);
    };

    const updateData = (result) => {
        if (result && result.data !== null) {
            const gridData = result.data;

            dispatch(setGridData(gridData));
            return;
        }

        dispatch(setGridData(null));
    };

    const getParams = () => {
        const params = {
            MatchStatus: selectedMatchStatus.value,
            MatchIdList: selectedMatch,
            TriggeredAlert: selectedTriggeredAlert.value,
            BaseCurrency: selectedBaseCurrency.isEmpty ? '' : selectedBaseCurrency.label,
            BaseCurrencyName: selectedBaseCurrency.label,
            CurrencyName: selectedCurrency.label,
            CurrencyId: selectedCurrency.value,
        };

        return params;
    };

    const fetchUserGuide = () => {
        if (!userGuideContent) {
            sendRequest(() => dispatch(getUserGuideContent(MATCH_MONITORING_CENTER)));
        }
    };

    const exportExcel = () => {
        sendRequest(() => DataService.getReportFile(ApiUrl.EXPORT_EXCEL_URL, getParams()), downLoadExcel);
    };

    const downLoadExcel = (response) => {
        const NoContentStatusCode = 204;

        if (response.status === NoContentStatusCode) {
            alert(LangHelper.getSingleResource('NoInfo'));
        } else {
            Site.downloadFile(response.data, `${MATCH_MONITORING_CENTER}.xlsx`);
        }
    };

    return { submit, resetFilter, fetchData, exportExcel, fetchUserGuide };
};

export default useFilterAction;
