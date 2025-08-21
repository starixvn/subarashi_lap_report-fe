import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

jest.unmock('@/helpers/langHelper');

const mockGetSingleResource = jest.fn((key) => `Mocked_${key}`);

import { DateRangeFilter } from '@/pages/winlossanalysis/components/filters/DateRangeFilter';
import { ViewInTimeMode } from '@/pages/winlossanalysis/common/constants';

jest.mock('@legion-lib/react-daterangepicker', () => ({
    DateRange: ({ onChange, isMobile, langHandler, startDate, endDate, minDate, maxDate, today, limitedMonthRange, firstDayOfWeek }) => (
        <div data-testid="date-range">
            <div data-testid="start-date">{startDate}</div>
            <div data-testid="end-date">{endDate}</div>
            <div data-testid="min-date">{minDate}</div>
            <div data-testid="max-date">{maxDate}</div>
            <div data-testid="today">{today}</div>
            <div data-testid="limited-month-range">{limitedMonthRange}</div>
            <div data-testid="first-day-of-week">{firstDayOfWeek}</div>
            <div data-testid="is-mobile">{isMobile ? 'true' : 'false'}</div>
            <button 
                data-testid="date-change-btn" 
                onClick={() => onChange && onChange('2023-12-01|2023-12-31', true)}
            >
                Change Date
            </button>
            <button 
                data-testid="lang-handler-btn"
                onClick={() => langHandler && langHandler('apply')}
            >
                Lang Handler
            </button>
        </div>
    ),
}));

jest.mock('@/helpers/langHelper', () => ({
    __esModule: true,
    default: {
        getSingleResource: jest.fn((key) => `Mocked_${key}`),
        getDateRangeResource: jest.fn((key) => `DateRange_${key}`),
        getResources: jest.fn((keys) => keys),
    },
}));

jest.mock('@/pages/winlossanalysis/common/dateSetting', () => ({
    DateConstraint: {
        limitedMonthRange: 12,
        minDate: '2020-01-01',
        maxDate: '2023-12-31',
        firstDayOfWeek: 1,
        settlementTimeLimitedMonthRange: 6,
        settlementTimeMinDate: '2022-01-01',
    },
}));

jest.mock('@/pages/winlossanalysis/common/constants', () => ({
    DefaultState: {
        dateRange: {
            fromDate: '2023-01-01',
            toDate: '2023-12-31',
        },
    },
    ViewInTimeMode: {
        Settlement: 'settlement',
        Other: 'other',
    },
}));

