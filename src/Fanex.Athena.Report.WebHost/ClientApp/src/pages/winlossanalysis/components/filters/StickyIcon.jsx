import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LangHelper from '@srcRoot/helpers/langHelper';
import UserGuide from '@srcRoot/components/UserGuide';
import { ActionCreators } from '../../actions/index.js';

const StickyIcon = () => {
    const userGuideContent = useSelector((state) => state.userGuideContent);
    const dispatch = useDispatch();
    const { getUserGuideContent } = ActionCreators;

    const _showUserGuide = () => {
        if (!userGuideContent || userGuideContent.length === 0) {
            dispatch(getUserGuideContent('WinlossAnalysis'));
        }
    };

    const _renderUserGuide = () => {
        return (
            <UserGuide
                title={LangHelper.getSingleResource('UserGuide')}
                contentTitle={LangHelper.getSingleResource('WinlossAnalysis')}
                onClick={_showUserGuide}
                content={userGuideContent}
            />
        );
    };

    return <div>{_renderUserGuide()}</div>;
};

export default memo(StickyIcon);
