import * as dateRangeAction from '@/actions/dateRangeAction';
import * as loaderAction from '@/actions/loaderAction';
import * as gridDataAction from '@/actions/gridDataAction';
import * as userGuideAction from '@/actions/userGuideAction';
import * as requestParamAction from '@/actions/requestParamAction';

export const ActionCreators = Object.assign({}, dateRangeAction, loaderAction, gridDataAction, userGuideAction, requestParamAction);
