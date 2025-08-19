import React from 'react';
import AppContainer from './components/AppContainer';
import { Provider } from 'react-redux';
import Store from '@/lib/store';
import reducer from './reducers';
import Constants from './constants';

// import styles
import '@/styles/pages/weeklylivematch.scss';

const WeeklyLiveMatch = () => {
    const defaultState = Object.assign({}, { dateRange: Constants.DateRange });

    const store = Store.createStore(reducer, defaultState);
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default WeeklyLiveMatch;
