import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import useToggleRequest from '@/hooks/useToggleRequest'
import * as types from '@/actions/types'

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: jest.fn(() => 'Error') } }))

const createRealStore = (reducer) => createStore(reducer, applyMiddleware(thunk))

describe('useToggleRequest', () => {
	beforeEach(() => {
		jest.spyOn(console, 'error').mockImplementation(() => {})
	})

	afterEach(() => {
		console.error.mockRestore()
		jest.clearAllMocks()
		jest.restoreAllMocks()
	})
	test('dispatches start/stop and callback on success', async () => {
		const reducer = (state = { isLoading: false }, action) => {
			if (action.type === types.TOGGLE_LOADER) return { ...state, isLoading: action.data }
			return state
		}
		const store = createRealStore(reducer)
		const onReady = jest.fn()
		const Comp = (props) => {
			const { sendRequest } = useToggleRequest()
			props.onReady(sendRequest)
			return null
		}
		render(<Provider store={store}><Comp onReady={onReady} /></Provider>)
		const send = onReady.mock.calls[0][0]
		const req = jest.fn(() => Promise.resolve({ ok: true }))
		const cb = jest.fn()
        send(req, cb)
        expect(store.getState().isLoading).toBe(true)
        await new Promise((r) => setTimeout(r, 0))
		expect(cb).toHaveBeenCalled()
		expect(store.getState().isLoading).toBe(false)
	})

	test('dispatches stop and alerts on failure', async () => {
		window.alert = jest.fn()
		const reducer = (state = { isLoading: false }, action) => {
			if (action.type === types.TOGGLE_LOADER) return { ...state, isLoading: action.data }
			return state
		}
		const store = createRealStore(reducer)
		const onReady = jest.fn()
		const Comp = (props) => {
			const { sendRequest } = useToggleRequest()
			props.onReady(sendRequest)
			return null
		}
		render(<Provider store={store}><Comp onReady={onReady} /></Provider>)
		const send = onReady.mock.calls[0][0]
		const req = jest.fn(() => Promise.reject(new Error('x')))
		send(req)
		await new Promise((r) => setTimeout(r, 0))
		expect(window.alert).toHaveBeenCalled()
		expect(console.error).toHaveBeenCalled()
		expect(store.getState().isLoading).toBe(false)
	})
})


