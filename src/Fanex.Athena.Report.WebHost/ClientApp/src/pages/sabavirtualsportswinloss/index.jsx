import React from 'react';
import { Provider } from 'react-redux';

// import styles
import '@srcRoot/styles/pages/sabavirtualsportswinloss.scss';

import Store from '@srcRoot/lib/store';
import AppContainer from './components/AppContainer';

import reducer from './reducers';
import { constants } from './common';

const SabaVirtualSportWinLoss = (props) => {
    const store = Store.createStore(reducer, {
        gridData: null,
        selectedDrawFilter: constants.DrawFilterOptions[0].value,
        selectedReportBy: constants.ReportByOptions[0].value,
        gridSettings: {
            drillDownLevel: constants.DrillDownLevel.Main,
        },
        ...constants.DefaultDateRange,
    });

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default SabaVirtualSportWinLoss;
