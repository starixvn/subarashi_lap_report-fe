import React from 'react';
import { Provider } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Store from '@/lib/store';
import AppContainer from './AppContainer';
import reducers from './reducers';

import '@/styles/pages/matchmonitoringcenter/matchtriggeralerthistory.scss';

const TriggeredAlertHistory = () => {
    const [searchParams] = useSearchParams();
    const monitoringId = searchParams.get('Id');

    const defaultState = {
        monitoringId,
    };

    const store = Store.createStore(reducers, defaultState);

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default TriggeredAlertHistory;
