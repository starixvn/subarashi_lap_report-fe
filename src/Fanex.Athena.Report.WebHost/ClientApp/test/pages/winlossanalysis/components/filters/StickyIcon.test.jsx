import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k } }))
jest.mock('@/components/UserGuide', () => p => <button data-testid="guide" onClick={p.onClick}>{p.title}</button>)
jest.mock('@/pages/winlossanalysis/actions', () => ({ ActionCreators: { getUserGuideContent: key => ({ type: 'GET', key }) } }))

import Comp from '@/pages/winlossanalysis/components/filters/StickyIcon'

const createMockStore = state => createStore((s = state, a) => {
  if (a.type === 'GET') return { ...s, dispatched: a }
  return s
}, state)

test('dispatches getUserGuideContent when content empty', () => {
  const store = createMockStore({ userGuideContent: [] })
  render(<Provider store={store}><Comp /></Provider>)
  fireEvent.click(screen.getByTestId('guide'))
  expect(store.getState().dispatched).toBeDefined()
})

test('does not dispatch when content exists', () => {
  const store = createMockStore({ userGuideContent: ['c'] })
  render(<Provider store={store}><Comp /></Provider>)
  fireEvent.click(screen.getByTestId('guide'))
  expect(store.getState().dispatched).toBeUndefined()
})


