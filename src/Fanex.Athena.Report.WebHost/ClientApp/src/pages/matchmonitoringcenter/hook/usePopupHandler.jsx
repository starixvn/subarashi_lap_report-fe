import { useDispatch, batch } from 'react-redux';
import { ActionCreators } from '../actions';
import { useFilterAction } from './useFilterAction';

export const usePopupHandler = () => {
    const dispatch = useDispatch();
    const { setIsShowPopup, setPopupUrl, setPopupTitle, setPopupStyleClassName, setIsRefresh } = ActionCreators;
    const { fetchData } = useFilterAction();

    const showPopup = (url, title, styleClassName, isRefresh = false) => {
        batch(() => {
            dispatch(setIsShowPopup(true));
            dispatch(setPopupUrl(url));
            dispatch(setPopupTitle(title));
            dispatch(setPopupStyleClassName(styleClassName));
            dispatch(setIsRefresh(isRefresh));
        });
    };

    const closePopup = (isRefresh = false) => {
        isRefresh && fetchData();

        batch(() => {
            dispatch(setIsShowPopup(false));
            dispatch(setPopupUrl(''));
            dispatch(setPopupTitle(''));
            dispatch(setPopupStyleClassName(''));
            dispatch(setIsRefresh(false));
        });
    };

    return { showPopup, closePopup };
};

export default usePopupHandler;
