import {
    SET_SELECTED_MATCH_STATUS,
    SET_SELECTED_TRIGGERED_ALERT,
    SET_SELECTED_MATCH,
    SET_MATCH_LIST,
    SET_DEFAULT_STATE,
    SET_SELECTED_LEAGUE,
    SET_APP_UUID,
    SET_LEAGUE_LIST,
} from './types';
import DataService from '@/lib/dataService';

import { constants } from '../common';

export const setSelectedMatchStatus = item => ({
    type: SET_SELECTED_MATCH_STATUS,
    data: item,
});

export const setSelectedTriggeredAlert = item => ({
    type: SET_SELECTED_TRIGGERED_ALERT,
    data: item,
});

export const setSelectedMatch = item => ({
    type: SET_SELECTED_MATCH,
    data: item,
});

export const setMatchList = item => ({
    type: SET_MATCH_LIST,
    data: item,
});

export const setDefaultState = item => ({
    type: SET_DEFAULT_STATE,
    data: item,
});

export const setSelectedLeague = item => ({
    type: SET_SELECTED_LEAGUE,
    data: item,
});

export const setAppUuid = value => ({
    type: SET_APP_UUID,
    data: value,
});

export const getMatchList = leagueIds => {
    const { ApiUrl } = constants;
    return async dispatch => {
        if (leagueIds.length === 0) {
            dispatch(setMatchList([]));
            dispatch(setSelectedMatch(''));
            return;
        }
        const response = await DataService.getReportData(ApiUrl.GET_MATCH_LIST_URL, { leagueIds: leagueIds });
        const data = response.data;
        const matchList = data.map(item => ({ ...item, status: true }));
        const matchIds = matchList.map(item => item.id).join(',');
        dispatch(setMatchList(matchList));
        dispatch(setSelectedMatch(matchIds));
    };
};

export const setLeagueList = item => ({
    type: SET_LEAGUE_LIST,
    data: item,
});
