import React, { useEffect } from 'react';
import AppContainer from './components/AppContainer';
import { Provider } from 'react-redux';
import Store from '@/lib/store';
import reducer from './reducers';
// import styles
import '@/styles/pages/winlossanalysis.scss';
import useStyleSheetLink from '@/hooks/useStyleSheetLink';
import { DefaultState } from './common/constants';

const store = Store.createStore(reducer, { ...DefaultState, defaultState: { ...DefaultState } });

const WinLossAnalysis = () => {
    const styleSheet = useStyleSheetLink();

    useEffect(() => {
        const materiaIcons = styleSheet.append('https://fonts.googleapis.com/icon?family=Material+Icons');

        return () => styleSheet.remove(materiaIcons);
    }, []);

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default WinLossAnalysis;
