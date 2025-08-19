import * as types from './types.js';
import DataService from '@/lib/dataService';
import { toggleLoader } from '@/actions/loaderAction';

const getReportData = (url, params) => dispatch => {
    DataService.postReportData(url, params)
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

const setReportData = data => ({
    type: types.SET_REPORT_DATA,
    data: data,
});

const setReloadReport = data => ({
    type: types.SET_RELOAD_REPORT,
    data: data,
});

export default {
    setReportData,
    getReportData,
    setReloadReport,
};
