import DataService from '@/lib/dataService';
import * as types from './types';

const setSelectedPromotionTypes = (data) => {
    return {
        type: types.SET_SELECTED_PROMOTION_TYPES,
        data: data,
    };
};

const setPromotionTypeList = (list) => {
    return {
        type: types.SET_PROMOTION_TYPE_LIST,
        data: list,
    };
};

const getPromotionTypeList = (productCode) => {
    return (dispatch) => {
        DataService.getReportData('api/ExtraPayout/GetPromotionTypes', {
            productCode: productCode,
        }).then((response) => {
            let data = response.data;

            const promotionTypeList = data.map((item) => item.value).join(',');
            dispatch(setPromotionTypeList(data));
            dispatch(setSelectedPromotionTypes(promotionTypeList));
        });
    };
};

export default {
    getPromotionTypeList,
    setPromotionTypeList,
    setSelectedPromotionTypes,
};
