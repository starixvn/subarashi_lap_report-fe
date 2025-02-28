import React from 'react';
import AppContainer from './components/AppContainer';
import { Provider } from 'react-redux';
import Store from '@/lib/store';
import reducer from './reducers';
import { DefaultPageSize } from './common/constants';
import { DefaultDateRange } from './common/dateSetting';
// import styles
import '@/styles/pages/leaguewinloss.scss';

const LeagueWinLoss = (props) => {
    const store = Store.createStore(reducer, {
        username: '',
        bettypeList: [],
        selectedBettype: 0,
        sportList: [],
        selectedSport: 0,
        isLoading: false,
        reloadReport: false,
        ...DefaultDateRange,
        reportFilter: { PageSize: DefaultPageSize },
    });

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default LeagueWinLoss;
