import Service from '@/pages/winlossanalysis/common/Service'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: (k) => k } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { downloadFile: jest.fn(), readAsJson: (b, cb) => cb({ ErrorCode: 0 }) } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { apiKeys: { report: 'report' }, postProxyData: jest.fn(async () => ({ data: { totalRow: 3 } })), getProxyFile: jest.fn(async () => ({ headers: { 'content-type': 'application/zip' }, status: 200, data: new Blob(['x']) })) } }))
jest.mock('@/pages/winlossanalysis/common/constants', () => ({
  CashOutModeList: [], ExportExcelMode: { All: 1 }, OneTwoBetLicenseeName: '12Bet',
  BreakdownByMode: { Product: 2, Currency: 1, Player: 3 }, GroupByMode: { Product: 3, Sport: 4, BetType: 5, Player: 8, Currency: 6, Agent: 9, Hour: 10 }, GroupByList: [ { value: 3 }, { value: 4 }, { value: 5 }, { value: 8 }, { value: 6 }, { value: 9 }, { value: 10 } ], ALL_SELECTED_TEXT: 'ALL', ProductCode: { SportsBook: 'SB' }, ApiUrl: { GET_DATA_URL: '/get', EXPORT_EXCEL_URL: '/export' }, ViewInTimeMode: { Settlement: 2 }, MAX_PAGE_EXPORT_PAGE_SIZE: 2, NUMBER_OF_CUNCURRENT_DOWNLOAD_REQUEST: 2
}))

describe('winlossanalysis common Service', () => {
  beforeEach(() => {
    global.document = window.document
    global.XMLSerializer = window.XMLSerializer
  })

  test('getSelectedBettypeXML serializes grouped ids', () => {
    const xml = Service.getSelectedBettypeXML('1_SB,2_SB')
    expect(xml).toContain('<ROOT')
    expect(xml).toContain('Bettype')
    expect(xml).toMatch(/pc="SB"/)
    expect(xml).toMatch(/bt="1,2"/)
  })

  test('buildGroupByOption applies 12Bet and non-12Bet filters', () => {
    const a = Service.buildGroupByOption(2, '12bet')
    const b = Service.buildGroupByOption(2, 'Other')
    expect(a.some(x => x.value === 10)).toBe(true)
    expect(b.some(x => x.value === 10)).toBe(true)
    expect(b.some(x => x.value === 9)).toBe(false)
  })

  test('getCurrencyCodes respects ALL and maps ids to codes', () => {
    const list = [{ id: '1', value: 'USD' }, { id: '2', value: 'EUR' }]
    const val = Service.getCurrencyCodes('1,2', list)
    expect(val).toBe('ALL')
    const val2 = Service.getCurrencyCodes('2', list)
    expect(val2).toBe('EUR')
  })

  test('getFile downloads multiple pages', async () => {
    await Service.getFile({ ExportExcelMode: 1 })
  })
})


