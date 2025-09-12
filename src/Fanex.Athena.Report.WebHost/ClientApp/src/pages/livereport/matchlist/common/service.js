import LangHelper from '@/helpers/langHelper';

export default class Service {
    static generateReportTitle(productName, currencyName) {
        const currencyView = LangHelper.getSingleResource('Viewin').replace('{0}', currencyName);
        return `${productName} - ${currencyView}`;
    }
}
