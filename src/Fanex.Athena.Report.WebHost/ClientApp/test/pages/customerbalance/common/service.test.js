import Service from '@/pages/customerbalance/common/service'

jest.mock('@/lib/numberFormat', () => ({ __esModule: true, default: { formatHalfDown: (n, p) => Number(n.toFixed(p)) } }))
jest.mock('@/pages/customerbalance/common/filter', () => ({ SortKeys: { CustomerWinloss: 'CustomerWinloss', Deposit: 'Deposit', Withdrawal: 'Withdrawal', TurnOver: 'TurnOver', OpeningBalance: 'OpeningBalance', ClosingBalance: 'ClosingBalance' } }))

describe('customerbalance common service', () => {
  test('getOrderItem maps sort keys', () => {
    expect(Service.getOrderItem('Deposit')).toBe(1)
    expect(Service.getOrderItem('Withdrawal')).toBe(2)
    expect(Service.getOrderItem('TurnOver')).toBe(3)
    expect(Service.getOrderItem('CustomerWinloss', 'desc')).toBe(4)
    expect(Service.getOrderItem('CustomerWinloss', 'asc')).toBe(5)
    expect(Service.getOrderItem('OpeningBalance')).toBe(6)
    expect(Service.getOrderItem('ClosingBalance')).toBe(7)
    expect(Service.getOrderItem('Unknown')).toBe(0)
  })

  test('formatDecimalInObjectNumbers formats only numeric fields', () => {
    const input = { a: 1.2345, b: 'x', c: 2, d: NaN }
    const result = Service.formatDecimalInObjectNumbers(input)
    expect(result).toEqual({ a: 1.23, c: 2.00 })
  })
})









