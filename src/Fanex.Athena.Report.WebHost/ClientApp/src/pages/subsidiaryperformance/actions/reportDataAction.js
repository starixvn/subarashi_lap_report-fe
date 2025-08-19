import DataService from '@/lib/dataService';
import { setRequestParam } from '@/actions/requestParamAction';
import { setGridData } from '@/actions/gridDataAction';

export const fetchGridData = (url, params) => async dispatch => {
    const response = await DataService.postReportData(url, params);
    const gridData = response.data;

    dispatch(setRequestParam(params));
    dispatch(setGridData(gridData));
};
