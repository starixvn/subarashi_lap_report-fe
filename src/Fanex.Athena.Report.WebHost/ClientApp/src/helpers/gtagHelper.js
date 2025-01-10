export default class GtagHelper {
    static logPageView(pageTitle) {
        window.logPageViewEvent && window.logPageViewEvent(pageTitle, window.location.href.split('#')[0], window.location.pathname);
    }

    static logViewReportData(eventLabel) {
        window.logViewReportDataEvent && window.logViewReportDataEvent(eventLabel);
    }

    static logOpenBetlist(eventLabel) {
        window.logOpenBetlistEvent && window.logOpenBetlistEvent(eventLabel);
    }
}
