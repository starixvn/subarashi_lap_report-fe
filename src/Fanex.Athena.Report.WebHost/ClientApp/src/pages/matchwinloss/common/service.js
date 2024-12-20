import LangHelper from '@srcRoot/helpers/langHelper';
import { SpecialProducts, MaxLength, VsSportTypes, SupportDrillDownProducts } from './apiSettings';

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

    static getMatchName(match){
        let matchName = match.matchName;
        let homeName = match.homeName;
        let awayName = match.awayName;
        if(SpecialProducts.includes(match.productName)){
            if(matchName.length >  MaxLength){
                matchName =  `<span title='${matchName.replace(",", "&#39;")}'>${matchName.substring(0, MaxLength - 3)}...</span>`
            }
        }
        else if(!VsSportTypes.includes(match.sportType)){
            if(homeName.length > MaxLength){
                homeName = `<span title='${homeName.replace(",", "&#39;")}'>${homeName.substring(0, MaxLength - 3)}...</span>`
            }
            
            if(awayName.length > MaxLength){
                awayName = `<span title='${awayName.replace(",", "&#39;")}'>${awayName.substring(0, MaxLength - 3)}...</span>`
            }

            matchName = `${homeName}<br />${awayName}`
        }

        return matchName;
    }

    static includeDrilldownProduct(product) {
        return SupportDrillDownProducts.includes(product);
    }
}

export default Service;
