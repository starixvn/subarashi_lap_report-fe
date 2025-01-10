import LangHelper from '@srcRoot/helpers/langHelper';

export default class Service {
    static generateReportTitle(fromDate, toDate, currencyName, baseCurrency, username) {
        const title = LangHelper.getSingleResource('Turnover');
        const dateTitle = `${fromDate} → ${toDate}`;

        if (username) {
            const customerTitle = `${LangHelper.getSingleResource('Customer')} ` + username + ` (${baseCurrency})`;
            return `${title}, ${dateTitle} - ${customerTitle}`;
        }

        const currencyTitle = `${LangHelper.getSingleResource('Currency')}: ${currencyName}`;
        const baseCurrencyTitle = `${LangHelper.getSingleResource('BaseCurrency')}: ${baseCurrency}`;
        return `${title}, ${dateTitle}, ${currencyTitle}, ${baseCurrencyTitle}`;
    }
}
