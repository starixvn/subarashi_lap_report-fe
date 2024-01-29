import DataService from '@srcRoot/lib/dataService';
import Cache from '@srcRoot/lib/cache';
import * as types from './types';

const BETTYPE_CACHE_KEY = 'BETTYPE_CACHE_KEY';

const dispatchBettypeList = (dispatch, data) => {
    data.length && data[0].value == 0 && data.shift();

    dispatch(setBettypeList(data));
    if (data.length > 0) {
        const bettypeList = data.map((item) => item.value).join(',');
        dispatch(setSelectedBettype(bettypeList));
    }
};

const setSelectedBettype = (bettypeId) => {
    return {
        type: types.SET_SELECTED_BETTYPE,
        data: bettypeId,
    };
};

const setBettypeList = (list) => {
    return {
        type: types.SET_BETTYPE_LIST,
        data: list,
    };
};

const getBettypeList = (productCode) => {
    const cacheKey = BETTYPE_CACHE_KEY + productCode;
    return (dispatch) => {
        var cacheData = Cache.get(cacheKey);
        if (cacheData) {
            dispatchBettypeList(dispatch, cacheData);
            return;
        }

        DataService.getReportData('api/CommonData/GetBettypes', { productCode: productCode }).then((response) => {
            var data = response.data;
            Cache.set(cacheKey, data);
            dispatchBettypeList(dispatch, data);
        });
    };
};

export default {
    getBettypeList,
    setBettypeList,
    setSelectedBettype,
};
