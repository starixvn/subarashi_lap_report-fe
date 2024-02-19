import LangHelper from '@srcRoot/helpers/langHelper';
import Site from '@srcRoot/lib/site';
import { CashOutModeList, ExportExcelMode, OneTwoBetLicenseeName } from './constants';
import { BreakdownByMode, GroupByMode, GroupByList, ALL_SELECTED_TEXT, ProductCode } from './constants';
import { ApiUrl } from '../common/constants.js';
import DataService from '@srcRoot/lib/dataService';

export default class Service {
    static getCashoutMode(modeValue) {
        return CashOutModeList.find((mode) => mode.value == modeValue);
    }

    static isOneTwoBetLicensee = (licenseeName) => {
        return licenseeName.toLowerCase() === OneTwoBetLicenseeName.toLowerCase();
    };

    static isContainProductSportBookOrBa = (selectedItemsKey) => {
        var listSelectedProduct = selectedItemsKey.split(',');
        return listSelectedProduct.indexOf(ProductCode.SportsBook) >= 0 || listSelectedProduct.indexOf(ProductCode.BA) >= 0;
    };

    static getSelectedItemFromTreeListItem(items) {
        return items
            .reduce((accum, elem) => accum.concat(elem.children), [])
            .map((elem) => elem.value)
            .join(',');
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

    static buildGroupByOption = (licenseeName) => {
        return this.isOneTwoBetLicensee(licenseeName) ? GroupByList : GroupByList.filter((item) => item.value !== GroupByMode.Agent);
    };

    static buildBreakDownOptionFromGroupByMode = (groupByMode, licenseeName) => {
        let breakDownByOption = {
            Product: { value: BreakdownByMode.Product, label: LangHelper.getSingleResource('Product'), isDisabled: false },
            Currency: { value: BreakdownByMode.Currency, label: LangHelper.getSingleResource('Currency'), isDisabled: false },
            Player: { value: BreakdownByMode.Player, label: LangHelper.getSingleResource('Player'), isDisabled: true },
        };
        switch (Number(groupByMode)) {
            case GroupByMode.Product:
            case GroupByMode.Sport:
            case GroupByMode.BetType:
                breakDownByOption.Product.isDisabled = true;
                break;
            case GroupByMode.Player:
            case GroupByMode.Currency:
                breakDownByOption.Currency.isDisabled = true;
                break;
            case GroupByMode.Agent:
                breakDownByOption.Currency.isDisabled = true;
                breakDownByOption.Player.isDisabled = false;
                break;
            default:
                break;
        }

        if (!this.isOneTwoBetLicensee(licenseeName)) {
            delete breakDownByOption.Player;
        }

        return Object.values(breakDownByOption);
    };

    static getNormalizedSelectedParamValueForMultiSelectFilter(selectedValue, dataList, selectedIdFunc) {
        const allSelected = selectedIdFunc instanceof Function ? dataList.map(selectedIdFunc).join(',') : dataList.map((item) => item.id).join(',');
        const listAllSelectId = allSelected.split(',');
        const listSelectedId = selectedValue.split(',');
        return listAllSelectId.every((id) => listSelectedId.indexOf(id) >= 0) ? ALL_SELECTED_TEXT : selectedValue;
    }

    static getNormalizedSelectedParamValueForTreeListFilter(selectedValue, dataList) {
        const allSelected = this.getSelectedItemFromTreeListItem(dataList);
        return selectedValue === allSelected ? ALL_SELECTED_TEXT : selectedValue;
    }

    static isContainBAProduct = (selectedProductCodes) => {
        const baProductCode = 'BA';
        const listSelectedProductCodes = selectedProductCodes.split(',');
        return listSelectedProductCodes.includes(baProductCode);
    };

    static getCurrencyCodes = (currencyListIds, currencyList) => {
        const normalizeText = this.getNormalizedSelectedParamValueForMultiSelectFilter(currencyListIds, currencyList);
        if (normalizeText === ALL_SELECTED_TEXT) {
            return ALL_SELECTED_TEXT;
        }
        const currencyCodesText = currencyListIds.split(',').reduce((prev, cur, index) => {
            let code = currencyList.find((c) => c.id == cur).value;
            if (index === 0) {
                return code;
            }
            return `${prev},${code}`;
        }, '');
        return currencyCodesText;
    };

    static getFile = (params) => {
        if (!params) {
            return;
        }
        return DataService.getProxyFile(DataService.apiKeys.report, ApiUrl.EXPORT_EXCEL_URL, params)
            .then((response) => {
                const contentType = response.headers['content-type'];
                if (contentType && contentType.indexOf('application/json') > -1) {
                    const RowsExceedLimitErrorCode = 1001;
                    Site.readAsJson(response.data, (result) => {
                        if (result.ErrorCode === RowsExceedLimitErrorCode) {
                            this._showExportWarning();
                        } else {
                            const msg = result.ErrorMsg || LangHelper.getSingleResource('ErrorProcessingMsg');
                            alert(msg);
                        }
                    });
                } else {
                    const NoContentStatusCode = 204;
                    if (response.status === NoContentStatusCode) {
                        alert(LangHelper.getSingleResource('NoInfo'));
                    } else {
                        const fileName = params.ExportExcelMode == ExportExcelMode.All ? 'WinLossReportGroupByAndBreakdownBy' : 'WinLossReportGroupBy';
                        const fileNameWithExt = fileName + (response.headers['content-type'] === 'application/zip' ? '.zip' : '.xls');

                        Site.downloadFile(response.data, fileNameWithExt);
                    }
                }
            })
            .catch((error) => {
                alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
            });
    };
}
