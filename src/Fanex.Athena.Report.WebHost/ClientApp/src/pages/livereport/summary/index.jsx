import React from 'react';
import { Provider } from 'react-redux';

import AppContainer from './components/AppContainer';
import reducers from './reducers';

// import styles
import '@srcRoot/styles/pages/livereportsummary.scss';
import { constants } from './common';
import useSessionStore from '@srcRoot/hooks/useSessionStore';

const defaultState = { dateRange: constants.DefaultDateRange, selectedSubsidiary: '' };
const resetState = { selectedProductCode: null, isLoading: false };

const LiveReportSummary = (props) => {
    const store = useSessionStore(reducers, defaultState, resetState);

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default LiveReportSummary;
