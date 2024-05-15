import LangHelper from '@srcRoot/helpers/langHelper';

class Service {
    static generateReportTitle(date, currencyName, products) {
        const matchWinLossTitle = LangHelper.getSingleResource('MatchWinLoss');
        if (!products?.length || !currencyName) {
            return `${matchWinLossTitle}, ${date}`;
        }

        const productCodes = products.slice(1).reduce((acc, cur) => acc + ', ' + cur.code, products[0].code);
        const currencyView = `View in ${currencyName}, ${LangHelper.getSingleResource('LicenseeW_L')} (${productCodes})`;
        return `${matchWinLossTitle}, ${date} - ${currencyView}`;
    }

    static getProductCodeList(productOptions) {
        return productOptions.slice(1).reduce((acc, cur) => acc + ',' + cur.code, productOptions[0].code);
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

        return productCodeList.slice(1).reduce((acc, cur) => acc + ',' + cur, productCodeList[0]);
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
