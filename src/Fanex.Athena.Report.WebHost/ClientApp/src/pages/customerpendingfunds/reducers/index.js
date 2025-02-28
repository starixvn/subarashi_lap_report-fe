import { combineReducers } from 'redux';

import * as loaderReducer from '@/reducers/loaderReducer';
import * as gridDataReducer from '@/reducers/gridDataReducer';
import * as userGuideReducer from '@/reducers/userGuideReducer';
import * as requestParamReducer from '@/reducers/requestParamReducer';
import * as productReducer from '@/reducers/productReducer';
import * as formDataReducer from '@/reducers/formDataReducer';
import * as currencyReducer from '@/reducers/currencyReducer';
import * as baseCurrencyReducer from '@/reducers/baseCurrencyReducer';
import * as gridSettingsReducer from './gridSettingsReducer';
import * as popupSettingsReducer from './popupSettingsReducer';

export default combineReducers(
    Object.assign(
        productReducer,
        loaderReducer,
        gridDataReducer,
        userGuideReducer,
        formDataReducer,
        requestParamReducer,
        currencyReducer,
        baseCurrencyReducer,
        gridSettingsReducer,
        popupSettingsReducer
    )
);
