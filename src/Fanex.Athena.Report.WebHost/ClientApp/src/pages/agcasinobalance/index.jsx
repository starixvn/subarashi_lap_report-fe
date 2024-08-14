import React from 'react';
import { Provider } from 'react-redux';

// import styles
import '@srcRoot/styles/pages/sabavirtualsportswinloss.scss';

import Store from '@srcRoot/lib/store';
import AppContainer from './components/AppContainer';

import reducer from './reducers';
import { constants } from './common';

const AgCasinoWinLoss = (props) => {
    const store = Store.createStore(reducer, {
        gridData: null,
        dateRange: constants.DateRange,
        selectedReportBy: constants.ReportByOptions[0].value,
        isExcludeTestData: constants.ExcludeTestDataOptions[0].value,
        requestParam: {
            DrillDownLevel: constants.DrillDownLevel.Main,
        },
    });

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default AgCasinoWinLoss;
