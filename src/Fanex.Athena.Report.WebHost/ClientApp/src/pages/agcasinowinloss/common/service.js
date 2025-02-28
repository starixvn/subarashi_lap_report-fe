import LangHelper from '@/helpers/langHelper';
import Site from '@/lib/site';
import { SelectAllOption } from './filter';

export default class Service {
    static generateReportTitle(fromDate, toDate, currencyId, currencyName) {
        const report = LangHelper.getSingleResource('AGCasinoWinLoss');

        let currencyView = this.getCurrencyName(currencyId, currencyName);
        if (currencyId == SelectAllOption.value) {
            currencyView = LangHelper.getSingleResource('AllCurrencies');
        } else {
            currencyView = LangHelper.getSingleResource('Viewin').replace('{0}', currencyView.toUpperCase());
        }

        return `${report}, ${fromDate} → ${toDate}, ${currencyView}`;
    }

    static getCurrencyName(currencyId, currencyName) {
        return currencyId > 0 ? currencyName : currencyName.split(' ')[1];
    }

    static getDrillDownDate(fromDate, toDate, reportDate, isDaily) {
        let fromdateResult = reportDate.clone();
        let toDateResult = reportDate.clone();

        if (isDaily) {
            return {
                fromDate: Site.convertDateToString(reportDate),
                toDate: Site.convertDateToString(reportDate),
            };
        }

        if (fromDate.month() == reportDate.month()) {
            fromdateResult = fromDate.day() > 0 ? fromdateResult.day(fromDate.day()) : fromdateResult;
        } else {
            fromdateResult = fromdateResult.startOf('month');
        }

        if (toDate.month() == reportDate.month() && toDate.day() > 0) {
            toDateResult = toDate.day() > 0 ? toDateResult.day(toDate.day()) : toDateResult;
        } else {
            toDateResult = toDateResult.endOf('month');
        }

        return {
            fromDate: Site.convertDateToString(fromdateResult),
            toDate: Site.convertDateToString(toDateResult),
        };
    }
}
