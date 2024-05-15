import React, { useLayoutEffect } from 'react';
import { Provider } from 'react-redux';

import Store from '@srcRoot/lib/store';
import useScriptLink from '@srcRoot/hooks/useScriptLink';
import { BetTicketEventBuilderUrl, TokenScriptLink } from '@srcRoot/helpers/settingHelper';

import AppContainer from './components/AppContainer';
import reducer from './reducers';
// import styles
import '@srcRoot/styles/pages/betlist.scss';

const BetList = (props) => {
    const scriptLink = useScriptLink();

    useLayoutEffect(() => {
        const betTicketScript = scriptLink.append(BetTicketEventBuilderUrl, 'event-builder-script');
        const tokenScript = scriptLink.append(TokenScriptLink);

        return () => {
            scriptLink.remove(tokenScript);
            scriptLink.remove(betTicketScript);
        };
    }, []);

    const store = Store.createStore(reducer, {});
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default BetList;
