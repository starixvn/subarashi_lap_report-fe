import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('@/components/Popup', () => (p) => <div data-testid="popup" data-title={p.title} data-show={String(p.isShow)} data-class={p.className} data-url={p.iframeUrl} />)
jest.mock('react-redux', () => ({ useSelector: jest.fn((sel) => sel({ isShowPopup: true, popupUrl: 'u', popupTitle: 't', popupStyleClassName: 'c', isRefresh: true })) }))
jest.mock('@/pages/matchmonitoringcenter/hook', () => ({ usePopupHandler: () => ({ closePopup: jest.fn() }) }))

import Comp from '@/pages/matchmonitoringcenter/components/PopupPage'

test('PopupPage passes props to Popup', () => {
  render(<Comp />)
  const el = screen.getByTestId('popup')
  expect(el).toHaveAttribute('data-title', 't')
  expect(el).toHaveAttribute('data-show', 'true')
  expect(el).toHaveAttribute('data-class', 'c')
  expect(el).toHaveAttribute('data-url', 'u')
})


