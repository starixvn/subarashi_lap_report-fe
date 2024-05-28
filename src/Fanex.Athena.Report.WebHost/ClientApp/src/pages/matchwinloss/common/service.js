import LangHelper from '@srcRoot/helpers/langHelper';

class Service {
    static generateReportTitle(date, currencyName, products) {
        const matchWinLossTitle = LangHelper.getSingleResource('MatchWinLoss');
        if (!products?.length || !currencyName) {
            return `${matchWinLossTitle}, ${date}`;
        }

        const productCodes = products.map((item) => item.code).join(',');
        const currencyView = LangHelper.getSingleResource('Viewin').replace('{0}', currencyName);
        const productCodeView = `${LangHelper.getSingleResource('LicenseeW_L')} (${productCodes})`;
        return `${matchWinLossTitle}, ${date} - ${currencyView}, ${productCodeView}`;
    }

    static getProductCodeList(productOptions) {
        return productOptions.map((item) => item.code).join(',');
    }

    static getMatchProductCodeList(matchProductCode, productOptions) {
        const codeList = ['NG', 'LC', 'VS'];
        const productCodeList = [];

        if ((matchProductCode === 'SB' || matchProductCode === 'BA') && productOptions.some((option) => option.code === 'SB')) {
            productCodeList.push('SB');
        }
        if ((matchProductCode === 'SB' || matchProductCode === 'BA') && productOptions.some((option) => option.code === 'BA')) {
            productCodeList.push('BA');
        }

        codeList.forEach((item) => {
            if (matchProductCode === item && productOptions.some((option) => option.code === item)) {
                productCodeList.push(item);
            }
        });

        return productCodeList.map((item) => item).join(',');
    }

    static convertToReportData(gridData) {
        const matches = [];
        for (let key in gridData.leagueList) {
            if (gridData.leagueList.hasOwnProperty(key)) {
                matches.push({
                    leagueId: key,
                    leagueName: gridData.leagueList[key],
                    data: gridData.data.filter((match) => match.leagueId == key),
                });
            }
        }

        matches.sort((a, b) => a.leagueName.localeCompare(b.leagueName));
        gridData.data = matches;

        return gridData;
    }
}

export default Service;
