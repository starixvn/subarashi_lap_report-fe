import React from 'react';
import { Provider } from 'react-redux';

// import styles
import '@srcRoot/styles/pages/customerpendingfunds.scss';

import Store from '@srcRoot/lib/store';
import AppContainer from './components/AppContainer';

import reducer from './reducers';
import { constants } from './common';

const Turnover = (props) => {
    const store = Store.createStore(reducer, {
        gridData: null,
        dateRange: constants.DateRange,
        gridSettings: { sortBy: constants.SortKeys.ExternalId, sortOrderBy: 'asc' },
    });

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default Turnover;
