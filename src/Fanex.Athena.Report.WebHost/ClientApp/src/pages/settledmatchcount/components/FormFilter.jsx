import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserGuide from '@srcRoot/components/UserGuide';
import LangHelper from '@srcRoot/helpers/langHelper';
import CollapsiblePanel from '@srcRoot/components/CollapsiblePanel';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import DataService from '@srcRoot/lib/dataService';

import { ActionCreators } from '../actions/index';
import Constants from '../constants';
import { SETTLED_MATCH_COUNT, USER_GUIDE } from '@srcRoot/constants/pages';

const FormFilter = (props) => {
    const dispatch = useDispatch();
    const userGuideContent = useSelector((state) => state.userGuideContent);
    const { sendRequest } = useToggleRequest();

    const { setGridData, getUserGuideContent } = ActionCreators;
    const { ApiUrl } = Constants;

    useEffect(() => {
        sendRequest(() => DataService.getReportData(ApiUrl.REPORT_DATA_URL), _updateData);
    }, []);

    const _updateData = (result) => {
        if (result && result.data !== null) {
            dispatch(setGridData(result.data));
            return;
        }

        dispatch(setGridData(null));
    };

    const fetchUserGuide = () => {
        if (!userGuideContent) {
            sendRequest(() => dispatch(getUserGuideContent(SETTLED_MATCH_COUNT)));
        }
    };

    const SupportButton = (
        <UserGuide
            title={LangHelper.getSingleResource(USER_GUIDE)}
            contentTitle={LangHelper.getSingleResource(SETTLED_MATCH_COUNT)}
            onClick={fetchUserGuide}
            content={userGuideContent}
        />
    );

    return <CollapsiblePanel stickyFooter={SupportButton} isCollapseMode={false} />;
};

export default React.memo(FormFilter);
