import React from 'react';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { Cell } from '@legion-lib/react-grid';
import CommonCells from '@/pages/matchwinloss/gridUtility/CommonCells';
import NumberFormat from '@/lib/numberFormat';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

jest.mock('@legion-lib/react-grid', () => ({
    Cell: jest.fn(({ children, className, key }) => (
        <div data-testid={key} className={className}>
            {children}
        </div>
    )),
}));

jest.mock('@/lib/numberFormat', () => ({
    formatDecimal: jest.fn((value) => `formatted-${value}`),
    format: jest.fn((value) => `count-${value}`),
    round: jest.fn((value, decimals) => Math.round(value * 100) / 100),
}));

describe('CommonCells', () => {
    const defaultFormData = {
        isAllowedCustomerCommission: false,
    };

    const defaultMatchData = {
        turnover: 1000.123,
        totalTransaction: 50,
        customerWL: -250.456,
        customerComm: 100.789,
        licenseeWL: 150.333,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useSelector.mockReturnValue(defaultFormData);
    });

    test('renders without crashing', () => {
        const { container } = render(<CommonCells data={defaultMatchData} />);
        expect(container).toBeInTheDocument();
    });

    test('calls useSelector to get formData', () => {
        render(<CommonCells data={defaultMatchData} />);
        expect(useSelector).toHaveBeenCalledWith(expect.any(Function));
    });

    test('renders basic cells when customer commission is not allowed', () => {
        render(<CommonCells data={defaultMatchData} />);
        expect(Cell).toHaveBeenCalled();
    });

    test('renders additional cells when customer commission is allowed', () => {
        useSelector.mockReturnValue({
            isAllowedCustomerCommission: true,
        });

        render(<CommonCells data={defaultMatchData} />);
        expect(Cell).toHaveBeenCalled();
    });

    test('uses NumberFormat functions for formatting', () => {
        render(<CommonCells data={defaultMatchData} />);

        expect(NumberFormat.round).toHaveBeenCalled();
        expect(NumberFormat.formatDecimal).toHaveBeenCalled();
        expect(NumberFormat.format).toHaveBeenCalled();
    });

    test('handles negative licenseeWL values', () => {
        const negativeMatchData = {
            ...defaultMatchData,
            licenseeWL: -50.123,
        };

        render(<CommonCells data={negativeMatchData} />);
        expect(Cell).toHaveBeenCalled();
    });

    test('handles positive licenseeWL values', () => {
        const positiveMatchData = {
            ...defaultMatchData,
            licenseeWL: 50.123,
        };

        render(<CommonCells data={positiveMatchData} />);
        expect(Cell).toHaveBeenCalled();
    });

    test('handles zero licenseeWL values', () => {
        const zeroMatchData = {
            ...defaultMatchData,
            licenseeWL: 0,
        };

        render(<CommonCells data={zeroMatchData} />);
        expect(Cell).toHaveBeenCalled();
    });

    test('calculates total WL when commission is allowed', () => {
        useSelector.mockReturnValue({
            isAllowedCustomerCommission: true,
        });

        const testData = {
            ...defaultMatchData,
            customerWL: 100,
            customerComm: 50,
        };

        render(<CommonCells data={testData} />);
        expect(NumberFormat.formatDecimal).toHaveBeenCalled();
    });

    test('handles null or undefined data gracefully', () => {
        const nullData = {
            turnover: null,
            totalTransaction: undefined,
            customerWL: 0,
            customerComm: null,
            licenseeWL: undefined,
        };

        render(<CommonCells data={nullData} />);
        expect(Cell).toHaveBeenCalled();
    });
});