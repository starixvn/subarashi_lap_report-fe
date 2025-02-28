import LangHelper from '@/helpers/langHelper';
import Site from '@/lib/site';
import Report from '@/lib/report';

export default class Service {
    static getTitle(fromDate, toDate, currency, baseCurrency, username) {
        const dateRangeText = fromDate && toDate ? `, ${Site.convertDateToString(fromDate)} → ${Site.convertDateToString(toDate)}` : '';

        const currencyText = currency ? `, ${LangHelper.getSingleResource('Currency')}: ${currency}` : '';
        const baseCurrencyText = baseCurrency ? `, ${LangHelper.getSingleResource('BaseCurrency')}: ${baseCurrency}` : '';
        const usernameText = username ? `, ${LangHelper.getSingleResource('Username')}: ${username}` : '';

        return LangHelper.getSingleResource('LeagueWinLoss') + dateRangeText + currencyText + baseCurrencyText + usernameText;
    }

    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }

    static getDrilldownDateRange(reportBy, fromDate, toDate, drilldownDate) {
        return Report.getDrilldownDateRange(reportBy, fromDate, toDate, drilldownDate);
    }
}
