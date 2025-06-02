export const ApiUrl = {
    INIT_FORM_URL: 'Api/MatchMonitoringCenter/LogIndex',
    DATA_URL: 'Api/MatchMonitoringCenter/GetLogData',
    GET_ACTION_LIST: 'Api/MatchMonitoringCenter/GetActionList',
};

export const TableHeaders = {
    TIMESTAMP: 'TimeStamp',
    TYPE: 'Type',
    ACTION: 'Action',
    OPERATOR: 'Operator',
    DETAIL: 'Detail'
};

export const LogTypes = {
    ALL: 'All',
    CONFIG_CHANGE: 'CONFIG_CHANGE',
    MONITORING_CHANGE: 'MONITORING_CHANGE',
    ALERT_TRIGGERED: 'ALERT_TRIGGERED',
    NOTIFICATION_SENT: 'NOTIFICATION_SENT'
};

export const Actions = {
    ALL: 'All',
    CREATE_ALERT_RULE: 'Create Alert Rule',
    UPDATE_ALERT_RULE: 'Update Alert Rule',
    REMOVE_ALERT_RULE: 'Remove Alert Rule',
    ADD_MONITORING_MATCH: 'Add Monitoring Match',
    REMOVE_MONITORING_MATCH: 'Remove Monitoring Match',
    ALERT_FIRED: 'Alert Fired',
    SEND_NOTIFICATION: 'Send Notification'
};

export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm:ss';

export const DEFAULT_PAGE_SIZE = 20;