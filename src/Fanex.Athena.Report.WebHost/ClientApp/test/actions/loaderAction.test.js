import * as types from '@/actions/types';
import { toggleLoader, toggleLoaderAction } from '@/actions/loaderAction';

jest.mock('@/helpers/langHelper', () => ({ __esModule: true, default: { getSingleResource: jest.fn(() => 'Error') } }));

describe('loaderAction', () => {
    beforeEach(() => {
        window.alert = jest.fn();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    test('toggleLoader returns action', () => {
        expect(toggleLoader(true)).toEqual({ type: types.TOGGLE_LOADER, data: true });
    });

    test('toggleLoaderAction resolves and dispatches start/stop and callback', async () => {
        const dispatch = jest.fn();
        const requestFunc = jest.fn(() => Promise.resolve({ ok: true }));
        const callback = jest.fn();
        await toggleLoaderAction(requestFunc, callback)(dispatch);
        expect(dispatch).toHaveBeenCalledWith({ type: types.TOGGLE_LOADER, data: true });
        expect(callback).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith({ type: types.TOGGLE_LOADER, data: false });
    });

    test('toggleLoaderAction rejects and alerts, logs, and stops loader', async () => {
        const dispatch = jest.fn();
        const requestFunc = jest.fn(() => Promise.reject(new Error('x')));
        toggleLoaderAction(requestFunc)(dispatch);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(window.alert).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith({ type: types.TOGGLE_LOADER, data: false });
    });
});
