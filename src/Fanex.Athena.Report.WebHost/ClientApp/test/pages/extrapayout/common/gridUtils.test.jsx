import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderHeader, renderFooter, renderDataSection, renderDetailHeader, renderDetailDataSection, renderDetailFooter } from '@/pages/extrapayout/common/gridUtils'

jest.mock('@legion-lib/react-grid', () => ({
  Row: ({ children, className }) => <div data-testid="row" data-class={className}>{children}</div>,
  Cell: ({ children, className, colSpan, rowSpan }) => <div data-testid="cell" data-class={className} data-colspan={String(colSpan||'')} data-rowspan={String(rowSpan||'')}>{children}</div>,
  HeaderRow: ({ children }) => <div data-testid="hrow">{children}</div>,
  HeaderCell: ({ children }) => <div data-testid="hcell">{children}</div>
}))

jest.mock('@/helpers/langHelper', () => ({
  __esModule: true,
  default: { getSingleResource: (k) => k }
}))

jest.mock('@/lib/numberFormat', () => ({
  __esModule: true,
  default: { format: (v) => String(v), formatDecimal: (v) => String(v) }
}))

describe('extrapayout gridUtils', () => {
  test('renderHeader level 0 and 1', () => {
    render(<div>{renderHeader(0)}</div>)
    expect(screen.getAllByTestId('hcell').length).toBeGreaterThan(0)

    render(<div>{renderHeader(1)}</div>)
    expect(screen.getAllByTestId('hcell').length).toBeGreaterThan(0)
  })

  test('renderFooter with totals', () => {
    const data = {
      totalCurrency: [{ currencyName: 'USD', turnover: 1, betCount: 2, amount: 3, sharingAmount: 4 }],
      totalSummary: { currencyName: 'USD', turnover: 10, betCount: 20, amount: 30, sharingAmount: 40 }
    }
    render(<div>{renderFooter(data, 0)}</div>)
    expect(screen.getAllByTestId('row').length).toBeGreaterThan(1)
  })

  test('renderDataSection builds rows', () => {
    const rows = renderDataSection([{ index: 1, indexRowSpan: 1, curencyRowSpan: 1, productRowSpan: 1, date: '2020-01-01', dateString: '2020-01-01', productName: 'P', betCount: 1, turnover: 2, amount: 3, sharingAmount: 4, custId: 5, username: 'u', nickname: 'n', promotionName: 'promo', currency: '1', currencyName: 'USD', productCode: 'X', promotionType: 0 }], 0, jest.fn(), jest.fn(), 0)
    expect(rows.bodyData.length).toBe(1)
  })

  test('renderDetailHeader', () => {
    render(<div>{renderDetailHeader()}</div>)
    expect(screen.getAllByTestId('hcell').length).toBeGreaterThan(0)
  })

  test('renderDetailDataSection and renderDetailFooter', () => {
    const dataRows = renderDetailDataSection([{ dateString: 'd', productName: 'p', turnover: 1, amount: -2, sharingAmount: -3, refno: 'r', promotionName: 'pn', productCode: 'X', betID: 'b' }])
    render(<div>{dataRows}</div>)
    const detailRows = screen.getAllByTestId('row')
    expect(detailRows.length).toBeGreaterThan(0)

    render(<div>{renderDetailFooter({ totalSummary: { turnover: 1, amount: -2, sharingAmount: -3 } })}</div>)
    const footerRows = screen.getAllByTestId('row')
    expect(footerRows.length).toBeGreaterThan(0)
  })
})


