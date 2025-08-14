import BetListHelper from '@/helpers/betlistHelper'

describe('BetListHelper', () => {
    test('loadBetListData aggregates totals and counts rows', () => {
        const data = {
            Main: [{ id: 1 }, { id: 2 }],
            Total: {
                SumWinLoss: 10.555,
                SumLicenseeWl: 20.555,
                SumBetEffective: 30.555,
                SumStake: 40.555
            }
        }
        const res = BetListHelper.loadBetListDataGrid(data, false)
        expect(res.totalRows).toBe(2)
        expect(res.userData).toEqual({
            WinLoss: '10.56',
            LicenseeWL: '20.56',
            BetEffective: '30.56',
            Stake: '40.56'
        })
    })

    test('loadBetlistPagingData returns server paging structure', () => {
        const data = { rows: [1], userdata: { a: 1 }, records: 5, total: 1, page: 1 }
        const res = BetListHelper.loadBetListDataGrid(data, true)
        expect(res).toEqual({ rows: [1], userData: { a: 1 }, totalRows: 5, total: 1, page: 1 })
    })
})

