import { combineReducers } from 'redux';

import * as loaderReducer from '@srcRoot/reducers/loaderReducer';
import * as gridDataReducer from '@srcRoot/reducers/gridDataReducer';
import * as requestParamReducer from '@srcRoot/reducers/requestParamReducer';
import * as formDataReducer from '@srcRoot/reducers/formDataReducer';
import * as dateRangeReducer from '@srcRoot/reducers/dateRangeReducer';
import * as usernameReducer from '@srcRoot/reducers/usernameReducer';
import * as currencyReducer from '@srcRoot/reducers/currencyReducer';
import * as bettypeReducer from '@srcRoot/reducers/bettypeReducer';
import * as productReducer from '@srcRoot/reducers/productReducer';
import * as userGuideReducer from '@srcRoot/reducers/userGuideReducer';
import * as filterReducers from './filterReducers';

export default combineReducers({
    ...loaderReducer,
    ...gridDataReducer,
    ...formDataReducer,
    ...requestParamReducer,
    ...dateRangeReducer,
    ...usernameReducer,
    ...currencyReducer,
    ...bettypeReducer,
    ...productReducer,
    ...userGuideReducer,
    ...filterReducers,
});
