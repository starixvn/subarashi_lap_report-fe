import * as types from './types.js';
import DataService from '@/lib/dataService';
import { toggleLoader } from '@/actions/loaderAction';
import { ApiUrl } from '../common/constants.js';

export const getReportData = params => dispatch => {
    DataService.postProxyData(DataService.apiKeys.report, ApiUrl.GET_DATA_URL, params)
        .then(response => {
            response.data.timestamp = new Date().getTime();
            dispatch(setReportData(response.data));
            dispatch(toggleLoader(false));
        })
        .catch(() => {
            alert('Sorry, an error occurred while processing your request.');
            dispatch(toggleLoader(false));
        });
};

export const setReportData = data => ({
    type: types.SET_REPORT_DATA,
    data: data,
});

export const setReloadReport = data => ({
    type: types.SET_RELOAD_REPORT,
    data: data,
});
