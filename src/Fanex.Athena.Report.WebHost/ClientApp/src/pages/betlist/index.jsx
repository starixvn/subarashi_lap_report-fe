import React, { useLayoutEffect } from 'react';
import { Provider } from 'react-redux';

import Store from '@/lib/store';
import useScriptLink from '@/hooks/useScriptLink';
import { AppSetting } from '@/lib/settings';

import AppContainer from './components/AppContainer';
import reducer from './reducers';
// import styles
import '@/styles/pages/betlist.scss';

const BetList = (props) => {
    const scriptLink = useScriptLink();

    useLayoutEffect(() => {
        const betTicketScript = scriptLink.append(AppSetting.BetTicketEventBuilderUrl, 'event-builder-script');
        const tokenScript = scriptLink.append(AppSetting.TokenScriptLink);

        return () => {
            scriptLink.remove(tokenScript);
            scriptLink.remove(betTicketScript);
        };
    }, []);

    const store = Store.createStore(reducer, { isLoading: true });
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default BetList;
