import * as types from './types';
import DataService from '@/lib/dataService';

import { constants } from '../common';

export const setSelectedMatchStatus = (item) => {
    return {
        type: types.SET_SELECTED_MATCH_STATUS,
        data: item,
    };
};

export const setSelectedTriggeredAlert = (item) => {
    return {
        type: types.SET_SELECTED_TRIGGERED_ALERT,
        data: item,
    };
};

export const setSelectedMatch = (item) => {
    return {
        type: types.SET_SELECTED_MATCH,
        data: item,
    };
};

export const setMatchList = (item) => {
    return {
        type: types.SET_MATCH_LIST,
        data: item,
    };
};

export const setDefaultState = (item) => {
    return {
        type: types.SET_DEFAULT_STATE,
        data: item,
    };
};

export const setSelectedLeague = (item) => {
    return {
        type: types.SET_SELECTED_LEAGUE,
        data: item,
    };
};

export const setAppUuid = (value) => {
    return {
        type: types.SET_APP_UUID,
        data: value,
    };
};

export const getMatchList = (leagueIds) => {
    const { ApiUrl } = constants;
    return async (dispatch) => {
        if (leagueIds.length === 0) {
            dispatch(setMatchList([]));
            dispatch(setSelectedMatch(''));
            return;
        }
        const response = await DataService.getReportData(ApiUrl.GET_MATCH_LIST_URL, { leagueIds: leagueIds });
        const data = response.data;
        const matchList = data.map((item) => ({ ...item, status: true }));
        const matchIds = matchList.map((item) => item.id).join(',');
        dispatch(setMatchList(matchList));
        dispatch(setSelectedMatch(matchIds));
    };
};
