import React from 'react'
import { render, screen } from '@testing-library/react'
import { useSelector } from 'react-redux'
import { StatusFilter } from '@/pages/winlossanalysis/components/filters/StatusFilter'

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}))

jest.mock('@legion-lib/react-multiselect', () => {
  return jest.fn(({ id, dataSource, isValid, onChange }) => (
    <div data-testid="multiselect" data-id={id} data-count={(dataSource || []).length} data-valid={String(!!isValid)} onClick={() => onChange && onChange('a,b')}>
      MultiSelect
    </div>
  ))
})

jest.mock('@/helpers/langHelper', () => ({
  __esModule: true,
  default: { currentLanguage: 'en', getSingleResource: (k) => k }
}))

describe('StatusFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders label and multiselect with data', () => {
    useSelector.mockImplementation((selector) => selector({ formData: { statusList: [{ id: 1, value: 'OK', status: true }] } }))

    render(<StatusFilter isValid={true} onChange={jest.fn()} />)

    expect(screen.getByText('Status')).toBeInTheDocument()
    const ms = screen.getByTestId('multiselect')
    expect(ms).toHaveAttribute('data-id', 'StatusList')
    expect(ms).toHaveAttribute('data-count', '1')
    expect(ms).toHaveAttribute('data-valid', 'true')
  })

  test('passes isValid=false to multiselect', () => {
    useSelector.mockImplementation((selector) => selector({ formData: { statusList: [{ id: 1, value: 'OK', status: true }] } }))

    render(<StatusFilter isValid={false} onChange={jest.fn()} />)
    expect(screen.getByTestId('multiselect')).toHaveAttribute('data-valid', 'false')
  })

  test('does not break when status list is empty', () => {
    useSelector.mockImplementation((selector) => selector({ formData: { statusList: [] } }))

    render(<StatusFilter />)
    expect(screen.getByText('Status')).toBeInTheDocument()
  })
})


