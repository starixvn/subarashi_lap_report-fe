import DataService from '@/lib/dataService';
import Service from '../common/Service';
import { SET_SELECTED_SPORT, SET_SPORT_LIST } from './types';
import ObjectHelper from '@/lib/objectHelper';

export const setSelectedSport = sportId => ({
    type: SET_SELECTED_SPORT,
    data: sportId,
});

export const setSportList = list => ({
    type: SET_SPORT_LIST,
    data: list,
});

export function getSportList(productCodes) {
    return async dispatch => {
        const response = await DataService.getData('api/CommonDataApi/GetSportsForTreeView', { productCodes: productCodes });
        const data = response.data;
        const camelData = ObjectHelper.toCamel(data);
        const selectedSports = Service.getSelectedItemFromTreeListItem(camelData);
        dispatch(setSportList(camelData));
        dispatch(setSelectedSport(selectedSports));
    };
}
