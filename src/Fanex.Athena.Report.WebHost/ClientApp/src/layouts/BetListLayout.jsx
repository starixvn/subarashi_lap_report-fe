import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from '../components/Popup';

const BetListLayout = (props) => {
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [popupUrl, setPopupUrl] = useState(null);
    const [popupTitle, setPopupTitle] = useState(null);

    useEffect(() => {
        window.logOpenBetlistEvent && window.logOpenBetlistEvent(props.pageName);
        window.openPopup = openPopup;
        window.getResource = null; //use resource from BetTicket site
        window.formatDateString = formatDateString;
        window.beforeShow = beforeShow;
        window.afterShow = afterShow;
        window.getBaseCurrency = getBaseCurrency;
        window.getAccessToken = getAccessToken;
        window.getLanguage = getLanguage;
    }, [props.pageName]);

    const formatDateString = (dateString) => {
        return props.formatDateStringFunc ? props.formatDateStringFunc(dateString) : dateString;
    };

    const beforeShow = () => {
        props.beforeShowFunc && props.beforeShowFunc();
    };

    const afterShow = () => {
        props.afterShowFunc && props.afterShowFunc();
    };

    const openPopup = (url, title) => {
        setIsShowPopup(true);
        setPopupUrl(url);
        setPopupTitle(title);
    };

    const closePopup = () => {
        setIsShowPopup(false);
    };

    const getBaseCurrency = () => {
        return props.baseCurrency;
    };

    const getAccessToken = () => {
        return window.topSameOriginWindow.lrf && window.topSameOriginWindow.lrf.access_token;
    };

    const getLanguage = () => {
        return window.pageLanguage;
    };

    return (
        <div className="betlist-layout">
            {props.children}
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

BetListLayout.defaultProps = {
    rootUrl: '/',
    baseCurrency: '',
};

export default BetListLayout;
