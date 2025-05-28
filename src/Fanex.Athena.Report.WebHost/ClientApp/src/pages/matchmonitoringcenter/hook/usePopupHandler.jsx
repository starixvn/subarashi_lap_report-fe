import { useDispatch } from 'react-redux';
import { ActionCreators } from '../actions';

export const usePopupHandler = () => {
    const dispatch = useDispatch();
    const { setIsShowPopup, setPopupUrl, setPopupTitle } = ActionCreators;

    const showPopup = (url, title) => {
        dispatch(setIsShowPopup(true));
        dispatch(setPopupUrl(url));
        dispatch(setPopupTitle(title));
    };

    const closePopup = () => {
        dispatch(setIsShowPopup(false));
        dispatch(setPopupUrl(''));
        dispatch(setPopupTitle(''));
    };

    return { showPopup, closePopup };
};

export default usePopupHandler;
