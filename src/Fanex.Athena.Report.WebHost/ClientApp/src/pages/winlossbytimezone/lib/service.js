import LangHelper from '@/helpers/langHelper';
import Site from '@/lib/site';

const headerText = {
    Index: '#',
    ReportBy: '',
    GroupBy: '',
    BetCount: LangHelper.getSingleResource('BetCount'),
    Turnover: LangHelper.getSingleResource('Turnover'),
    CustomerComm: LangHelper.getSingleResource('CustomerComm'),
    LicenseeWL: LangHelper.getSingleResource('LicenseeWL'),
    LicenseeComm: LangHelper.getSingleResource('LicenseeComm'),
    LicenseeNetWL: LangHelper.getSingleResource('LicenseeNetWL'),
    Margin: LangHelper.getSingleResource('Margin'),
};

export default class Service {
    static getReportTitle(timeZone, fromDate, toDate, currency, baseCurrency, isConvertAll) {
        const viewInByCurrency = isConvertAll ? ', ' + LangHelper.getSingleResource('BaseCurrency') + ': ' + baseCurrency : '';
        const currencyText = LangHelper.getSingleResource('Currency') + ': ' + currency;
        return `${LangHelper.getSingleResource('WinLossByTimeZone')}, ${timeZone}, ${fromDate} → ${toDate}, ${currencyText}${viewInByCurrency}`;
    }

    static getHeaderText(reportBy, groupBy) {
        headerText.ReportBy = LangHelper.getSingleResource(reportBy === 2 ? 'Date' : 'Month');
        headerText.GroupBy = LangHelper.getSingleResource(groupBy === 1 ? 'Product' : 'Currency');

        return headerText;
    }
}
