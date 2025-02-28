import * as dateRangeAction from '@/actions/dateRangeAction';
import * as loaderAction from '@/actions/loaderAction';
import * as gridDataAction from '@/actions/gridDataAction';
import * as userGuideAction from '@/actions/userGuideAction';
import * as productAction from '@/actions/productAction';
import * as requestParamAction from '@/actions/requestParamAction';
import * as formDataAction from '@/actions/formDataAction';

export const ActionCreators = Object.assign(
    {},
    dateRangeAction,
    productAction,
    loaderAction,
    gridDataAction,
    userGuideAction,
    requestParamAction,
    formDataAction,
);
