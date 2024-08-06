import LangHelper from '@srcRoot/helpers/langHelper';

class Service {
    static generateReportTitle(fromDate, toDate, selectedBaseCurrency) {
        const baseCurrency = `${LangHelper.getSingleResource('BaseCurrency')}: ${selectedBaseCurrency}`;

        return `${LangHelper.getSingleResource('SubsidiaryPerformance')}, ${fromDate} - ${toDate}, ${baseCurrency}`;
    }

    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }
}

export default Service;
