import React from 'react';
import AppContainer from './components/AppContainer.jsx';
import { Provider } from 'react-redux';
import reducer from './reducers/index.js';
import Store from '@/lib/store';
import { constants } from './common';

import '@/styles/pages/matchmonitoringcenter/index.scss';

const MatchMonitoringCenter = () => {
    const { RefreshCountdown } = constants;
    const store = Store.createStore(reducer, {
        reportFilter: {
            DefaultRefreshCountdown: RefreshCountdown.DefaultRefreshCountdown,
        },
    });

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default MatchMonitoringCenter;
