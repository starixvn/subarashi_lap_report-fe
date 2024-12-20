import DataService from '@srcRoot/lib/dataService';
import Service from '../common/Service';
import * as types from './types';
import ObjectHelper from '@srcRoot/lib/objectHelper';

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
        const response = await DataService.getData('api/CommonDataApi/GetSportsForTreeView', { productCodes: productCodes });
        const data = response.data;
        const camelData = ObjectHelper.toCamel(data);
        const selectedSports = Service.getSelectedItemFromTreeListItem(camelData);
        dispatch(setSportList(camelData));
        dispatch(setSelectedSport(selectedSports));
    };
}
