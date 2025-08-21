import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import MultipleSelect from '@legion-lib/react-multiselect';
import { CurrencyFilter } from '@/pages/winlossanalysis/components/filters/CurrencyFilter';
import LangHelper from '@/helpers/langHelper';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

jest.mock('@legion-lib/react-multiselect', () => {
    return jest.fn(({ id, onChange, isValid }) => (
        <select 
            data-testid={id} 
            onChange={(e) => onChange && onChange(e.target.value)}
            className={isValid ? 'valid' : 'invalid'}
        >
            <option value="1">USD</option>
            <option value="2">EUR</option>
        </select>
    ));
});

jest.mock('@/helpers/langHelper', () => ({
    currentLanguage: 'en',
    getSingleResource: jest.fn((key) => `Translated-${key}`),
}));

describe('CurrencyFilter', () => {
    const defaultFormData = {
        currencyList: [
            { id: 1, value: 'USD', status: true },
            { id: 2, value: 'EUR', status: true },
            { id: 3, value: 'GBP', status: false },
        ],
    };

    const defaultProps = {
        onChange: jest.fn(),
        isValid: true,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useSelector.mockReturnValue(defaultFormData);
        LangHelper.getSingleResource.mockReturnValue('Currency');
    });

    test('renders currency filter with label', () => {
        render(<CurrencyFilter {...defaultProps} />);

        expect(screen.getByText('Currency')).toBeInTheDocument();
        expect(LangHelper.getSingleResource).toHaveBeenCalledWith('Currency');
    });

    test('renders MultipleSelect when currency list exists', () => {
        render(<CurrencyFilter {...defaultProps} />);

        expect(MultipleSelect).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 'ddlCurrency',
                language: 'en',
                dataSource: defaultFormData.currencyList,
                keyField: 'id',
                valueField: 'value',
                statusField: 'status',
                onChange: defaultProps.onChange,
                isValid: defaultProps.isValid,
            }),
            {}
        );

        expect(screen.getByTestId('ddlCurrency')).toBeInTheDocument();
    });

    test('does not render MultipleSelect when currency list is empty', () => {
        useSelector.mockReturnValue({
            currencyList: [],
        });

        render(<CurrencyFilter {...defaultProps} />);

        expect(MultipleSelect).not.toHaveBeenCalled();
        expect(screen.queryByTestId('ddlCurrency')).not.toBeInTheDocument();
    });

    test('does not render MultipleSelect when currency list is null', () => {
        useSelector.mockReturnValue({
            currencyList: null,
        });

        render(<CurrencyFilter {...defaultProps} />);

        expect(MultipleSelect).not.toHaveBeenCalled();
        expect(screen.queryByTestId('ddlCurrency')).not.toBeInTheDocument();
    });

    test('does not render MultipleSelect when currency list is undefined', () => {
        useSelector.mockReturnValue({
            currencyList: undefined,
        });

        render(<CurrencyFilter {...defaultProps} />);

        expect(MultipleSelect).not.toHaveBeenCalled();
        expect(screen.queryByTestId('ddlCurrency')).not.toBeInTheDocument();
    });

    test('passes onChange prop to MultipleSelect', () => {
        const mockOnChange = jest.fn();
        render(<CurrencyFilter onChange={mockOnChange} isValid={true} />);

        expect(MultipleSelect).toHaveBeenCalledWith(
            expect.objectContaining({
                onChange: mockOnChange,
            }),
            {}
        );
    });

    test('passes isValid prop to MultipleSelect', () => {
        render(<CurrencyFilter {...defaultProps} isValid={false} />);

        expect(MultipleSelect).toHaveBeenCalledWith(
            expect.objectContaining({
                isValid: false,
            }),
            {}
        );
    });

    test('uses correct language from LangHelper', () => {
        LangHelper.currentLanguage = 'fr';
        
        render(<CurrencyFilter {...defaultProps} />);

        expect(MultipleSelect).toHaveBeenCalledWith(
            expect.objectContaining({
                language: 'fr',
            }),
            {}
        );
    });

    test('uses correct field mappings', () => {
        render(<CurrencyFilter {...defaultProps} />);

        expect(MultipleSelect).toHaveBeenCalledWith(
            expect.objectContaining({
                keyField: 'id',
                valueField: 'value',
                statusField: 'status',
            }),
            {}
        );
    });

    test('selects formData from Redux state correctly', () => {
        const mockState = {
            formData: { currencyList: defaultFormData.currencyList },
            otherData: 'should not be used',
        };

        useSelector.mockImplementation((selector) => selector(mockState));

        render(<CurrencyFilter {...defaultProps} />);

        expect(useSelector).toHaveBeenCalledWith(expect.any(Function));
    });

    test('renders form group structure correctly', () => {
        const { container } = render(<CurrencyFilter {...defaultProps} />);

        const formGroup = container.querySelector('.form-group');
        const label = container.querySelector('.label-text');

        expect(formGroup).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(label).toHaveTextContent('Currency');
    });

    test('handles missing onChange prop gracefully', () => {
        render(<CurrencyFilter isValid={true} />);

        expect(MultipleSelect).toHaveBeenCalledWith(
            expect.objectContaining({
                onChange: undefined,
            }),
            {}
        );
    });

    test('handles missing isValid prop gracefully', () => {
        render(<CurrencyFilter onChange={jest.fn()} />);

        expect(MultipleSelect).toHaveBeenCalledWith(
            expect.objectContaining({
                isValid: undefined,
            }),
            {}
        );
    });

    test('component is memoized', () => {
        const CurrencyFilterDefault = require('@/pages/winlossanalysis/components/filters/CurrencyFilter').default;
        expect(CurrencyFilterDefault.$$typeof).toBe(Symbol.for('react.memo'));
    });

    test('handles complex currency list data', () => {
        const complexCurrencyList = [
            { id: 'USD', value: 'US Dollar', status: true },
            { id: 'EUR', value: 'Euro', status: false },
            { id: 'JPY', value: 'Japanese Yen', status: true },
        ];

        useSelector.mockReturnValue({
            currencyList: complexCurrencyList,
        });

        render(<CurrencyFilter {...defaultProps} />);

        expect(MultipleSelect).toHaveBeenCalledWith(
            expect.objectContaining({
                dataSource: complexCurrencyList,
            }),
            {}
        );
    });
});
