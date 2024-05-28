import LangHelper from '@srcRoot/helpers/langHelper';
import cache from '@srcRoot/lib/cache';
import DataService from '@srcRoot/lib/dataService';
import { CHILD_ID_PREFIX } from './filterSettings';

class Service {
    static generateReportTitle(fromDate, toDate, currencyName, minimumOdds) {
        const title = LangHelper.getSingleResource('CustomerTurnover');
        const dateTitle = `${fromDate} → ${toDate}`;
        const currencyTitle = `${LangHelper.getSingleResource('Currency')}: ${currencyName}`;
        const minimumOddsTitle = `${LangHelper.getSingleResource('MinimumOdds')}: ${minimumOdds}`;
        return `${title}, ${dateTitle} - ${currencyTitle} - ${minimumOddsTitle}`;
    }

    static convertToCheckedItem(item, allItems) {
        const children = allItems.filter((x) => x.parentId === item.id);

        return {
            name: item.name,
            id: item.id.toString(),
            value: item.id.toString(),
            checked: item.checked,
            children: children.map((child) => ({
                name: child.name,
                id: CHILD_ID_PREFIX + child.id,
                value: CHILD_ID_PREFIX + child.id,
                checked: child.checked,
            })),
        };
    }

    static convertToCheckedItems(items) {
        const children = items.filter((x) => x.parentId !== -1);

        return items.filter((x) => x.parentId === -1).map((x) => this.convertToCheckedItem(x, children));
    }

    static async fetchBetTypeList({ cacheKey, url, sportProducts }) {
        var cacheData = cache.get(cacheKey);
        if (cacheData) {
            return cacheData;
        }

        const response = await DataService.postReportData(url, sportProducts);

        cache.set(cacheKey, response.data, 10);
        return response.data;
    }

    // BetTypesIds format: `${parent}-${id}`
    static getSelectedBettypeXML = (seletedBetTypesIds, parentPrefixs) => {
        var xmlDoc = document.implementation.createDocument(null, 'ROOT', null);

        parentPrefixs.forEach((parent) => {
            const children = [];
            for (let i = 0; i < seletedBetTypesIds.length; i++) {
                if (seletedBetTypesIds[i].startsWith(parent)) {
                    // remove parent prefix
                    children.push(seletedBetTypesIds[i].replace(`${parent}-`, ''));
                }
            }

            if (!children.length) {
                return;
            }

            var productCode = parent;
            var bettypeList = children
                .reduce((accum, elem) => accum.concat(elem), [])
                .map((elem) => elem)
                .join(',');

            this.buildBettypeElement(xmlDoc, productCode, bettypeList);
        });

        return new XMLSerializer().serializeToString(xmlDoc);
    };

    static buildBettypeElement = (xmlDoc, productCode, bettypeList) => {
        var bettypeElem = xmlDoc.createElement('Bettype');

        bettypeElem.setAttribute('pc', productCode);
        bettypeElem.setAttribute('bt', bettypeList);

        xmlDoc.documentElement.appendChild(bettypeElem);
    };
}

export default Service;
