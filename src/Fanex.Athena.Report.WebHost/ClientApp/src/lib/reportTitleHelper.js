import LangHelper from '@/helpers/langHelper';

/**
 * Shared utility for generating standardized report titles across different report services
 */
export default class ReportTitleHelper {
    /**
     * Generate a basic report title with date range
     * @param {string} reportType - The report type resource key
     * @param {string} fromDate - Start date
     * @param {string} toDate - End date
     * @returns {string} - Formatted title
     */
    static generateBasicTitle(reportType, fromDate, toDate) {
        const title = LangHelper.getSingleResource(reportType);
        const dateTitle = `${fromDate} → ${toDate}`;
        return `${title}, ${dateTitle}`;
    }

    /**
     * Generate title with date range and currency
     * @param {string} reportType - The report type resource key
     * @param {string} fromDate - Start date
     * @param {string} toDate - End date
     * @param {string} currencyName - Currency name
     * @returns {string} - Formatted title
     */
    static generateTitleWithCurrency(reportType, fromDate, toDate, currencyName) {
        const baseTitle = this.generateBasicTitle(reportType, fromDate, toDate);
        const currencyTitle = `${LangHelper.getSingleResource('Currency')}: ${currencyName}`;
        return `${baseTitle}, ${currencyTitle}`;
    }

    /**
     * Generate title with date range and base currency
     * @param {string} reportType - The report type resource key
     * @param {string} fromDate - Start date
     * @param {string} toDate - End date
     * @param {string} baseCurrency - Base currency name
     * @returns {string} - Formatted title
     */
    static generateTitleWithBaseCurrency(reportType, fromDate, toDate, baseCurrency) {
        const baseTitle = this.generateBasicTitle(reportType, fromDate, toDate);
        const baseCurrencyTitle = `${LangHelper.getSingleResource('BaseCurrency')}: ${baseCurrency}`;
        return `${baseTitle}, ${baseCurrencyTitle}`;
    }

    /**
     * Format date range with arrow separator (standardized pattern)
     * @param {string} fromDate - Start date
     * @param {string} toDate - End date
     * @returns {string} - Formatted date range
     */
    static formatDateRange(fromDate, toDate) {
        return `${fromDate} → ${toDate}`;
    }
}
