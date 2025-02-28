import { combineReducers } from 'redux';

import * as loaderReducer from '@/reducers/loaderReducer';
import * as gridDataReducer from '@/reducers/gridDataReducer';
import * as requestParamReducer from '@/reducers/requestParamReducer';
import * as formDataReducer from '@/reducers/formDataReducer';

export default combineReducers({
    ...requestParamReducer,
    ...formDataReducer,
    ...loaderReducer,
    ...gridDataReducer,
});
