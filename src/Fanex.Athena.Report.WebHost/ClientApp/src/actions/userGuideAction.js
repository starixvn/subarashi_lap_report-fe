import * as types from './types';
import DataService from '../lib/dataService';

const fetchData = async (resourceName) => {
    return DataService.getReportData('Api/UserGuide/Index?resourcename=' + resourceName + '&_=' + new Date().getTime());
};

export function getUserGuideContent(params) {
    return async (dispatch) =>
        fetchData(params).then((response) => {
            dispatch(setUserGuideContent(response.data));
        });
}

export const setUserGuideContent = (data) => {
    return {
        type: types.USER_GUIDE_CONTENT,
        data: data,
    };
};
