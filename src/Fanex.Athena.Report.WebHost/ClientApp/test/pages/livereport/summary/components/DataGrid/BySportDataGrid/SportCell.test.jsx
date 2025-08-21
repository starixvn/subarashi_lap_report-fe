import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('@legion-lib/react-grid', () => ({ Cell: ({ children, title }) => <div data-testid="cell" data-title={title}>{children}</div> }))
jest.mock('react-redux', () => ({ useDispatch: () => jest.fn(), useSelector: jest.fn((sel) => sel({ requestParam: { ProductCode: 1 } })) }))
const mockNavigate = jest.fn()
jest.mock('@/hooks/useNavigateParams', () => () => mockNavigate)
jest.mock('react-router-dom', () => ({ createSearchParams: (obj) => '?' + Object.keys(obj).join('=') }))
jest.mock('@/pages/livereport/summary/common', () => ({ __esModule: true, default: { getMatchListProductOption: () => [1,2] }, constants: { MatchListPage: '/match', BetListPageUrl: { 7: '/bet' } } }))
jest.mock('@/pages/livereport/summary/actions', () => ({ ActionCreators: { toggleLoader: (v) => ({ type: 'T', payload: v }) } }))

import Comp from '@/pages/livereport/summary/components/DataGrid/BySportDataGrid/SportCell'

test('renders plain cell when not live or link hidden', () => {
  render(<Comp data={{ isLive: false, productName: 'X' }} isShowedDetailLink={true} />)
  expect(screen.getByTestId('cell')).toHaveAttribute('data-title', 'X')
})

test('navigates to bet list when betListUrl exists', () => {
  render(<Comp data={{ isLive: true, productName: 'Y', productCode: 7 }} isShowedDetailLink={true} />)
  fireEvent.click(screen.getByText('Y'))
  expect(mockNavigate).toHaveBeenCalled()
})

test('navigates to match list when betListUrl missing', () => {
  render(<Comp data={{ isLive: true, productName: 'Z', productCode: 999 }} isShowedDetailLink={true} />)
  fireEvent.click(screen.getByText('Z'))
  expect(mockNavigate).toHaveBeenCalled()
})


