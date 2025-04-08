import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Popup from '@/components/Popup';

import { ActionCreators } from '../actions';
import LangHelper from '@/helpers/langHelper';

const BetListRunningPopup = () => {
    const dispatch = useDispatch();

    const popUpSettings = useSelector((state) => state.popUpSettings);
    const iframeUrl = popUpSettings?.iframeUrl;
    const isShow = popUpSettings?.isShow;

    const { setPopUpSettings } = ActionCreators;

    const onPopUpClose = () => {
        dispatch(setPopUpSettings({}));
    };

    const title = `${LangHelper.getSingleResource('BetList')} (${LangHelper.getSingleResource('Running')})`;

    return <Popup containerClassName="betlist-popup" className="iframe-content" iframeUrl={iframeUrl} isShow={isShow} onClose={onPopUpClose} title={title} />;
};

export default BetListRunningPopup;
