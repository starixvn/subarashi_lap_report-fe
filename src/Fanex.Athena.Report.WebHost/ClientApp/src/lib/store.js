import moment from 'moment';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import Logger from './logger';

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
        const pathName = window.location.pathname;
        window.addEventListener('beforeunload', function () {
            if (window.history.state.idx == 0) {
                sessionStorage.clear();
                return;
            }

            if (window.location.pathname == pathName) {
                sessionStorage.removeItem(pathName);
            }
        });

        const state = this.getCurrentSessionState(pathName, initialState, resetState);

        const store = this.createStore(reducer, state);
        store.subscribe(() => sessionStorage.setItem(pathName, JSON.stringify(store.getState())));

        return store;
    }

    static getCurrentSessionState(key, defaultState, resetState) {
        try {
            const createdState = JSON.parse(sessionStorage.getItem(key));
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
        } catch {
            return defaultState;
        }
    }
}
