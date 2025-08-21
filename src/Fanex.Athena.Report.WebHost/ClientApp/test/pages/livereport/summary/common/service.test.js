import Service from '@/pages/livereport/summary/common/service'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/pages/livereport/summary/common/filterSettings', () => ({ LiveStatusesReportTitle: [ { value: 1, label: 'Live' }, { value: 2, label: 'Prematch' } ] }))

describe('livereport summary common service', () => {
  test('generateReportTitle renders titles with replacements', () => {
    const t = Service.generateReportTitle(1, '2024-01-01', '2024-01-02', 'USD')
    expect(t).toContain('LiveReport')
    expect(t).toContain('Live Data')
    expect(t).toContain('2024-01-01')
    expect(t).toContain('2024-01-02')
    expect(t).toContain('Viewin')
  })

  test('getMatchListProductOption returns product list based on sport/product', () => {
    expect(Service.getMatchListProductOption(0, 'ALL')).toEqual(['SB', 'NG', 'LC', 'VS', 'CS'])
    expect(Service.getMatchListProductOption(180, 'SB')).toEqual(['VS'])
    expect(Service.getMatchListProductOption(162, 'SB')).toEqual(['LC'])
    expect(Service.getMatchListProductOption(10, 'SB')).toEqual(['SB'])
  })

  test('subsidiary selection utilities compute checked states', () => {
    const tree = [{ name: 'A', value: 'A', children: [{ name: 'B', value: 'B' }] }]
    const res = Service.getSubsidiarySelected(tree, ['A', 'B'])
    expect(res[0].checked).toBe(true)
  })
})


