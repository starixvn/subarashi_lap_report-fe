import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('@legion-lib/react-breadcrumb', () => ({ Breadcrumb: ({ items, value, onChange }) => (
  <div data-testid="breadcrumb" data-value={value}>
    {items.map(it => (
      <button key={it.value} data-testid={`bc-${it.value}`} onClick={() => onChange(it)}>{it.name}</button>
    ))}
  </div>
)}))

const mockDispatch = jest.fn()
const mockUseSelector = jest.fn()
jest.mock('react-redux', () => ({ useDispatch: () => mockDispatch, useSelector: sel => mockUseSelector(sel) }))

const mockSendRequest = jest.fn(fn => fn())
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: mockSendRequest }))

jest.mock('@/pages/subsidiaryperformance/actions', () => ({ __esModule: true, default: { fetchGridData: (url, p) => ({ type: 'FETCH', url, p }) } }))
jest.mock('@/pages/subsidiaryperformance/common', () => ({ constants: { ApiUrl: { DATA_URL: '/data', DETAIL_URL: '/detail' }, BreadcrumbItems: [{ name: 'Main', value: 0 }, { name: 'Customer', value: 2 }] } }))

import Comp from '@/pages/subsidiaryperformance/components/GridBreadcrumb'

beforeEach(() => {
  jest.clearAllMocks()
  mockUseSelector.mockImplementation(sel => sel({ requestParam: { DrillDownLevel: 1, A: 1 } }))
})

test('renders breadcrumb with current value', () => {
  render(<Comp />)
  expect(screen.getByTestId('breadcrumb')).toHaveAttribute('data-value', '1')
})

test('ignores click when selecting same level', () => {
  mockUseSelector.mockImplementation(sel => sel({ requestParam: { DrillDownLevel: 0 } }))
  render(<Comp />)
  fireEvent.click(screen.getByTestId('bc-0'))
  expect(mockDispatch).not.toHaveBeenCalled()
})

test('drills to MAIN level calls DATA_URL', () => {
  render(<Comp />)
  fireEvent.click(screen.getByTestId('bc-0'))
  expect(mockSendRequest).toHaveBeenCalled()
  expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH', url: '/data', p: { DrillDownLevel: 0, A: 1 } })
})

test('drills to CUSTOMER level calls DETAIL_URL', () => {
  render(<Comp />)
  fireEvent.click(screen.getByTestId('bc-2'))
  expect(mockSendRequest).toHaveBeenCalled()
  expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH', url: '/detail', p: { DrillDownLevel: 2, A: 1 } })
})


