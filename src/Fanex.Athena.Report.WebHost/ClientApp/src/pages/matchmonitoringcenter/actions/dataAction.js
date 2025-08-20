import { SET_LAST_FETCH_TIME } from './types';

export const setLastFetchTime = item => ({
    type: SET_LAST_FETCH_TIME,
    data: item,
});
