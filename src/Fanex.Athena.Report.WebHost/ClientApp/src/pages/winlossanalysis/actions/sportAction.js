import DataService from '@srcRoot/lib/dataService';
import Service from '../common/Service';
import * as types from './types';

export const setSelectedSport = (sportId) => {
    return {
        type: types.SET_SELECTED_SPORT,
        data: sportId,
    };
};

export const setSportList = (list) => {
    return {
        type: types.SET_SPORT_LIST,
        data: list,
    };
};

export function getSportList(productCodes) {
    return async (dispatch) => {
        const response = await DataService.getReportData('api/CommonData/GetSportsForTreeView', { productCodes: productCodes });
        const data = response.data;
        const selectedSports = Service.getSelectedItemFromTreeListItem(data);
        dispatch(setSportList(data));
        dispatch(setSelectedSport(selectedSports));
    };
}
