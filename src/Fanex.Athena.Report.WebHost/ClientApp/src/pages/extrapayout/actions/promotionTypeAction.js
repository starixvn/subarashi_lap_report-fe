import DataService from '@/lib/dataService';
import { SET_SELECTED_PROMOTION_TYPES, SET_PROMOTION_TYPE_LIST } from './types';

const setSelectedPromotionTypes = data => ({
    type: SET_SELECTED_PROMOTION_TYPES,
    data: data,
});

const setPromotionTypeList = list => ({
    type: SET_PROMOTION_TYPE_LIST,
    data: list,
});

const getPromotionTypeList = productCode => dispatch => {
    DataService.getReportData('api/ExtraPayout/GetPromotionTypes', {
        productCode: productCode,
    }).then(response => {
        const data = response.data;

        const promotionTypeList = data.map(item => item.value).join(',');
        dispatch(setPromotionTypeList(data));
        dispatch(setSelectedPromotionTypes(promotionTypeList));
    });
};

export default {
    getPromotionTypeList,
    setPromotionTypeList,
    setSelectedPromotionTypes,
};
