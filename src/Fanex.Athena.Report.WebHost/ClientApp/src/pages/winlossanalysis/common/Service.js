import LangHelper from '@srcRoot/helpers/langHelper';
import Site from '@srcRoot/lib/site';
import { CashOutModeList, ExportExcelMode, OneTwoBetLicenseeName } from './constants';
import { BreakdownByMode, GroupByMode, GroupByList, ALL_SELECTED_TEXT, ProductCode } from './constants';
import { ApiUrl, ViewInTimeMode, MAX_PAGE_EXPORT_PAGE_SIZE, NUMBER_OF_CUNCURRENT_DOWNLOAD_REQUEST } from '../common/constants.js';
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

    static buildGroupByOption = (selectedViewInTime, licenseeName) => {
        return this.isOneTwoBetLicensee(licenseeName)
            ? GroupByList.filter(item => selectedViewInTime === ViewInTimeMode.Settlement || item.value !== GroupByMode.Hour)
            : GroupByList.filter(item => item.value !== GroupByMode.Agent && (selectedViewInTime === ViewInTimeMode.Settlement || item.value !== GroupByMode.Hour));
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

    static getFile = async (params) => {
        if (!params) {
            return;
        }
        let totalRow = await this.getTotalRow(params);
        let totalPage = Math.ceil(totalRow / MAX_PAGE_EXPORT_PAGE_SIZE);

        for (let i = 1; i <= totalPage;) {
            let arrayTask = [];
            for (let j = 1; j <= NUMBER_OF_CUNCURRENT_DOWNLOAD_REQUEST && i <= totalPage; j++) {
                let exportExcelFileParam = { ...params, PageSize: MAX_PAGE_EXPORT_PAGE_SIZE, PageIndex: i };
                arrayTask.push(this.downloadExcelFile(exportExcelFileParam));
                i++;
            }
            var results = await Promise.all(arrayTask);
            if (results.some(result => !result)) {
                break;
            }
        }
    }

    static getTotalRow = async (params) => {
        let queryTotalPageParams = { ...params, PageSize: 1, PageIndex: 1 };
        var response = await DataService.postProxyData(DataService.apiKeys.report, ApiUrl.GET_DATA_URL, queryTotalPageParams);
        return response.data.totalRow;
    }

    static downloadExcelFile = async (params) => {
        try {
            const response = await DataService.getProxyFile(DataService.apiKeys.report, ApiUrl.EXPORT_EXCEL_URL, params);
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
                    const isZipFile = response.headers["content-type"] === "application/zip";
                    const pageSuffix = isZipFile ? `_${params.PageIndex}` : "";
                    const fileNameWithExt = `${fileName}${pageSuffix}.${isZipFile ? "zip" : "xls"}`;

                    Site.downloadFile(response.data, fileNameWithExt);
                    return true;
                }
            }
            return false;
        }
        catch (error) {
            alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
        };
    };
}
