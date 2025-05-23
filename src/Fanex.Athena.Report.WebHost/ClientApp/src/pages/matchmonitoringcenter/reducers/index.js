import { combineReducers } from 'redux';
import * as filterReducer from './filterReducer';
import * as dataReducer from './dataReducer';
import * as currencyReducer from '@/reducers/currencyReducer';
import * as baseCurrencyReducer from '@/reducers/baseCurrencyReducer';
import * as loaderReducer from '@/reducers/loaderReducer';
import * as userGuideReducer from '@/reducers/userGuideReducer';
import * as requestParamReducer from '@/reducers/requestParamReducer';
import * as reportTitleReducer from '@/reducers/reportTitleReducer';
import * as formDataReducer from '@/reducers/formDataReducer';
import * as gridDataReducer from '@/reducers/gridDataReducer';

export default combineReducers(
    Object.assign(
        filterReducer,
        dataReducer,
        currencyReducer,
        baseCurrencyReducer,
        loaderReducer,
        userGuideReducer,
        requestParamReducer,
        reportTitleReducer,
        formDataReducer,
        gridDataReducer
    )
);
