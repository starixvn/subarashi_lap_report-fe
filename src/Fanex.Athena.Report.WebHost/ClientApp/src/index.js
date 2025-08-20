import { init } from '@sentry/react';
import Site from '@/lib/site';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const sentrySettings = Site.getSentrySetting();

init(sentrySettings);

const root = createRoot(document.getElementById('root'));
root.render(
    <React.Fragment>
        <App />
    </React.Fragment>
);
