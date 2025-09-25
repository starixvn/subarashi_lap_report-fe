import LangHelper from '@/helpers/langHelper';
import Site from '@/lib/site';
import Report from '@/lib/report';

export default class Service {
    // eslint-disable-next-line max-params
    static getTitle(fromDate, toDate, currency, baseCurrency, productCodeList, username, isConvertAllToBaseCurrency) {
        const dateRangeText = fromDate && toDate ? `, ${Site.convertDateToString(fromDate)} ? ${Site.convertDateToString(toDate)}` : '';

        const currencyName = baseCurrency === '' ? currency : baseCurrency;
        const baseCurrencyText = isConvertAllToBaseCurrency ? `, ${LangHelper.getSingleResource('BaseCurrency')}: ${currencyName}` : '';
        const productText = ` (${productCodeList.replaceAll(',', ', ')})`;
        const userNameText = username === '' ? '' : `, ${LangHelper.getSingleResource('Username')}: ${username}`;

        return `${LangHelper.getSingleResource('ExtraPayout') + dateRangeText}, ${LangHelper.getSingleResource('Currency')}: ${currency}${
            baseCurrencyText
        }, ${LangHelper.getSingleResource('LicenseeW_L')}${productText}${userNameText}`;
    }

    static getDetailTitle(fromDate, toDate, currency, baseCurrency, nickname, username) {
        const dateRangeText = fromDate && toDate ? `, ${Site.convertDateToString(fromDate)} ? ${Site.convertDateToString(toDate)}` : '';

        const currencyName = baseCurrency === '' ? currency : baseCurrency;
        const baseCurrencyText = ` - ${LangHelper.getSingleResource('Viewin').replace('{0}', currencyName)}`;
        const userNameText = username === '' ? '' : `${nickname}(${username}) `;

        return `${LangHelper.getSingleResource('PromotionDetails') + dateRangeText}- ${userNameText}${baseCurrencyText}`;
    }

    static getFormattedDate(date) {
        const year = date.getFullYear();

        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : `0${month}`;

        let day = date.getDate().toString();
        day = day.length > 1 ? day : `0${day}`;

        return `${month}/${day}/${year}`;
    }

    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }

    static getDrilldownDateRange(reportBy, fromDate, toDate, drilldownDate) {
        return Report.getDrilldownDateRange(reportBy, fromDate, toDate, drilldownDate);
    }
}
