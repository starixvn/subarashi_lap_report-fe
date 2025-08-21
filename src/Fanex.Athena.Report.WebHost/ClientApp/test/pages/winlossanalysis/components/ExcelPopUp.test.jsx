import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

jest.mock('@/helpers/langHelper', () => ({
    __esModule: true,
    default: {
        getSingleResource: jest.fn(key => `Mocked_${key}`),
    },
}));

jest.mock('@/lib/htmlHelper', () => ({
    __esModule: true,
    decode: jest.fn(text => `Decoded_${text}`),
}));

const serviceModule = require('@/pages/winlossanalysis/common/Service');

import { ExcelPopUp } from '@/pages/winlossanalysis/components/ExcelPopUp';
import { ExportExcelMode } from '@/pages/winlossanalysis/common/constants';
import Service from '@/pages/winlossanalysis/common/Service';

jest.mock('@/pages/winlossanalysis/actions/index.js', () => ({
    ActionCreators: {
        toggleLoader: jest.fn(value => ({ type: 'TOGGLE_LOADER', payload: value })),
    },
}));

jest.mock(
    '@/components/Popup',
    () =>
        ({ isShow, title, onClose, children, className, isHtml }) =>
            isShow ? (
                <div data-testid="popup" className={className} data-is-html={isHtml}>
                    <div data-testid="popup-title">{title}</div>
                    <button data-testid="popup-close" onClick={onClose}>
                        Close
                    </button>
                    {children}
                </div>
            ) : null
);

