import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Popup from '@/components/Popup';
import GtagHelper from '@/helpers/gtagHelper';

const BetListLayout = ({ pageName, baseCurrency = '', beforeShowFunc, afterShowFunc, formatDateStringFunc, children }) => {
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [popupUrl, setPopupUrl] = useState(null);
    const [popupTitle, setPopupTitle] = useState(null);

    useEffect(() => {
        GtagHelper.logOpenBetlist(pageName);
        window.openPopup = openPopup;
        window.getResource = null; //use resource from BetTicket site
        window.formatDateString = formatDateString;
        window.beforeShow = beforeShow;
        window.afterShow = afterShow;
        window.getBaseCurrency = getBaseCurrency;
        window.getAccessToken = getAccessToken;
        window.getLanguage = getLanguage;
    }, [pageName]);

    const formatDateString = dateString => (formatDateStringFunc ? formatDateStringFunc(dateString) : dateString);

    const beforeShow = () => {
        beforeShowFunc && beforeShowFunc();
    };

    const afterShow = () => {
        afterShowFunc && afterShowFunc();
    };

    const openPopup = (url, title) => {
        setIsShowPopup(true);
        setPopupUrl(url);
        setPopupTitle(title);
    };

    const closePopup = () => {
        setIsShowPopup(false);
    };

    const getBaseCurrency = () => baseCurrency;

    const getAccessToken = () => window.topSameOriginWindow.lrf && window.topSameOriginWindow.lrf.access_token;

    const getLanguage = () => window.pageLanguage;

    return (
        <div className="betlist-layout">
            {children}
            {isShowPopup && (
                <Popup
                    containerClassName="betlist-popup"
                    isShow={true}
                    iframeUrl={popupUrl}
                    title={popupTitle}
                    width={900}
                    height={600}
                    onClose={() => closePopup()}></Popup>
            )}
        </div>
    );
};

BetListLayout.propTypes = {
    pageName: PropTypes.string.isRequired,
    rootUrl: PropTypes.string.isRequired,
    baseCurrency: PropTypes.string,
    beforeShowFunc: PropTypes.func,
    afterShowFunc: PropTypes.func,
    formatDateStringFunc: PropTypes.func,
};

export default BetListLayout;
