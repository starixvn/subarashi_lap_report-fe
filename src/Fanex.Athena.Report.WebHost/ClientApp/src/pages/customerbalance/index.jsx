import React from 'react';
import AppContainer from './components/AppContainer';
import { Provider } from 'react-redux';
import Store from '@srcRoot/lib/store';
import reducer from './reducers';
// import styles
import '@srcRoot/styles/pages/customerbalance.scss';

const CustomerBalance = (props) => {
    const store = Store.createStore(reducer, { gridData: null });
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default CustomerBalance;
