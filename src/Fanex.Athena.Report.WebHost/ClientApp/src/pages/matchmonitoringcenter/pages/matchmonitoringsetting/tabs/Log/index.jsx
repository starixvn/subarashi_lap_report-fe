import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './components/AppContainer';
import reducers from './reducers';
import useSessionStore from '@/hooks/useSessionStore';

const Log = () => {
  // Create a separate store instance for the Log tab
  const store = useSessionStore(reducers, {});

  return (
    <div className="logs-tab">
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </div>
  );
};

export default Log;