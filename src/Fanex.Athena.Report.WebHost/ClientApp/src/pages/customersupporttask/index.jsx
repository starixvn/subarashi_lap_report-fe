import React from 'react';
import AppContainer from './components/AppContainer.jsx';
import { Provider } from 'react-redux';
import reducer from './reducers/index.js';
import Store from '../../lib/store.js';
import { SupportTaskOptions } from './lib/constants.js';

const store = Store.createStore(reducer, {
    isLoading: false,
    selectedCurrency: null,
    selectedSupportTask: SupportTaskOptions[0].value,
});

export default class CustomerSupportTasks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
