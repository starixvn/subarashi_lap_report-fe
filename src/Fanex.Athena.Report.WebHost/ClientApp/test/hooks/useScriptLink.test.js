import React from 'react'
import { render } from '@testing-library/react'
import useScriptLink from '@/hooks/useScriptLink'

describe('useScriptLink', () => {
	test('append and remove script', () => {
		const onReady = jest.fn()
		const Comp = (props) => {
			const api = useScriptLink()
			props.onReady(api)
			return null
		}
		render(<Comp onReady={onReady} />)
		const { append, remove } = onReady.mock.calls[0][0]
		const script = append('https://example.com/x.js', 'sid')
		expect(script.tagName).toBe('SCRIPT')
		expect(script.id).toBe('sid')
		remove(script)
	})
})


