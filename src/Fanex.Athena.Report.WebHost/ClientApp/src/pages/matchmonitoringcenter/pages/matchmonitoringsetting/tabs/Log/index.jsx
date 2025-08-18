import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './components/AppContainer';
import reducers from './reducers';
import useSessionStore from '@/hooks/useSessionStore';
import { connect } from 'react-redux';

const Log = ({ monitoringID }) => {
    const store = useSessionStore(reducers, { monitoringID });

    return (
        <div className="logs-tab">
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        monitoringID: state.monitoringID,
    };
}

export default connect(mapStateToProps)(Log);