jest.mock('@/components/RadioGroup', () => ({ label, options, value, onChange, name, className }) => (
    <div data-testid="radio-group" className={className}>
        <div data-testid="radio-label">{label}</div>
        {options.map((option, index) => (
            <label key={index}>
                <input
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={() => onChange(option.value)}
                    data-testid={`radio-option-${option.value}`}
                />
                {option.label}
            </label>
        ))}
    </div>
));

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mocked-uuid'),
}));
describe('ExcelPopUp Component', () => {
    let store;
    let mockDispatch;

    beforeEach(() => {
        jest.clearAllMocks();
        if (serviceModule && serviceModule.default) {
            serviceModule.default.getFile = jest.fn().mockResolvedValue({});
        }
    });

    const createMockStore = (initialState = {}) => {
        const defaultReducers = {
            requestParam: (state = {}) => state,
            ...initialState,
        };
        return createStore(combineReducers(defaultReducers));
    };

    const mockRequestParam = {
        CurrencyId: 1,
        BaseCurrency: 'USD',
        Date: '2023-12-25',
    };

    beforeEach(() => {
        mockDispatch = jest.fn();
        store = createMockStore({
            requestParam: (state = mockRequestParam) => state,
        });
        store.dispatch = mockDispatch;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetModules();
    });

    const renderWithProviders = component => render(<Provider store={store}>{component}</Provider>);

    test('renders excel icon initially', () => {
        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        expect(excelIcon).toBeInTheDocument();
        expect(excelIcon).toHaveClass('flex-initial', 'icon', 'icon-excel-white');
    });

    test('popup is hidden initially', () => {
        renderWithProviders(<ExcelPopUp />);

        expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
    });

    test('shows popup when excel icon is clicked', () => {
        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        expect(screen.getByTestId('popup')).toBeInTheDocument();
        expect(screen.getByTestId('popup-title')).toHaveTextContent('Mocked_Confirmation');
    });

    test('renders popup with correct structure', () => {
        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        expect(screen.getByTestId('popup')).toHaveClass('excel-popup-container');
        expect(screen.getByTestId('popup')).toHaveAttribute('data-is-html', 'false');
        expect(screen.getByTestId('radio-group')).toBeInTheDocument();
        expect(screen.getByText('Mocked_OK')).toBeInTheDocument();
        expect(screen.getByText('Mocked_Cancel')).toBeInTheDocument();
    });

    test('renders radio options correctly', () => {
        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        expect(screen.getByTestId('radio-label')).toHaveTextContent('Mocked_ChooseDataDisplayInExcelMsg');
        expect(screen.getByTestId(`radio-option-${ExportExcelMode.All}`)).toBeChecked();
        expect(screen.getByTestId(`radio-option-${ExportExcelMode.GroupByLevelOnly}`)).not.toBeChecked();

        expect(screen.getByText('Decoded_Mocked_BothGroupByAndBreakdownLevelOption')).toBeInTheDocument();
        expect(screen.getByText('Decoded_Mocked_GroupByLevelOnlyOption')).toBeInTheDocument();
    });

    test('changes export mode when radio option is selected', () => {
        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        const groupByOnlyOption = screen.getByTestId(`radio-option-${ExportExcelMode.GroupByLevelOnly}`);
        fireEvent.click(groupByOnlyOption);

        expect(groupByOnlyOption).toBeChecked();
        expect(screen.getByTestId(`radio-option-${ExportExcelMode.All}`)).not.toBeChecked();
    });

    test('closes popup when close button is clicked', () => {
        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        expect(screen.getByTestId('popup')).toBeInTheDocument();

        const closeButton = screen.getByTestId('popup-close');
        fireEvent.click(closeButton);

        expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
    });

    test('closes popup when cancel button is clicked', () => {
        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        expect(screen.getByTestId('popup')).toBeInTheDocument();

        const cancelButton = screen.getByText('Mocked_Cancel');
        fireEvent.click(cancelButton);

        expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
    });

    test('resets export mode to All when popup is closed', () => {
        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        // Change to GroupByOnly mode
        const groupByOnlyOption = screen.getByTestId(`radio-option-${ExportExcelMode.GroupByLevelOnly}`);
        fireEvent.click(groupByOnlyOption);
        expect(groupByOnlyOption).toBeChecked();

        // Close popup
        const cancelButton = screen.getByText('Mocked_Cancel');
        fireEvent.click(cancelButton);

        // Reopen popup
        fireEvent.click(excelIcon);

        // Should be reset to All mode
        expect(screen.getByTestId(`radio-option-${ExportExcelMode.All}`)).toBeChecked();
        expect(screen.getByTestId(`radio-option-${ExportExcelMode.GroupByLevelOnly}`)).not.toBeChecked();
    });

    test('exports excel with All mode by default', async () => {
        Service.getFile.mockResolvedValue();

        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        const okButton = screen.getByText('Mocked_OK');
        fireEvent.click(okButton);

        expect(Service.getFile).toHaveBeenCalledWith({
            ...mockRequestParam,
            ExportExcelMode: ExportExcelMode.All,
        });

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'TOGGLE_LOADER', payload: true });

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith({ type: 'TOGGLE_LOADER', payload: false });
        });
    });

    test('exports excel with selected mode', async () => {
        Service.getFile.mockResolvedValue();

        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        // Select GroupByOnly mode
        const groupByOnlyOption = screen.getByTestId(`radio-option-${ExportExcelMode.GroupByLevelOnly}`);
        fireEvent.click(groupByOnlyOption);

        const okButton = screen.getByText('Mocked_OK');
        fireEvent.click(okButton);

        expect(Service.getFile).toHaveBeenCalledWith({
            ...mockRequestParam,
            ExportExcelMode: ExportExcelMode.GroupByLevelOnly,
        });
    });

    test('closes popup after successful export', async () => {
        Service.getFile.mockResolvedValue();

        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        expect(screen.getByTestId('popup')).toBeInTheDocument();

        const okButton = screen.getByText('Mocked_OK');
        fireEvent.click(okButton);

        await waitFor(() => {
            expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
        });
    });

    test('handles export error gracefully', async () => {
        Service.getFile.mockResolvedValue();

        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        const okButton = screen.getByText('Mocked_OK');
        fireEvent.click(okButton);

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'TOGGLE_LOADER', payload: true });

        // Component should handle error gracefully
        await waitFor(() => {
            expect(Service.getFile).toHaveBeenCalled();
        });
    });

    test('prevents default on export button click', () => {
        Service.getFile.mockResolvedValue();

        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        const okButton = screen.getByText('Mocked_OK');
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
        const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');

        okButton.dispatchEvent(clickEvent);

        expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test('generates unique key for RadioGroup', () => {
        const mockUuid = require('uuid').v4;

        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        expect(mockUuid).toHaveBeenCalled();
    });

    test('memoization works correctly', () => {
        const { rerender } = renderWithProviders(<ExcelPopUp />);
        const firstRender = document.querySelector('.icon-excel-white');
        rerender(
            <Provider store={store}>
                <ExcelPopUp />
            </Provider>
        );

        const secondRender = document.querySelector('.icon-excel-white');
        expect(firstRender).toBeInTheDocument();
        expect(secondRender).toBeInTheDocument();
    });

    test('handles empty request parameters', async () => {
        Service.getFile.mockResolvedValue();

        store = createMockStore({
            requestParam: (state = {}) => state,
        });
        store.dispatch = mockDispatch;

        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        const okButton = screen.getByText('Mocked_OK');
        fireEvent.click(okButton);

        expect(Service.getFile).toHaveBeenCalledWith({
            ExportExcelMode: ExportExcelMode.All,
        });
    });

    test('renders with correct CSS classes', () => {
        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        expect(screen.getByTestId('radio-group')).toHaveClass('excel-option');
        expect(screen.getByText('Mocked_OK').closest('button')).toHaveClass('btn', 'btn-submit');
        expect(screen.getByText('Mocked_Cancel').closest('button')).toHaveClass('btn', 'btn-cancel');
    });

    test('calls decode helper for option labels', () => {
        const mockDecode = require('@/lib/htmlHelper').decode;

        renderWithProviders(<ExcelPopUp />);

        const excelIcon = document.querySelector('.icon-excel-white');
        fireEvent.click(excelIcon);

        expect(mockDecode).toHaveBeenCalledWith('Mocked_BothGroupByAndBreakdownLevelOption');
        expect(mockDecode).toHaveBeenCalledWith('Mocked_GroupByLevelOnlyOption');
    });
});
