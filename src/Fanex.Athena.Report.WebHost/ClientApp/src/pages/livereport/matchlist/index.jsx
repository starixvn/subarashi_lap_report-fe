import React from 'react';
import { Provider } from 'react-redux';

import AppContainer from './components/AppContainer';
import reducers from './reducers';

// import styles
import '@srcRoot/styles/pages/livereportmatchlist.scss';
import Store from '@srcRoot/lib/store';

const LiveReportMatchList = (props) => {
    const store = Store.createStore(reducers, { gridData: null });

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default LiveReportMatchList;
