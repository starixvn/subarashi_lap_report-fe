import DataService from '@/lib/dataService';

export const ApiUrl = {
    INIT_FORM_URL: 'Api/Turnover/Index',
    DATA_URL: 'Api/Turnover/GetData',
    SEARCH_CUSTOMER: DataService.buildProxyUrl(DataService.apiKeys.report, 'Api/SearchCustomer/SearchCustomer'),
    EXPORT_EXCEL_URL: 'Api/Turnover/ExportExcel',
};
