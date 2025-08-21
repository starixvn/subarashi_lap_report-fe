import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@/components/CollapsiblePanel', () => ({ children }) => <div data-testid="panel">{children}</div>)
jest.mock('@/pages/winlossanalysis/components/mobile/MobileMainFilter', () => ({ isCollapsed }) => <div data-testid="main" data-collapsed={String(isCollapsed)} />)
jest.mock('@/pages/winlossanalysis/components/mobile/MobileGroupByFilter', () => ({ isCollapsed }) => <div data-testid="group" data-collapsed={String(isCollapsed)} />)

import Comp from '@/pages/winlossanalysis/components/mobile/MobileFormFilter'

test('MobileFormFilter renders child filters inside panel', () => {
  render(<Comp />)
  expect(screen.getByTestId('panel')).toBeInTheDocument()
  expect(screen.getByTestId('main')).toBeInTheDocument()
  expect(screen.getByTestId('group')).toBeInTheDocument()
})


