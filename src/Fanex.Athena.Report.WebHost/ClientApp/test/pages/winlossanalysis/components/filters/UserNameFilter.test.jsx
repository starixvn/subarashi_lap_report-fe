import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/components/auto-complete', () => p => <input data-testid="auto" onChange={e => p.onInput && p.onInput(e.target.value)} onBlur={e => p.onSelect && p.onSelect(e.target.value)} />)
jest.mock('@/pages/winlossanalysis/components/filters/SearchOption', () => p => <select data-testid="opt" onChange={e => p.onChange && p.onChange(Number(e.target.value))}><option value="1">1</option></select>)
jest.mock('@/pages/winlossanalysis/common/constants', () => ({ ApiUrl: { CUSTOMER_SEARCH_URL: '/search' } }))

import Comp from '@/pages/winlossanalysis/components/filters/UserNameFilter'

test('renders and triggers search option and input handlers', () => {
  const onChangeSearchMode = jest.fn()
  const onChangeUserName = jest.fn()
  render(<Comp onChangeSearchMode={onChangeSearchMode} onChangeUserName={onChangeUserName} searchMode={1} />)
  fireEvent.change(screen.getByTestId('opt'), { target: { value: '1' } })
  fireEvent.change(screen.getByTestId('auto'), { target: { value: 'u' } })
  fireEvent.blur(screen.getByTestId('auto'), { target: { value: 'u' } })
  expect(onChangeSearchMode).toHaveBeenCalled()
  expect(onChangeUserName).toHaveBeenCalled()
})


