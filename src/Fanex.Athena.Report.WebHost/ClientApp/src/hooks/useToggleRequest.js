import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toggleLoader } from '@/actions/loaderAction';
import LangHelper from '@/helpers/langHelper';

const useToggleRequest = () => {
    const dispatch = useDispatch();

    const sendRequest = useCallback((requestFunc, callbackFunc) => {
        dispatch(toggleLoader(true));
        requestFunc()
            .then((response) => {
                if (callbackFunc) {
                    callbackFunc(response);
                }

                dispatch(toggleLoader(false));
            })
            .catch((error) => {
                alert(LangHelper.getSingleResource('ErrorProcessingMsg'));

                console.error(error);

                dispatch(toggleLoader(false));
            });
    }, []);

    return { sendRequest };
};

export default useToggleRequest;
