import React from 'react';
import { Provider } from 'react-redux';

// import styles
import '@/styles/pages/turnover.scss';

import Store from '@/lib/store';
import AppContainer from './components/AppContainer';

import reducer from './reducers';
import { constants } from './common';

const Turnover = (props) => {
    const store = Store.createStore(reducer, {
        gridData: null,
        dateRange: { ...constants.DateRange },
    });
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default Turnover;
