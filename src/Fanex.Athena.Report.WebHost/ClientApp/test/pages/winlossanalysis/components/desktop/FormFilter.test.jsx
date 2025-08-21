import React from 'react'
import { render, screen } from '@testing-library/react'
import { FormFilter } from '@/pages/winlossanalysis/components/desktop/FormFilter'

jest.mock('@/components/CollapsiblePanel', () => ({ children }) => <div data-testid="panel">{children}</div>)
jest.mock('@/pages/winlossanalysis/components/desktop/MainFilter.jsx', () => () => <div data-testid="main-filter">MF</div>)
jest.mock('@/pages/winlossanalysis/components/desktop/GroupByFilter.jsx', () => () => <div data-testid="group-filter">GF</div>)

describe('FormFilter (desktop)', () => {
  test('renders panel with subfilters', () => {
    render(<FormFilter />)
    expect(screen.getByTestId('panel')).toBeInTheDocument()
    expect(screen.getByTestId('main-filter')).toBeInTheDocument()
    expect(screen.getByTestId('group-filter')).toBeInTheDocument()
  })
})


