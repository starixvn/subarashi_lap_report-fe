import React from 'react';
import AppContainer from './components/AppContainer';
import { Provider } from 'react-redux';
import Store from '@srcRoot/lib/store';
import reducer from './reducers';
import Constants from './constants';

// import styles
import '@srcRoot/styles/pages/weeklylivematch.scss';

const WeeklyLiveMatch = (props) => {
    const defaultState = Object.assign({}, { dateRange: Constants.DateRange });

    const store = Store.createStore(reducer, defaultState);
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default WeeklyLiveMatch;
