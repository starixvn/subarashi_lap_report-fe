import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@legion-lib/react-grid', () => ({ Row: ({ children, className }) => <div data-testid="row" data-class={className}>{children}</div>, Cell: ({ children }) => <span>{children}</span> }))
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: (k) => k } }))
jest.mock('@/pages/matchwinloss/gridUtility/CommonCells', () => ({ __esModule: true, default: ({ data }) => <div data-testid="common">{JSON.stringify(data)}</div> }))
jest.mock('@/pages/matchwinloss/gridUtility/footerbuilder/FooterSpecialBetTypeRows', () => ({ __esModule: true, default: ({ data }) => <div data-testid="special">{JSON.stringify(data)}</div> }))

import { BuildFooter } from '@/pages/matchwinloss/gridUtility/footerbuilder'

test('BuildFooter renders sections based on flags', () => {
  const footer = BuildFooter({ isShowTotal: true, isShowSpecialBetTypeResult: true, totalSpan: 2, total: {}, grandTotal: {}, specialBetTypeResult: {} })
  render(<>{footer}</>)
  expect(screen.getAllByTestId('row').length).toBe(2)
  expect(screen.getByTestId('special')).toBeInTheDocument()
})


