import * as types from './types';

export const setLastFetchTime = item => ({
    type: types.SET_LAST_FETCH_TIME,
    data: item,
});
