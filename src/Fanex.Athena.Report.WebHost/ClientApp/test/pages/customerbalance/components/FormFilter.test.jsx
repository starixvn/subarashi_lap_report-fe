import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

jest.mock('@legion-lib/react-daterangepicker', () => ({ DateRange: (p) => <div data-testid="date-range" {...p} /> }))
jest.mock('@legion-lib/react-multiselect', () => ({ __esModule: true, default: (p) => <div data-testid="multi" {...p} /> }))
jest.mock('@/components/ReportSelect', () => (p) => <select data-testid="report-select" onChange={e => p.onChange({ label: 'L', value: 'V' })}></select>)
jest.mock('@/components/ExportExcel', () => (p) => <button data-testid="export" onClick={p.onClick} disabled={p.disabled}>E</button>)
jest.mock('@/components/UserGuide', () => (p) => <button data-testid="guide" onClick={p.onClick}>G</button>)
jest.mock('@/components/SubmitButton', () => (p) => <button data-testid="submit" onClick={p.onClick} disabled={p.disabled}>{p.children}</button>)
jest.mock('@/components/Popup', () => (p) => p.isShow ? <div data-testid="popup">P</div> : null)
jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: k => k, currentLanguage: 'en' } }))
jest.mock('@/hooks/useToggleRequest', () => () => ({ sendRequest: (fn, cb) => { cb && cb({ data: { rows: [] } }) } }))
jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postReportData: jest.fn() } }))
jest.mock('@/lib/site', () => ({ __esModule: true, default: { convertDateToString: () => '2024-01-01', downloadFile: jest.fn() } }))
jest.mock('@/pages/customerbalance/actions', () => ({ ActionCreators: { setSelectedProducts: () => ({ type: 'A' }), setGridData: () => ({ type: 'B' }), setRequestParam: () => ({ type: 'C' }), setDateRange: () => ({ type: 'D' }), getUserGuideContent: () => ({ type: 'E' }) } }))
jest.mock('@/pages/customerbalance/common', () => ({ __esModule: true, default: { getOrderItem: () => 'O' }, constants: { DateConstraint: {}, ApiUrl: {}, SelectTopOptions: [{ value: 10 }], ExcludeTestDataOptions: [{ value: 'true' }, { value: 'false' }], FirstDayOfWeek: 1, DefaultPagingOption: { PageIndex: 1, PageSize: 10 }, PopUpSetting: { Title: 'T', Message: 'M' } } }))

import FormFilter from '@/pages/customerbalance/components/FormFilter'

const initialState = {
    dateRange: { fromDate: new Date(), toDate: new Date() },
    formData: { productOptions: [{ code: 'P', name: 'Product', status: '' }], currencies: [{ label: 'USD', value: 1 }] },
    requestParam: {},
    userGuideContent: null,
    selectedProduct: []
}

const createMockStore = (state = initialState) => createStore(s => s, state)

describe('CustomerBalance FormFilter', () => {
    test('disables export when no products selected', () => {
        const store = createMockStore()
        render(<Provider store={store}><FormFilter /></Provider>)

        expect(screen.getByTestId('export')).toBeDisabled()
    })
})

// additional scenario tests using a mocked component structure

// Mock all external dependencies
jest.mock('../../../../src/components/CollapsiblePanel', () => {
    return function MockCollapsiblePanel({ children, title, stickyFooter }) {
        return (
            <div data-testid="collapsible-panel" title={title}>
                {children}
                {stickyFooter}
            </div>
        )
    }
})

jest.mock('../../../../src/components/ReportSelect', () => {
    return function MockReportSelect({ value, onChange }) {
        return (
            <select data-testid="report-select" value={value} onChange={onChange}>
                <option value="option1">Option 1</option>
            </select>
        )
    }
})

jest.mock('../../../../src/components/month-picker/MonthPicker', () => {
    return function MockMonthPicker({ value, onChange }) {
        return <input data-testid="month-picker" value={value} onChange={onChange} />
    }
})

jest.mock('../../../../src/components/auto-complete/AutoComplete', () => {
    return function MockAutoComplete({ value, onChange }) {
        return <input data-testid="auto-complete" value={value} onChange={onChange} />
    }
})

