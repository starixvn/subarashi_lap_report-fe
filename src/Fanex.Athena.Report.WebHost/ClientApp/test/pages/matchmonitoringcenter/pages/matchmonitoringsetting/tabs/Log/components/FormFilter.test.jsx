import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}))

jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/Log/actions', () => ({
  ActionCreators: {
    setSelectedLogTypes: v => ({ type: 'SET_LOG_TYPES', v }),
    setSelectedActions: v => ({ type: 'SET_ACTIONS', v }),
    fetchLogData: v => ({ type: 'FETCH_LOG', v })
  }
}))

jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: p => <select data-testid={p.id || 'multi'} onChange={() => p.onChange(null, '1')} /> }))
jest.mock('@/components/CollapsiblePanel', () => ({ children }) => <div>{children}</div>)
jest.mock('@/components/SubmitButton', () => p => <button data-testid="submit" onClick={p.onClick} disabled={p.disabled}>{p.children}</button>)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, currentLanguage: 'en' } }))

import * as rr from 'react-redux'
import FormFilter from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/Log/components/FormFilter'

describe('MMC Log FormFilter', () => {
  const mockDispatch = jest.fn()
  const makeState = (overrides = {}) => ({
    formData: { logTypeOptions: [{ key: 1, value: 'A' }], actionOptions: [{ key: 1, value: 'X' }] },
    selectedLogTypes: '',
    selectedActions: '',
    monitoringID: 1,
    ...overrides
  })

  beforeEach(() => {
    jest.clearAllMocks()
    rr.useDispatch.mockReturnValue(mockDispatch)
  })

  test('submit disabled when no selections', () => {
    rr.useSelector.mockImplementation(fn => fn(makeState()))
    render(<FormFilter />)
    expect(screen.getByTestId('submit')).toBeDisabled()
  })

  test('submit enabled when actions selected and triggers fetch', () => {
    rr.useSelector.mockImplementation(fn => fn(makeState({ selectedActions: '1' })))
    render(<FormFilter />)
    expect(screen.getByTestId('submit')).toBeEnabled()
    fireEvent.click(screen.getByTestId('submit'))
    expect(mockDispatch).toHaveBeenCalled()
  })
})


