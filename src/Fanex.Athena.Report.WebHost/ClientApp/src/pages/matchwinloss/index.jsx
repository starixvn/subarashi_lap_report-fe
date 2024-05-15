import React from 'react';
import { Provider } from 'react-redux';

import Store from '@srcRoot/lib/store';

import AppContainer from './components/AppContainer';
import reducers from './reducers';

// import styles
import '@srcRoot/styles/pages/matchwinloss.scss';

const MatchWinLoss = (props) => {
    const store = Store.createSessionStore(reducers, {});

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default MatchWinLoss;
