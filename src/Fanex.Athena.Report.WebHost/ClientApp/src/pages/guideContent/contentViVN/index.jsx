import React from 'react';

import SettledMatchCountViVN from './SettledMatchCountViVN';
import WeeklyLiveMatchViVN from './WeeklyLiveMatchesViVN';

const GuideViVN = {
    SettledMatchCount: (props) => <SettledMatchCountViVN {...props} />,
    WeeklyLiveMatches: (props) => <WeeklyLiveMatchViVN {...props} />,
};

export default GuideViVN;
