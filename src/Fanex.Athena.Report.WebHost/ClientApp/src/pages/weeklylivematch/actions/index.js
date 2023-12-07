import * as dateRangeAction from '@srcRoot/actions/dateRangeAction';
import * as loaderAction from '@srcRoot/actions/loaderAction';
import * as gridDataAction from '@srcRoot/actions/gridDataAction';
import * as userGuideAction from '@srcRoot/actions/userGuideAction';
import * as requestParamAction from '@srcRoot/actions/requestParamAction';

export const ActionCreators = Object.assign({}, dateRangeAction, loaderAction, gridDataAction, userGuideAction, requestParamAction);
