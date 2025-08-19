import moment from 'moment';

import { LRF_SAVED_PAGE_HASH_KEY, LRF_SAVED_PAGE_SESSION_KEY } from '@/constants/config';
import Store from '@/lib/store';
import Site from '@/lib/site';

import usePageSession from './usePageSession';

const useSessionStore = (reducer, initialState, resetState) => {
    const pathName = usePageSession();

    tryAddPageToSession(Site.getLrfSavedSessionKey(pathName));
    const state = getCurrentSessionState(pathName, initialState, resetState);

    const store = Store.createStore(reducer, state);

    store.subscribe(() => sessionStorage.setItem(Site.getLrfSavedSessionKey(pathName), JSON.stringify({ ...store.getState(), ...resetState })));

    return store;
};

const tryAddPageToSession = pathName => {
    if (window.location.hash === LRF_SAVED_PAGE_HASH_KEY) {
        sessionStorage.setItem(LRF_SAVED_PAGE_SESSION_KEY, JSON.stringify({ [pathName]: true }));
        return;
    }

    const savedPages = { ...JSON.parse(sessionStorage.getItem(LRF_SAVED_PAGE_SESSION_KEY)) };

    if (!savedPages[pathName]) {
        savedPages[pathName] = true;
    }

    for (const key in savedPages) {
        if (Object.prototype.hasOwnProperty.call(savedPages, key) && savedPages[key]) {
            sessionStorage.removeItem(key);
        }
    }

    history.replaceState('', '', `${window.location.href}${LRF_SAVED_PAGE_HASH_KEY}`);
    sessionStorage.setItem(LRF_SAVED_PAGE_SESSION_KEY, JSON.stringify({ [pathName]: true }));
};

const getCurrentSessionState = (pathName, defaultState, resetState) => {
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
};

export default useSessionStore;
