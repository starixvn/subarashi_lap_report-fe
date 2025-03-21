import React from 'react';
import { Provider } from 'react-redux';

// import styles
import '@/styles/pages/sabavirtualsportswinloss.scss';

import Store from '@/lib/store';
import AppContainer from './components/AppContainer';

import reducer from './reducers';
import { constants } from './common';
import { ReportLevel } from '@/constants/report';

const SubsidiaryPerformance = (props) => {
    const store = Store.createStore(reducer, {
        convertAll: false,
        includeDrawData: true,
        excludeTest: true,
        separateSabaWinLoss: false,
        dateRange: constants.DateRange,
        selectedWhiteLabel: '',
        requestParam: { DrillDownLevel: ReportLevel.MAIN },
    });

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default SubsidiaryPerformance;
