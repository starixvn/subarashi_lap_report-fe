import React from 'react'
import { renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore } from 'redux'
import { useSubsidiarySearch } from '@/hooks/useSubsidiarySearch'
import { SubsidiaryViewType } from '@/constants/report'

describe('useSubsidiarySearch', () => {
	const makeWrapper = (state) => ({ children }) => {
		const reducer = (s = state) => s
		const store = createStore(reducer)
		return <Provider store={store}>{children}</Provider>
	}

	test('derives flags and defaultSelectedSubsidiary', () => {
		const state = {
			formData: {
				subsidiaryList: ['a', 'b'],
				subsidiaryViewType: SubsidiaryViewType.MASTER_MANAGEMENT,
				isOneworksMaster: false
			},
			subsidiarySearch: true
		}
		const { result } = renderHook(() => useSubsidiarySearch(), { wrapper: makeWrapper(state) })
		expect(result.current.isSubsidiarySearch).toBe(true)
		expect(result.current.isShowSubsidiaryDropdown).toBe(true)
		expect(result.current.isShowSubsidiarySearchCheckBox).toBe(true)
		expect(result.current.isWhiteLabelView).toBe(true)
		expect(result.current.defaultSelectedSubsidiary).toBe('a,b')
	})

	test('hides dropdown when view type is NOT_MANAGEMENT', () => {
		const state = { formData: { subsidiaryList: ['x'], subsidiaryViewType: SubsidiaryViewType.NOT_MANAGEMENT, isOneworksMaster: true }, subsidiarySearch: false }
		const { result } = renderHook(() => useSubsidiarySearch(), { wrapper: makeWrapper(state) })
		expect(result.current.isShowSubsidiaryDropdown).toBe(false)
		expect(result.current.isShowSubsidiarySearchCheckBox).toBe(false)
		expect(result.current.isWhiteLabelView).toBe(false)
	})
})


