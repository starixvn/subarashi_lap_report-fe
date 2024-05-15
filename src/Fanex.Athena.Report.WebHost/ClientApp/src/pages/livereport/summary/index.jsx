import React from 'react';
import { Provider } from 'react-redux';

import AppContainer from './components/AppContainer';
import reducers from './reducers';

// import styles
import '@srcRoot/styles/pages/livereportsummary.scss';
import Store from '@srcRoot/lib/store';
import { constants } from './common';

const LiveReportSummary = (props) => {
    const defaultState = { dateRange: constants.DefaultDateRange, selectedSubsidiary: '' };
    const resetState = { selectedProductCode: null, isLoading: false };
    const store = Store.createSessionStore(reducers, defaultState, resetState);

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default LiveReportSummary;
