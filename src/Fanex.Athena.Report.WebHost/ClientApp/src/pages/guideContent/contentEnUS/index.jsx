import React from 'react';

import SettledMatchCountEnUS from './SettledMatchCountEnUS';
import WeeklyLiveMatchesEnUS from './WeeklyLiveMatchesEnUS';

const GuideEnUS = {
    SettledMatchCount: (props) => <SettledMatchCountEnUS {...props} />,
    WeeklyLiveMatches: (props) => <WeeklyLiveMatchesEnUS {...props} />,
};

export default GuideEnUS;
