import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Popup from '@/components/Popup';
import LangHelper from '@/helpers/langHelper';

import actions from '../actions';

const BetListCustomerPopup = () => {
    const dispatch = useDispatch();

    const popUpSettings = useSelector((state) => state.popUpSettings);
    const iframeUrl = popUpSettings?.iframeUrl;
    const isShow = popUpSettings?.isShow;

    const { setPopUpSettings } = actions;

    const onPopUpClose = () => {
        dispatch(setPopUpSettings({}));
    };

    const title = LangHelper.getSingleResource('CustomerBetList');

    return <Popup containerClassName="betlist-popup" className="iframe-content" iframeUrl={iframeUrl} isShow={isShow} onClose={onPopUpClose} title={title} />;
};

export default BetListCustomerPopup;
