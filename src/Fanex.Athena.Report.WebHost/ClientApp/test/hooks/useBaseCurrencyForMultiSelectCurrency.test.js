import React from 'react'
import { renderHook } from '@testing-library/react'
import { useBaseCurrencyForMultiSelectCurrency } from '@/hooks/useBaseCurrencyForMultiSelectCurrency'

jest.mock('react-redux', () => ({
	__esModule: true,
	useSelector: jest.fn((sel) => sel({})),
	shallowEqual: () => true
}))

jest.mock('usehooks-ts', () => ({ useIsFirstRender: jest.fn(() => true) }))

describe('useBaseCurrencyForMultiSelectCurrency', () => {
	const rr = require('react-redux')

    test('single selected currency adds to list and selects it', () => {
        rr.useSelector.mockImplementation((sel) => sel({ selectedCurrency: '1', selectedBaseCurrency: { value: 2, label: 'THB' } }))
		const currencies = { baseCurrencyList: [], currencyList: [{ id: '1', value: 'USD' }] }
		const { result } = renderHook(() => useBaseCurrencyForMultiSelectCurrency(null, currencies))
        expect(result.current.baseCurrencyList).toEqual([{ value: '1', label: 'USD' }])
        expect(result.current.selectedBaseCurrency).toEqual({ value: 2, label: 'THB' })
	})

	test('multiple selected currency keeps original list and selected base currency', () => {
		rr.useSelector.mockImplementation((sel) => sel({ selectedCurrency: '1,2', selectedBaseCurrency: { value: 1, label: 'USD' } }))
		const currencies = { baseCurrencyList: [{ value: 1, label: 'USD' }], currencyList: [{ id: '1', value: 'USD' }, { id: '2', value: 'THB' }] }
		const { result } = renderHook(() => useBaseCurrencyForMultiSelectCurrency(null, currencies))
		expect(result.current.baseCurrencyList).toEqual(currencies.baseCurrencyList)
		expect(result.current.selectedBaseCurrency).toEqual({ value: 1, label: 'USD' })
	})
})


