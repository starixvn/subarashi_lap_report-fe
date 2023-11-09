import * as types from './types'

export const setMatches = (matches) => {
    return {
        type: types.SET_MATCHES,
        data: matches
    }
}