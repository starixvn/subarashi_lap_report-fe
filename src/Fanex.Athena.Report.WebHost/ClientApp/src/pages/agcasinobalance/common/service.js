import LangHelper from '@/helpers/langHelper';
import { SelectAllOption } from './filter';

export default class Service {
    static generateReportTitle(fromDate, toDate, currencyId, currencyName) {
        const report = LangHelper.getSingleResource('AGCasinoBalance');

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
}
