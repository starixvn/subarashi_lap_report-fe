import LangHelper from '@/helpers/langHelper';
import * as types from './types';

export const toggleLoader = show => ({
    type: types.TOGGLE_LOADER,
    data: show,
});

export const toggleLoaderAction = (requestFunc, callbackFunc) => dispatch => {
    dispatch(toggleLoader(true));
    requestFunc()
        .then(response => {
            if (callbackFunc) {
                callbackFunc(response);
            }

            dispatch(toggleLoader(false));
        })
        .catch(error => {
            alert(LangHelper.getSingleResource('ErrorProcessingMsg'));

            // eslint-disable-next-line no-console
            console.error(error);

            dispatch(toggleLoader(false));
        });
};
