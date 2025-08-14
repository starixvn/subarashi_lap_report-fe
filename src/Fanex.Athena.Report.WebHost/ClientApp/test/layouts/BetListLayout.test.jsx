import React from 'react'
import { render, screen, act } from '@testing-library/react'
import BetListLayout from '@/layouts/BetListLayout'

jest.mock('@/components/Popup', () => ({ __esModule: true, default: (props) => (
	<div data-testid="popup">
		<button data-testid="close" onClick={props.onClose}>x</button>
		<span>{props.title}</span>
		<iframe title="iframe" src={props.iframeUrl} />
	</div>
) }))

jest.mock('@/helpers/gtagHelper', () => ({ __esModule: true, default: { logOpenBetlist: jest.fn() } }))

describe('BetListLayout', () => {
	beforeEach(() => {
		window.topSameOriginWindow = { lrf: { access_token: 'token123' } }
		window.pageLanguage = 'en'
	})

    test('exposes global functions and opens/close popup', () => {
		render(
			<BetListLayout pageName="P" rootUrl="/" baseCurrency="USD">
				<div>content</div>
			</BetListLayout>
		)
		expect(typeof window.openPopup).toBe('function')
		expect(typeof window.formatDateString).toBe('function')
		expect(typeof window.beforeShow).toBe('function')
		expect(typeof window.afterShow).toBe('function')
		expect(typeof window.getBaseCurrency).toBe('function')
		expect(typeof window.getAccessToken).toBe('function')
		expect(typeof window.getLanguage).toBe('function')
		expect(window.getResource).toBeNull()

		act(() => { window.openPopup('https://x', 'T') })
		expect(screen.getByTestId('popup')).toBeInTheDocument()
		expect(screen.getByText('T')).toBeInTheDocument()
		expect(screen.getByTitle('iframe')).toHaveAttribute('src', 'https://x')
		expect(window.getBaseCurrency()).toBe('USD')
		expect(window.getAccessToken()).toBe('token123')
		expect(window.getLanguage()).toBe('en')
		act(() => { screen.getByTestId('close').click() })
		expect(screen.queryByTestId('popup')).toBeNull()
	})

    test('formatDateString and before/after show callbacks', () => {
        const fmt = jest.fn((s) => `_${s}_`)
        const before = jest.fn()
        const after = jest.fn()
        render(
            <BetListLayout pageName="P" rootUrl="/" baseCurrency="USD" formatDateStringFunc={fmt} beforeShowFunc={before} afterShowFunc={after}>
                <div>content</div>
            </BetListLayout>
        )
        expect(window.formatDateString('a')).toBe('_a_')
        window.beforeShow()
        window.afterShow()
        expect(before).toHaveBeenCalled()
        expect(after).toHaveBeenCalled()
    })
})


