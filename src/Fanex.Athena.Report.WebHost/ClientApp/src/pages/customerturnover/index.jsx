import React from 'react';
import { Provider } from 'react-redux';

// import styles
import '@/styles/pages/customerturnover.scss';

import Store from '@/lib/store';

import AppContainer from './components/AppContainer';
import reducers from './reducers';
import { constants } from './common';
import { TicketFilterOptions } from './common/filterSettings';

const CustomerTurnOver = (props) => {
    const store = Store.createStore(reducers, {
        reportBy: constants.ReportByValue.Daily,
        minimumOdds: 0,
        selectedTickets: TicketFilterOptions,
        dateRange: { ...constants.DateRange },
    });

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default CustomerTurnOver;
