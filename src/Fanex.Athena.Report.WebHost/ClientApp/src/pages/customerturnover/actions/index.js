import * as loaderAction from '@srcRoot/actions/loaderAction';
import * as gridDataAction from '@srcRoot/actions/gridDataAction';
import * as requestParamAction from '@srcRoot/actions/requestParamAction';
import * as formDataAction from '@srcRoot/actions/formDataAction';
import * as dateRangeAction from '@srcRoot/actions/dateRangeAction';
import * as usernameAction from '@srcRoot/actions/usernameAction';
import * as currencyAction from '@srcRoot/actions/currencyAction';
import * as userGuideAction from '@srcRoot/actions/userGuideAction';

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
