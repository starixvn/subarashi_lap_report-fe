import * as types from './types';
import DataService from '@/lib/dataService';
import LangHelper from '@/helpers/langHelper';
import { toggleLoader } from '@/actions/loaderAction';

const getReportData = (url, params) => {
    return (dispatch) => {
        DataService.postReportData(url, params)
            .then((response) => {
                response.data.timestamp = new Date().getTime();
                dispatch(setReportData(response.data));
                dispatch(toggleLoader(false));
            })
            .catch(() => {
                alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
                dispatch(toggleLoader(false));
            });
    };
};

const setReportData = (data) => {
    return {
        type: types.SET_REPORT_DATA,
        data: data,
    };
};

const setReloadReport = (data) => {
    return {
        type: types.SET_RELOAD_REPORT,
        data: data,
    };
};

export default {
    setReportData,
    getReportData,
    setReloadReport,
};
