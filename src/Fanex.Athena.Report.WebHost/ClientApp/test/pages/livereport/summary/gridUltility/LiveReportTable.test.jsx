import React from 'react'
import { render, screen } from '@testing-library/react'
import LiveReportTable from '@/pages/livereport/summary/gridUltility/LiveReportTable'

jest.mock('@legion-lib/react-grid', () => ({
  Table: jest.fn(({ header, body, footer }) => (
    <div data-testid="table">
      <div data-testid="hdr">{header}</div>
      <div data-testid="bdy">{body}</div>
      <div data-testid="ftr">{footer}</div>
    </div>
  ))
}))

describe('LiveReportTable', () => {
  test('renders title and table sections', () => {
    render(
      <LiveReportTable tableTitle="My Title" header={<div>H</div>} body={<div>B</div>} footer={<div>F</div>} />
    )

    expect(screen.getByText('My Title')).toBeInTheDocument()
    expect(screen.getByTestId('hdr')).toHaveTextContent('H')
    expect(screen.getByTestId('bdy')).toHaveTextContent('B')
    expect(screen.getByTestId('ftr')).toHaveTextContent('F')
  })

  test('uses default props when not provided', () => {
    render(<LiveReportTable tableTitle="T" />)
    expect(screen.getByText('T')).toBeInTheDocument()
    expect(screen.getByTestId('hdr').textContent).toBe('')
    expect(screen.getByTestId('bdy').textContent).toBe('')
    expect(screen.getByTestId('ftr').textContent).toBe('')
  })
})


