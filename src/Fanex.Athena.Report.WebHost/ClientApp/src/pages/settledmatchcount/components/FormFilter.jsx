import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';

import UserGuide from '@srcRoot/components/UserGuide';
import LangHelper from "@srcRoot/helpers/langHelper";
import CollapsiblePanel from "@srcRoot/components/CollapsiblePanel";
import GetGuideWithCurrentLang from '../../guideContent';
import useToggleRequest from "@srcRoot/hooks/useToggleRequest";
import DataService from "@srcRoot/lib/dataService";


import { ActionCreators } from "../actions/index";

const FormFilter = (props) => {
    const dispatch = useDispatch();
    const { setGridData } = ActionCreators;
    const { sendRequest } = useToggleRequest();

    useEffect(() => {
        sendRequest(
            () => DataService.getReportData("SettledMatchCount/Index"),
            _updateData
        );
    }, []);

    const _updateData = (result) => {
        if (result && result.data !== null) {
            dispatch(setGridData(result.data));
            return;
        }

        dispatch(setGridData(null));
    };

    const SupportButton = (
        <UserGuide
            title={LangHelper.getSingleResource("UserGuide")}
            contentTitle={LangHelper.getSingleResource("SettledMatchCount")}
            content={GetGuideWithCurrentLang('SettledMatchCount')}
        />
    );

    return (
        <CollapsiblePanel
            className='page-filter'
            stickyFooter={SupportButton}
            isCollapseMode={false}
        />
    );
};

export default React.memo(FormFilter);
