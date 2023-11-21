import React from 'react';

import WeeklyLiveMatchZhCN from './WeeklyLiveMatchesZhCN';
import SettledMatchCountZhCN from './SettledMatchCountZhCN';

const GuideZhCN = {
    SettledMatchCount: (props) => <WeeklyLiveMatchZhCN {...props} />,
    WeeklyLiveMatches: (props) => <SettledMatchCountZhCN {...props} />,
};

export default GuideZhCN;
