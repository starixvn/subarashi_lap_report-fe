import DataService from '@/lib/dataService';
import Cache from '@/lib/cache';
import Service from '../common/service';
import { SET_SELECTED_BETTYPE, SET_BETTYPE_LIST } from './types';
import ObjectHelper from '@/lib/objectHelper';

const BETTYPE_CACHE_KEY = 'BETTYPE_CACHE_KEY';

let currentCancellationTokenSource = null;

const dispatchBettypeList = (dispatch, data) => {
    const selectedSports = Service.getSelectedItemFromTreeListItem(data);
    dispatch(setBettypeList(data));
    dispatch(setSelectedBettype(selectedSports));
};

const setSelectedBettype = bettypeId => ({
    type: SET_SELECTED_BETTYPE,
    data: bettypeId,
});

const setBettypeList = list => ({
    type: SET_BETTYPE_LIST,
    data: list,
});

const getBettypeList = productCodes => {
    const cacheKey = BETTYPE_CACHE_KEY + productCodes;
    return async dispatch => {
        const cacheData = Cache.get(cacheKey);
        if (cacheData) {
            dispatchBettypeList(dispatch, [...cacheData]);
            return;
        }
        if (currentCancellationTokenSource) {
            currentCancellationTokenSource.cancel('Operation canceled by the user.');
        }
        currentCancellationTokenSource = DataService.genCancellationToken();
        try {
            const response = await DataService.getData(
                'api/CommonDataApi/GetBetTypeInTreeList',
                { productCodes: productCodes },
                currentCancellationTokenSource
            );
            currentCancellationTokenSource = null;
            const data = response.data;
            const camelData = ObjectHelper.toCamel(data);
            Cache.set(cacheKey, camelData, 10);
            dispatchBettypeList(dispatch, camelData);
        } catch (e) {
            if (DataService.isCancel(e)) {
                return;
            } else {
                // handle error
            }
        }
    };
};

export default {
    getBettypeList,
    setBettypeList,
    setSelectedBettype,
};
