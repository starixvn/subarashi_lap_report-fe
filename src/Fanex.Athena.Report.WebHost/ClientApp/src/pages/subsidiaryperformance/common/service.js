import LangHelper from '@/helpers/langHelper';
import ReportTitleHelper from '@/lib/reportTitleHelper';

export default class Service {
    static generateReportTitle(fromDate, toDate, selectedBaseCurrency) {
        return ReportTitleHelper.generateTitleWithBaseCurrency('SubsidiaryPerformance', fromDate, toDate, selectedBaseCurrency);
    }

    static showErrorMsg() {
        alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
    }
}
