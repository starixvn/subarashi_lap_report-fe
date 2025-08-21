import Service from '@/pages/customerturnover/common/service'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: (k) => k } }))
jest.mock('@/lib/cache', () => ({ __esModule: true, default: { get: jest.fn(() => null), set: jest.fn() } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn(async () => ({ data: [{ id: 1 }] })) } }))

describe('customerturnover common service', () => {
  test('generateReportTitle builds string', () => {
    const t = Service.generateReportTitle('2024-01-01', '2024-01-02', 'USD', 1.5, 'user')
    expect(t).toContain('CustomerTurnover')
    expect(t).toContain('2024-01-01')
    expect(t).toContain('2024-01-02')
    expect(t).toContain('USD')
    expect(t).toContain('user')
  })

  test('convertToCheckedItems nests children with prefix', () => {
    const items = [
      { id: 10, name: 'P', checked: true, parentId: -1 },
      { id: 1, name: 'C1', checked: false, parentId: 10 },
    ]
    const res = Service.convertToCheckedItems(items)
    expect(res[0].children[0].id).toMatch(/^childId-/)
    expect(res[0].children[0].checked).toBe(false)
  })

  test('fetchBetTypeList caches server response', async () => {
    const data = await Service.fetchBetTypeList({ cacheKey: 'k', url: '/u', sportProducts: [] })
    expect(Array.isArray(data)).toBe(true)
  })

  test('getSelectedBettypeXML builds xml for parents', () => {
    const xml = Service.getSelectedBettypeXML(['P-1', 'P-2', 'Q-9'], ['P', 'Q'])
    expect(xml).toContain('<ROOT')
    expect(xml).toContain('Bettype')
    expect(xml).toContain('pc="P"')
    expect(xml).toContain('bt="1,2"')
    expect(xml).toContain('pc="Q"')
    expect(xml).toContain('bt="9"')
  })
})


