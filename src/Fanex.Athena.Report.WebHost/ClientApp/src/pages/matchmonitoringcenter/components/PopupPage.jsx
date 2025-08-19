import React from 'react';
import { useSelector } from 'react-redux';
import Popup from '@/components/Popup';
import { usePopupHandler } from '../hook';

const PopupPage = () => {
    const { closePopup } = usePopupHandler();
    const [isShow, url, title, styleClassName, isRefresh] = useSelector(state => [
        state.isShowPopup,
        state.popupUrl,
        state.popupTitle,
        state.popupStyleClassName,
        state.isRefresh,
    ]);

    return <Popup title={title} isShow={isShow} onClose={() => closePopup(isRefresh)} className={styleClassName} iframeUrl={url} />;
};

export default React.memo(PopupPage);
