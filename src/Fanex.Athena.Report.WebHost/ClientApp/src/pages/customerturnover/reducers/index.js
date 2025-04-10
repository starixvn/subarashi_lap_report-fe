import { combineReducers } from 'redux';

import * as loaderReducer from '@/reducers/loaderReducer';
import * as gridDataReducer from '@/reducers/gridDataReducer';
import * as requestParamReducer from '@/reducers/requestParamReducer';
import * as formDataReducer from '@/reducers/formDataReducer';
import * as dateRangeReducer from '@/reducers/dateRangeReducer';
import * as usernameReducer from '@/reducers/usernameReducer';
import * as currencyReducer from '@/reducers/currencyReducer';
import * as bettypeReducer from '@/reducers/bettypeReducer';
import * as productReducer from '@/reducers/productReducer';
import * as userGuideReducer from '@/reducers/userGuideReducer';
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
