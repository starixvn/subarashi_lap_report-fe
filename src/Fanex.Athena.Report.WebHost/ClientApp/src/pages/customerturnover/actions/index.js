import * as loaderAction from '@/actions/loaderAction';
import * as gridDataAction from '@/actions/gridDataAction';
import * as requestParamAction from '@/actions/requestParamAction';
import * as formDataAction from '@/actions/formDataAction';
import * as dateRangeAction from '@/actions/dateRangeAction';
import * as usernameAction from '@/actions/usernameAction';
import * as currencyAction from '@/actions/currencyAction';
import * as userGuideAction from '@/actions/userGuideAction';

import * as filterAction from './filterAction';
import bettypeAction from './bettypeAction';
import * as productAction from './productAction';

const ActionCreators = {
    ...loaderAction,
    ...gridDataAction,
    ...requestParamAction,
    ...formDataAction,
    ...dateRangeAction,
    ...usernameAction,
    ...currencyAction,
    ...bettypeAction,
    ...productAction,
    ...userGuideAction,
    ...filterAction,
};

export default ActionCreators;
