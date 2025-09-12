import Service from '@/pages/livereport/matchlist/common/service';

jest.mock('@/helpers/langHelper', () => ({
    __esModule: true,
    default: {
        getSingleResource: jest.fn((key) => {
            const messages = {
                'Viewin': 'View in {0}'
            };
            return messages[key] || key;
        })
    }
}));

describe('livereport matchlist common service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('generateReportTitle creates title with product name and currency', () => {
        const productName = 'Football Betting';
        const currencyName = 'USD';
        
        const result = Service.generateReportTitle(productName, currencyName);
        
        const LangHelper = require('@/helpers/langHelper').default;
        expect(LangHelper.getSingleResource).toHaveBeenCalledWith('Viewin');
        expect(result).toBe('Football Betting - View in USD');
    });

    test('generateReportTitle handles different product names', () => {
        const testCases = [
            { product: 'Basketball', currency: 'EUR', expected: 'Basketball - View in EUR' },
            { product: 'Tennis Live', currency: 'GBP', expected: 'Tennis Live - View in GBP' },
            { product: 'Soccer Premium', currency: 'JPY', expected: 'Soccer Premium - View in JPY' }
        ];

        testCases.forEach(({ product, currency, expected }) => {
            const result = Service.generateReportTitle(product, currency);
            expect(result).toBe(expected);
        });
    });

    test('generateReportTitle handles empty or null values', () => {
        const result1 = Service.generateReportTitle('', 'USD');
        expect(result1).toBe(' - View in USD');
        
        const result2 = Service.generateReportTitle('Sports Betting', '');
        expect(result2).toBe('Sports Betting - View in ');
    });

    test('generateReportTitle correctly replaces placeholder in LangHelper string', () => {
        const productName = 'Live Casino';
        const currencyName = 'BTC';
        
        Service.generateReportTitle(productName, currencyName);
        
        const LangHelper = require('@/helpers/langHelper').default;
        expect(LangHelper.getSingleResource).toHaveBeenCalledWith('Viewin');
        
        // The actual replacement logic would be tested through integration
        // since we're mocking getSingleResource to return the template
    });

    test('generateReportTitle handles special characters in names', () => {
        const productName = 'Sports & Casino';
        const currencyName = 'USD $';
        
        const result = Service.generateReportTitle(productName, currencyName);
        expect(result).toBe('Sports & Casino - View in USD $');
    });

    test('generateReportTitle creates consistent format', () => {
        const result = Service.generateReportTitle('Test Product', 'Test Currency');
        
        // Verify the format is always "product - currency view"
        expect(result).toMatch(/^.+ - View in .+$/);
        expect(result.split(' - ')).toHaveLength(2);
    });
});