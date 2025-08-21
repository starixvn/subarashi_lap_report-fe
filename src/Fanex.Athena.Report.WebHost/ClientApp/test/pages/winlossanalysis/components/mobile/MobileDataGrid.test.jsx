import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('usehooks-ts', () => ({ useElementSize: () => [{ current: { getElementsByClassName: () => [{ setAttribute: () => {} }] } }, { width: 500, height: 20 }], useWindowSize: () => ({ width: 600 }) }))
jest.mock('@legion-lib/react-grid', () => ({ Table: (p) => <div data-testid="table" {...p} />, Cell: (p) => <div {...p} />, Row: (p) => <div {...p} />, HeaderRow: (p) => <div {...p} />, HeaderCell: (p) => <div {...p} /> }))
jest.mock('@/components/mobile-component/RefPager', () => ({ RefPager: require('react').forwardRef((p, ref) => <div ref={ref} data-testid="pager" />) }))
jest.mock('@/components/dropdown', () => ({ DrowdownRadioList: (p) => <select data-testid="dropdown" onChange={p.onChange}><option value={p.selectedValue}>{p.selectedValue}</option></select> }))
jest.mock('@/components/NoDataTitle', () => () => <div data-testid="nodata">NODATA</div>)
jest.mock('@/components/ReportTitle', () => (p) => <div data-testid="title">{p.tag}</div>)
jest.mock('@/pages/winlossanalysis/components/hooks/useRenderRowOption.jsx', () => () => ({ isBreakDownPlayerMode: true, isGroupByPlayerMode: false }))
jest.mock('@/pages/winlossanalysis/components/mobile/ReportTitleContent.jsx', () => () => <div data-testid="title-content" />)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))

import Comp from '@/pages/winlossanalysis/components/mobile/MobileDataGrid'

const makeStore = (state) => createStore(s => s, state)

beforeAll(() => {
  if (!window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = () => {}
  }
})

test('returns null when data is undefined', () => {
  const store = makeStore({ reportData: { data: undefined }, requestParam: { PageIndex: 1, PageSize: 10, SubmitTime: 1 }, sumTotal: null, totalRow: 0, reloadReport: false })
  const { container } = render(<Provider store={store}><Comp /></Provider>)
  expect(container.firstChild).toBeNull()
})

test('renders NoData when data empty', () => {
  const store = makeStore({ reportData: { data: [] }, requestParam: { PageIndex: 1, PageSize: 10, SubmitTime: 1 }, sumTotal: null, totalRow: 0, reloadReport: false })
  render(<Provider store={store}><Comp /></Provider>)
  expect(screen.getByTestId('nodata')).toBeInTheDocument()
})

test('renders table when data present', () => {
  const store = makeStore({ reportData: { data: [{}], sumTotal: { turnover: 1, playerWinloss: 2 }, totalRow: 1 }, requestParam: { PageIndex: 1, PageSize: 10, SubmitTime: 1 }, reloadReport: false })
  render(<Provider store={store}><Comp /></Provider>)
  expect(screen.getByTestId('table')).toBeInTheDocument()
})


