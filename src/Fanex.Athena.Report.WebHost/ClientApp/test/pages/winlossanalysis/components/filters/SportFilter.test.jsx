import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@legion-lib/react-multiselect', () => ({ TreeViewSelect: p => <div data-testid="tree" /> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, currentLanguage: 'en' } }))

import Comp from '@/pages/winlossanalysis/components/filters/SportFilter'

test('renders tree when data exists', () => {
  render(<Comp dataSource={[{ value: 1, name: 'Football', checked: true }]} />)
  expect(screen.getByTestId('tree')).toBeInTheDocument()
})


