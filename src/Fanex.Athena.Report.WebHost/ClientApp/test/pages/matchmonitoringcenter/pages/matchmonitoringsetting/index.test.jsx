import React from 'react'
import { render } from '@testing-library/react'

jest.mock('react-router-dom', () => ({ useSearchParams: () => [{ get: () => '456' }] }))
jest.mock('@/lib/store', () => ({ __esModule: true, default: { createStore: () => ({ getState: () => ({}), subscribe: () => () => {}, dispatch: () => {} }) } }))
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/AppContainer', () => () => <div data-testid="app">app</div>)
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/reducers', () => (s) => s)

jest.mock('@/styles/pages/matchmonitoringcenter/matchmonitoringsetting.scss', () => ({}))
import Page from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/index'

test('MonitoringSettingDetail renders', () => {
  const { getByTestId } = render(<Page />)
  expect(getByTestId('app')).toBeInTheDocument()
})


