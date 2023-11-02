import { combineReducers } from "redux";

import * as dateRangeReducer from "@srcRoot/reducers/dateRangeReducer";
import * as loaderReducer from "@srcRoot/reducers/loaderReducer";

export default combineReducers(Object.assign(
    dateRangeReducer,
    loaderReducer
));
