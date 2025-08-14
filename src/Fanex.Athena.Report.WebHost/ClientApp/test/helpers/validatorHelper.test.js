import { AuthorizeRequestInfo } from '@/helpers/validatorHelper';

jest.mock('@/lib/dataService', () => ({ __esModule: true, default: { postData: jest.fn(), getData: jest.fn() } }));
jest.mock('@/lib/site', () => ({ __esModule: true, default: { redirectToUrl: jest.fn() } }));
jest.useFakeTimers();

describe('validatorHelper.AuthorizeRequestInfo', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('returns null when no permissions', async () => {
        const res = await AuthorizeRequestInfo({});
        expect(res).toBeNull();
    });

    test('redirects when no function keys allowed', async () => {
        const DataService = require('@/lib/dataService').default;
        const Site = require('@/lib/site').default;
        DataService.postData.mockResolvedValue({ data: { FunctionKeys: [{ HasPermission: false }], IsSelfMode: true } });
        await AuthorizeRequestInfo({ permissions: ['A'] });
        expect(Site.redirectToUrl).toHaveBeenCalled();
    });

    test('starts interval when not self mode and redirects on UM/SignOut', async () => {
        const DataService = require('@/lib/dataService').default;
        const Site = require('@/lib/site').default;
        DataService.postData.mockResolvedValue({ data: { FunctionKeys: [{ HasPermission: true }], IsSelfMode: false, IdentityName: 'id' } });
        DataService.getData.mockResolvedValue({ data: { IsUM: true } });
        await AuthorizeRequestInfo({ permissions: ['A'] });
        jest.advanceTimersByTime(30000);
        await Promise.resolve();
        expect(Site.redirectToUrl).toHaveBeenCalled();
        DataService.getData.mockResolvedValue({ data: { IsAuthenticated: false } });
        jest.advanceTimersByTime(30000);
        await Promise.resolve();
        expect(Site.redirectToUrl).toHaveBeenCalledTimes(2);
    });
});
