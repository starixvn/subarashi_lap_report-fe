import { combineReducers } from 'redux';

import * as loaderReducer from '@/reducers/loaderReducer';
import * as gridDataReducer from '@/reducers/gridDataReducer';
import * as dataReducer from './dataReducer';

export default combineReducers(Object.assign({}, loaderReducer, gridDataReducer, dataReducer));
