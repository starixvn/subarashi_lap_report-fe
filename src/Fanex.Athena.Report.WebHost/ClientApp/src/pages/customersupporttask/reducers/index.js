import { combineReducers } from 'redux';
import * as loaderReducer from '@/reducers/loaderReducer';
import * as filterReducer from './filterReducer';
import * as formDataReducer from '@/reducers/formDataReducer';
import * as currencyReducer from '@/reducers/currencyReducer';

export default combineReducers({
    ...loaderReducer,
    ...filterReducer,
    ...formDataReducer,
    ...currencyReducer,
});
