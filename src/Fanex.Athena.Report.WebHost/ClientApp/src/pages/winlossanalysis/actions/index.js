import * as gridDataAction from '@srcRoot/actions/gridDataAction';
import * as productAction from '@srcRoot/actions/productAction';
import * as currencyAction from '@srcRoot/actions/currencyAction';
import * as baseCurrencyAction from '@srcRoot/actions/baseCurrencyAction';
import * as statusAction from '@srcRoot/actions/statusAction';
import * as liveStatusAction from '@srcRoot/actions/liveStatusAction';
import * as loaderAction from '@srcRoot/actions/loaderAction';
import * as dateRangeAction from '@srcRoot/actions/dateRangeAction';
import * as requestParamAction from '@srcRoot/actions/requestParamAction';
import * as reportTitleAction from '@srcRoot/actions/reportTitleAction';
import * as sportAction from './sportAction.js';
import * as bettypeAction from './bettypeAction.js';
import * as filterAction from './filterAction.js';
import * as dataAction from './dataAction.js';
import * as defaultStateAction from './defaultStateAction.js';
import * as appDataAction from './appDataAction.js';
import * as platformAction from '@srcRoot/actions/platformAction';
import * as usernameAction from '@srcRoot/actions/usernameAction';
import * as convertAllAction from '@srcRoot/actions/convertAllAction';
import * as userGuideAction from '@srcRoot/actions/userGuideAction';
import * as subsidiaryAction from '@srcRoot/actions/subsidiaryAction';
import * as customerClassAction from '@srcRoot/actions/customerClassAction';
import * as formDataAction from '@srcRoot/actions/formDataAction';

export const ActionCreators = {
    ...gridDataAction,
    ...productAction,
    ...currencyAction,
    ...baseCurrencyAction,
    ...statusAction,
    ...liveStatusAction,
    ...loaderAction,
    ...dateRangeAction,
    ...requestParamAction,
    ...reportTitleAction,
    ...sportAction,
    ...bettypeAction,
    ...filterAction,
    ...usernameAction,
    ...convertAllAction,
    ...userGuideAction,
    ...subsidiaryAction,
    ...platformAction,
    ...customerClassAction,
    ...dataAction,
    ...appDataAction,
    ...formDataAction,
    ...defaultStateAction,
};
