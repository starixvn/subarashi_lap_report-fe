import React from 'react';
import { Provider } from 'react-redux';

// import styles
import '@srcRoot/styles/pages/sabavirtualsportswinloss.scss';

import Store from '@srcRoot/lib/store';
import AppContainer from './components/AppContainer';

import reducer from './reducers';
import { constants } from './common';
import { ReportLevel } from '@srcRoot/constants/report';

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
