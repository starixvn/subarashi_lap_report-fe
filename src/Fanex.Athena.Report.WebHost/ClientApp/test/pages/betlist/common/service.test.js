import Service from '@/pages/betlist/common/service'

jest.mock('@/lib/numberFormat', () => ({ __esModule: true, default: { formatDecimal: n => Number(n) } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { downloadFile: jest.fn() } }))
jest.mock('@/pages/betlist/common/constants', () => ({ TableSettings: { PageIndex: 1, PageSize: 50 } }))

describe('betlist common service', () => {
  test('convertToBetListController appends BetList suffix', () => {
    expect(Service.convertToBetListController('MatchWinLoss')).toBe('MatchWinLossBetList')
  })

  test('initQuery returns ? for empty, preserves non-empty', () => {
    expect(Service.initQuery('')).toBe('?')
    expect(Service.initQuery('?x=1')).toBe('?x=1')
  })

  test('getSettingQuery returns data-only false flag', () => {
    expect(Service.getSettingQuery()).toBe('&DataOnly=false')
  })

  test('loadInitParams parses Page/Rows with defaults', () => {
    const p1 = Service.loadInitParams('')
    expect(p1.Page).toBe(1)
    expect(p1.Rows).toBe(50)
    const p2 = Service.loadInitParams('?Page=3&Rows=25')
    expect(p2.Page).toBe(3)
    expect(p2.Rows).toBe(25)
  })

  test('loadBetListData maps totals and rows', () => {
    const data = { Main: [{ id: 1 }], Total: { SumWinLoss: '1', SumLicenseeWl: '2', SumBetEffective: '3', SumStake: '4' } }
    const res = Service.loadBetListData(data)
    expect(res.rows.length).toBe(1)
    expect(res.userData.Stake).toBe(4)
    expect(res.totalRows).toBe(1)
  })

  test('loadBetlistPagingData maps keys', () => {
    const d = { rows: [1], userdata: { a: 1 }, records: 10, total: 2, page: 1 }
    const r = Service.loadBetlistPagingData(d)
    expect(r.totalRows).toBe(10)
    expect(r.total).toBe(2)
    expect(r.page).toBe(1)
  })
})







