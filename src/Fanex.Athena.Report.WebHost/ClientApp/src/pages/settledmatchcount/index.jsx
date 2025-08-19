import React from 'react';
import AppContainer from './components/AppContainer';
import { Provider } from 'react-redux';
import Store from '@/lib/store';
import reducer from './reducers';
// import styles
import '@/styles/pages/settledmatchcount.scss';

const SettledMatchCount = () => {
    const store = Store.createStore(reducer, {});
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default SettledMatchCount;
