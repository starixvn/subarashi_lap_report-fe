import React from 'react';
import AppContainer from './components/AppContainer';
import { Provider } from 'react-redux';
import Store from "@srcRoot/lib/store";
import reducer from './reducers';
import moment from 'moment/moment';

const WeeklyLiveMatch = (props) => {
    const toDate = moment().add(-1, 'd');
    const defaultState = Object.assign({},
        { dateRange: { fromDate: toDate.clone().weekday(1).format("MM/DD/yyyy"), toDate: toDate.format("MM/DD/yyyy") } }
    );

    const store = Store.createStore(reducer, defaultState);
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    )
}

export default WeeklyLiveMatch;