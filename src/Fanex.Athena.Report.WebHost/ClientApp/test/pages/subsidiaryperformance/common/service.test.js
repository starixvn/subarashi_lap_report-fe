import Service from '@/pages/subsidiaryperformance/common/service';

jest.mock('@/helpers/langHelper', () => ({
    __esModule: true,
    default: {
        getSingleResource: jest.fn((key) => {
            const messages = {
                'ErrorProcessingMsg': 'Error processing request'
            };
            return messages[key] || key;
        })
    }
}));

jest.mock('@/lib/reportTitleHelper', () => ({
    __esModule: true,
    default: {
        generateTitleWithBaseCurrency: jest.fn((reportType, fromDate, toDate, currency) => 
            `${reportType} Report: ${fromDate} to ${toDate} (${currency})`
        )
    }
}));

// Mock alert function
global.alert = jest.fn();

describe('subsidiaryperformance common service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('generateReportTitle calls ReportTitleHelper with correct parameters', () => {
        const fromDate = '2023-01-01';
        const toDate = '2023-12-31';
        const currency = 'USD';
        
        const result = Service.generateReportTitle(fromDate, toDate, currency);
        
        const ReportTitleHelper = require('@/lib/reportTitleHelper').default;
        expect(ReportTitleHelper.generateTitleWithBaseCurrency).toHaveBeenCalledWith(
            'SubsidiaryPerformance',
            fromDate,
            toDate,
            currency
        );
        
        expect(result).toBe('SubsidiaryPerformance Report: 2023-01-01 to 2023-12-31 (USD)');
    });

    test('showErrorMsg displays error message using LangHelper', () => {
        Service.showErrorMsg();
        
        const LangHelper = require('@/helpers/langHelper').default;
        expect(LangHelper.getSingleResource).toHaveBeenCalledWith('ErrorProcessingMsg');
        expect(global.alert).toHaveBeenCalledWith('Error processing request');
    });

    test('generateReportTitle handles various date formats', () => {
        Service.generateReportTitle('2023-06-15', '2023-06-20', 'EUR');
        
        const ReportTitleHelper = require('@/lib/reportTitleHelper').default;
        expect(ReportTitleHelper.generateTitleWithBaseCurrency).toHaveBeenCalledWith(
            'SubsidiaryPerformance',
            '2023-06-15',
            '2023-06-20',
            'EUR'
        );
    });

    test('generateReportTitle handles different currencies', () => {
        const testCases = [
            { currency: 'USD', expected: 'SubsidiaryPerformance Report: 2023-01-01 to 2023-01-31 (USD)' },
            { currency: 'EUR', expected: 'SubsidiaryPerformance Report: 2023-01-01 to 2023-01-31 (EUR)' },
            { currency: 'GBP', expected: 'SubsidiaryPerformance Report: 2023-01-01 to 2023-01-31 (GBP)' }
        ];

        testCases.forEach(({ currency, expected }) => {
            const result = Service.generateReportTitle('2023-01-01', '2023-01-31', currency);
            expect(result).toBe(expected);
        });
    });
});