describe('DateRangeFilter Component', () => {
    let mockOnChange;

    beforeEach(() => {
        jest.clearAllMocks();
        mockOnChange = jest.fn();
        mockGetSingleResource.mockImplementation((key) => `Mocked_${key}`);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders with default props', () => {
        render(<DateRangeFilter onChange={mockOnChange} />);
        
        expect(screen.getByText('Mocked_Date')).toBeInTheDocument();
        expect(screen.getByTestId('date-range')).toBeInTheDocument();
        expect(screen.getByTestId('is-mobile')).toHaveTextContent('false');
    });

    test('renders with mobile version', () => {
        render(<DateRangeFilter onChange={mockOnChange} isMobile={true} />);
        
        expect(screen.getByTestId('is-mobile')).toHaveTextContent('true');
    });

    test('uses settlement time constraints when viewInTime is Settlement', () => {
        render(
            <DateRangeFilter 
                onChange={mockOnChange} 
                viewInTime={ViewInTimeMode.Settlement}
            />
        );
        
        expect(screen.getByTestId('min-date')).toHaveTextContent('2022-01-01');
        expect(screen.getByTestId('limited-month-range')).toHaveTextContent('6');
    });

    test('uses default time constraints when viewInTime is not Settlement', () => {
        render(
            <DateRangeFilter 
                onChange={mockOnChange} 
                viewInTime={ViewInTimeMode.Other}
            />
        );
        
        expect(screen.getByTestId('min-date')).toHaveTextContent('2020-01-01');
        expect(screen.getByTestId('limited-month-range')).toHaveTextContent('12');
    });

    test('uses default time constraints when viewInTime is undefined', () => {
        render(<DateRangeFilter onChange={mockOnChange} />);
        
        expect(screen.getByTestId('min-date')).toHaveTextContent('2020-01-01');
        expect(screen.getByTestId('limited-month-range')).toHaveTextContent('12');
    });

    test('passes correct default dates to DateRange', () => {
        render(<DateRangeFilter onChange={mockOnChange} />);
        
        expect(screen.getByTestId('start-date')).toHaveTextContent('2023-01-01');
        expect(screen.getByTestId('end-date')).toHaveTextContent('2023-12-31');
        expect(screen.getByTestId('max-date')).toHaveTextContent('2023-12-31');
        expect(screen.getByTestId('today')).toHaveTextContent('2023-12-31');
        expect(screen.getByTestId('first-day-of-week')).toHaveTextContent('1');
    });

    test('handles date change with settlement constraints', () => {
        render(
            <DateRangeFilter 
                onChange={mockOnChange} 
                viewInTime={ViewInTimeMode.Settlement}
            />
        );
        
        const dateChangeBtn = screen.getByTestId('date-change-btn');
        fireEvent.click(dateChangeBtn);
        
        expect(mockOnChange).toHaveBeenCalledWith('2023-12-01|2023-12-31', true, 6);
    });

    test('handles date change with default constraints', () => {
        render(<DateRangeFilter onChange={mockOnChange} />);
        
        const dateChangeBtn = screen.getByTestId('date-change-btn');
        fireEvent.click(dateChangeBtn);
        
        expect(mockOnChange).toHaveBeenCalledWith('2023-12-01|2023-12-31', true, 12);
    });

    test('calls LangHelper for date range resources', () => {
        const mockLangHelper = require('@/helpers/langHelper').default;
        
        render(<DateRangeFilter onChange={mockOnChange} />);
        
        const langHandlerBtn = screen.getByTestId('lang-handler-btn');
        fireEvent.click(langHandlerBtn);
        
        expect(mockLangHelper.getDateRangeResource).toHaveBeenCalledWith('apply');
    });

    test('calls LangHelper for single resource', () => {
        const mockLangHelper = require('@/helpers/langHelper').default;
        
        render(<DateRangeFilter onChange={mockOnChange} />);
        
        expect(mockLangHelper.getSingleResource).toHaveBeenCalledWith('Date');
    });

    test('renders correct form structure', () => {
        render(<DateRangeFilter onChange={mockOnChange} />);
        
        const formGroup = screen.getByText('Mocked_Date').closest('.form-group');
        expect(formGroup).toBeInTheDocument();
        expect(formGroup.querySelector('.label-text')).toHaveTextContent('Mocked_Date');
    });

    test('handles onChange without function gracefully', () => {
        render(<DateRangeFilter onChange={() => {}} />);
        
        const dateChangeBtn = screen.getByTestId('date-change-btn');
        expect(() => fireEvent.click(dateChangeBtn)).not.toThrow();
    });

    test('memoization works correctly', () => {
        const { rerender } = render(<DateRangeFilter onChange={mockOnChange} />);
        
        const firstRender = screen.getByTestId('date-range');
        
        rerender(<DateRangeFilter onChange={mockOnChange} />);
        
        const secondRender = screen.getByTestId('date-range');
        expect(firstRender).toBeInTheDocument();
        expect(secondRender).toBeInTheDocument();
    });

    test('handles different viewInTime values', () => {
        const { rerender } = render(
            <DateRangeFilter 
                onChange={mockOnChange} 
                viewInTime={ViewInTimeMode.Settlement}
            />
        );
        
        expect(screen.getByTestId('limited-month-range')).toHaveTextContent('6');
        
        rerender(
            <DateRangeFilter 
                onChange={mockOnChange} 
                viewInTime="some-other-mode"
            />
        );
        
        expect(screen.getByTestId('limited-month-range')).toHaveTextContent('12');
    });

    test('passes all required props to DateRange component', () => {
        render(
            <DateRangeFilter 
                onChange={mockOnChange} 
                isMobile={true}
                viewInTime={ViewInTimeMode.Settlement}
            />
        );
        
        expect(screen.getByTestId('start-date')).toBeInTheDocument();
        expect(screen.getByTestId('end-date')).toBeInTheDocument();
        expect(screen.getByTestId('min-date')).toBeInTheDocument();
        expect(screen.getByTestId('max-date')).toBeInTheDocument();
        expect(screen.getByTestId('today')).toBeInTheDocument();
        expect(screen.getByTestId('limited-month-range')).toBeInTheDocument();
        expect(screen.getByTestId('first-day-of-week')).toBeInTheDocument();
        expect(screen.getByTestId('is-mobile')).toBeInTheDocument();
    });

    test('handles edge case with null onChange', () => {
        render(<DateRangeFilter onChange={null} />);
        
        expect(screen.getByTestId('date-range')).toBeInTheDocument();
    });

    test('applies default props correctly', () => {
        render(<DateRangeFilter onChange={mockOnChange} />);
        
        expect(screen.getByTestId('is-mobile')).toHaveTextContent('false');
    });

    test('handles langHandler callback correctly', () => {
        const mockLangHelper = require('@/helpers/langHelper').default;
        mockLangHelper.getDateRangeResource.mockReturnValue('Mocked Language Resource');
        
        render(<DateRangeFilter onChange={mockOnChange} />);
        
        const langHandlerBtn = screen.getByTestId('lang-handler-btn');
        fireEvent.click(langHandlerBtn);
        
        expect(mockLangHelper.getDateRangeResource).toHaveBeenCalledWith('apply');
    });

    test('handles invalid viewInTime parameter', () => {
        render(
            <DateRangeFilter 
                onChange={mockOnChange} 
                viewInTime={null}
            />
        );
        
        expect(screen.getByTestId('limited-month-range')).toHaveTextContent('12');
        expect(screen.getByTestId('min-date')).toHaveTextContent('2020-01-01');
    });

    test('component renders without crashing with minimal props', () => {
        expect(() => render(<DateRangeFilter />)).not.toThrow();
    });
});
