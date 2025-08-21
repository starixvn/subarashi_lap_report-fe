import Service from '@/pages/matchwinloss/common/service'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/pages/matchwinloss/common/apiSettings', () => ({ SpecialProducts: ['SP'], MaxLength: 10, VsSportTypes: ['VS'], SupportDrillDownProducts: ['SB', 'VS'] }))

describe('matchwinloss common service', () => {
  test('generateReportTitle builds with date, currency and products', () => {
    const t = Service.generateReportTitle('2024-01-01', 'USD', [{ code: 'SB' }, { code: 'VS' }])
    expect(t).toContain('MatchWinLoss')
    expect(t).toContain('Viewin')
    expect(t).toContain('LicenseeW_L')
  })

  test('getProductCodeList and getMatchProductCodeList', () => {
    const options = [{ code: 'SB' }, { code: 'VS' }]
    expect(Service.getProductCodeList(options)).toBe('SB,VS')
    expect(Service.getMatchProductCodeList('SB', options)).toBe('SB')
    expect(Service.getMatchProductCodeList('VS', options)).toBe('VS')
  })

  test('convertToReportData groups matches by league and sorts', () => {
    const gd = { leagueList: { A: 'Alpha', B: 'Beta' }, data: [ { leagueId: 'B' }, { leagueId: 'A' } ] }
    const res = Service.convertToReportData(gd)
    expect(res.data[0].leagueName <= res.data[1].leagueName).toBe(true)
  })

  test('getMatchName truncates or combines names based on product/sport', () => {
    const m1 = { matchName: 'VeryLongName12345', productName: 'SP', sportType: 'X' }
    expect(Service.getMatchName(m1)).toMatch(/<span title=/)
    const m2 = { matchName: 'x', homeName: 'HOMELONGNAME123', awayName: 'AWAYLONGNAME123', productName: 'OTH', sportType: 'X' }
    expect(Service.getMatchName(m2)).toMatch(/<br \/>/)
  })

  test('includeDrilldownProduct returns matching flag', () => {
    expect(Service.includeDrilldownProduct('SB')).toBe(true)
    expect(Service.includeDrilldownProduct('NG')).toBe(false)
  })
})