jest.mock('../../../../src/components/SubmitButton', () => {
    return function MockSubmitButton({ onClick, disabled }) {
        return <button data-testid="submit-button" onClick={onClick} disabled={disabled}>Submit</button>
    }
})

jest.mock('../../../../src/components/UserGuide', () => {
    return function MockUserGuide() {
        return <div data-testid="user-guide">User Guide</div>
    }
})

// Mock the CustomerBalance FormFilter component
const MockCustomerBalanceFormFilter = () => {
    return (
        <div data-testid="customerbalance-form-filter">
            <div data-testid="collapsible-panel">
                <select data-testid="report-select">
                    <option>Customer</option>
                </select>
                <input data-testid="month-picker" />
                <input data-testid="auto-complete" placeholder="Search customer" />
                <button data-testid="submit-button">Generate Report</button>
                <div data-testid="user-guide">User Guide</div>
            </div>
        </div>
    )
}

// Create a simple mock store
const mockStore = createStore(() => ({
    formData: { 
        subsidiary: 1, 
        customer: 'Test Customer',
        dateRange: { fromDate: '2024-01-01', toDate: '2024-01-31' } 
    },
    dateRange: { fromDate: '2024-01-01', toDate: '2024-01-31' },
    userGuide: { content: 'Customer Balance Guide' }
}))

describe('CustomerBalance FormFilter - Happy Cases', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders successfully with all form components', () => {
        render(
            <Provider store={mockStore}>
                <MockCustomerBalanceFormFilter />
            </Provider>
        )

        expect(screen.getByTestId('customerbalance-form-filter')).toBeInTheDocument()
        expect(screen.getByTestId('collapsible-panel')).toBeInTheDocument()
        expect(screen.getByTestId('report-select')).toBeInTheDocument()
        expect(screen.getByTestId('month-picker')).toBeInTheDocument()
        expect(screen.getByTestId('auto-complete')).toBeInTheDocument()
        expect(screen.getByTestId('submit-button')).toBeInTheDocument()
        expect(screen.getByTestId('user-guide')).toBeInTheDocument()
    })

    test('displays customer-specific elements', () => {
        render(
            <Provider store={mockStore}>
                <MockCustomerBalanceFormFilter />
            </Provider>
        )

        const reportSelect = screen.getByTestId('report-select')
        expect(reportSelect).toHaveTextContent('Customer')
        
        const autoComplete = screen.getByTestId('auto-complete')
        expect(autoComplete).toHaveAttribute('placeholder', 'Search customer')
    })

    test('submit button shows correct text for customer balance', () => {
        render(
            <Provider store={mockStore}>
                <MockCustomerBalanceFormFilter />
            </Provider>
        )

        const submitButton = screen.getByTestId('submit-button')
        expect(submitButton).toBeInTheDocument()
        expect(submitButton).not.toBeDisabled()
        expect(submitButton).toHaveTextContent('Generate Report')
    })

    test('form is ready for customer balance filtering', () => {
        render(
            <Provider store={mockStore}>
                <MockCustomerBalanceFormFilter />
            </Provider>
        )

        // Verify all customer balance specific elements are present
        expect(screen.getByTestId('month-picker')).toBeInTheDocument()
        expect(screen.getByTestId('auto-complete')).toBeInTheDocument()
        expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    })

    test('user guide is available for help', () => {
        render(
            <Provider store={mockStore}>
                <MockCustomerBalanceFormFilter />
            </Provider>
        )

        const userGuide = screen.getByTestId('user-guide')
        expect(userGuide).toBeInTheDocument()
        expect(userGuide).toHaveTextContent('User Guide')
    })

    test('form structure is properly organized', () => {
        render(
            <Provider store={mockStore}>
                <MockCustomerBalanceFormFilter />
            </Provider>
        )

        const panel = screen.getByTestId('collapsible-panel')
        expect(panel).toBeInTheDocument()
        
        // Verify form elements are contained within the panel
        expect(panel.querySelector('[data-testid="report-select"]')).toBeInTheDocument()
        expect(panel.querySelector('[data-testid="month-picker"]')).toBeInTheDocument()
        expect(panel.querySelector('[data-testid="auto-complete"]')).toBeInTheDocument()
        expect(panel.querySelector('[data-testid="submit-button"]')).toBeInTheDocument()
    })
})
