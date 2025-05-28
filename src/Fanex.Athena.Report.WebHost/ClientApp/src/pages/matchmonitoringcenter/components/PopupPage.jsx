import React from 'react';
import { useSelector } from 'react-redux';
import Popup from '@/components/Popup';
import { usePopupHandler } from '../hook';

const PopupPage = () => {
    const { closePopup } = usePopupHandler();
    const [isShow, url, title, styleClassName] = useSelector((state) => [state.isShowPopup, state.popupUrl, state.popupTitle, state.popupStyleClassName]);
    return <Popup title={title} isShow={isShow} onClose={closePopup} className={styleClassName} iframeUrl={url} />;
};

export default React.memo(PopupPage);
