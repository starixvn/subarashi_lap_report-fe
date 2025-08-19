import React from 'react';
import { Provider } from 'react-redux';

import AppContainer from './components/AppContainer';
import reducers from './reducers';

// import styles
import '@/styles/pages/matchwinloss.scss';
import useSessionStore from '@/hooks/useSessionStore';

const MatchWinLoss = () => {
    const store = useSessionStore(reducers, {});

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default MatchWinLoss;
