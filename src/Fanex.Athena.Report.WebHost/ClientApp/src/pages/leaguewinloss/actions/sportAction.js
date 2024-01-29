import DataService from '@srcRoot/lib/dataService';
import * as types from './types.js';

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
        DataService.getReportData('api/CommonData/GetSports', { productCode: productCode, includeSabaSport: true }).then((response) => {
            let data = response.data;

            var sportList = data.map((item) => item.value).join(',');
            dispatch(setSportList(data));
            dispatch(setSelectedSport(sportList));
        });
    };
};

export default {
    getSportList,
    setSportList,
    setSelectedSport,
};
