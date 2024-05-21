import { combineReducers } from 'redux';
import * as loaderReducer from '@srcRoot/reducers/loaderReducer';
import * as filterReducer from './filterReducer';
import * as formDataReducer from '@srcRoot/reducers/formDataReducer';
import * as currencyReducer from '@srcRoot/reducers/currencyReducer';

export default combineReducers(Object.assign(loaderReducer, filterReducer, formDataReducer, currencyReducer));
