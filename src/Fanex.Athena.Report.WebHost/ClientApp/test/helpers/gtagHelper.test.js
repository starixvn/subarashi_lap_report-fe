import GtagHelper from '@/helpers/gtagHelper'

describe('GtagHelper', () => {
    const href = 'https://example.com/page#hash'
    const pathname = '/page'

    beforeEach(() => {
        delete window.logPageViewEvent
        delete window.logViewReportDataEvent
        delete window.logOpenBetlistEvent
        delete window.location
        window.location = { href, pathname }
    })

    test('logPageView calls window.logPageViewEvent when present', () => {
        const spy = jest.fn()
        window.logPageViewEvent = spy
        GtagHelper.logPageView('Title')
        expect(spy).toHaveBeenCalledWith('Title', 'https://example.com/page', pathname)
    })

    test('logViewReportData calls window.logViewReportDataEvent when present', () => {
        const spy = jest.fn()
        window.logViewReportDataEvent = spy
        GtagHelper.logViewReportData('label')
        expect(spy).toHaveBeenCalledWith('label')
    })

    test('logOpenBetlist calls window.logOpenBetlistEvent when present', () => {
        const spy = jest.fn()
        window.logOpenBetlistEvent = spy
        GtagHelper.logOpenBetlist('label')
        expect(spy).toHaveBeenCalledWith('label')
    })
})

