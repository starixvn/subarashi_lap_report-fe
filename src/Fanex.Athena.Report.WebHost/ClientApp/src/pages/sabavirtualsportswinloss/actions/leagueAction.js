import DataService from '@srcRoot/lib/dataService';
import * as types from './types';
import { constants } from '../common';
import { SelectAllOption } from '../common/filter';

export const setSelectedLeague = (settings) => {
    return {
        type: types.SET_SELECTED_LEAGUE,
        data: settings,
    };
};

export const setLeagueList = (settings) => {
    return {
        type: types.SET_LEAGUE_LIST,
        data: settings,
    };
};

export const fetchLeagueList = (params) => {
    return async (dispatch) => {
        const response = await DataService.postReportData(constants.ApiUrl.LEAGUE_DATA_URL, params);
        const data = response.data;

        if (!data?.length) {
            dispatch(setLeagueList(null));
            dispatch(setSelectedLeague(SelectAllOption));
            return;
        }

        const leagues = [
            SelectAllOption,
            ...data.map((item) => ({
                value: item.leagueId,
                label: item.leagueName,
            })),
        ];

        dispatch(setLeagueList(leagues));
        dispatch(setSelectedLeague(leagues[0]));
    };
};
