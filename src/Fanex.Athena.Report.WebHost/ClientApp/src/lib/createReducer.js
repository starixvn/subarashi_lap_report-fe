export default function createReducer(initialState, handlers) {
    return function reducer(state, action) {
        if (typeof state === 'undefined') {
            state = initialState;
        }
        if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
}
