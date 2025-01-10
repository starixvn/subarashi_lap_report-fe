import LangHelper from '@srcRoot/helpers/langHelper';

class Service {
    static generateReportTitle(productName, currencyName) {
        const currencyView = LangHelper.getSingleResource('Viewin').replace('{0}', currencyName);
        return `${productName} - ${currencyView}`;
    }
}

export default Service;
