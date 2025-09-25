import Service from '@/pages/turnover/common/service'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))

describe('turnover common service', () => {
  test('generateReportTitle for user mode', () => {
    const t = Service.generateReportTitle('2024-01-01', '2024-01-02', 'USD', 'EUR', 'alice')
    expect(t).toContain('Customer alice (EUR)')
  })

  test('generateReportTitle for non-user mode', () => {
    const t = Service.generateReportTitle('2024-01-01', '2024-01-02', 'USD', 'EUR')
    expect(t).toContain('Currency: USD')
    expect(t).toContain('BaseCurrency: EUR')
  })
})









