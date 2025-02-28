import DataService from '@/lib/dataService';
import { setRequestParam } from '@/actions/requestParamAction';
import { setGridData } from '@/actions/gridDataAction';

import { setDrillDownCache } from './cacheAction';
import { ApiUrl } from '../common/apiUrl';

export const fetchDrillDownData = (params) => {
    return async (dispatch) => {
        const response = await DataService.postReportData(ApiUrl.DATA_URL, params);
        const gridData = response.data;

        dispatch(setDrillDownCache({ [params.DrillDownLevel]: { requestParam: params, gridData } }));

        dispatch(setRequestParam(params));
        dispatch(setGridData(gridData));
    };
};
