import React from 'react'
import { render } from '@testing-library/react'

jest.mock('react-router-dom', () => ({ useSearchParams: () => [{ get: () => '123' }] }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: () => ({ getState: () => ({}), subscribe: () => () => {}, dispatch: () => {} }) } }))
jest.mock('@/pages/matchmonitoringcenter/pages/triggeredalerthistory/AppContainer', () => () => <div data-testid="app">app</div>)
jest.mock('@/pages/matchmonitoringcenter/pages/triggeredalerthistory/reducers', () => (s) => s)

jest.mock('@/styles/pages/matchmonitoringcenter/matchtriggeralerthistory.scss', () => ({}))
import Page from '@/pages/matchmonitoringcenter/pages/triggeredalerthistory/index'

test('TriggeredAlertHistory renders', () => {
  const { getByTestId } = render(<Page />)
  expect(getByTestId('app')).toBeInTheDocument()
})


