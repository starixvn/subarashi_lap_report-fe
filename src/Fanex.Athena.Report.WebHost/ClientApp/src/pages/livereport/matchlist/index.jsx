import React from 'react';
import { Provider } from 'react-redux';

import AppContainer from './components/AppContainer';
import reducers from './reducers';

// import styles
import '@/styles/pages/livereportmatchlist.scss';
import Store from '@/lib/store';

const LiveReportMatchList = () => {
    const store = Store.createStore(reducers, { gridData: null });

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default LiveReportMatchList;
