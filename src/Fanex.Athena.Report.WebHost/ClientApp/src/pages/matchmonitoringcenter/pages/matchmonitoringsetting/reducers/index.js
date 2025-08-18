import { combineReducers } from 'redux';
import * as tabHandlerReducer from '@/reducers/tabHandlerReducers';
import * as loaderReducer from '@/reducers/loaderReducer';
import * as gridDataReducer from '@/reducers/gridDataReducer';
import * as filterReducer from './filterReducer';
import * as logReducers from '../tabs/Log/reducers';

export default combineReducers({
    ...tabHandlerReducer,
    ...loaderReducer,
    ...gridDataReducer,
    ...filterReducer,
    ...logReducers,
});
