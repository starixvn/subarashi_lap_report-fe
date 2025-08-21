import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@legion-lib/react-grid', () => ({ Row: ({ children }) => <div data-testid="row">{children}</div>, Cell: ({ children }) => <span>{children}</span> }))
jest.mock('@/pages/matchwinloss/gridUtility/bodybuilder/BodyContentRow', () => ({ __esModule: true, default: ({ index, matchData }) => <div data-testid="content" data-index={index}>{matchData.name}</div> }))

import { BuildBody } from '@/pages/matchwinloss/gridUtility/bodybuilder'

test('BuildBody returns empty for empty data', () => {
  const rows = BuildBody([], 5)
  expect(rows).toEqual([])
})

test('BuildBody renders rows for single group without leagueName', () => {
  const rows = BuildBody([{ data: [{ name: 'a' }] }], 3)
  render(<>{rows}</>)
  expect(screen.getByTestId('content')).toBeInTheDocument()
})

test('BuildBody renders league rows and content for groups', () => {
  const rows = BuildBody([{ leagueId: 1, leagueName: 'L', data: [{ name: 'a' }, { name: 'b' }] }], 4)
  render(<>{rows}</>)
  expect(screen.getAllByTestId('row').length).toBeGreaterThan(0)
  expect(screen.getAllByTestId('content').length).toBe(2)
})


