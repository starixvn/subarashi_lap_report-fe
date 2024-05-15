import moment from 'moment';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import Logger from './logger';
import { LRF_SAVED_PAGE_HASH_KEY, LRF_SAVED_PAGE_SESSION_KEY } from '@srcRoot/constants/config';
import Site from './site';

export default class Store {
    static createStore(reducer, initialState) {
        const loggerMiddleware = Logger.getLoggerMiddleware();

        const enhancer = compose(
            applyMiddleware(
                thunkMiddleware, // lets us dispatch() functions
                loggerMiddleware
            )
        );

        return createStore(reducer, initialState, enhancer);
    }

    static createSessionStore(reducer, initialState, resetState) {
        try {
            const pathName = window.location.pathname;

            this.registerPageToSession(pathName);
            const state = this.getCurrentSessionState(pathName, initialState, resetState);

            const store = this.createStore(reducer, state);

            store.subscribe(() => sessionStorage.setItem(Site.getLrfSavedSessionKey(pathName), JSON.stringify(store.getState())));

            return store;
        } catch {
            return this.createStore(reducer, initialState);
        }
    }

    static getCurrentSessionState(pathName, defaultState, resetState) {
        try {
            const createdState = JSON.parse(sessionStorage.getItem(Site.getLrfSavedSessionKey(pathName)));
            if (Object.keys(createdState).length === 0) {
                return defaultState;
            }

            if (createdState.dateRange?.fromDate) {
                createdState.dateRange.fromDate = moment(createdState.dateRange.fromDate);
            }

            if (createdState.dateRange?.toDate) {
                createdState.dateRange.toDate = moment(createdState.dateRange.toDate);
            }

            return { ...createdState, ...resetState };
        } catch (error) {
            return defaultState;
        }
    }

    static registerPageToSession(pathName) {
        this.tryAddPageToSession(Site.getLrfSavedSessionKey(pathName));

        window.addEventListener('pagehide', function () {
            if (window.location.pathname == pathName && window.location.hash == LRF_SAVED_PAGE_HASH_KEY) {
                sessionStorage.removeItem(LRF_SAVED_PAGE_SESSION_KEY);
                sessionStorage.removeItem(Site.getLrfSavedSessionKey(pathName));
            }
        });
    }

    static tryAddPageToSession(pathName) {
        if (window.location.hash == LRF_SAVED_PAGE_HASH_KEY) {
            sessionStorage.setItem(LRF_SAVED_PAGE_SESSION_KEY, JSON.stringify({ [pathName]: true }));
            return;
        }

        const savedPages = { ...JSON.parse(sessionStorage.getItem(LRF_SAVED_PAGE_SESSION_KEY)) };

        if (!savedPages[pathName]) {
            savedPages[pathName] = true;
        }

        for (let key in savedPages) {
            if (savedPages.hasOwnProperty(key) && savedPages[key]) {
                sessionStorage.removeItem(key);
            }
        }

        history.replaceState('', '', `${window.location.href}${LRF_SAVED_PAGE_HASH_KEY}`);
        sessionStorage.setItem(LRF_SAVED_PAGE_SESSION_KEY, JSON.stringify({ [pathName]: true }));
    }
}
