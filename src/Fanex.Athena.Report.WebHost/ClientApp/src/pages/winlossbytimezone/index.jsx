import React from 'react';
import AppContainer from './components/AppContainer';
import { Provider } from 'react-redux';
import Store from '@/lib/store';
import reducer from './reducers';

import { DateRange } from './constants/dateSetting';
import { ReportBy, TimeZones } from './constants/settingConst';

const defaultState = {
    dateRange: DateRange,
    groupBy: 1,
    selectedTimeZone: TimeZones.find(timezone => timezone.value === 8),
    selectedReportBy: ReportBy[0],
    isConvertAll: true,
    isIncludeDrawData: true,
    isExcludeTest: true,
};

const WinLossByTimeZone = () => {
    const store = Store.createStore(reducer, defaultState);
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default WinLossByTimeZone;
