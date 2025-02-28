import * as Sentry from '@sentry/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { SentrySetting } from '@/lib/settings';

Sentry.init(SentrySetting);

const root = createRoot(document.getElementById('root'));
root.render(
    <React.Fragment>
        <App />
    </React.Fragment>,
);
