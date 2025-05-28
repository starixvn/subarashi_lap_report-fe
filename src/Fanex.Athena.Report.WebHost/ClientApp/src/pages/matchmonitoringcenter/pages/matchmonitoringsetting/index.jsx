import React, { useEffect } from 'react';
import { tabMenuList } from './lib/constants';
import { Provider } from 'react-redux';
import Store from '@/lib/store';
import AppContainer from './AppContainer';
import reducers from './reducers';
import { useSearchParams } from 'react-router-dom';

import '@/styles/pages/matchmonitoringcenter/matchmonitoringsetting.scss';

const MonitoringSettingDetail = () => {
    const [searchParams] = useSearchParams();
    const monitoringID = searchParams.get('Id');

    const defaultState = {
        selectedTabKey: tabMenuList[0].key,
        monitoringID,
    };

    const store = Store.createStore(reducers, defaultState);

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default MonitoringSettingDetail;
