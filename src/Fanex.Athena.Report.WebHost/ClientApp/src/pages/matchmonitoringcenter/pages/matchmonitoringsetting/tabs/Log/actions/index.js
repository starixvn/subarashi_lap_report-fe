import DataService from '@/lib/dataService';
import * as loaderAction from '@/actions/loaderAction';
import * as gridDataAction from '@/actions/gridDataAction';
import * as formDataAction from '@/actions/formDataAction';
import { ApiUrl } from '../lib/constants';

export const ACTION_TYPES = {
    SET_SELECTED_LOG_TYPES: 'SET_SELECTED_LOG_TYPES',
    SET_SELECTED_ACTIONS: 'SET_SELECTED_ACTIONS',
    SET_REQUEST_PARAM: 'SET_REQUEST_PARAM',
    SET_ACTION_OPTIONS: 'SET_ACTION_OPTIONS',
};

export const setSelectedLogTypes = logTypes => ({
    type: ACTION_TYPES.SET_SELECTED_LOG_TYPES,
    payload: logTypes,
});

export const setSelectedActions = actions => ({
    type: ACTION_TYPES.SET_SELECTED_ACTIONS,
    payload: actions,
});

export const setRequestParam = params => ({
    type: ACTION_TYPES.SET_REQUEST_PARAM,
    payload: params,
});

export const setActionOptions = options => ({
    type: ACTION_TYPES.SET_ACTION_OPTIONS,
    payload: options,
});

export const getActionList = logTypes => async (dispatch, getState) => {
    try {
        if (!logTypes || logTypes.length === 0) {
            const state = getState();
            const currentFormData = state.formData || {};

            dispatch(
                formDataAction.setFormData({
                    ...currentFormData,
                    actionOptions: [],
                })
            );

            dispatch(setSelectedActions(''));
            return;
        }

        const response = await DataService.getReportData(ApiUrl.GET_ACTION_LIST, {
            logTypes,
        });

        if (response && response.data) {
            const actionOptions = response.data.map(item => ({
                ...item,
                status: true,
            }));

            const state = getState();
            const currentFormData = state.formData || {};

            dispatch(
                formDataAction.setFormData({
                    ...currentFormData,
                    actionOptions: actionOptions,
                })
            );

            if (actionOptions.length > 0) {
                const actionKeys = actionOptions.map(item => item.key).join(',');
                dispatch(setSelectedActions(actionKeys));
            } else {
                dispatch(setSelectedActions(''));
            }
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching action list:', error);
    }
};

const getInitFormData = () => async dispatch => {
    try {
        const response = await DataService.getReportData(ApiUrl.INIT_FORM_URL);
        const data = response.data;

        if (data.logTypeOptions) {
            data.logTypeOptions = data.logTypeOptions.map(item => ({
                ...item,
                status: true,
            }));
        }

        if (data.actionOptions) {
            data.actionOptions = data.actionOptions.map(item => ({
                ...item,
                status: true,
            }));
        }

        dispatch(formDataAction.setFormData(data));

        if (data.logTypeOptions && data.logTypeOptions.length > 0) {
            const logTypeKeys = data.logTypeOptions.map(item => item.key).join(',');
            dispatch(setSelectedLogTypes(logTypeKeys));
        }

        if (data.actionOptions && data.actionOptions.length > 0) {
            const actionKeys = data.actionOptions.map(item => item.key).join(',');
            dispatch(setSelectedActions(actionKeys));
        }

        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching init form data:', error);
        return null;
    }
};

const fetchLogData = params => async dispatch => {
    dispatch(loaderAction.toggleLoader(true));
    dispatch(setRequestParam(params));

    try {
        const response = await DataService.postReportData(ApiUrl.DATA_URL, params);

        if (response.data) {
            dispatch(gridDataAction.setGridData(response.data));
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching log data:', error);
    } finally {
        dispatch(loaderAction.toggleLoader(false));
    }
};

export const ActionCreators = {
    ...loaderAction,
    ...gridDataAction,
    ...formDataAction,
    setSelectedLogTypes,
    setSelectedActions,
    setRequestParam,
    setActionOptions,
    getActionList,
    getInitFormData,
    fetchLogData,
};
