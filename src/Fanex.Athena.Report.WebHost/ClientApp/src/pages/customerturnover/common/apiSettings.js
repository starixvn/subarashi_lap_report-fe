import DataService from '@/lib/dataService';

export const ApiUrl = {
    INIT_FORM_URL: 'Api/CustomerTurnover/Index',
    DATA_URL: 'Api/CustomerTurnover/GetData',
    SEARCH_CUSTOMER: DataService.buildProxyUrl(DataService.apiKeys.report, 'Api/SearchCustomer/SearchCustomer'),
    BETTYPE_URL: 'Api/CustomerTurnover/GetBettypesBySport',
    EXPORT_EXCEL_URL: 'Api/CustomerTurnover/ExportExcel',
};
