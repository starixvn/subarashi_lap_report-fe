import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as Sentry from '@sentry/react';
import Site from '@srcRoot/lib/site';

const sentrySettings = Site.getSentrySetting();

Sentry.init({
    dsn: process.env.APP_SETTING.SentryFEDsn,
    environment: process.env.APP_SETTING.Environment,
    attachStacktrace: true
});

const root = createRoot(document.getElementById('root'));
root.render(
    <React.Fragment>
        <App />
    </React.Fragment>
);
