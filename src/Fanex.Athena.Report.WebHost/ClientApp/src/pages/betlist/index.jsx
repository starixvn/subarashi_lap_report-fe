import React, { useLayoutEffect } from 'react';
import { Provider } from 'react-redux';

import Store from '@/lib/store';
import useScriptLink from '@/hooks/useScriptLink';
import { BetTicketEventBuilderUrl, TokenScriptLink } from '@/helpers/settingHelper';

import AppContainer from './components/AppContainer';
import reducer from './reducers';
// import styles
import '@/styles/pages/betlist.scss';

const BetList = () => {
    const scriptLink = useScriptLink();

    useLayoutEffect(() => {
        const betTicketScript = scriptLink.append(BetTicketEventBuilderUrl, 'event-builder-script');
        const tokenScript = scriptLink.append(TokenScriptLink);

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
