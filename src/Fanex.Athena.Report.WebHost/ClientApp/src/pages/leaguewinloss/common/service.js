import LangHelper from '@srcRoot/helpers/langHelper';
import Site from '@srcRoot/lib/site';
import Report from '@srcRoot/lib/report';
import {ALL_SELECTED_TEXT} from './constants'

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

    static getSelectedItemFromTreeListItem(items) {
        return items
            .reduce((accum, elem) => accum.concat(elem.children), [])
            .map((elem) => elem.value)
            .join(',');
    }

    static getNormalizedSelectedParamValueForTreeListFilter(selectedValue, dataList) {
        const allSelected = this.getSelectedItemFromTreeListItem(dataList);
        return selectedValue === allSelected ? ALL_SELECTED_TEXT : selectedValue;
    }

    static getSelectedBettypeXML = (seletedBetTypeIds) => {
        var bettypeList = seletedBetTypeIds.split(',').map((elem) => ({
            parent: elem.substring(elem.indexOf('_') + 1),
            value: elem.substring(0, elem.indexOf('_')),
        }));

        var bettypeListBaseOnProduct = bettypeList.reduce((r, a) => {
            r[a.parent] = r[a.parent] || '';
            r[a.parent] = r[a.parent] !== '' ? r[a.parent] + `,${a.value}` : a.value;
            return r;
        }, {});

        var xmlDoc = document.implementation.createDocument(null, 'ROOT', null);

        for (const product in bettypeListBaseOnProduct) {
            Service.buildBettypeElement(xmlDoc, product, bettypeListBaseOnProduct[product]);
        }

        return new XMLSerializer().serializeToString(xmlDoc);
    };

    static buildBettypeElement = (xmlDoc, productCode, bettypeList) => {
        var bettypeElem = xmlDoc.createElement('Bettype');

        bettypeElem.setAttribute('pc', productCode);
        bettypeElem.setAttribute('bt', bettypeList);

        xmlDoc.documentElement.appendChild(bettypeElem);
    };
}
