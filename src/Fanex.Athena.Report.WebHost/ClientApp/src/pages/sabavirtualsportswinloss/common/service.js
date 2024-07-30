import LangHelper from '@srcRoot/helpers/langHelper';
import Site from '@srcRoot/lib/site';
import { SelectAllOption } from './filter';

export default class Service {
    static generateReportTitle(fromDate, toDate, currencyId, currencyName, userName) {
        const report = LangHelper.getSingleResource('SabaVirtualSportsWinLoss');

        let currencyView = this.getCurrencyName(currencyId, currencyName);
        if (currencyId == SelectAllOption.value) {
            currencyView = LangHelper.getSingleResource('AllCurrencies');
        } else {
            currencyView = LangHelper.getSingleResource('Viewin').replace('{0}', currencyView.toUpperCase());
        }
        const userNameTitle = userName ? ` - ${LangHelper.getSingleResource('Username')}: ${userName}` : '';

        const currencyViewPrefix = userName ? ' - ' : ', ';
        return `${report}, ${fromDate} → ${toDate}${currencyViewPrefix}${currencyView}${userNameTitle}`;
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
