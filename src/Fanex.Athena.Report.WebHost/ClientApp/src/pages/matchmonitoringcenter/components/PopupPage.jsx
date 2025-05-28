import React from 'react';
import { useSelector } from 'react-redux';
import Popup from '@/components/Popup';
import { usePopupHandler } from '../hook';

const PopupPage = () => {
    const { closePopup } = usePopupHandler();
    const [isShow, url, title] = useSelector((state) => [state.isShowPopup, state.popupUrl, state.popupTitle]);
    return <Popup title={title} isShow={isShow} onClose={closePopup} className="match-monitoring-popup" iframeUrl={url} />;
};

export default React.memo(PopupPage);
