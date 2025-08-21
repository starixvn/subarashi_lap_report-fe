import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BreakDownOptionFilter } from '@/pages/winlossanalysis/components/filters/BreakDownOptionFilter'

const mockStore = configureStore([])
const mockOnChangeBreakByOption = jest.fn()

jest.mock('@/pages/winlossanalysis/components/hooks/useGroupFilterHandler', () => jest.fn(() => ({
	onChangeBreakByOption: mockOnChangeBreakByOption
})))

jest.mock('@/helpers/langHelper', () => ({
	__esModule: true,
	default: {
		getSingleResource: jest.fn((key) => {
			const resources = {
				'BreakdownBy': 'Breakdown By'
			}
			return resources[key] || key
		})
	}
}))

jest.mock('@/pages/winlossanalysis/common/Service', () => ({
	__esModule: true,
	default: {
		buildBreakDownOptionFromGroupByMode: jest.fn((groupBy, licensee) => [
			{ value: 'option1', label: 'Option 1', isDisabled: false },
			{ value: 'option2', label: 'Option 2', isDisabled: true },
			{ value: 'option3', label: 'Option 3', isDisabled: false }
		])
	}
}))

describe('BreakDownOptionFilter', () => {
	let store

	const defaultState = {
		selectedGroupByOption: 'testGroupBy',
		selectedBreakDownByOption: 'option1',
		formData: {
			licenseeName: 'TestLicensee'
		}
	}

	beforeEach(() => {
		store = mockStore(defaultState)
		jest.clearAllMocks()
	})

	test('renders with default state', () => {
		render(
			<Provider store={store}>
				<BreakDownOptionFilter />
			</Provider>
		)

		expect(screen.getByText('Breakdown By:')).toBeInTheDocument()
		expect(screen.getByText('Option 1')).toBeInTheDocument()
		expect(screen.getByText('Option 2')).toBeInTheDocument()
		expect(screen.getByText('Option 3')).toBeInTheDocument()
	})

	test('renders radio inputs with correct properties', () => {
		render(
			<Provider store={store}>
				<BreakDownOptionFilter />
			</Provider>
		)

		const option1Radio = screen.getByLabelText('Option 1')
		const option2Radio = screen.getByLabelText('Option 2')
		const option3Radio = screen.getByLabelText('Option 3')

		expect(option1Radio).toBeChecked()
		expect(option1Radio).not.toBeDisabled()
		expect(option1Radio).toHaveAttribute('value', 'option1')

		expect(option2Radio).not.toBeChecked()
		expect(option2Radio).toBeDisabled()
		expect(option2Radio).toHaveAttribute('value', 'option2')

		expect(option3Radio).not.toBeChecked()
		expect(option3Radio).not.toBeDisabled()
		expect(option3Radio).toHaveAttribute('value', 'option3')
	})

	test('handles radio button change', () => {
		render(
			<Provider store={store}>
				<BreakDownOptionFilter />
			</Provider>
		)

		const option3Radio = screen.getByLabelText('Option 3')
		fireEvent.click(option3Radio)

		expect(mockOnChangeBreakByOption).toHaveBeenCalled()
	})

	test('updates when selectedBreakDownByOption changes', () => {
		const { rerender } = render(
			<Provider store={store}>
				<BreakDownOptionFilter />
			</Provider>
		)

		expect(screen.getByLabelText('Option 1')).toBeChecked()

		const newState = {
			...defaultState,
			selectedBreakDownByOption: 'option3'
		}
		const newStore = mockStore(newState)

		rerender(
			<Provider store={newStore}>
				<BreakDownOptionFilter />
			</Provider>
		)

		expect(screen.getByLabelText('Option 1')).not.toBeChecked()
		expect(screen.getByLabelText('Option 3')).toBeChecked()
	})

	test('renders form structure correctly', () => {
		render(
			<Provider store={store}>
				<BreakDownOptionFilter />
			</Provider>
		)

		const formGroup = document.querySelector('.form-group.radio-group')
		expect(formGroup).toBeInTheDocument()

		const label = screen.getByText('Breakdown By:')
		expect(label).toHaveClass('label-text')

		const radioList = document.querySelector('.radio-list')
		expect(radioList).toBeInTheDocument()

		const radioItems = document.querySelectorAll('.filter-radio-item')
		expect(radioItems).toHaveLength(3)
	})

	test('generates unique IDs for radio inputs', () => {
		render(
			<Provider store={store}>
				<BreakDownOptionFilter />
			</Provider>
		)

		const radio1 = screen.getByLabelText('Option 1')
		const radio2 = screen.getByLabelText('Option 2')
		const radio3 = screen.getByLabelText('Option 3')

		expect(radio1.id).toBe('BreakBy0')
		expect(radio2.id).toBe('BreakBy1')
		expect(radio3.id).toBe('BreakBy2')
	})

	test('handles empty breakdown list', () => {
		const Service = require('@/pages/winlossanalysis/common/Service.js').default
		Service.buildBreakDownOptionFromGroupByMode.mockReturnValue([])

		render(
			<Provider store={store}>
				<BreakDownOptionFilter />
			</Provider>
		)

		expect(screen.getByText('Breakdown By:')).toBeInTheDocument()
		expect(document.querySelectorAll('.filter-radio-item')).toHaveLength(0)
	})

	test('rebuilds breakdown list when groupBy or licensee changes', () => {
		const Service = require('@/pages/winlossanalysis/common/Service.js').default
		
		render(
			<Provider store={store}>
				<BreakDownOptionFilter />
			</Provider>
		)

		expect(Service.buildBreakDownOptionFromGroupByMode).toHaveBeenCalledWith(
			'testGroupBy',
			'TestLicensee'
		)

		const newState = {
			...defaultState,
			selectedGroupByOption: 'newGroupBy',
			formData: { licenseeName: 'NewLicensee' }
		}
		const newStore = mockStore(newState)

		render(
			<Provider store={newStore}>
				<BreakDownOptionFilter />
			</Provider>
		)

		expect(Service.buildBreakDownOptionFromGroupByMode).toHaveBeenCalledWith(
			'newGroupBy',
			'NewLicensee'
		)
	})
})
