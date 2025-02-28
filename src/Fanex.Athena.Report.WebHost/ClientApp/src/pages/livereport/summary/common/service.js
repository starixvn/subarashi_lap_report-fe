import LangHelper from '@/helpers/langHelper';
import { LiveStatusesReportTitle } from './filterSettings';

class Service {
    static generateReportTitle(liveIndicator, fromDate, toDate, currencyName) {
        const liveReportTitle = `${LangHelper.getSingleResource('LiveReport')}`;
        const liveIndicatorTitle = `${LiveStatusesReportTitle.find((status) => status.value == liveIndicator).label} ${LangHelper.getSingleResource('Data')}`;
        const dateTitle = `${fromDate} → ${toDate}`;
        const currencyTitle = LangHelper.getSingleResource('Viewin').replace('{0}', currencyName);
        return `${liveReportTitle} - ${liveIndicatorTitle}, ${dateTitle} - ${currencyTitle}`;
    }

    static getMatchListProductOption(sportId, productCode) {
        const newSportId = Number(sportId);
        let productOptions = [];
        if (newSportId > 0) {
            if (
                newSportId === 180 ||
                newSportId === 186 ||
                newSportId === 231 ||
                newSportId === 104 ||
                (newSportId >= 190 && newSportId <= 197) ||
                newSportId === 178 ||
                newSportId === 179 ||
                newSportId === 188 ||
                newSportId === 177 ||
                newSportId === 198 ||
                newSportId === 134
            ) {
                productOptions.push('VS');
            } else if (newSportId === 162) {
                productOptions.push('LC');
            } else {
                if (productCode === 'SB' || productCode === 'ALL') {
                    productOptions.push('SB');
                }
                if (productCode === 'BA' || productCode === 'ALL') {
                    productOptions.push('BA');
                }
            }
        } else {
            if (productCode === 'ALL') {
                productOptions = ['SB', 'BA', 'NG', 'LC', 'VS', 'CS'];
            } else {
                productOptions.push(productCode);
            }
        }

        return productOptions;
    }

    static getSubsidiarySelected(subsidiaryList, subsidiarySelected) {
        if (!subsidiaryList || !subsidiaryList.length) {
            return subsidiaryList;
        }

        const result = [...subsidiaryList];
        for (let i = 0; i < subsidiaryList.length; ++i) {
            result[i].checked = this.hasAllChildrenSelected(result[i], subsidiarySelected);
            result[i].children = this.getSubsidiarySelected(result[i].children, subsidiarySelected);
        }

        return result;
    }

    static hasAllChildrenSelected(subsidiaryItem, subsidiarySelected) {
        if (
            !subsidiarySelected ||
            subsidiarySelected.some((item) => subsidiaryItem.value == item) ||
            subsidiarySelected.some((item) => subsidiaryItem.name == item)
        ) {
            return true;
        }

        if (!subsidiaryItem.children || !subsidiaryItem.children || !subsidiaryItem.children.length) {
            return false;
        }

        let count = 0;
        for (let i = 0; i < subsidiaryItem.children.length; ++i) {
            if (!this.hasAllChildrenSelected(subsidiaryItem.children[i], subsidiarySelected)) {
                return false;
            }
            count++;
        }

        return count == subsidiaryItem.children.length;
    }
}

export default Service;
