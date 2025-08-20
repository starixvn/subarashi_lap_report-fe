import React from 'react';
import AppContainer from './components/AppContainer.jsx';
import { Provider } from 'react-redux';
import reducer from './reducers/index.js';
import Store from '@/lib/store';
import { DefaultPageSize } from './common/constants.js';
import { DefaultDateRange } from './common/dateSetting.js';

import '@/styles/pages/extrapayout.scss';

const ExtraPayout = () => {
    const store = Store.createStore(reducer, {
        ...DefaultDateRange,
        reportFilter: { PageSize: DefaultPageSize },
    });

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default ExtraPayout;
