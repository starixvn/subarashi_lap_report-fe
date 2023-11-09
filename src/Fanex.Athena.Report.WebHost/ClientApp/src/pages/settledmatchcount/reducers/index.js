import { combineReducers } from "redux";

import * as loaderReducer from "@srcRoot/reducers/loaderReducer";
import * as userGuideReducer from "@srcRoot/reducers/userGuideReducer";
import * as matchReducer from './matches'

export default combineReducers(Object.assign(
    loaderReducer,
    userGuideReducer,
    matchReducer
));


