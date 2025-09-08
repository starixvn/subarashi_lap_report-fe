import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/Log/components/AppContainer', () => () => <div data-testid="app">app</div>)
jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/Log/reducers', () => s => s)

import Page from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/Log/index'

test('Log tab renders', () => {
  const store = createStore(s => s, { monitoringID: 1 })
  const { getByTestId } = render(<Provider store={store}><Page /></Provider>)
  expect(getByTestId('app')).toBeInTheDocument()
})


