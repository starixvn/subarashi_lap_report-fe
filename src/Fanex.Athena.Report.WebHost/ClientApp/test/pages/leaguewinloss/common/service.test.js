import Service from '@/pages/leaguewinloss/common/service'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { convertDateToString: d => d } }))
jest.mock('@/lib/report', () => ({ __esModule: true, default: { getDrilldownDateRange: jest.fn(() => ({ from: 'a', to: 'b' })) } }))

describe('leaguewinloss common service', () => {
  test('getTitle builds with date, currency, baseCurrency, username', () => {
    const t = Service.getTitle('2024-01-01', '2024-01-02', 'USD', 'EUR', 'bob')
    expect(t).toContain('LeagueWinLoss')
    expect(t).toContain('2024-01-01 ? 2024-01-02')
    expect(t).toContain('Currency: USD')
    expect(t).toContain('BaseCurrency: EUR')
    expect(t).toContain('Username: bob')
  })

  test('getSelectedBettypeXML groups ids by product', () => {
    const xml = Service.getSelectedBettypeXML('1_SB,2_SB,9_VS')
    expect(xml).toContain('pc="SB"')
    expect(xml).toContain('bt="1,2"')
    expect(xml).toContain('pc="VS"')
    expect(xml).toContain('bt="9"')
  })

  test('getNormalizedSelectedParamValueForTreeListFilter returns ALL when full selection', () => {
    const items = [{ children: [{ value: 'A' }, { value: 'B' }] }]
    const res = Service.getNormalizedSelectedParamValueForTreeListFilter('A,B', items)
    expect(res).toBe('ALL')
  })

  test('getDrilldownDateRange proxies to Report', () => {
    const r = Service.getDrilldownDateRange(1, 'a', 'b', 'c')
    expect(r).toEqual({ from: 'a', to: 'b' })
  })
})


