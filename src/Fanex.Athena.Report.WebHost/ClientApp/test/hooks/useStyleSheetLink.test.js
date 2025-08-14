import React from 'react'
import { render } from '@testing-library/react'
import useStyleSheetLink from '@/hooks/useStyleSheetLink'

describe('useStyleSheetLink', () => {
	test('append and remove link', () => {
		const onReady = jest.fn()
		const Comp = (props) => {
			const api = useStyleSheetLink()
			props.onReady(api)
			return null
		}
		render(<Comp onReady={onReady} />)
		const { append, remove } = onReady.mock.calls[0][0]
		const link = append('/styles.css')
		expect(link.tagName).toBe('LINK')
		expect(link.rel).toBe('stylesheet')
		remove(link)
	})
})


