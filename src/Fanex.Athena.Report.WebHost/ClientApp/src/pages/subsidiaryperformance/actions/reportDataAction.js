import DataService from '@srcRoot/lib/dataService';
import { setRequestParam } from '@srcRoot/actions/requestParamAction';
import { setGridData } from '@srcRoot/actions/gridDataAction';

export const fetchGridData = (url, params) => {
    return async (dispatch) => {
        const response = await DataService.postReportData(url, params);
        const gridData = response.data;

        dispatch(setRequestParam(params));
        dispatch(setGridData(gridData));
    };
};
