import * as Sentry from '@sentry/react';
import Site from '@srcRoot/lib/site';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const sentrySettings = Site.getSentrySetting();

Sentry.init(sentrySettings);

const root = createRoot(document.getElementById('root'));
root.render(
    <React.Fragment>
        <App />
    </React.Fragment>
);
