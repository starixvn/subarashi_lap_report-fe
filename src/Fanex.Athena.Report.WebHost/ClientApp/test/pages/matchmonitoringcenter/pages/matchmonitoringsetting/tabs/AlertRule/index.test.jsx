import React from 'react'
import { render } from '@testing-library/react'

jest.mock('@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/AppContainer', () => () => <div data-testid="app">app</div>)

import Page from '@/pages/matchmonitoringcenter/pages/matchmonitoringsetting/tabs/AlertRule/index'

test('AlertRule renders', () => {
  const { getByTestId } = render(<Page />)
  expect(getByTestId('app')).toBeInTheDocument()
})



