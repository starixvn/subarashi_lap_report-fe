import DataService from '@srcRoot/lib/dataService';
import { setRequestParam } from '@srcRoot/actions/requestParamAction';
import { setGridData } from '@srcRoot/actions/gridDataAction';

import { setDrillDownCache } from './cacheAction';
import { setGridSettings, updateGridSettings } from './gridSettingAction';
import { ApiUrl } from '../common/apiUrl';
import { DrillDownLevel } from '../common/tableSetting';

export const fetchDrillDownData = (params) => {
    return async (dispatch) => {
        const response = await DataService.postReportData(ApiUrl.DATA_URL, params);
        const gridData = response.data;

        dispatch(setDrillDownCache({ [params.DrillDownLevel]: { requestParam: params, gridData } }));
        dispatch(setDrillDownLevel(params.DrillDownLevel));

        dispatch(setRequestParam(params));
        dispatch(setGridData(gridData));
    };
};

const setDrillDownLevel = (drillDownLevel) => {
    return (dispatch) => {
        if (drillDownLevel == DrillDownLevel.Main) {
            return dispatch(setGridSettings({ drillDownLevel: drillDownLevel }));
        }

        dispatch(updateGridSettings({ drillDownLevel: drillDownLevel }));
    };
};
