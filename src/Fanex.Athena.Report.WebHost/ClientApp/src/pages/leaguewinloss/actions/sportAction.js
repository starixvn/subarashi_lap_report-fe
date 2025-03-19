import DataService from '@/lib/dataService';
import Service from '../common/service';
import * as types from './types.js';
import ObjectHelper from '@/lib/objectHelper.js';

const setSelectedSport = (sportId) => {
    return {
        type: types.SET_SELECTED_SPORT,
        data: sportId,
    };
};

const setSportList = (list) => {
    return {
        type: types.SET_SPORT_LIST,
        data: list,
    };
};

const getSportList = (productCodes) => {
    return async (dispatch) => {
        const response = await DataService.getData('api/CommonDataApi/GetSportsForTreeView', { productCodes: productCodes });
        const data = response.data;
        const camelData = ObjectHelper.toCamel(data);
        const selectedSports = Service.getSelectedItemFromTreeListItem(camelData);
        dispatch(setSportList(camelData));
        dispatch(setSelectedSport(selectedSports));
    };
};

export default {
    getSportList,
    setSportList,
    setSelectedSport,
};
