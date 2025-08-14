import React from 'react'
import { render } from '@testing-library/react'
import Page from '@/pages/winlossanalysis'

jest.mock('@/styles/pages/winlossanalysis.scss', () => ({}))
jest.mock('@/pages/winlossanalysis/components/AppContainer', () => ({ __esModule: true, default: () => <div data-testid="app">winlossanalysis</div> }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: jest.fn(() => ({ dispatch: jest.fn(), getState: jest.fn(() => ({})), subscribe: jest.fn() })) } }))
jest.mock('@/hooks/useStyleSheetLink', () => ({ __esModule: true, default: () => ({ append: () => ({}), remove: () => {} }) }))
jest.mock('@/pages/winlossanalysis/common/constants', () => ({ __esModule: true, DefaultState: {}, GroupByMode: { Player: 1 }, BreakdownByMode: { Product: 1 }, SearchMode: { MatchPrecise: 1 }, ViewInTimeMode: { Financial: 1 } }))

describe('pages/winlossanalysis', () => {
	test('renders provider with AppContainer', () => {
		render(<Page />)
		expect(document.querySelector('[data-testid="app"]').textContent).toBe('winlossanalysis')
	})
})


