import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('usehooks-ts', () => ({
  useElementSize: () => [jest.fn(), { width: 50 }]
}))

jest.mock('@/components/Overlay.jsx', () => ({ __esModule: true, default: ({ isOpening, children }) => isOpening ? <div data-testid="overlay">{children}</div> : null }))
jest.mock('@/pages/winlossanalysis/components/ExcelPopUp.jsx', () => () => <div>Excel</div>)

import ReportTitleContent from '@/pages/winlossanalysis/components/mobile/ReportTitleContent'

const mockStore = configureStore([])

describe('ReportTitleContent', () => {
  test('renders with title and Excel button', () => {
    const store = mockStore({ reportTitle: 'A very very very long title that overflows' })
    render(
      <Provider store={store}>
        <ReportTitleContent />
      </Provider>
    )
    expect(screen.getByText('Excel')).toBeInTheDocument()
  })
})


