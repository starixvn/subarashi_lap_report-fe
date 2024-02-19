import DataService from '@srcRoot/lib/dataService';
import Service from '../common/Service';
import * as types from './types';
import Cache from '@srcRoot/lib/cache';

const BETTYPE_CACHE_KEY = 'WINLOSSANALYSIS_BETTYPE_CACHE_KEY';

let currentCancellationTokenSource = null;

const dispatchBettypeList = (dispatch, data) => {
    const selectedSports = Service.getSelectedItemFromTreeListItem(data);
    dispatch(setBettypeList(data));
    dispatch(setSelectedBettype(selectedSports));
};

export const setSelectedBettype = (betTypeIds) => {
    return {
        type: types.SET_SELECTED_BETTYPE,
        data: betTypeIds,
    };
};

export const setBettypeList = (list) => {
    return {
        type: types.SET_BETTYPE_LIST,
        data: list,
    };
};

export const getBetTypeList = (productCodes, licenseeName) => {
    const cacheKey = BETTYPE_CACHE_KEY + productCodes + licenseeName;
    return async (dispatch) => {
        var cacheData = Cache.get(cacheKey);
        if (cacheData) {
            dispatchBettypeList(dispatch, [...cacheData]);
            return;
        }
        if (currentCancellationTokenSource) {
            currentCancellationTokenSource.cancel('Operation canceled by the user.');
        }
        currentCancellationTokenSource = DataService.genCancellationToken();
        try {
            const response = await DataService.getReportData(
                'api/CommonData/GetBetTypeInTreeList',
                { productCodes: productCodes },
                currentCancellationTokenSource
            );
            currentCancellationTokenSource = null;
            const data = response.data;
            Cache.set(cacheKey, data, 10);
            dispatchBettypeList(dispatch, data);
        } catch (e) {
            if (DataService.isCancel(e)) {
                return;
            } else {
                // handle error
            }
        }
    };
};
