import { generateDefaultConfirmOption, generateDefaultAlertOption } from '@/lib/sweetAlert';
import LangHelper from '@/helpers/langHelper';
import DataService from '@/lib/dataService';
import { ApiUrl, conditions } from './constants';
import ActionCreators from '../actions';

const { setSweetAlertOption } = ActionCreators;

export const handleCellChangeValue = (setItemState, fieldKey, value) => {
    if (fieldKey === 'negativeProfit' || fieldKey === 'betRatio') {
        if (value !== '' && !isNaN(parseFloat(value))) {
            const numValue = parseFloat(value);
            if (numValue < 0) {
                value = '0';
            }
        }

        setItemState((prevItem) => ({
            ...prevItem,
            alertRule: {
                ...prevItem.alertRule,
                [fieldKey]: value,
            },
        }));
    } else {
        setItemState((prevItem) => ({
            ...prevItem,
            [fieldKey]: value,
        }));
    }
};

export const closeAlert = (dispatch) => {
    dispatch(setSweetAlertOption(null));
};

export const buildAlertOptionForMissingFields = (handleCloseAlert) => {
    const messageTemplate = LangHelper.getSingleResource('PleaseFillInfoMsg');

    const alertOptions = generateDefaultAlertOption(messageTemplate, handleCloseAlert, handleCloseAlert, null);

    return {
        ...alertOptions,
        className: 'alert-popup-size',
        title: LangHelper.getSingleResource('Information'),
    };
};

export const validateAlertRuleItem = (item) => {
    const isValidSettingName = item.settingName && item.settingName.trim() !== '';

    const isValidNegativeProfit =
        item.alertRule?.negativeProfit !== undefined && !isNaN(parseFloat(item.alertRule.negativeProfit)) && parseFloat(item.alertRule.negativeProfit) >= 0;

    const isValidBetRatio = item.alertRule?.betRatio !== undefined && !isNaN(parseFloat(item.alertRule.betRatio)) && parseFloat(item.alertRule.betRatio) >= 0;

    return !!(isValidSettingName && item.baseCurrency && item.conditionTypeName && item.notificationInterval && isValidNegativeProfit && isValidBetRatio);
};

export const buildConfirmAlertOption = (item, templateKey, buildConfirmMessage, handleCloseAlert, confirmProps, cancelProps) => {
    const messageTemplate = LangHelper.getSingleResource(templateKey);
    const confirmMessage = buildConfirmMessage(item, messageTemplate);

    return generateDefaultConfirmOption(confirmMessage, handleCloseAlert, confirmProps, cancelProps, null, {
        title: LangHelper.getSingleResource('Confirmation'),
        className: 'custom-popup-size',
        icon: 'warning',
    });
};

export const createAlertRule = async (item, monitoringID, dispatch, setAddNewRule, onDataChanged) => {
    try {
        if (!monitoringID) {
            alert('Cannot create alert rule: MonitoringID is missing');
            return false;
        }

        const params = {
            settingName: item.settingName.trim(),
            conditionTypeName: item.conditionTypeName,
            baseCurrency: item.baseCurrency,
            notificationInterval: item.notificationInterval,
            alertRule: item.alertRule,
            monitoringID: monitoringID,
        };

        const result = await DataService.postReportData(ApiUrl.CREATE_ALERT_RULE_URL, params);
        if (result.data && result.data.isSuccessful) {
            if (setAddNewRule) {
                dispatch(setAddNewRule(false));
            }

            if (typeof onDataChanged === 'function') {
                onDataChanged();
            }
            return true;
        } else {
            let message;
            if (result.data && result.data.code === 14) {
                message = LangHelper.getSingleResource('SettingNameAlreadyExistsMsg');
            } else if (result.data && result.data.code === 21) {
                message = LangHelper.getSingleResource('SettingAlreadyExisted');
            } else {
                message = result.data ? result.data.message : 'Failed to create alert rule';
            }
            alert(message);
            return false;
        }
    } catch (error) {
        alert('Error creating alert rule: ' + (error.message || error));
        return false;
    }
};

export const updateAlertRule = async (item, dispatch, setIsEdited, onDataChanged) => {
    try {
        const params = {
            settingId: item.settingID,
            settingName: item.settingName.trim(),
            conditionTypeName: item.conditionTypeName,
            baseCurrency: item.baseCurrency,
            notificationInterval: item.notificationInterval,
            alertRule: item.alertRule,
        };

        const result = await DataService.postReportData(ApiUrl.UPDATE_ALERT_RULE_URL, params);
        if (result.data && result.data.isSuccessful) {
            dispatch(setSweetAlertOption(null));
            if (setIsEdited) {
                setIsEdited(false);
            }

            if (typeof onDataChanged === 'function') {
                onDataChanged();
            }
            return true;
        } else {
            let message;
            if (result.data && result.data.code === 14) {
                message = LangHelper.getSingleResource('SettingNameAlreadyExistsMsg');
            } else if (result.data && result.data.code === 21) {
                message = LangHelper.getSingleResource('SettingAlreadyExisted');
            } else {
                message = result.data ? result.data.message : 'Failed to update alert rule';
            }
            alert(message);
            return false;
        }
    } catch (error) {
        alert('Error updating alert rule: ' + (error.message || error));
        return false;
    }
};

export const deleteAlertRule = async (item, dispatch, setIsEdited, onDataChanged) => {
    try {
        const params = {
            settingId: item.settingID,
        };

        const result = await DataService.postReportData(ApiUrl.DELETE_ALERT_RULE_URL, params);
        if (result.data && result.data.isSuccessful) {
            dispatch(setSweetAlertOption(null));
            if (setIsEdited) {
                setIsEdited(false);
            }

            if (typeof onDataChanged === 'function') {
                onDataChanged();
            }
            return true;
        } else {
            const message = result.data ? result.data.message : 'Failed to delete alert rule';
            alert(message);
            return false;
        }
    } catch (error) {
        alert('Error deleting alert rule: ' + (error.message || error));
        return false;
    }
};
