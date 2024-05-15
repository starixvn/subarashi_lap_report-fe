class Service {
    static generateReportTitle(productName, currencyName) {
        const currencyView = `View in ${currencyName}`;
        return `${productName} - ${currencyView}`;
    }
}

export default Service;
