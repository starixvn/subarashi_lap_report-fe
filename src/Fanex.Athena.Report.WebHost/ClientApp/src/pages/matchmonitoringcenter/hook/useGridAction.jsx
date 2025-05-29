import useToggleRequest from '@/hooks/useToggleRequest';
import DataService from '@/lib/dataService';
import { constants } from '../common';
import { useFilterAction } from './useFilterAction';
import { usePopupHandler } from './usePopupHandler';
import LangHelper from '@/helpers/langHelper';
import { useDispatch } from 'react-redux';
import { generateDefaultConfirmOption } from '@/lib/sweetAlert';
import { ActionCreators } from '../actions';

export const useGridAction = () => {
    const { sendRequest } = useToggleRequest();
    const { fetchData } = useFilterAction();
    const { showPopup } = usePopupHandler();

    const { ApiUrl } = constants;
    const dispatch = useDispatch();
    const { setSweetAlertOption } = ActionCreators;

    const Delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const handleCloseAlert = () => dispatch(setSweetAlertOption(null));

    const Remove = (event, monitoringId) => {
        event.preventDefault();
        const confirmProps = {
            onClick: () => {
                sendRequest(
                    async () => {
                        const response = await DataService.postReportData(ApiUrl.REMOVE_MATCH_MONITORING_URL, { monitoringId });
                        await Delay(2000);
                        return response;
                    },
                    (res) => {
                        handleCloseAlert();
                        if (res && res.data) {
                            const { code, message } = res.data;
                            if (code == 0) {
                                fetchData();
                            } else {
                                alert(message);
                            }
                        } else {
                            alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
                        }
                    }
                );
            },
        };
        const cancelProps = {
            onClick: handleCloseAlert,
        };
        const confirmMessage = LangHelper.getSingleResource('ConfirmRemoveMatchMonitoring');
        const confirmOption = generateDefaultConfirmOption(confirmMessage, handleCloseAlert, confirmProps, cancelProps);
        dispatch(setSweetAlertOption(confirmOption));
    };

    const Setting = (event, monitoringId) => {
        event.preventDefault();
        showPopup(ApiUrl.MATCH_MONITORING_SETTING_URL + `?Id=${monitoringId}`, LangHelper.getSingleResource('MonitorSetting'), 'monitor-setting-popup', true);
    };

    const History = (event, monitoringId) => {
        event.preventDefault();
        showPopup(
            ApiUrl.MATCH_MONITORING_HISTORY_URL + `?Id=${monitoringId}`,
            LangHelper.getSingleResource('TriggeredAlertHistory'),
            'triggered-alert-history-popup',
            false
        );
    };

    return {
        Remove,
        Setting,
        History,
    };
};

export default useGridAction;
