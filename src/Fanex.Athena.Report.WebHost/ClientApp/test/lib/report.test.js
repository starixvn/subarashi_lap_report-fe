import Report from '@/lib/report'
import { ReportBy } from '@/constants/report'

describe('Report.getDrilldownDateRange', () => {
    test('daily returns same date for from/to', () => {
        const d = new Date('2023-01-15T00:00:00Z')
        const res = Report.getDrilldownDateRange(ReportBy.DAILY, d, d, d)
        expect(res.fromDate).toEqual(d)
        expect(res.toDate).toEqual(d)
    })

    test('monthly respects original from/to boundaries', () => {
        const from = new Date('2023-01-10T00:00:00Z')
        const to = new Date('2023-01-20T00:00:00Z')
        const drill = new Date('2023-01-05T00:00:00Z')
        const res = Report.getDrilldownDateRange(ReportBy.MONTHLY, from, to, drill)
        expect(res.fromDate.getDate()).toBe(10)
        expect(res.toDate.getDate()).toBe(20)
    })

    test('monthly full month when drill month differs from from/to month', () => {
        const from = new Date('2023-01-10T00:00:00Z')
        const to = new Date('2023-01-20T00:00:00Z')
        const drill = new Date('2023-02-05T00:00:00Z')
        const res = Report.getDrilldownDateRange(ReportBy.MONTHLY, from, to, drill)
        expect(res.fromDate.getDate()).toBe(1)
        expect(res.toDate.getDate()).toBe(28)
    })
})

