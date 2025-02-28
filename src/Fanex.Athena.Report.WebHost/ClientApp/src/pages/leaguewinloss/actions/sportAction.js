import DataService from '@/lib/dataService';
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

const getSportList = (productCode, date) => {
    return (dispatch) => {
        DataService.getData('api/CommonDataApi/GetSports', {
            productCode: productCode,
            includeSabaSport: true,
        }).then((response) => {
            let data = response.data;
            let camelData = ObjectHelper.toCamel(data);
            var sportList = camelData.map((item) => item.value).join(',');
            dispatch(setSportList(camelData));
            dispatch(setSelectedSport(sportList));
        });
    };
};

export default {
    getSportList,
    setSportList,
    setSelectedSport,
};
